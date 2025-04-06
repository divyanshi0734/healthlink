document.addEventListener('DOMContentLoaded', () => {
    const chatbotLog = document.getElementById('chatbot-log');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');

    // Sample FAQ data (replace with more comprehensive data)
    const faqData = {
        "What are your hours?": "Our charitable clinic is open Monday-Friday, 9am-5pm.",
        "Where are you located?": "We are located at 123 Main Street, Anytown.",
        "How can I get financial assistance?": "Please contact one of the NGOs listed on our site for financial assistance.",
        "What services do you offer?": "We offer general health checkups, vaccinations, and basic medical care.",
        "How do I make an appointment?": "You can call us at 555-123-4567 to make an appointment."
    };

    function addMessage(message, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chatbot-message');
        messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
        messageDiv.textContent = message;
        chatbotLog.appendChild(messageDiv);

        // Scroll to the bottom of the log
        chatbotLog.scrollTop = chatbotLog.scrollHeight;
    }

    function getBotResponse(message) {
        message = message.trim(); //remove whitespace
        if (!message) return "Please enter a question."; //Handle empty input

        // Simple FAQ-based response
        if (faqData[message]) {
            return faqData[message];
        } else {
            return "I'm sorry, I don't have an answer to that question. Please try rephrasing it or contact us directly.";
        }
    }

    chatbotSend.addEventListener('click', () => {
        const message = chatbotInput.value;
        if (message) {
            addMessage(message, true); // User message
            const response = getBotResponse(message);
            addMessage(response, false); // Bot response
            chatbotInput.value = ''; // Clear the input
        }
    });

    chatbotInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            chatbotSend.click();
        }
    });

    // Initial bot message
    addMessage("Hi! How can I help you today?", false);
});