// Mental Wellness Page JavaScript

// AI Chatbot Configuration
const CHATBOT_CONFIG = {
    // Using Hugging Face's free Inference API for demo
    apiEndpoint: 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium',
    // Fallback to local responses if API fails
    useFallback: true
};

// Predefined wellness responses for demo/fallback
const wellnessResponses = {
    greetings: [
        "Hello! I'm here to support you. How are you feeling today?",
        "Hi there! I'm glad you're here. What's on your mind?",
        "Welcome! I'm here to listen. How can I help you today?"
    ],
    anxiety: [
        "I understand anxiety can be overwhelming. Let's try a breathing exercise together. Take a deep breath in for 4 counts, hold for 4, and exhale for 4. You're doing great.",
        "Anxiety is tough, but you're not alone. Try grounding yourself - name 5 things you can see, 4 you can hear, 3 you can touch, 2 you can smell, and 1 you can taste.",
        "I hear you. When feeling anxious, remember: this feeling is temporary. You've overcome difficult moments before, and you will again. Would you like to try a calming exercise?"
    ],
    stress: [
        "Stress is your body's way of responding to challenges. Let's break things down - what's the most pressing thing on your mind right now?",
        "It sounds like you're dealing with a lot. Remember to take breaks and practice self-care. Even 5 minutes of relaxation can help reset your mind.",
        "Stress can be exhausting. Have you tried the 5-5-5 rule? Breathe in for 5, hold for 5, breathe out for 5. This activates your body's relaxation response."
    ],
    sadness: [
        "I'm sorry you're feeling down. It's okay to not be okay sometimes. Your feelings are valid. Is there something specific that's bothering you?",
        "Sadness is a natural emotion, and it's important to acknowledge it. Remember to be kind to yourself. What usually helps you feel a bit better?",
        "I hear you. During difficult times, try to focus on small, achievable tasks. Each small win can help lift your mood a little. You're stronger than you know."
    ],
    positive: [
        "That's wonderful to hear! What's contributing to these positive feelings? Recognizing what makes us happy is important.",
        "I'm so glad you're feeling good! Keep nurturing that positive energy. What brings you joy?",
        "That's great! Positive moments are worth celebrating. How can I support you in maintaining this feeling?"
    ],
    default: [
        "I'm here to listen. Can you tell me more about how you're feeling?",
        "Thank you for sharing. Your feelings matter. Would you like to talk about it?",
        "I understand. Sometimes it helps just to express what we're going through. I'm listening.",
        "It takes courage to reach out. How can I best support you right now?"
    ],
    encouragement: [
        "You're doing great by taking care of your mental health. That's a brave step! 💕",
        "Remember: You are enough. You are worthy. You are loved. 🌸",
        "One day at a time, one step at a time. You've got this! 💪",
        "Your mental health journey is unique and valid. Be patient with yourself. ✨"
    ],
    techniques: [
        "Try the 4-7-8 breathing technique: Breathe in for 4 counts, hold for 7, exhale for 8. This can help calm your nervous system.",
        "Progressive muscle relaxation can help: Tense each muscle group for 5 seconds, then release. Start from your toes and work up to your head.",
        "Journaling can be therapeutic. Try writing down 3 things you're grateful for today, no matter how small.",
        "Physical movement helps! Even a 5-minute walk or some gentle stretching can boost your mood and reduce stress."
    ]
};

// Chatbot state
let conversationHistory = [];
let isTyping = false;

// Initialize chatbot
document.addEventListener('DOMContentLoaded', function() {
    initializeChatbot();
});

