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
        'fertilizer': 'For most crops, apply a balanced NPK fertilizer. Soil testing can help determine exact requirements.',
        'tomato': 'Tomatoes need well-drained soil and regular watering. Stake plants for better yield.',
        'cotton': 'Cotton requires warm climate and well-drained black soil. Regular pest control is essential.',
        'sugarcane': 'Sugarcane needs abundant water and fertile soil. Harvest after 12-18 months.',
        'groundnut': 'Groundnuts grow best in sandy loam soils. Harvest when leaves turn yellow.',
        'crop rotation': 'Rotate legumes with cereals to maintain soil fertility and reduce pests.',
        'irrigation': 'Drip irrigation saves water and improves yield by delivering water directly to roots.',
        'organic farming': 'Use compost, green manure, and biopesticides for sustainable organic farming.',
        'compost': 'Make compost with crop residues, animal manure, and kitchen waste. Turn regularly.',
        'weed control': 'Control weeds through manual removal, mulching, or approved herbicides.',
        'harvesting': 'Harvest crops at proper maturity for best quality and market value.',
        'storage': 'Store grains in clean, dry conditions to prevent pest damage and mold growth.',
        'seed treatment': 'Treat seeds with fungicides or biocontrol agents before sowing for better germination.',
        'plant spacing': 'Proper spacing allows plants to get adequate sunlight, nutrients, and air circulation.',
        'crop insurance': 'Pradhan Mantri Fasal Bima Yojana provides insurance coverage for crop losses.',
        'loan': 'Kisan Credit Card provides farmers with timely access to credit for agricultural needs.',
        'market prices': 'Check e-NAM portal or local mandi for current market prices of your produce.',
        'drought': 'During drought, use drought-resistant varieties and water conservation techniques.',
        'flood': 'After floods, drain excess water and apply nutrients to help crops recover.',
        'animal husbandry': 'Proper shelter, nutrition, and healthcare are essential for livestock management.',
        'poultry': 'Provide balanced feed, clean water, and vaccination for healthy poultry farming.',
        'fisheries': 'Maintain proper water quality and feeding schedule for successful fish farming.',
        'bee keeping': 'Beekeeping provides additional income through honey production and helps pollination.',
        'mushroom': 'Mushroom cultivation requires controlled temperature and humidity conditions.',
        'vermicompost': 'Vermicompost is rich in nutrients and improves soil structure and fertility.',
        'greenhouse': 'Greenhouses allow year-round cultivation and protection from extreme weather.',
        'soil health': 'Get soil tested every 2-3 years to monitor nutrient levels and pH balance.',
        'water management': 'Use rainwater harvesting and efficient irrigation methods to conserve water.',
        'climate change': 'Adapt climate-resilient practices like changing planting dates or crop varieties.',
        'govt schemes': 'Various government schemes provide support for seeds, equipment, and infrastructure.',
        'subsidy': 'Subsidies are available for farm machinery, drip irrigation, and other inputs.',
        'training': 'KVKs and agricultural universities offer training programs on modern farming techniques.',
        'extension services': 'Agricultural extension officers provide advice and information to farmers.',
        'food processing': 'Value addition through processing can increase income from farm produce.',
        'export': 'Explore export opportunities for high-value agricultural products.',
        'cooperative': 'Join farmer producer organizations for better market access and input procurement.',
        'women farmers': 'Special schemes and training programs are available for women in agriculture.',
        'youth': 'Agriculture offers many opportunities for educated youth through technology and innovation.',
        'technology': 'Use mobile apps, drones, and sensors for precision farming and better decision making.',
        'drones': 'Drones can be used for crop monitoring, spraying, and mapping field conditions.',
        'solar pump': 'Solar-powered irrigation reduces dependence on grid electricity and diesel.',
        'micro irrigation': 'Drip and sprinkler irrigation systems save water and improve productivity.',
        'seed variety': 'Choose high-yielding, disease-resistant varieties suitable for your region.',
        'plant protection': 'Monitor crops regularly for pests and diseases and take timely action.',
        'biocontrol': 'Use beneficial insects, biopesticides, and cultural practices for pest management.',
        'nutrient management': 'Apply fertilizers based on soil test results and crop requirements.',
        'organic manure': 'Apply farmyard manure, compost, or green manure to improve soil health.',
        'intercropping': 'Grow compatible crops together to maximize land use and reduce risks.',
        'agroforestry': 'Integrate trees with crops and livestock for additional income and ecology benefits.',
        'horticulture': 'Fruits, vegetables, and flowers often provide higher returns than traditional crops.',
        'medicinal plants': 'Cultivation of medicinal plants can be profitable with proper market linkages.',
        'spices': 'Spices like turmeric, ginger, and chili have good market demand and value.',
        'flower cultivation': 'Flowers have high market value but require careful management and quick marketing.',
        'nursery': 'Raise healthy seedlings in nurseries for better crop establishment and growth.',
        'tissue culture': 'Tissue-cultured plants are disease-free and provide uniform growth and yield.',
        'seed production': 'Produce quality seeds for own use or sale following proper isolation and techniques.',
        'post harvest': 'Proper handling, storage, and processing reduce losses after harvest.',
        'value addition': 'Processing raw produce into products like flour, chips, or pickles increases income.',
        'quality standards': 'Follow food safety and quality standards for better market acceptance.',
        'certification': 'Organic, fair trade, or other certifications can fetch premium prices.',
        'market linkage': 'Connect directly with buyers, processors, or retailers for better prices.',
        'e-commerce': 'Sell farm produce online through various platforms reaching wider customers.',
        'farm records': 'Maintain records of inputs, operations, and yields for better farm management.',
        'cost reduction': 'Reduce costs through efficient input use, collective purchase, and resource sharing.',
        'risk management': 'Diversify crops, insure crops, and maintain savings to manage farming risks.',
        'success stories': 'Learn from successful farmers who have adopted innovative practices.',
        'new ideas': 'Explore new opportunities in organic farming, processing, or niche products.',
        'sustainable': 'Practice sustainable agriculture that protects environment and resources.',
        'future': 'Future agriculture will be more technology-driven, market-oriented, and sustainable.',
        'Mosquitoes troubling in rice fields': 'Keep water level between 2–5 cm in paddy fields; use fish like Gambusia to control larvae.',
        'Brown Plant Hopper (BPH) attack in paddy': 'Avoid excess nitrogen, maintain spacing, drain water; spray Imidacloprid 200 SL or Buprofezin 25 SC.',
        'Stem borer damaging rice plants': 'Install pheromone traps, apply Cartap Hydrochloride 4G or Chlorantraniliprole granules.',
        'Weeds growing fast in paddy field': 'Use Butachlor 50 EC within 3–5 days of transplanting, or do manual weeding at 20 and 40 days.',
        'Leaf folder insects folding rice leaves': 'Encourage natural enemies, spray Chlorantraniliprole 18.5 SC or Flubendiamide 39.35 SC if severe.',
        'Blast disease on rice leaves': 'Apply Tricyclazole 75 WP or Isoprothiolane 40 EC; avoid excess nitrogen.',
        'Sheath blight spreading in paddy crop': 'Maintain spacing, avoid water stagnation, spray Validamycin 3L or Hexaconazole 5EC.',
        'Water level confusion in paddy fields': 'Keep 2–5 cm water during vegetative stage, saturated soil at flowering, drain before harvest.',
        'Low yield in paddy due to poor fertilizer use': 'Follow soil test based management; apply Urea, DAP, Potash in split doses.',
        'Paddy seedlings turning yellow': 'Iron deficiency suspected; spray ferrous sulphate 5g/litre water.',
        'Crabs damaging bunds in rice field': 'Use bleaching powder in burrows or apply lime on bunds.',
        'Snails eating paddy seedlings': 'Collect manually; apply copper sulphate 10 kg/ha or niclosamide.',
        'Too much waterlogging after rains': 'Open field channels for drainage; maintain proper bund height.',
        'Groundnut crop affected by leaf spot': 'Spray Mancozeb 75 WP or Chlorothalonil 75 WP at 15-day intervals.',
        'Red hairy caterpillar damaging groundnut leaves': 'Destroy egg masses, use light traps, spray Quinalphos 25 EC if severe.',
        'Fruit drop in vegetables': 'Consult local agri officer for specific dosage and spray schedule.',
        'Pest attack in paddy': 'Spray recommended pesticide/fungicide as advised by agriculture officer.',
        'Disease symptoms in groundnut': 'Follow soil test and apply balanced fertilizers.',
        'Nutrient deficiency in cotton': 'Maintain proper irrigation schedule and drainage.',
        'Water shortage in maize': 'Encourage natural enemies and use traps.',
        'Waterlogging in chillies': 'Use resistant varieties recommended for AP.',
        'Low yield in banana': 'Do timely weeding and intercultural operations.',
        'Weed growth in mango': 'Avoid excess nitrogen and maintain spacing.',
        'ok': 'Thank You if any need you just ask me.',

        // Continue adding more responses to reach 500+
        // ... (additional responses would be added here)

        'default': 'I am still learning about that topic. For specific advice, please contact your local Rythu Bharosa Kendra.',
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


document.addEventListener('DOMContentLoaded', function () {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    mobileMenu.addEventListener('click', function () {
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
});



// Animation for resource cards
document.addEventListener('DOMContentLoaded', function () {
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
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });
});

