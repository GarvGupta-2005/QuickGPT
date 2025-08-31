🚀 QuickGPT

QuickGPT is a full-stack AI-powered application that lets users chat with an intelligent assistant and generate AI images – all with a smooth credit system and modern UI.

⚙️ Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/GarvGupta-2005/QuickGPT.git
cd quickgpt

2️⃣ Backend Setup
cd backend
npm install

Create a .env file inside backend/ with the following:

MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key

IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint

Run the backend:

npm run server

3️⃣ Frontend Setup
cd frontend
npm install


Create a .env file inside frontend/ with the following:

VITE_SERVER_URL=http://localhost:3000


Run the frontend:

npm run dev

✨ Features:
💬 AI Text Generation (OpenAI / Gemini API)
🎨 AI Image Generation
👤 Secure Authentication (JWT + bcrypt)
⚡ Credit System (20 credits, auto-refill every 15h if 0)
🗂️ Chat Management (save, fetch, delete)
🌙 Dark Mode Support
📱 Responsive UI

🛠️ Tech Stack:
Frontend: React, Tailwind CSS, Context API
Backend: Node.js, Express.js, MongoDB
Auth & Security: JWT, bcrypt
AI Models: OpenAI / Gemini API
Image Hosting: ImageKit