function initializeChatbot() {
    const sendBtn = document.querySelector('.send-btn');
    const chatInput = document.getElementById('chatInput');
    const quickReplies = document.querySelectorAll('.quick-reply');
    
    if (sendBtn && chatInput) {
        sendBtn.addEventListener('click', () => sendMessage());
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Quick reply buttons
    quickReplies.forEach(button => {
        button.addEventListener('click', function() {
            const message = this.textContent.trim();
            sendMessage(message);
            // Hide quick replies after first use
            document.querySelector('.quick-replies').style.display = 'none';
        });
    });
}

function sendMessage(customMessage = null) {
    const chatInput = document.getElementById('chatInput');
    const message = customMessage || chatInput.value.trim();
    
    if (!message || isTyping) return;
    
    // Add user message to chat
    addMessage(message, 'user');
    
    // Clear input
    if (!customMessage) {
        chatInput.value = '';
    }
    
    // Add to conversation history
    conversationHistory.push({ role: 'user', content: message });
    
    // Show typing indicator
    showTypingIndicator();
    
    // Get AI response
    setTimeout(() => {
        getAIResponse(message);
    }, 1000); // Simulate thinking time
}

function addMessage(text, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    if (sender === 'bot') {
        messageDiv.innerHTML = `
            <div class="message-avatar"><i class="fas fa-robot"></i></div>
            <div class="message-content">
                <p>${text}</p>
                <span class="message-time">${time}</span>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${text}</p>
                <span class="message-time">${time}</span>
            </div>
        `;
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
    isTyping = true;
    const chatMessages = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-indicator';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
        <div class="message-avatar"><i class="fas fa-robot"></i></div>
        <div class="message-content">
            <div class="typing-dots">
                <span></span><span></span><span></span>
            </div>
        </div>
    `;
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
    isTyping = false;
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

async function getAIResponse(userMessage) {
    try {
        // For demo purposes, use intelligent keyword-based responses
        // In production, you can integrate with OpenAI, Anthropic, or other APIs
        const response = generateWellnessResponse(userMessage);
        
        removeTypingIndicator();
        addMessage(response, 'bot');
        
        // Add to conversation history
        conversationHistory.push({ role: 'assistant', content: response });
        
        // Occasionally add encouraging messages
        if (conversationHistory.length % 4 === 0) {
            setTimeout(() => {
                const encouragement = getRandomResponse(wellnessResponses.encouragement);
                addMessage(encouragement, 'bot');
            }, 2000);
        }
        
    } catch (error) {
        console.error('Error getting AI response:', error);
        removeTypingIndicator();
        const fallbackResponse = "I'm here for you. Could you tell me more about how you're feeling?";
        addMessage(fallbackResponse, 'bot');
    }
}

function generateWellnessResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Keyword detection for different emotional states
    const keywords = {
        anxiety: ['anxious', 'anxiety', 'worried', 'nervous', 'panic', 'scared', 'fear'],
        stress: ['stressed', 'stress', 'overwhelmed', 'pressure', 'tired', 'exhausted', 'burnout'],
        sadness: ['sad', 'depressed', 'down', 'lonely', 'hopeless', 'crying', 'upset', 'hurt'],
        positive: ['good', 'great', 'happy', 'better', 'fine', 'well', 'okay', 'nice', 'wonderful'],
        help: ['help', 'technique', 'tip', 'advice', 'what can', 'how to', 'suggest'],
        gratitude: ['thank', 'thanks', 'grateful', 'appreciate']
    };
    
    // Check for keywords
    for (const [emotion, words] of Object.entries(keywords)) {
        if (words.some(word => lowerMessage.includes(word))) {
            if (emotion === 'help' || emotion === 'gratitude') {
                if (emotion === 'gratitude') {
                    return "You're welcome! I'm here whenever you need support. Remember, taking care of your mental health is a sign of strength. 💕";
                }
                return getRandomResponse(wellnessResponses.techniques);
            }
            return getRandomResponse(wellnessResponses[emotion]);
        }
    }
    
    // Check for greetings
    if (/^(hi|hello|hey|good morning|good evening)/.test(lowerMessage)) {
        return getRandomResponse(wellnessResponses.greetings);
    }
    
    // Default empathetic response
    return getRandomResponse(wellnessResponses.default);
}

function getRandomResponse(responseArray) {
    return responseArray[Math.floor(Math.random() * responseArray.length)];
}

// Breathing Exercise
let breathingInterval;
let isBreathing = false;

function startBreathing() {
    const breathCircle = document.getElementById('breathCircle');
    const breathText = document.getElementById('breathText');
    
    if (!breathCircle || !breathText) return;
    
    if (isBreathing) {
        stopBreathing();
        return;
    }
    
    isBreathing = true;
    let phase = 0;
    const phases = ['Breathe In', 'Hold', 'Breathe Out', 'Hold'];
    const durations = [4000, 2000, 4000, 2000]; // milliseconds
    
    function breatheCycle() {
        breathText.textContent = phases[phase];
        
        if (phases[phase] === 'Breathe In') {
            breathCircle.style.transform = 'scale(1.3)';
        } else if (phases[phase] === 'Breathe Out') {
            breathCircle.style.transform = 'scale(1)';
        }
        
        setTimeout(() => {
            phase = (phase + 1) % phases.length;
            if (isBreathing) {
                breatheCycle();
            }
        }, durations[phase]);
    }
    
    breatheCycle();
}

function stopBreathing() {
    isBreathing = false;
    const breathCircle = document.getElementById('breathCircle');
    const breathText = document.getElementById('breathText');
    
    if (breathCircle) breathCircle.style.transform = 'scale(1)';
    if (breathText) breathText.textContent = 'Breathe In';
}

// Journal Prompts
const journalPrompts = [
    "What made you smile today?",
    "What are three things you're grateful for?",
    "How did you take care of yourself today?",
    "What challenge did you overcome this week?",
    "Who made a positive impact on you recently?",
    "What's something new you learned about yourself?",
    "Describe a moment when you felt truly at peace.",
    "What's one thing you're looking forward to?",
    "How have you grown in the past month?",
    "What would you tell your younger self?"
];

function newPrompt() {
    const promptElement = document.getElementById('journalPrompt');
    if (promptElement) {
        const randomPrompt = journalPrompts[Math.floor(Math.random() * journalPrompts.length)];
        promptElement.textContent = `"${randomPrompt}"`;
        
        // Add animation
        promptElement.style.opacity = '0';
        setTimeout(() => {
            promptElement.style.transition = 'opacity 0.5s ease';
            promptElement.style.opacity = '1';
        }, 100);
    }
}

// Chatbot Functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    const sendBtn = document.querySelector('.send-btn');
    
    if (chatInput && sendBtn) {
        // Send message on button click
        sendBtn.addEventListener('click', sendMessage);
        
        // Send message on Enter key
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message === '') return;
        
        // Add user message
        addMessage(message, 'user');
        chatInput.value = '';
        
        // Simulate AI response
        setTimeout(() => {
            const response = generateAIResponse(message);
            addMessage(response, 'bot');
        }, 1000);
    }
    
    function addMessage(text, sender) {
        if (!chatMessages) return;
        
        // Remove quick replies if they exist
        const quickReplies = chatMessages.querySelector('.quick-replies');
        if (quickReplies) {
            quickReplies.remove();
        }
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        if (sender === 'bot') {
            const avatar = document.createElement('div');
            avatar.className = 'message-avatar';
            avatar.innerHTML = '<i class="fas fa-robot"></i>';
            messageDiv.appendChild(avatar);
        }
        
        const content = document.createElement('div');
        content.className = 'message-content';
        
        const p = document.createElement('p');
        p.textContent = text;
        content.appendChild(p);
        
        const time = document.createElement('span');
        time.className = 'message-time';
        time.textContent = 'Just now';
        content.appendChild(time);
        
        messageDiv.appendChild(content);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function generateAIResponse(userMessage) {
        const responses = {
            'good': "That's wonderful to hear! It's important to acknowledge and celebrate when we're feeling good. What contributed to your positive mood today?",
            'down': "I'm sorry you're feeling down. It's okay to have difficult days. Would you like to talk about what's on your mind, or would you prefer some coping strategies?",
            'anxious': "Anxiety can be really challenging. Let's try a quick breathing exercise together. Would that help? Or we could talk through what's making you feel anxious.",
            'stressed': "Stress is a common experience, especially with everything you manage. Have you taken any time for self-care today? Even 5 minutes can make a difference.",
            'default': "Thank you for sharing that with me. I'm here to listen and support you. How can I help you feel better today?"
        };
        
        const lowerMessage = userMessage.toLowerCase();
        
        if (lowerMessage.includes('good') || lowerMessage.includes('happy') || lowerMessage.includes('great')) {
            return responses.good;
        } else if (lowerMessage.includes('sad') || lowerMessage.includes('down') || lowerMessage.includes('depressed')) {
            return responses.down;
        } else if (lowerMessage.includes('anxious') || lowerMessage.includes('worried') || lowerMessage.includes('nervous')) {
            return responses.anxious;
        } else if (lowerMessage.includes('stress') || lowerMessage.includes('overwhelm')) {
            return responses.stressed;
        } else {
            return responses.default;
        }
    }
    
    // Quick reply buttons
    const quickReplyButtons = document.querySelectorAll('.quick-reply');
    quickReplyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const feeling = this.textContent.split(' ')[1].toLowerCase();
            chatInput.value = `I'm feeling ${feeling}`;
            sendMessage();
        });
    });
});

