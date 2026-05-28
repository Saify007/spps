$(document).ready(function () {

    // ============================================
    // PRELOADER
    // ============================================
    var preloader = document.getElementById('preloader');
    var preloaderBar = document.getElementById('preloaderBar');
    var preloaderPercent = document.getElementById('preloaderPercent');
    var preloaderLabel = document.getElementById('preloaderLabel');
    var preloaderProgress = 0;
    var preloaderLabels = ['Initializing System', 'Loading Assets', 'Rendering UI', 'Preparing Experience', 'Almost Ready'];

    function updatePreloader() {
        var increment = Math.random() * 15 + 5;
        preloaderProgress = Math.min(preloaderProgress + increment, 100);
        preloaderBar.style.width = preloaderProgress + '%';
        preloaderPercent.textContent = Math.floor(preloaderProgress) + '%';

        var labelIndex = Math.floor(preloaderProgress / 25);
        if (labelIndex < preloaderLabels.length) {
            preloaderLabel.textContent = preloaderLabels[labelIndex];
        }

        if (preloaderProgress < 100) {
            setTimeout(updatePreloader, 200 + Math.random() * 300);
        } else {
            setTimeout(function () {
                preloader.classList.add('hidden');
                document.body.classList.remove('loading');
                initAnimations();
            }, 500);
        }
    }

    document.body.classList.add('loading');
    setTimeout(updatePreloader, 400);

    // Create preloader particles
    var ppContainer = document.getElementById('preloaderParticles');
    if (ppContainer) {
        for (var i = 0; i < 30; i++) {
            var dot = document.createElement('div');
            dot.style.cssText = 'position:absolute;width:' + (Math.random() * 3 + 1) + 'px;height:' + (Math.random() * 3 + 1) + 'px;background:rgba(0,229,255,' + (Math.random() * 0.3 + 0.1) + ');border-radius:50%;top:' + Math.random() * 100 + '%;left:' + Math.random() * 100 + '%;animation:floatShape ' + (Math.random() * 10 + 10) + 's ease-in-out infinite;animation-delay:-' + Math.random() * 10 + 's;';
            ppContainer.appendChild(dot);
        }
    }

    // ============================================
    // PARTICLE CANVAS
    // ============================================
    var canvas = document.getElementById('particleCanvas');
    if (canvas) {
        var ctx = canvas.getContext('2d');
        var particles = [];
        var mouseX = 0;
        var mouseY = 0;
        var particleCount = window.innerWidth < 768 ? 40 : 80;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        function Particle() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.3;
            this.vy = (Math.random() - 0.5) * 0.3;
            this.radius = Math.random() * 1.5 + 0.5;
            this.opacity = Math.random() * 0.3 + 0.1;
        }

        for (var i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(function (p) {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 229, 255, ' + p.opacity + ')';
                ctx.fill();
            });

            // Draw connections
            for (var i = 0; i < particles.length; i++) {
                for (var j = i + 1; j < particles.length; j++) {
                    var dx = particles[i].x - particles[j].x;
                    var dy = particles[i].y - particles[j].y;
                    var dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 120) {
                        var opacity = (1 - dist / 120) * 0.08;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = 'rgba(0, 229, 255, ' + opacity + ')';
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }

                // Mouse interaction
                var mdx = particles[i].x - mouseX;
                var mdy = particles[i].y - mouseY;
                var mDist = Math.sqrt(mdx * mdx + mdy * mdy);
                if (mDist < 150) {
                    var mOpacity = (1 - mDist / 150) * 0.15;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouseX, mouseY);
                    ctx.strokeStyle = 'rgba(168, 85, 247, ' + mOpacity + ')';
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }

            requestAnimationFrame(drawParticles);
        }

        drawParticles();
    }

    document.addEventListener('mousemove', function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // ============================================
    // CURSOR GLOW
    // ============================================
    var cursorGlow = document.getElementById('cursorGlow');
    if (cursorGlow && window.innerWidth > 1024) {
        document.addEventListener('mousemove', function (e) {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
            if (!cursorGlow.classList.contains('active')) {
                cursorGlow.classList.add('active');
            }
        });
    }

    // ============================================
    // INIT ANIMATIONS (after preloader)
    // ============================================
    function initAnimations() {
        // Re-trigger hero title animations
        document.querySelectorAll('.title-line').forEach(function (line) {
            line.style.animation = 'none';
            line.offsetHeight; // trigger reflow
            line.style.animation = '';
        });
    }

    // ============================================
    // SCROLL PROGRESS BAR
    // ============================================
    $(window).on('scroll', function () {
        var scrollTop = $(this).scrollTop();
        var docHeight = $(document).height() - $(window).height();
        var progress = (scrollTop / docHeight) * 100;
        document.getElementById('scrollProgress').style.width = progress + '%';

        // Scroll up button ring
        var suRingFill = document.getElementById('suRingFill');
        if (suRingFill) {
            var circumference = 2 * Math.PI * 22;
            var offset = circumference - (progress / 100) * circumference;
            suRingFill.style.strokeDashoffset = offset;
        }

        // Sticky navbar
        if (scrollTop > 50) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }

        // Scroll up button
        if (scrollTop > 500) {
            $('.scroll-up-btn').addClass('show');
        } else {
            $('.scroll-up-btn').removeClass('show');
        }

        // Active nav link
        $('section[id]').each(function () {
            var top = $(this).offset().top - 140;
            var bottom = top + $(this).outerHeight();
            var id = $(this).attr('id');
            if (scrollTop >= top && scrollTop < bottom) {
                $('.nav-link').removeClass('active');
                $('.nav-link[href="#' + id + '"]').addClass('active');
            }
        });
    });

    // Scroll to top
    $('.scroll-up-btn').on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 800, function () {
            // smooth done
        });
    });

    // ============================================
    // MOBILE MENU
    // ============================================
    $('.nav-toggle').on('click', function () {
        $(this).toggleClass('active');
        $('.nav-menu').toggleClass('active');
        $(this).attr('aria-expanded', $(this).hasClass('active'));
    });

    $('.nav-link').on('click', function () {
        $('.nav-menu').removeClass('active');
        $('.nav-toggle').removeClass('active').attr('aria-expanded', 'false');
    });

    // ============================================
    // SMOOTH SCROLL
    // ============================================
    $('a[href^="#"]').on('click', function (e) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            e.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 70
            }, 800);
        }
    });

    // ============================================
    // TYPED ANIMATION
    // ============================================
    if ($('.typed-text').length) {
        new Typed('.typed-text', {
            strings: [
                'Full Stack Developer',
                'Software Engineer',
                'Web Developer',
                'Problem Solver',
                'Tech Innovator'
            ],
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 1500,
            loop: true,
            startDelay: 500
        });
    }

    // ============================================
    // 3D TILT EFFECT ON CARDS
    // ============================================
    var tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach(function (card) {
        card.addEventListener('mousemove', function (e) {
            var rect = card.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            var centerX = rect.width / 2;
            var centerY = rect.height / 2;
            var rotateX = ((y - centerY) / centerY) * -5;
            var rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-6px)';

            // Move glow
            var glow = card.querySelector('.service-card-glow');
            if (glow) {
                glow.style.opacity = '1';
                glow.style.background = 'radial-gradient(circle at ' + x + 'px ' + y + 'px, rgba(0,229,255,0.12), transparent 60%)';
            }

            // Move project card glow
            var pGlow = card.querySelector('.project-card-glow');
            if (pGlow) {
                var px = (x / rect.width) * 100;
                var py = (y / rect.height) * 100;
                card.style.setProperty('--mx', px + '%');
                card.style.setProperty('--my', py + '%');
            }
        });

        card.addEventListener('mouseleave', function () {
            card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
            card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
            var glow = card.querySelector('.service-card-glow');
            if (glow) { glow.style.opacity = '0'; }
            setTimeout(function () { card.style.transition = ''; }, 500);
        });
    });

    // ============================================
    // MAGNETIC BUTTONS
    // ============================================
    var magneticEls = document.querySelectorAll('.magnetic');

    magneticEls.forEach(function (el) {
        el.addEventListener('mousemove', function (e) {
            var rect = el.getBoundingClientRect();
            var x = e.clientX - rect.left - rect.width / 2;
            var y = e.clientY - rect.top - rect.height / 2;
            el.style.transform = 'translate(' + (x * 0.2) + 'px, ' + (y * 0.2) + 'px)';
        });

        el.addEventListener('mouseleave', function () {
            el.style.transform = '';
            el.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
            setTimeout(function () { el.style.transition = ''; }, 500);
        });
    });

    // ============================================
    // SCROLL REVEAL
    // ============================================
    if ('IntersectionObserver' in window) {
        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry, index) {
                if (entry.isIntersecting) {
                    // Stagger delay for siblings
                    var parent = entry.target.parentElement;
                    var siblings = parent ? parent.querySelectorAll('.service-card, .project-card, .skill-category, .faq-item, .contact-card, .edu-card, .xp-card') : [];
                    var siblingIndex = Array.prototype.indexOf.call(siblings, entry.target);
                    var delay = siblingIndex * 80;

                    setTimeout(function () {
                        entry.target.classList.add('visible');
                    }, delay);
                }
            });
        }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' });

        document.querySelectorAll(
            '.service-card, .project-card, .skill-category, ' +
            '.faq-item, .about-grid, .cta-section, ' +
            '.contact-card, .about-stat, .about-image-col, .about-text-col, .edu-card, .xp-card'
        ).forEach(function (el) {
            el.classList.add('reveal');
            revealObserver.observe(el);
        });
    }

    // About stat counters
    var aboutStatsAnimated = false;

    function animateAboutStats() {
        if (aboutStatsAnimated) return;
        var aboutStats = document.querySelector('.about-stats-row');
        if (!aboutStats) return;

        var rect = aboutStats.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            aboutStatsAnimated = true;
            document.querySelectorAll('.about-stat-num').forEach(function (el) {
                var target = parseInt(el.dataset.count);
                var current = 0;
                var increment = target / 40;
                var stepTime = 1000 / 40;

                var timer = setInterval(function () {
                    current += increment;
                    if (current >= target) {
                        el.textContent = target;
                        clearInterval(timer);
                    } else {
                        el.textContent = Math.floor(current);
                    }
                }, stepTime);
            });
        }
    }

    $(window).on('scroll', function () {
        animateAboutStats();
    });
    animateAboutStats();

    // ============================================
    // FAQ ACCORDION
    // ============================================
    $(document).on('click', '.faq-trigger', function () {
        var item = $(this).closest('.faq-item');
        if (item.hasClass('active')) {
            item.removeClass('active');
            $(this).attr('aria-expanded', 'false');
        } else {
            $('.faq-item').removeClass('active');
            $('.faq-trigger').attr('aria-expanded', 'false');
            item.addClass('active');
            $(this).attr('aria-expanded', 'true');
        }
    });

    // ============================================
    // CONTACT FORM
    // ============================================
    $('#contactForm').on('submit', function (e) {
        e.preventDefault();
        var form = $(this);
        var valid = true;

        form.find('input[required], textarea[required]').each(function () {
            if ($(this).val().trim() === '') {
                $(this).addClass('error');
                valid = false;
            } else {
                $(this).removeClass('error');
            }
        });

        var emailField = form.find('input[type="email"]');
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailField.length && !emailRegex.test(emailField.val())) {
            emailField.addClass('error');
            valid = false;
        }

        if (!valid) return;

        form.fadeOut(300, function () {
            $('#formSuccess').addClass('show').fadeIn(300);
        });

        setTimeout(function () {
            $('#formSuccess').removeClass('show').hide();
            form[0].reset();
            form.fadeIn(300);
        }, 4000);
    });

    $('.contact-form input, .contact-form textarea').on('input', function () {
        if ($(this).val().trim() !== '') $(this).removeClass('error');
    });

    // ============================================
    // KEYBOARD ACCESSIBILITY
    // ============================================
    $(document).on('keydown', function (e) {
        if (e.key === 'Escape') {
            $('.nav-menu').removeClass('active');
            $('.nav-toggle').removeClass('active').attr('aria-expanded', 'false');
        }
    });

    // ============================================
    // PARALLAX SHAPES
    // ============================================
    $(window).on('scroll', function () {
        var scroll = $(this).scrollTop();
        document.querySelectorAll('.shape, .skills-shape, .cta-shape, .edu-shape, .exp-shape').forEach(function (shape, i) {
            var speed = 0.02 + (i * 0.008);
            shape.style.transform = 'translateY(' + (scroll * speed) + 'px)';
        });
    });

    // ============================================
    // PROJECT CARD MOUSE GLOW
    // ============================================
    document.querySelectorAll('.project-card').forEach(function (card) {
        card.addEventListener('mousemove', function (e) {
            var rect = card.getBoundingClientRect();
            var x = ((e.clientX - rect.left) / rect.width) * 100;
            var y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--mx', x + '%');
            card.style.setProperty('--my', y + '%');
        });
    });
});

// Prevent page jump on # links
document.addEventListener('click', function (e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href') === '#') {
        e.preventDefault();
    }
}, false);
