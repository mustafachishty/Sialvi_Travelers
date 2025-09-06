// Booking page functionality

document.addEventListener('DOMContentLoaded', function() {
    let currentStep = 1;
    const totalSteps = 3;
    const form = document.getElementById('bookingForm');
    const successModal = document.getElementById('successModal');

    // Form validation rules
    const validationRules = {
        destination: { required: true },
        package: { required: true },
        departure: { required: true, date: true },
        return: { required: true, date: true },
        adults: { required: true },
        firstName: { required: true, minLength: 2 },
        lastName: { required: true, minLength: 2 },
        email: { required: true, email: true },
        phone: { required: true, phone: true },
        address: { required: true },
        city: { required: true },
        country: { required: true }
    };

    // Step navigation
    window.nextStep = function() {
        if (validateCurrentStep()) {
            if (currentStep < totalSteps) {
                document.getElementById(`step${currentStep}`).classList.remove('active');
                currentStep++;
                document.getElementById(`step${currentStep}`).classList.add('active');
                updateSummary();
            }
        }
    };

    window.prevStep = function() {
        if (currentStep > 1) {
            document.getElementById(`step${currentStep}`).classList.remove('active');
            currentStep--;
            document.getElementById(`step${currentStep}`).classList.add('active');
        }
    };

    // Validate current step
    function validateCurrentStep() {
        const currentStepElement = document.getElementById(`step${currentStep}`);
        const fields = currentStepElement.querySelectorAll('input[required], select[required]');
        let isValid = true;

        fields.forEach(field => {
            const fieldName = field.name;
            const rules = validationRules[fieldName] || {};
            
            if (!window.validateField(field, rules)) {
                isValid = false;
            }
        });

        // Additional validation for date fields
        if (currentStep === 1) {
            const departureDate = document.getElementById('departure').value;
            const returnDate = document.getElementById('return').value;
            
            if (departureDate && returnDate) {
                const departure = new Date(departureDate);
                const returnD = new Date(returnDate);
                
                if (returnD <= departure) {
                    const returnField = document.getElementById('return');
                    returnField.parentNode.classList.add('error');
                    const errorElement = returnField.parentNode.querySelector('.error-message');
                    if (errorElement) errorElement.textContent = 'Return date must be after departure date';
                    isValid = false;
                }
            }
        }

        return isValid;
    }

    // Update booking summary
    function updateSummary() {
        const destination = document.getElementById('destination').value;
        const packageType = document.getElementById('package').value;
        const departure = document.getElementById('departure').value;
        const returnDate = document.getElementById('return').value;
        const adults = document.getElementById('adults').value;
        const children = document.getElementById('children').value;

        // Update summary display
        document.getElementById('summaryDestination').textContent = 
            destination ? document.querySelector(`#destination option[value="${destination}"]`).textContent : '-';
        
        document.getElementById('summaryPackage').textContent = 
            packageType ? document.querySelector(`#package option[value="${packageType}"]`).textContent : '-';
        
        document.getElementById('summaryDeparture').textContent = 
            departure ? new Date(departure).toLocaleDateString() : '-';
        
        document.getElementById('summaryReturn').textContent = 
            returnDate ? new Date(returnDate).toLocaleDateString() : '-';

        const travelersText = adults ? 
            `${adults} Adult${adults !== '1' ? 's' : ''}${children !== '0' ? `, ${children} Child${children !== '1' ? 'ren' : ''}` : ''}` : '-';
        document.getElementById('summaryTravelers').textContent = travelersText;

        // Calculate estimated price (simplified)
        if (destination && packageType && adults) {
            const basePrices = {
                santorini: 1299,
                bali: 899,
                tokyo: 1799,
                paris: 1599,
                safari: 2299,
                australia: 1999,
                other: 1500
            };

            const packageMultipliers = {
                budget: 0.8,
                standard: 1.0,
                premium: 1.3,
                luxury: 1.6
            };

            const basePrice = basePrices[destination] || 1500;
            const multiplier = packageMultipliers[packageType] || 1.0;
            const adultCount = parseInt(adults.replace('+', '')) || 1;
            const childCount = parseInt(children) || 0;
            
            const totalPrice = Math.round((basePrice * multiplier * adultCount) + (basePrice * multiplier * 0.7 * childCount));
            document.getElementById('summaryTotal').textContent = `$${totalPrice.toLocaleString()}`;
        }
    }

    // Form submission
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateCurrentStep()) {
                // Simulate form submission
                setTimeout(() => {
                    showSuccessModal();
                }, 1000);
            }
        });
    }

    // Show success modal
    function showSuccessModal() {
        successModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Close success modal
    window.closeSuccessModal = function() {
        successModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        form.reset();
        currentStep = 1;
        document.querySelectorAll('.form-step').forEach(step => step.classList.remove('active'));
        document.getElementById('step1').classList.add('active');
        updateSummary();
    };

    // Real-time validation
    document.querySelectorAll('input, select').forEach(field => {
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
            
            // Update summary in real-time for step 1 fields
            if (currentStep === 1) {
                updateSummary();
            }
        });
    });

    // Initialize summary
    updateSummary();

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('departure').setAttribute('min', today);
    document.getElementById('return').setAttribute('min', today);

    // Update return date minimum when departure changes
    document.getElementById('departure').addEventListener('change', function() {
        const departureDate = this.value;
        if (departureDate) {
            const nextDay = new Date(departureDate);
            nextDay.setDate(nextDay.getDate() + 1);
            document.getElementById('return').setAttribute('min', nextDay.toISOString().split('T')[0]);
        }
    });

    // Modal close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && successModal.style.display === 'block') {
            closeSuccessModal();
        }
    });

    // Animate form steps
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.form-step').forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'translateX(20px)';
        step.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(step);
    });
});