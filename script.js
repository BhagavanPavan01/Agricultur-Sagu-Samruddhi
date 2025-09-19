// Chat functionality
document.addEventListener('DOMContentLoaded', function () {
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');

    // Sample responses for demo in both Telugu and English
    const responses = {
        'hello': 'నమస్కారం! How can I assist with your farming today?',
        'hi': 'నమస్కారం! How can I assist with your farming today?',
        'weather': 'Today there is a 60% chance of rainfall in Andhra Pradesh. It is not recommended to spray pesticides today.',
        'pest': 'For organic pest control, try neem oil spray. Mix 5ml of neem oil with 1 liter of water and spray evenly on affected plants.',
        'rice': 'For rice cultivation in Andhra, ensure proper water management. Maintain 2-3 cm water depth during the initial growth stage.',
        'chili': 'Chili crops need well-drained soil and regular irrigation. Apply balanced fertilizers for better yield.',
        'mango': 'Mango trees need proper pruning after harvest. In Andhra, harvesting typically occurs from March to June.',
        'scheme': 'The Andhra Pradesh government offers Rythu Bharosa scheme providing financial assistance to farmers. Contact your local agriculture office for details.',
        'soil': 'Andhra Pradesh has diverse soil types. Red soils are common in Rayalaseema, while delta regions have alluvial soils. Get your soil tested for best results.',
        'default': 'I am still learning about that topic. For specific advice, please contact your local Rythu Bharosa Kendra.'
    };

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

    // Function to get bot response
    function getResponse(input) {
        input = input.toLowerCase();

        if (input.includes('weather') || input.includes('వాతావరణ')) {
            return responses['weather'];
        } else if (input.includes('pest') || input.includes('కీటకాలు')) {
            return responses['pest'];
        } else if (input.includes('rice') || input.includes('వడ్లు')) {
            return responses['rice'];
        } else if (input.includes('chili') || input.includes('మిర్చి')) {
            return responses['chili'];
        } else if (input.includes('mango') || input.includes('మామిడి')) {
            return responses['mango'];
        } else if (input.includes('scheme') || input.includes('పథకం')) {
            return responses['scheme'];
        } else if (input.includes('soil') || input.includes('న ch')) {
            return responses['soil'];
        } else if (input.includes('hello') || input.includes('hi') || input.includes('నమస్కారం')) {
            return responses['hello'];
        } else {
            return responses['default'];
        }
    }

    // Send message on button click
    sendButton.addEventListener('click', function () {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, true);
            userInput.value = '';

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

    // Language toggle functionality
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(button => {
        button.addEventListener('click', function () {
            langButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // In a real application, this would change the interface language
            alert('Language changed to: ' + this.textContent);
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    
    mobileMenu.addEventListener('click', function() {
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
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnHamburger = mobileMenu.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});




