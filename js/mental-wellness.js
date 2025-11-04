// Mental Wellness Page JavaScript

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
