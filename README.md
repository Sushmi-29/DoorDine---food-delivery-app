How to Run the Project
🔹 1. Clone the Repository
Bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME

 
🖥️ Backend Setup (Django)
🔹 Step 1: Go to backend folder
Bash
cd food-delivery-backend
🔹 Step 2: Create virtual environment
Bash
python -m venv venv
🔹 Step 3: Activate virtual environment
👉 Windows:
Bash
venv\Scripts\activate
👉 Mac/Linux:
Bash
source venv/bin/activate
🔹 Step 4: Install dependencies
Bash
pip install -r requirements.txt
🔹 Step 5: Apply migrations
Bash
python manage.py migrate
🔹 Step 6: Run backend server
Bash
python manage.py runserver
👉 Backend runs at:

http://127.0.0.1:8000/


🌐 Frontend Setup (React)
🔹 Step 1: Open new terminal and go to frontend
Bash
cd food-delivery-frontend
🔹 Step 2: Install dependencies
Bash
npm install
🔹 Step 3: Run frontend
Bash
npm start
👉 Frontend runs at:

http://localhost:3000/


🔗 Notes
Make sure backend is running before frontend
API base URL should point to:

http://127.0.0.1:8000/api/