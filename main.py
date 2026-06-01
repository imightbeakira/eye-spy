from flask import Flask, request, render_template, send_file
import base64
import os
from datetime import datetime

app = Flask(__name__)

UPLOAD_FOLDER = "captures"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

last_captured = None

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload():
    global last_captured
    try:
        data = request.get_json()
        img_base64 = data['image'].split(',')[1]
        img_bytes = base64.b64decode(img_base64)

        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S_%f")
        filename = f"capture_{timestamp}.jpg"
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        with open(filepath, 'wb') as f:
            f.write(img_bytes)
        
        print(f"[+] Saved: {filepath} ({len(img_bytes)} bytes)")
        last_captured = filename

        return {"success": True, "filename": filename}, 200
    except Exception as e:
        print(f"[-] Error: {e}")
        return {"success": False}, 500

@app.route('/download/<filename>')
def download(filename):
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    if os.path.exists(filepath):
        return send_file(filepath, as_attachment=True, download_name="converted_image.jpg")
    return "File not found", 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)