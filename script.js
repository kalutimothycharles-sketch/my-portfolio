document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. DYNAMIC TYPING EFFECT ---
    const dynamicTitle = document.getElementById("dynamic-title");
    const phrases = [
        "A Computer Science Student", 
        "A Web Developer", 
        "A JavaScript Programmer", 
        "A Tech Enthusiast"
    ];
    let phraseIndex = 0;
    let letterIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            dynamicTitle.textContent = currentPhrase.substring(0, letterIndex - 1);
            letterIndex--;
            typingSpeed = 40; 
        } else {
            dynamicTitle.textContent = currentPhrase.substring(0, letterIndex + 1);
            letterIndex++;
            typingSpeed = 80; 
        }

        if (!isDeleting && letterIndex === currentPhrase.length) {
            typingSpeed = 2000; 
            isDeleting = true;
        } else if (isDeleting && letterIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 400; 
        }

        setTimeout(typeEffect, typingSpeed);
    }
    
    if (dynamicTitle) typeEffect();


    // --- 2. MOBILE HAMBURGER MENU INTERACTION ---
    const mobileToggle = document.querySelector(".mobile-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
            });
        });
    }


    // --- 3. SCROLL EFFECTS FOR NAVBAR ---
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.4)";
            navbar.style.backgroundColor = "rgba(15, 23, 42, 0.95)";
        } else {
            navbar.style.boxShadow = "none";
            navbar.style.backgroundColor = "rgba(15, 23, 42, 0.85)";
        }
    });


    // --- 4. DYNAMIC SCROLL REVEAL ANIMATION FOR CARDS ---
    const cards = document.querySelectorAll(".project-card");
    
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(40px)";
        card.style.transition = "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)";
        revealOnScroll.observe(card);
    });


    // =========================================================================
    // --- 5. ASYNCHRONOUS CONTACT FORM HANDLER (ADDED HERE) ---
    // =========================================================================
    const contactForm = document.getElementById("portfolio-contact-form");
    const formStatus = document.getElementById("form-status-msg");
    const submitBtn = document.getElementById("form-submit-btn");

    if (contactForm) {
        contactForm.addEventListener("submit", async (event) => {
            event.preventDefault(); // Stop standard redirect fallback page reloads
            
            // Clean dynamic status state indicators
            formStatus.className = "form-status";
            formStatus.style.display = "none";
            
            // UI Button feedback loading phase state
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = "Sending Message...";
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);

            try {
                const response = await fetch(contactForm.action, {
                    method: contactForm.method,
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Success handling behavior path execution
                    formStatus.textContent = "Thank you! Your message has been sent successfully.";
                    formStatus.classList.add("success");
                    contactForm.reset(); // Clear standard form fields input contexts
                } else {
                    // Endpoint parsed field failure processing fallback route logic
                    const errorData = await response.json();
                    formStatus.textContent = errorData.errors ? errorData.errors.map(err => err.message).join(", ") : "Oops! There was a problem submitting your form.";
                    formStatus.classList.add("error");
                }
            } catch (error) {
                // Client network connection interrupt layer failure validation capture handling
                formStatus.textContent = "Network error. Please check your connection and try again.";
                formStatus.classList.add("error");
            } finally {
                // Restore primary CTA element interactive click state transitions
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

}); // <-- THIS CLOSES THE DOMContentLoaded LISTENER