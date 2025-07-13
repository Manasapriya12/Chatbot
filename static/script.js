document.addEventListener('DOMContentLoaded', () => {
    const chatHistory = document.getElementById('chat-history');
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const newChatBtn = document.getElementById('new-chat-btn');
    const deleteChatBtn = document.getElementById('delete-chat-btn');
    const toggleBtn = document.getElementById('toggle-mode');
    const replySound = document.getElementById('replySound');

    const fileInput = document.getElementById('file-upload');
    const cameraInput = document.getElementById('camera-upload');
    const scanBtn = document.getElementById('scan-btn');
    const chatList = document.getElementById('chat-list'); // Optional: Sidebar chat history

    // Load previous chat history
    fetch('/history')
        .then(res => res.json())
        .then(history => {
            history.forEach(msg => addMessage(msg.role, msg.content));
            chatHistory.scrollTop = chatHistory.scrollHeight;
        });

    // Handle chat form submission
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const message = userInput.value.trim();
        if (!message) return;

        addMessage('user', message);
        userInput.value = '';
        chatHistory.scrollTop = chatHistory.scrollHeight;

        const loadingMsg = addMessage('assistant', 'AI is typing...');
        chatHistory.scrollTop = chatHistory.scrollHeight;

        try {
            const res = await fetch('/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message })
            });
            const data = await res.json();
            await typeText(loadingMsg.querySelector('.message-content'), data.response);

            // Only play if user interaction has occurred
            if (replySound) replySound.play();
        } catch (err) {
            loadingMsg.querySelector('.message-content').textContent = "Sorry, something went wrong.";
            console.error("Chat error:", err);
        }

        chatHistory.scrollTop = chatHistory.scrollHeight;
    });

    // Add message block to DOM
    function addMessage(role, content) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${role}`;

        const avatar = document.createElement('div');
        avatar.className = 'avatar';
        avatar.textContent = role === 'user' ? 'You' : 'AI';

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = content;

        msgDiv.appendChild(avatar);
        msgDiv.appendChild(contentDiv);
        chatHistory.appendChild(msgDiv);
        return msgDiv;
    }

    // Animate AI typing
    async function typeText(element, text) {
        element.textContent = '';
        for (let i = 0; i < text.length; i++) {
            element.textContent += text[i];
            await new Promise(resolve => setTimeout(resolve, 15));
        }
    }

    // Clear chat history (in memory)
    newChatBtn.addEventListener('click', async () => {
        await fetch('/clear_history', { method: 'POST' });
        chatHistory.innerHTML = '';
    });

    // Delete chat (server + session)
    deleteChatBtn.addEventListener('click', async () => {
        await fetch('/delete_chat', { method: 'POST' });
        chatHistory.innerHTML = '';
    });

    // Toggle Dark/Light mode
    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        toggleBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    });

    // Handle file upload (image/doc)
    if (fileInput) {
        fileInput.addEventListener('change', () => {
            const file = fileInput.files[0];
            if (file) {
                addMessage('user', `📎 File uploaded: ${file.name}`);
                // You can send file to backend here (e.g., via FormData)
            }
        });
    }

    // Handle camera capture
    if (cameraInput) {
        cameraInput.addEventListener('change', () => {
            const file = cameraInput.files[0];
            if (file) {
                addMessage('user', `📸 Captured from camera: ${file.name}`);
                // Optional: preview or upload logic
            }
        });
    }

    // Scan button (placeholder)
    if (scanBtn) {
        scanBtn.addEventListener('click', () => {
            addMessage('user', "🔍 Scan triggered (functionality to be added)");
            // Here, you could add OCR/QR/Barcode scanner integration
        });
    }
});
