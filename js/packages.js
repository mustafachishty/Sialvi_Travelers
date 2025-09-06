// Packages page functionality

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('quickViewModal');
    const modalContent = document.getElementById('modalContent');
    const closeBtn = document.querySelector('.close');

    // Package data for quick view
    const packageData = {
        santorini: {
            title: 'Santorini Sunset Romance',
            location: 'Santorini, Greece',
            duration: '7 Days / 6 Nights',
            price: '$1,299',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600',
            description: 'Experience the magic of Santorini with stunning sunsets, luxury accommodations, and authentic Greek cuisine.',
            includes: [
                '4-star hotel accommodation in Oia',
                'Daily breakfast and 3 dinners',
                'Sunset cruise with wine tasting',
                'Guided tour of Fira and Imerovigli',
                'Wine tasting at local vineyards',
                'Airport transfers',
                'Professional tour guide'
            ],
            itinerary: [
                'Day 1: Arrival and hotel check-in',
                'Day 2: Oia village tour and sunset viewing',
                'Day 3: Wine tasting tour',
                'Day 4: Sunset cruise',
                'Day 5: Free day for relaxation',
                'Day 6: Fira exploration',
                'Day 7: Departure'
            ]
        },
        bali: {
            title: 'Bali Cultural Adventure',
            location: 'Bali, Indonesia',
            duration: '8 Days / 7 Nights',
            price: '$899',
            image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600',
            description: 'Immerse yourself in Balinese culture with temple visits, traditional ceremonies, and tropical relaxation.',
            includes: [
                'Boutique resort accommodation',
                'All meals included',
                'Temple tours (Tanah Lot, Uluwatu)',
                'Traditional cooking class',
                'Balinese massage sessions',
                'Cultural dance performances',
                'Private transportation'
            ],
            itinerary: [
                'Day 1: Arrival and welcome dinner',
                'Day 2: Ubud rice terraces and monkey forest',
                'Day 3: Temple tour and cooking class',
                'Day 4: Beach day in Seminyak',
                'Day 5: Volcano sunrise trek',
                'Day 6: Cultural village visit',
                'Day 7: Spa day and shopping',
                'Day 8: Departure'
            ]
        },
        tokyo: {
            title: 'Tokyo Modern & Traditional',
            location: 'Tokyo, Japan',
            duration: '7 Days / 6 Nights',
            price: '$1,799',
            image: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=600',
            description: 'Discover the perfect blend of ancient traditions and modern innovation in Japan\'s vibrant capital.',
            includes: [
                '5-star hotel in Shibuya',
                'JR Pass for unlimited train travel',
                'Sushi making class with master chef',
                'Mount Fuji day trip',
                'Traditional tea ceremony',
                'Guided tours of major districts',
                'English-speaking guide'
            ],
            itinerary: [
                'Day 1: Arrival and Shibuya exploration',
                'Day 2: Traditional Tokyo (Asakusa, Meiji Shrine)',
                'Day 3: Mount Fuji day trip',
                'Day 4: Sushi class and Tsukiji market',
                'Day 5: Modern Tokyo (Harajuku, Ginza)',
                'Day 6: Tea ceremony and shopping',
                'Day 7: Departure'
            ]
        },
        paris: {
            title: 'Paris City of Love',
            location: 'Paris, France',
            duration: '5 Days / 4 Nights',
            price: '$1,599',
            image: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?w=600',
            description: 'Fall in love with Paris through its art, cuisine, and romantic atmosphere in this enchanting getaway.',
            includes: [
                'Boutique hotel near Louvre',
                'Seine river cruise with dinner',
                'Eiffel Tower restaurant dinner',
                'Versailles palace day trip',
                'Louvre and Musée d\'Orsay tours',
                'Wine tasting experience',
                'Metro passes included'
            ],
            itinerary: [
                'Day 1: Arrival and Champs-Élysées',
                'Day 2: Louvre and Seine cruise',
                'Day 3: Versailles day trip',
                'Day 4: Montmartre and Eiffel Tower dinner',
                'Day 5: Shopping and departure'
            ]
        },
        safari: {
            title: 'African Safari Experience',
            location: 'Serengeti, Tanzania',
            duration: '10 Days / 9 Nights',
            price: '$2,299',
            image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600',
            description: 'Witness the great migration and incredible wildlife in one of Africa\'s most spectacular national parks.',
            includes: [
                'Luxury safari lodge accommodation',
                'All meals and beverages',
                'Daily game drives with expert guides',
                'Hot air balloon safari',
                'Maasai village cultural visit',
                'Ngorongoro Crater tour',
                'All park fees and transfers'
            ],
            itinerary: [
                'Day 1-2: Arrival and Arusha National Park',
                'Day 3-5: Serengeti National Park',
                'Day 6-7: Ngorongoro Conservation Area',
                'Day 8: Hot air balloon safari',
                'Day 9: Maasai village visit',
                'Day 10: Departure'
            ]
        },
        australia: {
            title: 'Australian Highlights',
            location: 'Sydney & Melbourne',
            duration: '9 Days / 8 Nights',
            price: '$1,999',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600',
            description: 'Explore Australia\'s iconic cities, stunning coastlines, and unique wildlife in this comprehensive tour.',
            includes: [
                '4-star city center hotels',
                'Sydney Opera House tour',
                'Great Ocean Road scenic drive',
                'Wildlife sanctuary visits',
                'Harbor Bridge climb',
                'Domestic flights included',
                'Professional local guides'
            ],
            itinerary: [
                'Day 1-4: Sydney exploration',
                'Day 5: Flight to Melbourne',
                'Day 6-7: Great Ocean Road',
                'Day 8: Melbourne city tour',
                'Day 9: Departure'
            ]
        }
    };

    // Quick view functionality
    window.openQuickView = function(packageId) {
        const package = packageData[packageId];
        if (!package) return;

        const content = `
            <div class="quick-view-content">
                <img src="${package.image}" alt="${package.title}" style="width: 100%; height: 250px; object-fit: cover; border-radius: 10px; margin-bottom: 1rem;">
                <h2 style="color: #2c5aa0; margin-bottom: 0.5rem;">${package.title}</h2>
                <div style="display: flex; gap: 1rem; margin-bottom: 1rem; color: #666;">
                    <span><i class="fas fa-map-marker-alt"></i> ${package.location}</span>
                    <span><i class="fas fa-calendar"></i> ${package.duration}</span>
                </div>
                <p style="margin-bottom: 1.5rem;">${package.description}</p>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                    <div>
                        <h4 style="color: #2c5aa0; margin-bottom: 1rem;">Package Includes:</h4>
                        <ul style="list-style: none; padding: 0;">
                            ${package.includes.map(item => `<li style="margin-bottom: 0.5rem;"><i class="fas fa-check" style="color: #28a745; margin-right: 0.5rem;"></i>${item}</li>`).join('')}
                        </ul>
                    </div>
                    <div>
                        <h4 style="color: #2c5aa0; margin-bottom: 1rem;">Itinerary:</h4>
                        <ul style="list-style: none; padding: 0;">
                            ${package.itinerary.map(day => `<li style="margin-bottom: 0.5rem; font-size: 0.9rem;">${day}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                
                <div style="text-align: center; margin-top: 2rem; padding-top: 2rem; border-top: 2px solid #eee;">
                    <div style="font-size: 2rem; font-weight: 700; color: #2c5aa0; margin-bottom: 1rem;">${package.price} <span style="font-size: 1rem; color: #666;">per person</span></div>
                    <a href="booking.html" style="background: #ff6b35; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: 600;">Book This Package</a>
                </div>
            </div>
        `;

        modalContent.innerHTML = content;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    };

    // Close modal functionality
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Escape key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });

    // Package card animations
    const packageCards = document.querySelectorAll('.package-card');
    
    packageCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        // Intersection Observer for animation
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(card);
    });

    // Package card hover effects
    packageCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        });
    });
});