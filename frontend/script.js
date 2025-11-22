const history = [];

document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  let btn = document.getElementById("themeToggle");
  btn.innerText = document.body.classList.contains("dark-mode")
    ? "☀️ Light Mode"
    : "🌙 Dark Mode";
});

async function generate() {
  const text = document.getElementById("inputText").value;
  const action = document.getElementById("action").value;
  const speedEl = document.getElementById("speed");
  const speed = speedEl ? Number(speedEl.value) || 2 : 2;

  if (!text) {
    alert("Please enter a paragraph!");
    return;
  }

  const outputDiv = document.getElementById("output");
  outputDiv.innerText = "";

  try {
    const response = await fetch(
      "https://ai-para-assistant.onrender.com/generate",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, action }),
      }
    );
    const data = await response.json();
    const result = data.result || data.error || "";
    
    outputDiv.innerText = "";
    await typeWriter(result, outputDiv, speed);

    addToHistory(text, action, result);
  } catch (err) {
    outputDiv.innerText = "Error: " + err.message;
  }
}

async function typeWriter(text, element, speed = 2) {
  const delay = Math.max(1, Number(speed) || 2);
  for (let i = 0; i < text.length; i++) {
    element.innerText += text.charAt(i);
    await new Promise((r) => setTimeout(r, delay));
  }
}

function copyOutput() {
  const output = document.getElementById("output").innerText;
  if (output) {
    navigator.clipboard.writeText(output);
    alert("Output copied to clipboard!");
  }
}

function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const output = document.getElementById("output").innerText;

  if (!output) {
    alert("Nothing to download!");
    return;
  }

  const title = document.getElementById("action").value.toUpperCase();
  const date = new Date().toLocaleString();

  doc.setFontSize(16);
  doc.text(title, 10, 10);
  doc.setFontSize(12);
  doc.text("Generated on: " + date, 10, 18);

  const splitText = doc.splitTextToSize(output, 180);
  doc.text(splitText, 10, 30);
  doc.save("AI_Output.pdf");
}

function handleHistoryPlacement() {
  if (!originalHistorySection || !historyNav || !mainEl) return;
  const w = window.innerWidth;
  const inRange = w >= 300 && w <= 700;
  const historyCard = historyNav.querySelector(".history-card");

  if (inRange && historyCard && originalHistorySection.parentElement !== historyCard) {
    originalHistorySection.classList.remove("moved-to-nav");
    originalHistorySection.classList.add("in-nav");
    historyCard.appendChild(originalHistorySection); // move it into nav (do not hide)
  } else if (!inRange && originalHistorySection.parentElement !== mainEl) {
    originalHistorySection.classList.remove("in-nav");
    mainEl.appendChild(originalHistorySection); // move it back
    closeNav();
  }
}

function addToHistory(text, action, result) {
  history.unshift({ text, action, result });
  if (history.length > 10) history.pop();
  renderHistory(); // ensure UI updates after changes
}

function renderHistory() {
  const list = document.getElementById("historyList");
  if (!list) return;
  list.innerHTML = "";
  history.forEach((item) => {
    const li = document.createElement("li");
    li.tabIndex = 0;
    li.innerText = `${item.action}: ${item.text.substring(0, 30)}...`;
    li.onclick = () => {
      document.getElementById("inputText").value = item.text;
      document.getElementById("action").value = item.action;
      document.getElementById("output").innerText = item.result;
      if (historyNav && historyNav.classList.contains("open")) closeNav();
    };
    list.appendChild(li);
  });
}

// safe DOM refs
const historyToggle = document.getElementById("historyToggle");
const historyNav = document.getElementById("historyNav");
const navOverlay = document.getElementById("navOverlay");
const historyClose = document.getElementById("historyClose");
const mainEl = document.querySelector("main");
const originalHistorySection = document.querySelector(".history-section");

// open/close helpers
function openNav() {
  if (!historyNav || !navOverlay) return;
  historyNav.classList.add("open");
  navOverlay.classList.add("visible");
  historyNav.setAttribute("aria-hidden", "false");
  historyToggle && historyToggle.setAttribute("aria-expanded", "true");
}
function closeNav() {
  if (!historyNav || !navOverlay) return;
  historyNav.classList.remove("open");
  navOverlay.classList.remove("visible");
  historyNav.setAttribute("aria-hidden", "true");
  historyToggle && historyToggle.setAttribute("aria-expanded", "false");
}

// toggle listeners (guarded)
historyToggle && historyToggle.addEventListener("click", () => {
  if (!historyNav) return;
  historyNav.classList.contains("open") ? closeNav() : openNav();
});
historyClose && historyClose.addEventListener("click", closeNav);
navOverlay && navOverlay.addEventListener("click", closeNav);

// run on load and resize
window.addEventListener("resize", handleHistoryPlacement);
window.addEventListener("load", () => {
  handleHistoryPlacement();
  renderHistory();
});