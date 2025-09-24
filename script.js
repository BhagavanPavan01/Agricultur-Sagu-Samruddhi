document.addEventListener('DOMContentLoaded', function () {
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');

    let responses = {}; // This will store our responses from JSON

    // Function to load responses from JSON file
    async function loadResponses() {
        try {
            const response = await fetch('responses.json');
            if (!response.ok) {
                throw new Error('Failed to load responses');
            }
            responses = await response.json();
            console.log('Responses loaded successfully');
        } catch (error) {
            console.error('Error loading response data:', error);
            // Fallback to a minimal set of responses
            responses = {
                'hello': 'నమస్కారం! How can I assist with your farming today?',
                'hi': 'నమస్కారం! How can I assist with your farming today?',
                'weather': 'For weather information, check the latest forecast from IMD. Generally, crops need adequate sunlight and moderate rainfall.',
                'pest': 'For pest control, use organic methods like neem oil spray. Identify the specific pest for targeted solutions.',
                'rice': 'Rice cultivation requires good water management. Use SRI method for better yields.',
                'chili': 'Chili plants need well-drained soil. Watch for fungal diseases during rainy season.',
                'mango': 'Mango trees need proper pruning and nutrient management during flowering season.',
                'scheme': 'Check Rythu Bharosa scheme benefits at local agriculture office.',
                'soil': 'Get your soil tested for proper nutrient management.',
                'default': 'I am still learning about that topic. For specific advice, please contact your local Rythu Bharosa Kendra.'
            };
        }
    }

    // Function to add message to chat
    function addMessage(message, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = message;

        messageDiv.appendChild(contentDiv);
        chatMessages.appendChild(messageDiv);

        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Function to get bot response with improved matching
    function getResponse(input) {
        input = input.toLowerCase().trim();

        // 1. First check for exact matches
        if (responses[input]) {
            return responses[input];
        }

        // 2. Check for partial matches in keywords
        const inputWords = input.split(/\s+/);

        // Create a score for each response key
        const scoredMatches = [];

        for (const [key, response] of Object.entries(responses)) {
            if (key === 'default') continue;

            const keyWords = key.toLowerCase().split(/\s+/);
            let score = 0;

            // Calculate match score
            for (const inputWord of inputWords) {
                for (const keyWord of keyWords) {
                    if (keyWord.includes(inputWord) || inputWord.includes(keyWord)) {
                        score++;
                        break;
                    }
                }
            }

            if (score > 0) {
                scoredMatches.push({ key, score, response });
            }
        }

        // 3. Return the best match if we have one
        if (scoredMatches.length > 0) {
            // Sort by score (highest first)
            scoredMatches.sort((a, b) => b.score - a.score);
            return scoredMatches[0].response;
        }

        // 4. Check for specific Telugu keywords if no English match found
        const teluguKeywords = {
            'వాతావరణ': 'weather',
            'కీటకాలు': 'pest',
            'వడ్లు': 'rice',
            'మిర్చి': 'chili',
            'మామిడి': 'mango',
            'పథకం': 'scheme',
            'న ch': 'soil'
        };

        for (const [teluguWord, englishKey] of Object.entries(teluguKeywords)) {
            if (input.includes(teluguWord) && responses[englishKey]) {
                return responses[englishKey];
            }
        }

        // 5. Return default response if no matches found
        return responses['default'] || 'I am still learning about that topic. For specific advice, please contact your local Rythu Bharosa Kendra.';
    }

    // Send message on button click
    sendButton.addEventListener('click', async function () {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, true);
            userInput.value = '';

            // Make sure responses are loaded
            if (Object.keys(responses).length === 0) {
                await loadResponses();
            }

            // Simulate typing delay
            setTimeout(function () {
                const response = getResponse(message);
                addMessage(response, false);
            }, 1000);
        }
    });

    // Send message on Enter key
    userInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendButton.click();
        }
    });

    // Initialize by loading the responses
    loadResponses();

    // Language toggle functionality
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(button => {
        button.addEventListener('click', function () {
            langButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // In a real application, this would change the interface language
            const lang = this.textContent;
            if (lang === 'TE') {
                addMessage('భాష తెలుగుకు మార్చబడింది', false);
            } else {
                addMessage('Language changed to English', false);
            }
        });
    });

    // Mobile menu functionality - CORRECTED VERSION
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function (e) {
            e.stopPropagation();
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');

            // Prevent body scrolling when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnHamburger = mobileMenu.contains(event.target);

            if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // Close menu on window resize
        window.addEventListener('resize', function () {
            if (window.innerWidth > 768) {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Animation for resource cards
    const resourceCards = document.querySelectorAll('.resource-card');

    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Function to handle scroll event
    function checkVisibility() {
        resourceCards.forEach(card => {
            if (isInViewport(card)) {
                card.classList.add('visible');
            }
        });
    }

    // Initial check
    checkVisibility();

    // Check on scroll
    window.addEventListener('scroll', checkVisibility);

    // Add hover effects
    resourceCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px)';
            this.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add welcome message when page loads
    setTimeout(function () {
        if (chatMessages.children.length === 0) {
            addMessage('Welcome! I am Rythu Mitra, your AI farming assistant. How can I help you today?', false);
        }
    }, 500);
});



// ========  Technology section interactive elements


document.addEventListener('DOMContentLoaded', function () {
    // Add animation to tech features on scroll
    const techFeatures = document.querySelectorAll('.tech-feature');

    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    // Set initial state for animation
    techFeatures.forEach(feature => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateY(20px)';
        feature.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        featureObserver.observe(feature);
    });

    // Demo request button functionality
    const demoButton = document.querySelector('.cta-button');
    if (demoButton) {
        demoButton.addEventListener('click', function () {
            // In a real implementation, this would open a contact form/modal
            alert('Thank you for your interest! Our team will contact you shortly to schedule a demo.');

            // Here you would typically open a modal or redirect to a contact form
            // For example: openContactModal();
        });
    }

    // Add hover effects to action steps
    const actionSteps = document.querySelectorAll('.action-step');
    actionSteps.forEach(step => {
        step.addEventListener('mouseenter', function () {
            this.querySelector('.step-number').style.transform = 'scale(1.1)';
        });

        step.addEventListener('mouseleave', function () {
            this.querySelector('.step-number').style.transform = 'scale(1)';
        });
    });
});

