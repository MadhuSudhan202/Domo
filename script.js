const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');

let recognition;
let isRecognizing = false;

// Initialize Speech Recognition
function initializeRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            userInput.value = transcript;
            sendMessage();
        };
        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
        };
        recognition.onend = () => {
            isRecognizing = false;
        };
    } else {
        alert('Speech Recognition API is not supported in this browser.');
    }
}

function startRecognition() {
    if (!recognition) {
        initializeRecognition();
    }
    if (!isRecognizing) {
        recognition.start();
        isRecognizing = true;
    }
}

function stopRecognition() {
    if (recognition && isRecognizing) {
        recognition.stop();
        isRecognizing = false;
    }
}

function sendMessage() {
    const message = userInput.value.trim();
    if (message === '') return;

    // Display user message
    chatBox.innerHTML += `<div class="user-message">${message}</div>`;

    // Simulate AI response
    setTimeout(() => {
        const aiResponse = getAIResponse(message);
        chatBox.innerHTML += `<div class="ai-response">${aiResponse}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom

        // Speak the AI response
        speak(aiResponse);
    }, 500);

    userInput.value = '';
}

function getAIResponse(userMessage) {
    // Convert the user message to lowercase for case-insensitive comparison
    const query = userMessage.toLowerCase();

    // Define responses for specific keywords and questions
    if (query.includes('hello')) {
        return 'Hi there! How can I assist you today?';
    } else if (query.includes('bye')) {
        return 'Goodbye! Have a great day!';
    } else if (query.includes('html')) {
        return 'HTML (HyperText Markup Language) is the standard language for creating web pages and web applications. It describes the structure of web pages using markup. HTML elements form the building blocks of HTML pages, and they include tags such as <div>, <p>, <a>, and <img>. If you have specific questions about HTML, feel free to ask!';
    } else if (query.includes('css')) {
        return 'CSS (Cascading Style Sheets) is used to style and layout web pages. It controls the look and feel of a website, including layout, colors, and fonts. CSS can be applied directly within HTML tags, in the head section of an HTML document, or through external stylesheets.';
    } else if (query.includes('javascript')) {
        return 'JavaScript is a versatile programming language commonly used in web development. It allows you to create dynamic and interactive web pages. JavaScript can manipulate HTML and CSS, respond to user events, and interact with servers through AJAX and fetch API.';
    } else if (query.includes('react')) {
        return 'React is a JavaScript library for building user interfaces, particularly single-page applications where you need a fast and interactive user experience. It allows developers to create reusable UI components and manage the state of their applications efficiently.';
    } else if (query.includes('what is your name')) {
        return 'I am your friendly AI chatbot. How can I assist you today?';
    } else if (query.includes('who created you')) {
        return 'I was created by the team at OpenAI. If you have any questions about my capabilities or how I can assist you, feel free to ask!';
    } else if (query.includes('help')) {
        return 'I am here to help with any questions you have about web development or general inquiries. You can ask me about HTML, CSS, JavaScript, React, and more.';
    } else {
        return 'I am not sure how to respond to that. If you have a specific question or need assistance with something, please let me know!';
    }
}


// Speech Synthesis
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
}
