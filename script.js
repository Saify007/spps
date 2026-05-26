$(document).ready(function() {
    // Sticky navbar on scroll
    $(window).scroll(function() {
        if (this.scrollY > 20) {
            $('.navbar').addClass('sticky');
        } else {
            $('.navbar').removeClass('sticky');
        }

        // Show/hide scroll-up button
        if (this.scrollY > 500) {
            $('.scroll-up-btn').addClass('show');
        } else {
            $('.scroll-up-btn').removeClass('show');
        }
    });

    // Scroll to top
    $('.scroll-up-btn').click(function() {
        $('html').animate({ scrollTop: 0 }, 800);
    });

    // Smooth scroll behavior on menu clicks
    $('.menu li a').click(function() {
        $('html').css('scrollBehavior', 'smooth');

        // Close mobile menu if open
        $('.navbar .menu').removeClass('active');
        $('.hamburger i').removeClass('active');
    });

    // Mobile menu toggle
    $('.hamburger').click(function() {
        $('.navbar .menu').toggleClass('active');
        $('.hamburger i').toggleClass('active');
    });

    // Dynamic typing animation
    if ($('.dynamic-text').length) {
        var typed = new Typed('.dynamic-text', {
            strings: [
                'Full Stack Developer',
                'Software Engineer',
                'Web Developer',
                'Problem Solver',
                'Tech Enthusiast'
            ],
            typeSpeed: 80,
            backSpeed: 60,
            backDelay: 1000,
            loop: true,
            startDelay: 500
        });
    }

    // Typing animation for about section
    if ($('.typing-about').length) {
        var typedAbout = new Typed('.typing-about', {
            strings: [
                'Software Engineer',
                'Full Stack Developer',
                'Tech Innovator',
                'Problem Solver'
            ],
            typeSpeed: 80,
            backSpeed: 60,
            backDelay: 800,
            loop: true
        });
    }

    // Contact form submission
    $('#contactForm').submit(function(e) {
        e.preventDefault();

        // Get form values
        var name = $(this).find('input[type="text"]').val();
        var email = $(this).find('input[type="email"]').val();
        var subject = $(this).find('input[placeholder="Subject"]').val();
        var message = $(this).find('textarea').val();

        // Show success message
        alert('Thank you for your message! I will get back to you soon.');

        // Reset form
        this.reset();
    });

    // Smooth scroll for navigation
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        var target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 1000);
        }
    });

    // Intersection Observer for scroll animations
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        $('.service-card, .project-card').each(function() {
            $(this).css({
                'opacity': '0',
                'transform': 'translateY(20px)',
                'transition': 'all 0.6s ease'
            });
            observer.observe(this[0]);
        });
    }

    // Add active state to nav links on scroll
    $(window).scroll(function() {
        var scrollPosition = $(this).scrollTop();

        $('section').each(function() {
            var sectionTop = $(this).offset().top - 100;
            var sectionBottom = sectionTop + $(this).height();
            var sectionId = $(this).attr('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                $('.menu li a').removeClass('active');
                $('.menu li a[href="#' + sectionId + '"]').addClass('active');
            }
        });
    });

    // Add smooth transitions for service cards
    $('.service-card').hover(
        function() {
            $(this).css({
                'transform': 'translateY(-8px)',
                'box-shadow': '0 20px 40px rgba(0, 0, 0, 0.12)'
            });
        },
        function() {
            $(this).css({
                'transform': 'translateY(0)',
                'box-shadow': '0 4px 6px rgba(0, 0, 0, 0.07)'
            });
        }
    );

    // Form validation
    $('.contact-form input, .contact-form textarea').on('blur', function() {
        if ($(this).val().trim() === '') {
            $(this).css('border-color', '#ef4444');
        } else {
            $(this).css('border-color', '#d1d5db');
        }
    });
});

// Prevent page jump on anchor clicks
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.href.includes('#')) {
        const href = e.target.getAttribute('href');
        if (href === '#') {
            e.preventDefault();
        }
    }
}, false);