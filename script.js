// Galaxy Viewer JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const galaxyViewer = document.getElementById('galaxy-viewer');
    const starsContainer = document.getElementById('stars-container');

    // Initial setup
    window.addEventListener("load", () => {
    const audio = document.getElementById("bg-music");
    
    // Hiển thị viewer sau khi loading
    setTimeout(() => {
        document.getElementById("loading-screen").classList.add("hidden");
        document.getElementById("galaxy-viewer").classList.remove("hidden");

        // Phát nhạc
        const playMusic = () => {
            audio.play().catch((e) => {
                console.warn("Trình duyệt chặn tự động phát nhạc. Người dùng cần tương tác.");
            });
            document.removeEventListener('click', playMusic);
        };
        
        // Một số trình duyệt yêu cầu người dùng tương tác trước khi phát nhạc
        document.addEventListener('click', playMusic);
    }, 3000); // thời gian loading 3 giây (có thể điều chỉnh)
});




    // Generate stars
    function generateStars() {
        const numStars = 150;

        for (let i = 0; i < numStars; i++) {
            const star = document.createElement('div');
            star.className = 'star';

            // Random position
            const top = Math.random() * 100;
            const left = Math.random() * 100;

            // Random size (1px to 4px)
            const size = Math.random() * 3 + 1;

            // Random animation delay
            const delay = Math.random() * 2;

            star.style.top = `${top}%`;
            star.style.left = `${left}%`;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.animationDelay = `${delay}s`;

            starsContainer.appendChild(star);
        }
    }

    // Add click effects to images
    function addImageInteractions() {
        const avatarImage = document.querySelector('.avatar-image');
        const smallImages = document.querySelectorAll('.small-image');

        // Avatar click effect
        if (avatarImage) {
            avatarImage.addEventListener('click', function() {
                // Create heart explosion effect
                createHeartExplosion(this);

                // Zoom effect
                this.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 300);
            });
        }

        // Small images click effects
        smallImages.forEach(img => {
            img.addEventListener('click', function() {
                // Create sparkle effect for images
                createSparkleEffect(this);

                // Rotate and scale effect
                this.style.transform = 'scale(1.4) rotate(15deg)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 400);
            });
        });
    }

    // Create heart explosion effect for avatar
    function createHeartExplosion(element) {
        const rect = element.getBoundingClientRect();
        const hearts = ['💖', '💕', '💗', '💓', '💝'];

        for (let i = 0; i < 12; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'fixed';
            heart.style.left = `${rect.left + rect.width / 2}px`;
            heart.style.top = `${rect.top + rect.height / 2}px`;
            heart.style.fontSize = '20px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '1000';
            heart.style.userSelect = 'none';

            document.body.appendChild(heart);

            // Animate heart
            const angle = (i / 12) * Math.PI * 2;
            const distance = 80 + Math.random() * 40;
            const endX = Math.cos(angle) * distance;
            const endY = Math.sin(angle) * distance;

            heart.animate([
                {
                    transform: 'translate(0, 0) scale(0)',
                    opacity: 1
                },
                {
                    transform: `translate(${endX}px, ${endY}px) scale(1.5)`,
                    opacity: 0
                }
            ], {
                duration: 1200,
                easing: 'ease-out'
            }).onfinish = () => {
                heart.remove();
            };
        }
    }

    // Add click effects to floating text
    function addTextInteractions() {
        const floatingTexts = document.querySelectorAll('.floating-text');

        floatingTexts.forEach(text => {
            text.addEventListener('click', function() {
                // Create ripple effect
                this.style.transform = 'scale(1.3)';
                this.style.filter = 'brightness(1.5)';

                // Reset after animation
                setTimeout(() => {
                    this.style.transform = '';
                    this.style.filter = '';
                }, 200);

                // Create sparkle effect
                createSparkleEffect(this);
            });

            // Add hover sound effect (visual feedback)
            text.addEventListener('mouseenter', function() {
                this.style.filter = 'brightness(1.3)';
            });

            text.addEventListener('mouseleave', function() {
                this.style.filter = '';
            });
        });
    }

    // Create sparkle effect when text is clicked
    function createSparkleEffect(element) {
        const rect = element.getBoundingClientRect();
        const sparkles = 8;

        for (let i = 0; i < sparkles; i++) {
            const sparkle = document.createElement('div');
            sparkle.style.position = 'fixed';
            sparkle.style.left = `${rect.left + rect.width / 2}px`;
            sparkle.style.top = `${rect.top + rect.height / 2}px`;
            sparkle.style.width = '4px';
            sparkle.style.height = '4px';
            sparkle.style.background = '#ff6b9d';
            sparkle.style.borderRadius = '50%';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '1000';
            sparkle.style.boxShadow = '0 0 10px #ff6b9d';

            document.body.appendChild(sparkle);

            // Animate sparkle
            const angle = (i / sparkles) * Math.PI * 2;
            const distance = 50;
            const endX = Math.cos(angle) * distance;
            const endY = Math.sin(angle) * distance;

            sparkle.animate([
                {
                    transform: 'translate(0, 0) scale(1)',
                    opacity: 1
                },
                {
                    transform: `translate(${endX}px, ${endY}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: 600,
                easing: 'ease-out'
            }).onfinish = () => {
                sparkle.remove();
            };
        }
    }

    // Add random new stars periodically
    function addRandomStars() {
        setInterval(() => {
            if (starsContainer.children.length < 200) {
                const star = document.createElement('div');
                star.className = 'star';

                const top = Math.random() * 100;
                const left = Math.random() * 100;
                const size = Math.random() * 2 + 1;

                star.style.top = `${top}%`;
                star.style.left = `${left}%`;
                star.style.width = `${size}px`;
                star.style.height = `${size}px`;
                star.style.animationDelay = '0s';
                star.style.opacity = '0';

                starsContainer.appendChild(star);

                // Fade in the new star
                star.animate([
                    { opacity: 0 },
                    { opacity: 1 }
                ], {
                    duration: 2000,
                    fill: 'forwards'
                });

                // Remove old stars to prevent too many elements
                setTimeout(() => {
                    if (starsContainer.children.length > 200) {
                        starsContainer.removeChild(starsContainer.firstChild);
                    }
                }, 10000);
            }
        }, 3000);
    }

    // Add shooting star effect
    function createShootingStar() {
        const shootingStar = document.createElement('div');
        shootingStar.style.position = 'absolute';
        shootingStar.style.width = '2px';
        shootingStar.style.height = '2px';
        shootingStar.style.background = 'white';
        shootingStar.style.borderRadius = '50%';
        shootingStar.style.boxShadow = '0 0 10px white, 0 0 20px white, 0 0 30px white';
        shootingStar.style.top = `${Math.random() * 50}%`;
        shootingStar.style.left = '0%';
        shootingStar.style.pointerEvents = 'none';

        starsContainer.appendChild(shootingStar);

        // Animate shooting star
        shootingStar.animate([
            {
                left: '-10px',
                top: shootingStar.style.top,
                opacity: 0
            },
            {
                left: '50%',
                top: `${parseInt(shootingStar.style.top) + 20}%`,
                opacity: 1
            },
            {
                left: '110%',
                top: `${parseInt(shootingStar.style.top) + 40}%`,
                opacity: 0
            }
        ], {
            duration: 3000,
            easing: 'ease-out'
        }).onfinish = () => {
            shootingStar.remove();
        };
    }

    // Add periodic shooting stars
    function startShootingStars() {
        setInterval(() => {
            if (Math.random() < 0.3) { // 30% chance every interval
                createShootingStar();
            }
        }, 5000);
    }

    // Loading sequence
    function startLoadingSequence() {
        // Show loading for 3 seconds
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.transition = 'opacity 1s ease-out';

            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                galaxyViewer.classList.remove('hidden');

                // Start galaxy effects
                generateStars();
                addTextInteractions();
                addImageInteractions();
                addRandomStars();
                startShootingStars();
            }, 1000);
        }, 3000);
    }

    // Add some dynamic text effects
    function addDynamicEffects() {
        const messages = document.querySelectorAll('.floating-text');

        // Randomly change glow intensity
        setInterval(() => {
            messages.forEach(msg => {
                if (Math.random() < 0.1) { // 10% chance
                    msg.style.filter = 'brightness(1.5) saturate(1.2)';
                    setTimeout(() => {
                        msg.style.filter = '';
                    }, 500);
                }
            });
        }, 2000);
    }

    // Add keyboard interactions
    function addKeyboardEffects() {
        document.addEventListener('keydown', function(e) {
            // Press space to create shooting star
            if (e.code === 'Space') {
                e.preventDefault();
                createShootingStar();
            }

            // Press 'S' to add more stars
            if (e.code === 'KeyS') {
                for (let i = 0; i < 10; i++) {
                    setTimeout(() => {
                        const star = document.createElement('div');
                        star.className = 'star';
                        star.style.top = `${Math.random() * 100}%`;
                        star.style.left = `${Math.random() * 100}%`;
                        star.style.width = `${Math.random() * 3 + 1}px`;
                        star.style.height = star.style.width;
                        star.style.animationDelay = `${Math.random() * 2}s`;
                        starsContainer.appendChild(star);
                    }, i * 100);
                }
            }
        });
    }

    // Initialize everything
    startLoadingSequence();
    addDynamicEffects();
    addKeyboardEffects();

    // Add some console messages for fun
    console.log('🌟 Galaxy Viewer đã khởi tạo thành công!');
    console.log('✨ Bấm Space để tạo sao băng');
    console.log('🌌 Bấm S để thêm ngôi sao');
    console.log('🎉 Click vào các thông điệp để tạo hiệu ứng sparkle!');
});
