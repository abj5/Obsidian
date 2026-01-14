// Smooth Scrolling Function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Quiz state variables (global so resetQuiz can access them)
let currentQuestion = 1;
let correctAnswers = 0;

// Volcano Eruption Animation
document.addEventListener('DOMContentLoaded', function() {

    // ===== OSCAR'S EYES FOLLOW MOUSE =====
    const pupils = document.querySelectorAll('.oscar-pupil');

    document.addEventListener('mousemove', function(e) {
        pupils.forEach(pupil => {
            const eye = pupil.parentElement;
            const eyeRect = eye.getBoundingClientRect();

            // Get eye center
            const eyeCenterX = eyeRect.left + eyeRect.width / 2;
            const eyeCenterY = eyeRect.top + eyeRect.height / 2;

            // Calculate angle from eye to mouse
            const deltaX = e.clientX - eyeCenterX;
            const deltaY = e.clientY - eyeCenterY;

            // Calculate distance (limit movement)
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            const maxMove = eyeRect.width * 0.25; // Limit pupil movement

            // Normalize and scale movement
            let moveX, moveY;
            if (distance > 0) {
                const scale = Math.min(distance / 100, 1) * maxMove;
                moveX = (deltaX / distance) * scale;
                moveY = (deltaY / distance) * scale;
            } else {
                moveX = 0;
                moveY = 0;
            }

            // Apply transform
            pupil.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });

    const volcanoAnim = document.getElementById('volcanoAnim');

    if (volcanoAnim) {
        let isErupting = false;

        volcanoAnim.addEventListener('click', function() {
            // Prevent multiple clicks during eruption
            if (isErupting) return;

            isErupting = true;
            this.classList.add('erupting');

            // Update eruption text
            const eruptionText = this.querySelector('.eruption-text');
            if (eruptionText) {
                eruptionText.textContent = 'ERUPTING! 🌋💥';
                eruptionText.style.color = '#ffa726';
                eruptionText.style.animation = 'glowPulse 0.5s ease-in-out infinite';
            }

            // Remove class after all animations complete
            setTimeout(() => {
                this.classList.remove('erupting');
                isErupting = false;

                if (eruptionText) {
                    eruptionText.textContent = 'Click the volcano to see my birth! 🌋';
                    eruptionText.style.color = '';
                    eruptionText.style.animation = '';
                }
            }, 4000);
        });
    }

    // Image Modal for Use Cards
    const imageModal = document.getElementById('imageModal');
    const modalClose = document.getElementById('modalClose');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');

    // Image data for clickable cards
    const cardImages = {
        'stoneAgeCard': {
            src: 'stoneage-tool.png',
            alt: 'Stone Age Obsidian Tools',
            caption: 'Ancient obsidian tools - sharper than steel!'
        },
        'aztecCard': {
            src: 'aztec-weapon.png',
            alt: 'Aztec Obsidian Weapon',
            caption: 'The macuahuitl - an Aztec war club with obsidian blades!'
        },
        'surgicalCard': {
            src: 'surgical-scalpel.png',
            alt: 'Obsidian Surgical Scalpel',
            caption: 'Modern obsidian scalpels - from ancient weapons to saving lives!'
        }
    };

    // Add click handlers for all clickable use cards
    Object.keys(cardImages).forEach(cardId => {
        const card = document.getElementById(cardId);
        if (card && imageModal) {
            card.addEventListener('click', function() {
                const imageData = cardImages[cardId];
                modalImage.src = imageData.src;
                modalImage.alt = imageData.alt;
                modalCaption.textContent = imageData.caption;
                imageModal.classList.add('active');
            });
        }
    });

    if (imageModal) {
        modalClose.addEventListener('click', function() {
            imageModal.classList.remove('active');
        });

        // Close modal when clicking outside the image
        imageModal.addEventListener('click', function(e) {
            if (e.target === imageModal) {
                imageModal.classList.remove('active');
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && imageModal.classList.contains('active')) {
                imageModal.classList.remove('active');
            }
        });
    }

    // Gallery Modal for Obsidian Sample
    const obsidianSample = document.getElementById('obsidianSample');
    const galleryModal = document.getElementById('galleryModal');
    const galleryClose = document.getElementById('galleryClose');

    if (obsidianSample && galleryModal) {
        obsidianSample.addEventListener('click', function() {
            galleryModal.classList.add('active');
        });

        galleryClose.addEventListener('click', function() {
            galleryModal.classList.remove('active');
        });

        // Close gallery when clicking outside
        galleryModal.addEventListener('click', function(e) {
            if (e.target === galleryModal) {
                galleryModal.classList.remove('active');
            }
        });
    }

    // Close gallery with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && galleryModal && galleryModal.classList.contains('active')) {
            galleryModal.classList.remove('active');
        }
    });

    // Location Cards Interaction
    const locationCards = document.querySelectorAll('.location-card');
    locationCards.forEach(card => {
        card.addEventListener('click', function() {
            const location = this.dataset.location;
            const messages = {
                'iceland': '🇮🇸 Iceland: Land of fire and ice! Obsidian here is formed from glacial volcanism.',
                'japan': '🇯🇵 Japan: Mount Fuji area has beautiful obsidian deposits used historically.',
                'mexico': '🇲🇽 Mexico: The Aztecs sourced obsidian from Sierra de Pachuca for weapons and tools.',
                'italy': '🇮🇹 Italy: Lipari Islands have been a source of obsidian since ancient times.',
                'greece': '🇬🇷 Greece: Milos Island obsidian was traded throughout the Mediterranean.',
                'newzealand': '🇳🇿 New Zealand: Mayor Island is home to unique obsidian varieties.'
            };

            if (messages[location]) {
                alert(messages[location]);
            }
        });
    });

    // Rock Cycle Interactive Diagram - Cross Layout
    const allRockElements = document.querySelectorAll('.rock-type, .current-rock');
    const detailContents = {
        'obsidian': document.getElementById('detail-obsidian'),
        'sedimentary': document.getElementById('detail-sedimentary'),
        'metamorphic': document.getElementById('detail-metamorphic'),
        'igneous': document.getElementById('detail-igneous')
    };

    allRockElements.forEach(rock => {
        rock.addEventListener('click', function() {
            const type = this.dataset.type;

            // Remove active class from all rocks
            allRockElements.forEach(r => r.classList.remove('active'));

            // Add active class to clicked rock
            this.classList.add('active');

            // Hide all detail contents
            Object.values(detailContents).forEach(detail => {
                if (detail) detail.style.display = 'none';
            });

            // Show selected detail content
            if (detailContents[type]) {
                detailContents[type].style.display = 'block';
            }
        });
    });

    // Quiz Functionality
    const quizQuestions = document.querySelectorAll('.quiz-question');
    const quizOptions = document.querySelectorAll('.quiz-option');
    // currentQuestion and correctAnswers are defined globally for resetQuiz access

    quizOptions.forEach(option => {
        option.addEventListener('click', function() {
            const isCorrect = this.dataset.correct === 'true';

            // Disable all options in this question
            const questionOptions = this.parentElement.querySelectorAll('.quiz-option');
            questionOptions.forEach(opt => {
                opt.style.pointerEvents = 'none';
                if (opt.dataset.correct === 'true') {
                    opt.classList.add('correct');
                } else if (opt === this && !isCorrect) {
                    opt.classList.add('incorrect');
                }
            });

            if (isCorrect) {
                correctAnswers++;
            }

            // Move to next question after delay
            setTimeout(() => {
                const currentQ = document.querySelector(`.quiz-question[data-question="${currentQuestion}"]`);
                if (currentQ) {
                    currentQ.classList.remove('active');
                }

                currentQuestion++;
                const nextQ = document.querySelector(`.quiz-question[data-question="${currentQuestion}"]`);

                if (nextQ) {
                    nextQ.classList.add('active');
                } else {
                    // Show results
                    showQuizResults();
                }
            }, 1500);
        });
    });

    function showQuizResults() {
        const resultsDiv = document.querySelector('.quiz-results');
        if (resultsDiv) {
            resultsDiv.style.display = 'block';
            const resultText = resultsDiv.querySelector('h3');

            if (correctAnswers === 6) {
                resultText.textContent = '🎉 Perfect score! You\'re an obsidian expert! 🎉';
            } else if (correctAnswers >= 4) {
                resultText.textContent = ' Great job! You know your volcanic glass! ' + correctAnswers + '/6 correct! ';
            } else {
                resultText.textContent = ' Keep learning about obsidian! You got ' + correctAnswers + '/6. Try reading the story again! ';
            }

            resultsDiv.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Add Main Rock Animation
    const mainRock = document.getElementById('mainRock');
    if (mainRock) {
        mainRock.addEventListener('click', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = '';
            }, 10);
        });
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 2px 30px rgba(255, 107, 53, 0.5)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(255, 107, 53, 0.3)';
        }

        lastScroll = currentScroll;
    });

    // Add parallax effect to sections
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.chapter');

        parallaxElements.forEach((element, index) => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos * 0.1}px)`;
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all info cards and use cards
    const animatedElements = document.querySelectorAll('.info-card, .use-card, .location-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // Easter egg: Konami code
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);

        if (konamiCode.join(',') === konamiSequence.join(',')) {
            activateEasterEgg();
        }
    });

    function activateEasterEgg() {
        // Make it rain obsidian rocks!
        const body = document.body;
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const rock = document.createElement('div');
                rock.style.position = 'fixed';
                rock.style.top = '-50px';
                rock.style.left = Math.random() * 100 + '%';
                rock.style.width = '30px';
                rock.style.height = '30px';
                rock.style.background = 'radial-gradient(circle, #3a3a3a, #0a0a0a)';
                rock.style.borderRadius = '50%';
                rock.style.zIndex = '10000';
                rock.style.pointerEvents = 'none';
                rock.textContent = '⚫';
                rock.style.fontSize = '20px';
                rock.style.animation = 'fall 3s linear';

                body.appendChild(rock);

                setTimeout(() => {
                    rock.remove();
                }, 3000);
            }, i * 100);
        }

        // Add fall animation
        if (!document.getElementById('fall-animation')) {
            const style = document.createElement('style');
            style.id = 'fall-animation';
            style.textContent = `
                @keyframes fall {
                    to { transform: translateY(100vh) rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }

        alert('🌋 OBSIDIAN RAIN! You found the secret! ⚫');
    }

    // Add sound effects (optional - requires audio files)
    function playSound(soundName) {
        // Placeholder for sound effects
        // You can add actual audio files later
        console.log(`Playing sound: ${soundName}`);
    }

    // Random fun fact generator
    const funFacts = [
        "Obsidian can be sharper than surgical steel!",
        "The Aztecs called obsidian 'iztli' meaning 'sharp stone'",
        "Obsidian is technically not a mineral, but a mineraloid!",
        "Some obsidian can be over 70% silica!",
        "Obsidian forms when lava cools in less than a few months!",
        "You can find obsidian on Mars!",
        "Ancient humans traded obsidian over thousands of miles!",
        "Obsidian can come in different colors: black, brown, green, or even rainbow!"
    ];

    // Show random fun fact on page load
    if (Math.random() > 0.7) {
        setTimeout(() => {
            const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
            const factBanner = document.createElement('div');
            factBanner.style.position = 'fixed';
            factBanner.style.bottom = '20px';
            factBanner.style.right = '20px';
            factBanner.style.background = 'rgba(255, 107, 53, 0.95)';
            factBanner.style.color = 'white';
            factBanner.style.padding = '1rem 2rem';
            factBanner.style.borderRadius = '10px';
            factBanner.style.zIndex = '10000';
            factBanner.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)';
            factBanner.style.maxWidth = '300px';
            factBanner.style.animation = 'slideIn 0.5s ease-out';
            factBanner.innerHTML = `<strong>💡 Fun Fact!</strong><br>${randomFact}`;

            document.body.appendChild(factBanner);

            setTimeout(() => {
                factBanner.style.animation = 'slideOut 0.5s ease-out';
                setTimeout(() => factBanner.remove(), 500);
            }, 5000);
        }, 3000);
    }

    // Add slideOut animation
    const slideOutStyle = document.createElement('style');
    slideOutStyle.textContent = `
        @keyframes slideOut {
            to { transform: translateX(400px); opacity: 0; }
        }
    `;
    document.head.appendChild(slideOutStyle);

    console.log('🌋 Oscar\'s Interactive Rock Story is ready! Stay glassy! ⚫');
});

// Reset Quiz Function
function resetQuiz() {
    const quizQuestions = document.querySelectorAll('.quiz-question');
    const quizOptions = document.querySelectorAll('.quiz-option');
    const resultsDiv = document.querySelector('.quiz-results');

    // Reset question visibility
    quizQuestions.forEach((q, index) => {
        if (index === 0) {
            q.classList.add('active');
        } else {
            q.classList.remove('active');
        }
    });

    // Reset options
    quizOptions.forEach(option => {
        option.style.pointerEvents = 'auto';
        option.classList.remove('correct', 'incorrect');
    });

    // Hide results
    if (resultsDiv) {
        resultsDiv.style.display = 'none';
    }

    // Reset counters
    currentQuestion = 1;
    correctAnswers = 0;

    // Scroll to quiz
    document.querySelector('.quiz-section').scrollIntoView({ behavior: 'smooth' });
}

// Add typing effect to hero text (optional enhancement)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Prevent right-click on obsidian samples (just for fun)
document.addEventListener('contextmenu', (e) => {
    if (e.target.classList.contains('obsidian-sample') || e.target.classList.contains('obsidian-rock')) {
        e.preventDefault();
        alert('⚫ Hey! Don\'t steal the obsidian! Just look and admire!');
    }
});