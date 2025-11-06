// Main JavaScript for Naari Care Website

// Create Scroll Progress Indicator
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.prepend(progressBar);

// Update scroll progress
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    progressBar.style.transform = `scaleX(${scrollPercentage / 100})`;
});

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS with custom settings
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100,
            delay: 100,
            disable: 'mobile'
        });
        
        // Refresh AOS on dynamic content changes
        setTimeout(() => AOS.refresh(), 500);
    }
    
    // Page transition effect
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
    });
});

// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    
    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.toggle('dark-mode', currentTheme === 'dark');
    updateThemeIcon(currentTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
            localStorage.setItem('theme', theme);
            updateThemeIcon(theme);
        });
    }
    
    function updateThemeIcon(theme) {
        if (themeToggle) {
            themeToggle.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        }
    }
});

// Smooth Scroll for Navigation Links with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Scroll Effect with advanced transitions
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
        navbar.style.backdropFilter = 'none';
        navbar.style.backgroundColor = 'var(--card-bg)';
    }
    
    // Hide navbar on scroll down, show on scroll up
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Animation on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.card, .feature-card, .testimonial-card, .activity-card, .article-card, .nutrition-card');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// Button Click Effects
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple effect styles dynamically
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Mobile Menu Toggle (for future implementation)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Form Validation Helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Success Message Display
function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
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

// Add animation styles
const animationStyle = document.createElement('style');
animationStyle.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(animationStyle);

// Quick Replies for Chatbot
if (document.querySelectorAll('.quick-reply').length > 0) {
    document.querySelectorAll('.quick-reply').forEach(button => {
        button.addEventListener('click', function() {
            const message = this.textContent;
            console.log('Quick reply clicked:', message);
            // Here you would implement actual chatbot interaction
            showSuccessMessage('Message sent to Naari AI!');
        });
    });
}

// CTA Button Actions
document.querySelectorAll('.btn-primary, .btn-login').forEach(button => {
    if (button.textContent.includes('Get Started') || 
        button.textContent.includes('Download App') || 
        button.textContent.includes('Login')) {
        button.addEventListener('click', function(e) {
            if (!this.getAttribute('type') || this.getAttribute('type') !== 'submit') {
                e.preventDefault();
                showSuccessMessage('Coming soon! Stay tuned for our app launch.');
            }
        });
    }
});

console.log('Naari Care website loaded successfully!');

// Reveal on Scroll for elements
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// Parallax effect for backgrounds
window.addEventListener('scroll', function() {
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    parallaxElements.forEach(el => {
        const speed = el.dataset.speed || 0.5;
        const yPos = -(window.pageYOffset * speed);
        el.style.backgroundPosition = `center ${yPos}px`;
    });
});

// Add stagger animation classes to cards
document.addEventListener('DOMContentLoaded', function() {
    const cardContainers = document.querySelectorAll('.feature-cards, .cards-grid, .team-grid, .articles-grid');
    cardContainers.forEach(container => {
        const cards = container.children;
        Array.from(cards).forEach((card, index) => {
            card.classList.add('stagger-item');
            card.style.animationDelay = `${index * 0.1}s`;
        });
    });
});

// ===================================
// MODAL FUNCTIONALITY
// ===================================

