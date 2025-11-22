const history = [];

document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    let btn = document.getElementById("themeToggle");
    btn.innerText = document.body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
});

async function generate() {
    const text = document.getElementById("inputText").value;
    const action = document.getElementById("action").value;
    const speedEl = document.getElementById("speed");
    const speed = speedEl ? Number(speedEl.value) || 2 : 2;

    if (!text) { alert("Please enter a paragraph!"); return; }

    const outputDiv = document.getElementById("output");
    outputDiv.innerText = "";

    try {
        const response = await fetch("http://ai-para-assistant.onrender.com/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text, action })
        });
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
        await new Promise(r => setTimeout(r, delay));
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

    if (!output) { alert("Nothing to download!"); return; }

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

function addToHistory(text, action, result) {
    history.unshift({ text, action, result });
    if (history.length > 10) history.pop();
    renderHistory();
}

function renderHistory() {
    const list = document.getElementById("historyList");
    list.innerHTML = "";
    history.forEach((item) => {
        const li = document.createElement("li");
        li.innerText = `${item.action}: ${item.text.substring(0, 30)}...`;
        li.onclick = () => {
            document.getElementById("inputText").value = item.text;
            document.getElementById("action").value = item.action;
            document.getElementById("output").innerText = item.result;
        };
        list.appendChild(li);
    });
}
