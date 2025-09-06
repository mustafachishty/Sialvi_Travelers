// Contact page functionality

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('contactSuccessModal');

    // Form validation rules
    const validationRules = {
        name: { required: true, minLength: 2 },
        email: { required: true, email: true },
        phone: { phone: true },
        subject: { required: true },
        message: { required: true, minLength: 10 }
    };

    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                // Simulate form submission
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    showSuccessModal();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
    }

    // Validate entire form
    function validateForm() {
        const fields = contactForm.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;

        fields.forEach(field => {
            const fieldName = field.name;
            const rules = validationRules[fieldName] || {};
            
            if (!window.validateField(field, rules)) {
                isValid = false;
            }
        });

        return isValid;
    }

    // Show success modal
    function showSuccessModal() {
        successModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Close success modal
    window.closeContactModal = function() {
        successModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        contactForm.reset();
        
        // Clear any error states
        document.querySelectorAll('.form-group.error').forEach(group => {
            group.classList.remove('error');
        });
        document.querySelectorAll('.error-message').forEach(error => {
            error.textContent = '';
        });
    };

    // Real-time validation
    document.querySelectorAll('input, select, textarea').forEach(field => {
        field.addEventListener('blur', function() {
            const fieldName = this.name;
            const rules = validationRules[fieldName] || {};
            window.validateField(this, rules);
        });

        field.addEventListener('input', function() {
            // Clear error state on input
            this.parentNode.classList.remove('error');
            const errorElement = this.parentNode.querySelector('.error-message');
            if (errorElement) errorElement.textContent = '';
        });
    });

    // FAQ Accordion (already handled in main.js, but adding specific enhancements)
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach((item, index) => {
        // Add animation delay
        item.style.animationDelay = `${index * 0.1}s`;
        
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other FAQ items with animation
                faqItems.forEach(faq => {
                    if (faq !== item && faq.classList.contains('active')) {
                        faq.classList.remove('active');
                        const faqAnswer = faq.querySelector('.faq-answer');
                        if (faqAnswer) {
                            faqAnswer.style.maxHeight = '0';
                        }
                    }
                });
                
                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                } else {
                    item.classList.remove('active');
                    answer.style.maxHeight = '0';
                }
            });
        }
    });

    // Contact info animations
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(item);
    });

    // Map interaction
    const mapContainer = document.querySelector('.map-container');
    if (mapContainer) {
        const iframe = mapContainer.querySelector('iframe');
        
        // Prevent scroll zoom on map
        mapContainer.addEventListener('click', function() {
            iframe.style.pointerEvents = 'auto';
        });
        
        mapContainer.addEventListener('mouseleave', function() {
            iframe.style.pointerEvents = 'none';
        });
        
        // Initial state
        iframe.style.pointerEvents = 'none';
    }

    // Character counter for message field
    const messageField = document.getElementById('message');
    if (messageField) {
        const maxLength = 500;
        const counter = document.createElement('div');
        counter.className = 'character-counter';
        counter.style.cssText = `
            text-align: right;
            font-size: 0.8rem;
            color: #666;
            margin-top: 0.25rem;
        `;
        
        messageField.parentNode.appendChild(counter);
        
        function updateCounter() {
            const remaining = maxLength - messageField.value.length;
            counter.textContent = `${remaining} characters remaining`;
            
            if (remaining < 50) {
                counter.style.color = '#ff6b35';
            } else {
                counter.style.color = '#666';
            }
        }
        
        messageField.addEventListener('input', updateCounter);
        messageField.setAttribute('maxlength', maxLength);
        updateCounter();
    }

    // Modal close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && successModal.style.display === 'block') {
            closeContactModal();
        }
    });

    // Form field focus effects
    document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(field => {
        field.addEventListener('focus', function() {
            this.parentNode.classList.add('focused');
        });
        
        field.addEventListener('blur', function() {
            this.parentNode.classList.remove('focused');
        });
    });
});