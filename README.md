# AI Paragraph Assistant

A modern web application that uses **Generative AI** to process paragraphs and perform multiple actions like summarizing, generating quizzes, simplifying text, translating, and more.  
Designed to help students, educators, and content creators work smarter with text content.

---

## 🌟 Features

- **Text Actions:**  
  - Summarize paragraphs  
  - Generate quizzes from text  
  - Simplify complex text  
  - Explain Like I'm 5 (ELI5)  
  - Translate text (English → Urdu)  
  - Extract key points

- **Real-time Typing Effect:** Outputs appear gradually like human typing.

- **History Tracking:** Keeps a history of your previous inputs and outputs for easy reference.

- **Copy & Download:**  
  - Copy output to clipboard  
  - Download output as PDF

- **Dark Mode Support:** Toggle between light and dark themes for comfortable viewing.

- **Modern UI:** Clean and responsive layout for both desktop and mobile.

---

## 📁 Project Structure

```

AI-Paragraph-Assistant/
├─ backend/                  # Node.js backend
│  ├─ app.js                 # API server
│  ├─ package.json
│  ├─ package-lock.json
│  ├─ node_modules/          # Ignored in Git
│  └─ .env                   # Ignored in Git
├─ frontend/                 # Web frontend
│  ├─ index.html
│  ├─ style.css
│  ├─ script.js
│  └─ icons/                
└─ README.md

````

---

## ⚙️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** Node.js, Express  
- **AI API:** Generative AI model (replaceable with your preferred API)  
- **PDF Generation:** jsPDF library  
- **Version Control:** Git & GitHub

---

## 🚀 How to Run Locally

### 1. Backend
```bash
cd backend
npm install
````

Create a `.env` file with your API key:

```
API_KEY=your_api_key_here
```

Start the server:

```bash
node app.js
```

Server runs on: `http://localhost:3000`

---

### 2. Frontend

Open `frontend/index.html` in your browser.
It will connect to your backend API running locally.

---

## 📂 How to Use

1. Paste your paragraph in the **input section**.
2. Select an **action** from the dropdown menu.
3. Adjust **typing speed** if desired.
4. Click **Generate** → output will appear in real-time.
5. Optionally, **copy output** or **download PDF**.
6. Check **history section** on the right for previous entries.

---

## ⚠️ Notes

* **.env** contains your API key — **do not push to GitHub**
* **node_modules/** is ignored in `.gitignore`
* For GitHub Pages hosting, you can deploy the **frontend folder only**.
* Backend API must be deployed separately to work online (Heroku, Railway, Render, etc.).

---

## 🎨 Screenshots

*<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/914c0dd2-11fd-417c-bf27-dfb53290f64b" />


---

## 💡 Future Improvements

* Add **multiple language support**
* User authentication for saving history permanently
* Export history as a single PDF or CSV
* Enhance mobile responsiveness and animations

---

## 📄 License

This project is **open-source** and available under the **MIT License**.

---

## 👨‍💻 Author

**Muhammad Saad Saif** 

* GitHub: [M-Saad-saif](https://github.com/M-Saad-saif)
* Email: [saadsaif@example.com](gcsaadsaif123@gmail.com)

---





