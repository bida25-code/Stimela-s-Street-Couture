// js/script.js - External JavaScript File
// Stimela's Street Couture - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== 1. SCROLL TO TOP BUTTON ==========
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-top-btn';
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });
    
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // ========== 2. NAVBAR SCROLL EFFECT ==========
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
                navbar.style.padding = '12px 0';
            } else {
                navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
                navbar.style.padding = '16px 0';
            }
        });
    }
    
    // ========== 3. CONTACT FORM VALIDATION ==========
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            
            let isValid = true;
            
            document.querySelectorAll('.error-message').forEach(el => el.remove());
            
            if (!name.value.trim()) {
                showError(name, 'Please enter your full name');
                isValid = false;
            } else if (name.value.trim().length < 2) {
                showError(name, 'Name must be at least 2 characters');
                isValid = false;
            }
            
            const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
            if (!email.value.trim()) {
                showError(email, 'Please enter your email address');
                isValid = false;
            } else if (!emailRegex.test(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            }
            
            if (!subject.value) {
                showError(subject, 'Please select a subject');
                isValid = false;
            }
            
            if (!message.value.trim()) {
                showError(message, 'Please enter your message');
                isValid = false;
            } else if (message.value.trim().length < 10) {
                showError(message, 'Message must be at least 10 characters');
                isValid = false;
            }
            
            if (isValid) {
                const successDiv = document.createElement('div');
                successDiv.className = 'alert alert-success mt-4';
                successDiv.innerHTML = '<i class="fas fa-check-circle me-2"></i> Thank you! Your message has been sent successfully. We\'ll get back to you soon.';
                contactForm.appendChild(successDiv);
                contactForm.reset();
                setTimeout(() => successDiv.remove(), 5000);
            }
        });
    }
    
    function showError(field, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = '<i class="fas fa-exclamation-circle me-1"></i> ' + message;
        field.parentNode.appendChild(errorDiv);
        errorDiv.style.display = 'block';
        field.style.borderColor = '#dc3545';
        field.addEventListener('input', function() {
            errorDiv.remove();
            field.style.borderColor = '#e0e0e0';
        }, { once: true });
    }
    
    // ========== 4. COLLECTION FILTERING ==========
    const filterButtons = document.querySelectorAll('.filter-btn');
    const collectionItems = document.querySelectorAll('.collection-item');
    
    if (filterButtons.length > 0 && collectionItems.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                filterButtons.forEach(b => b.classList.remove('active-filter'));
                this.classList.add('active-filter');
                const filterValue = this.getAttribute('data-filter');
                collectionItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.classList.remove('hide-item');
                    } else {
                        item.classList.add('hide-item');
                    }
                });
            });
        });
    }
    
    // ========== 5. NEWSLETTER SUBSCRIPTION ==========
    const newsletterInputs = document.querySelectorAll('footer .input-group input');
    const newsletterBtns = document.querySelectorAll('footer .input-group button');
    
    newsletterBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            const emailInput = newsletterInputs[index];
            if (emailInput && emailInput.value.trim()) {
                const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
                if (emailRegex.test(emailInput.value.trim())) {
                    alert('Thank you for subscribing to our newsletter!');
                    emailInput.value = '';
                } else {
                    alert('Please enter a valid email address.');
                }
            } else {
                alert('Please enter your email address to subscribe.');
            }
        });
    });
    
    // ========== 6. SHOPPING BAG & SEARCH ==========
    const bagIcon = document.querySelector('.bag-icon');
    if (bagIcon) {
        bagIcon.addEventListener('click', function() {
            alert('Your shopping bag is empty. Browse our collection to add items!');
        });
    }
    
    const searchIcon = document.querySelector('.search-icon');
    if (searchIcon) {
        searchIcon.addEventListener('click', function() {
            alert('Search feature coming soon! Use the navigation to explore our collection.');
        });
    }
    
    // ========== 7. SMOOTH SCROLL ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // ========== 8. PAGE FADE IN ==========
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    setTimeout(() => { document.body.style.opacity = '1'; }, 100);
});