// Function to open contact modal (placeholder for future implementation)
function openContactModal() {
    // This would be implemented with a modal library or custom modal code
    console.log('Opening contact modal for demo request');
}



// ==================================  Demo Request Modal Functionality


document.addEventListener('DOMContentLoaded', function() {
  // Get modal and button elements
  const modal = document.getElementById('demoModal');
  const closeBtn = document.querySelector('.close');
  const demoForm = document.getElementById('demoRequestForm');
  const requestDemoBtn = document.getElementById('requestDemoBtn'); // Your button
  
  // Open modal when Request Demo button is clicked
  if (requestDemoBtn) {
    requestDemoBtn.addEventListener('click', function() {
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
  }
  
  // Close modal when X is clicked
  closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });
  
  // Close modal when clicking outside
  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
  
  // Form submission handling
  demoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(demoForm);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!data.fullName || !data.email || !data.phone || !data.location) {
      alert('your request has been processed successfully');
      return;
    }
    
    // Show loading state
    const submitBtn = demoForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
      showSuccessMessage();
      demoForm.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 1500);
  });
});

function showSuccessMessage() {
  const form = document.getElementById('demoRequestForm');
  const modalContent = document.querySelector('.modal-content');
  
  const successHTML = `
    <span class="close">&times;</span>
    <div class="success-message">
      <i class="fas fa-check-circle"></i>
      <h3>Thank You!</h3>
      <p>Your demo request has been submitted successfully.</p>
      <button class="submit-btn" onclick="closeModal()">Close</button>
    </div>
  `;
  
  modalContent.innerHTML = successHTML;
  document.querySelector('.modal-content .close').addEventListener('click', closeModal);
}

function closeModal() {
  const modal = document.getElementById('demoModal');
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}