// Modal Management
const modalManager = {
    communityModal: null,
    loginModal: null,
    downloadModal: null,
    
    init() {
        this.communityModal = document.getElementById('communityModal');
        this.loginModal = document.getElementById('loginModal');
        this.downloadModal = document.getElementById('downloadModal');
        
        // Setup button event listeners
        this.setupButtons();
        
        // Setup close buttons
        this.setupCloseButtons();
        
        // Close on outside click
        this.setupOutsideClick();
        
        // Setup community chat functionality
        this.setupCommunityChat();
    },
    
    setupButtons() {
        // Get Started button -> Login Modal
        const getStartedBtn = document.querySelector('.hero-buttons .btn-primary');
        if (getStartedBtn) {
            getStartedBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.openModal(this.loginModal);
            });
        }
        
        // Learn More button -> Smooth scroll to features
        const learnMoreBtn = document.querySelector('.hero-buttons .btn-outline');
        if (learnMoreBtn) {
            learnMoreBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const featuresSection = document.getElementById('features');
                if (featuresSection) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = featuresSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        }
        
        // Login / Sign Up button in navbar -> Login Modal
        const loginBtn = document.querySelector('.btn-login');
        if (loginBtn) {
            loginBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.openModal(this.loginModal);
            });
        }
        
        // Join Community button -> Community Modal
        const joinCommunityBtns = document.querySelectorAll('.btn-primary');
        joinCommunityBtns.forEach(btn => {
            if (btn.textContent.trim() === 'Join Community') {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.openModal(this.communityModal);
                    this.loadCommunityMessages('general');
                });
            }
        });
        
        // Download App button -> Download Modal
        const downloadBtns = document.querySelectorAll('.btn-outline');
        downloadBtns.forEach(btn => {
            if (btn.textContent.trim() === 'Download App') {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.openModal(this.downloadModal);
                });
            }
        });
    },
    
    setupCloseButtons() {
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', () => {
                this.closeAllModals();
            });
        });
    },
    
    setupOutsideClick() {
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeAllModals();
            }
        });
    },
    
    openModal(modal) {
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    },
    
    closeAllModals() {
        [this.communityModal, this.loginModal, this.downloadModal].forEach(modal => {
            if (modal) {
                modal.classList.remove('active');
            }
        });
        document.body.style.overflow = '';
    },
    
    setupCommunityChat() {
        // Tab switching
        const tabs = document.querySelectorAll('.community-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const channel = tab.dataset.channel;
                this.loadCommunityMessages(channel);
            });
        });
        
        // Send message functionality
        const sendBtn = document.getElementById('sendMessage');
        const chatInput = document.getElementById('chatInput');
        
        if (sendBtn && chatInput) {
            const sendMessage = () => {
                const message = chatInput.value.trim();
                if (message) {
                    this.addChatMessage('You', message, true);
                    chatInput.value = '';
                    
                    // Simulate a response after 1 second
                    setTimeout(() => {
                        const responses = [
                            "That's a great point! Thanks for sharing.",
                            "I completely agree with you!",
                            "Thanks for your input! Very helpful.",
                            "Interesting perspective! 💕"
                        ];
                        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                        this.addChatMessage('Community Member', randomResponse, false);
                    }, 1000);
                }
            };
            
            sendBtn.addEventListener('click', sendMessage);
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        }
    },
    
    loadCommunityMessages(channel) {
        const messagesContainer = document.getElementById('chatMessages');
        if (!messagesContainer) return;
        
        messagesContainer.innerHTML = '';
        
        const demoMessages = {
            general: [
                { name: 'Priya Sharma', message: 'Hello everyone! New to this community. Excited to be here! 💕', time: '10:30 AM' },
                { name: 'Ananya Patel', message: 'Welcome! This is such a supportive space. Feel free to ask anything.', time: '10:32 AM' },
                { name: 'Sana Khan', message: 'I just started my wellness journey and this app has been amazing!', time: '10:45 AM' },
                { name: 'Riya Verma', message: 'Does anyone have tips for managing stress? Having a tough week 😔', time: '11:00 AM' },
                { name: 'Neha Gupta', message: 'Meditation and deep breathing really help me! Try the guided sessions in the app.', time: '11:05 AM' }
            ],
            pregnancy: [
                { name: 'Meera Reddy', message: 'I\'m in my second trimester and experiencing back pain. Any suggestions?', time: '9:15 AM' },
                { name: 'Dr. Anjali', message: 'Prenatal yoga can be very helpful! Check with your doctor first though.', time: '9:20 AM' },
                { name: 'Kavya Singh', message: 'Swimming helped me a lot during pregnancy! Very gentle on the body.', time: '9:30 AM' },
                { name: 'Pooja Jain', message: 'Make sure to use a pregnancy pillow for better sleep. Game changer! 🤰', time: '9:45 AM' }
            ],
            wellness: [
                { name: 'Simran Kaur', message: 'Just completed a 30-day meditation challenge! Feeling amazing ✨', time: '8:00 AM' },
                { name: 'Tanvi Shah', message: 'That\'s inspiring! I want to start too. Any beginner tips?', time: '8:15 AM' },
                { name: 'Diya Mehta', message: 'Start with just 5 minutes a day. The app has great beginner sessions!', time: '8:20 AM' },
                { name: 'Aisha Rahman', message: 'Also, don\'t be hard on yourself if you miss a day. It\'s about progress not perfection 💪', time: '8:25 AM' }
            ]
        };
        
        const messages = demoMessages[channel] || demoMessages.general;
        messages.forEach(msg => {
            this.addChatMessage(msg.name, msg.message, false, msg.time);
        });
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    },
    
    addChatMessage(name, message, isOwn = false, time = null) {
        const messagesContainer = document.getElementById('chatMessages');
        if (!messagesContainer) return;
        
        const displayTime = time || new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2);
        
        const messageHTML = `
            <div class="chat-message">
                <div class="message-header">
                    <div class="message-avatar">${initials}</div>
                    <span class="message-name">${name}</span>
                    <span class="message-time">${displayTime}</span>
                </div>
                <div class="message-text ${isOwn ? 'own-message' : ''}">${message}</div>
            </div>
        `;
        
        messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
};

// Initialize modals when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    modalManager.init();
});

// Login Form Submission
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            if (validateEmail(email) && password.length >= 6) {
                showSuccessMessage('Login feature coming soon! Stay tuned for our app launch.');
                modalManager.closeAllModals();
                loginForm.reset();
            } else {
                showSuccessMessage('Please enter valid credentials (password min 6 characters)');
            }
        });
    }
});

// Download Notification Form
document.addEventListener('DOMContentLoaded', () => {
    const notifyForm = document.getElementById('notifyForm');
    if (notifyForm) {
        notifyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('notifyEmail').value;
            
            if (validateEmail(email)) {
                showSuccessMessage('Thank you! We\'ll notify you when the app launches. 🎉');
                notifyForm.reset();
            } else {
                showSuccessMessage('Please enter a valid email address');
            }
        });
    }
});
