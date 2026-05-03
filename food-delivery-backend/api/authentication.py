import base64
import hashlib
import hmac
import json
from datetime import timedelta

from django.conf import settings
from django.contrib.auth import get_user_model
from django.utils import timezone
from rest_framework import authentication, exceptions


def _base64url_encode(value):
    return base64.urlsafe_b64encode(value).rstrip(b"=").decode("ascii")


def _base64url_decode(value):
    padding = "=" * (-len(value) % 4)
    return base64.urlsafe_b64decode(f"{value}{padding}")


def create_jwt_for_user(user):
    now = timezone.now()
    payload = {
        "user_id": user.id,
        "email": user.email,
        "iat": int(now.timestamp()),
        "exp": int((now + timedelta(days=7)).timestamp()),
    }
    header = {"alg": "HS256", "typ": "JWT"}

    signing_input = ".".join(
        [
            _base64url_encode(json.dumps(header, separators=(",", ":")).encode()),
            _base64url_encode(json.dumps(payload, separators=(",", ":")).encode()),
        ]
    )
    signature = hmac.new(
        settings.SECRET_KEY.encode(),
        signing_input.encode(),
        hashlib.sha256,
    ).digest()

    return f"{signing_input}.{_base64url_encode(signature)}"


class JWTAuthentication(authentication.BaseAuthentication):
    keyword = "Bearer"

    def authenticate(self, request):
        auth_header = authentication.get_authorization_header(request).decode()

        if not auth_header:
            return None

        parts = auth_header.split()
        if len(parts) != 2 or parts[0] != self.keyword:
            raise exceptions.AuthenticationFailed("Invalid authorization header")

        payload = self._decode_token(parts[1])
        user = self._get_user(payload)

        return (user, parts[1])

    def _decode_token(self, token):
        try:
            header_b64, payload_b64, signature_b64 = token.split(".")
            signing_input = f"{header_b64}.{payload_b64}"
            expected_signature = hmac.new(
                settings.SECRET_KEY.encode(),
                signing_input.encode(),
                hashlib.sha256,
            ).digest()
            provided_signature = _base64url_decode(signature_b64)

            if not hmac.compare_digest(expected_signature, provided_signature):
                raise exceptions.AuthenticationFailed("Invalid token")

            payload = json.loads(_base64url_decode(payload_b64))
        except (ValueError, json.JSONDecodeError):
            raise exceptions.AuthenticationFailed("Invalid token")

        if payload.get("exp", 0) < int(timezone.now().timestamp()):
            raise exceptions.AuthenticationFailed("Token has expired")

        return payload

    def _get_user(self, payload):
        user_id = payload.get("user_id")

        if not user_id:
            raise exceptions.AuthenticationFailed("Invalid token payload")

        User = get_user_model()

        try:
            user = User.objects.get(id=user_id, is_active=True)
        except User.DoesNotExist:
            raise exceptions.AuthenticationFailed("User not found")

        return user