// Meditation Audio Controls (placeholder)
const meditationItems = document.querySelectorAll('.meditation-item');
meditationItems.forEach(item => {
    item.addEventListener('click', function() {
        const meditationType = this.textContent.trim().split('\n')[0];
        showSuccessMessage(`Starting ${meditationType}...`);
        // Here you would implement actual audio playback
    });
});

// Mood Tracker
const moodOptions = document.querySelectorAll('.mood-option');
moodOptions.forEach(option => {
    option.addEventListener('click', function() {
        const mood = this.textContent;
        
        // Visual feedback
        moodOptions.forEach(opt => opt.style.transform = 'scale(1)');
        this.style.transform = 'scale(1.3)';
        this.style.transition = 'transform 0.3s ease';
        
        // Save mood (in real app, this would save to database)
        saveMood(mood);
        showSuccessMessage('Mood logged successfully!');
    });
});

function saveMood(mood) {
    const today = new Date().toISOString().split('T')[0];
    const moods = JSON.parse(localStorage.getItem('moods') || '{}');
    moods[today] = mood;
    localStorage.setItem('moods', JSON.stringify(moods));
}

// Helper function from main script
function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.textContent = message;
    successDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #6366F1, #8B5CF6);
        color: white;
        padding: 16px 24px;
        border-radius: 6px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => successDiv.remove(), 300);
    }, 3000);
}

console.log('Mental Wellness features loaded!');
