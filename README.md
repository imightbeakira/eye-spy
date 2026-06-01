# 👁️ Eye Spy

> An educational red-team project demonstrating how deceptive web interfaces can abuse browser permissions and user trust.

Built with Python, Flask, JavaScript, and Ngrok.

---

## ⚠️ Educational Purpose Only

Eye Spy is designed strictly for:

- 🔴 Red team demonstrations
- 🛡️ Security awareness training
- 🎭 Social engineering education
- 🌐 Browser permission research
- 🧪 Ethical cybersecurity labs

This project helps demonstrate how seemingly harmless websites can manipulate users into granting camera access.

---

# 📖 Overview

Eye Spy disguises itself as a fake **PNG → JPEG converter** while internally:

1. Requesting webcam permissions
2. Capturing a frame from the victim's camera
3. Encoding the image as Base64
4. Uploading it to a Flask backend
5. Saving the captured image locally

---

# ✨ Features

- 🎨 Fake file-converter themed UI
- 📷 Browser webcam permission requests
- ⚡ Automatic frame capture
- 📦 Base64 image transfer
- 🐍 Flask upload endpoint
- 💾 Local image storage

---

# 🧠 Educational Concepts Demonstrated

This project showcases techniques commonly used in phishing kits and malicious landing pages:

- 🎭 Misleading UI/UX design
- 🔐 Browser permission abuse
- 🤝 User trust exploitation
- 🌐 Client/server exfiltration workflow
- 📸 Webcam capture mechanics

---

# 🛠️ Technologies Used

## Frontend
- HTML
- CSS3
- JavaScript

## Backend
- Python
- Flask

## Tunneling
- Ngrok

---

# 📂 Project Structure

```bash
project/
│
├── main.py
├── templates/
│   └── index.html
├── captures/
│   └── captured webcam images
├── requirements.txt
└── README.md
```

---

# 🚀 Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/eye-spy.git
cd eye-spy
```

---

## 2️⃣ Install Dependencies

```bash
pip install flask
```

Or:

```bash
pip install -r requirements.txt
```

---

# ▶️ Running The Project

Start Flask server:

```bash
python main.py
```

Flask will run on:

```bash
http://127.0.0.1:5000
```

---

# 🌍 Exposing With Ngrok

Start Ngrok:

```bash
ngrok http 5000
```

Example output:

```bash
Forwarding https://random-id.ngrok-free.app -> http://localhost:5000
```

Send the generated HTTPS URL to your test environment or lab participants.

---

# ⚙️ How It Works

1. Victim opens webpage
2. Fake converter UI encourages interaction
3. Browser requests webcam permission
4. Hidden `<video>` element receives camera stream
5. Canvas captures a frame silently
6. Image gets uploaded to Flask backend
7. Server stores image inside `/captures`


---

# ⚠️ Ethical Usage Warning

This tool must ONLY be used for:

- Authorized testing
- Educational demonstrations
- Controlled lab environments
- Ethical security research

Unauthorized usage against individuals or organizations without explicit permission may violate:

- Privacy laws
- Computer misuse laws
- Platform policies
- Ethical security standards

The author assumes no responsibility for misuse.

---

# 📜 Disclaimer

This repository is provided strictly for educational and authorized security research purposes.

Do NOT deploy publicly or use against targets without explicit written permission.
