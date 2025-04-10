// Help Center Search Functionality
const searchBar = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-bar button');

// Sample help articles data
const helpArticles = [
    { title: 'Getting Started Guide', category: 'Getting Started', content: 'Learn how to get started with our platform...' },
    { title: 'Common Issues', category: 'Troubleshooting', content: 'Solutions to common problems...' },
    { title: 'Advanced Features', category: 'Advanced Features', content: 'Learn about our advanced features...' }
];

// Search functionality
searchButton.addEventListener('click', () => {
    const searchTerm = searchBar.value.toLowerCase();
    if (searchTerm) {
        const results = helpArticles.filter(article => 
            article.title.toLowerCase().includes(searchTerm) || 
            article.content.toLowerCase().includes(searchTerm)
        );
        displaySearchResults(results);
    }
});

// Display search results
function displaySearchResults(results) {
    const resultsContainer = document.createElement('div');
    resultsContainer.className = 'search-results';
    
    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No results found. Try a different search term.</p>';
    } else {
        resultsContainer.innerHTML = results.map(article => `
            <div class="search-result-item">
                <h3>${article.title}</h3>
                <p>${article.content}</p>
                <span class="category">${article.category}</span>
            </div>
        `).join('');
    }
    
    // Remove existing results if any
    const existingResults = document.querySelector('.search-results');
    if (existingResults) {
        existingResults.remove();
    }
    
    // Add new results
    document.querySelector('.help-container').appendChild(resultsContainer);
}

// Category navigation
document.querySelectorAll('.category-item a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const category = e.target.closest('.category-item').querySelector('h3').textContent;
        const categoryArticles = helpArticles.filter(article => article.category === category);
        displaySearchResults(categoryArticles);
    });
  });

// Navigation and UI Elements
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const serviceCards = document.querySelectorAll('.service-card');
const contactForm = document.getElementById('contact-form');
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const testimonialSlider = document.querySelector('.testimonial-slider');
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const prevButton = document.querySelector('.testimonial-controls button:first-child');
const nextButton = document.querySelector('.testimonial-controls button:last-child');
const stats = document.querySelectorAll('.stat-number');
const statsSection = document.querySelector('.stats');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Service cards animation
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

serviceCards.forEach(card => {
    observer.observe(card);
});

// Portfolio filtering
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Testimonial slider
let currentSlide = 0;

function showSlide(index) {
    testimonialSlides.forEach((slide, i) => {
        slide.style.transform = `translateX(${100 * (i - index)}%)`;
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonialSlides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
    showSlide(currentSlide);
}

prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);

// Auto-advance testimonials
setInterval(nextSlide, 5000);

// Form validation
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const formValues = Object.fromEntries(formData.entries());
    
    // Basic validation
    let isValid = true;
    const requiredFields = ['name', 'email', 'message'];
    
    requiredFields.forEach(field => {
        const input = contactForm.querySelector(`[name="${field}"]`);
        if (!formValues[field]) {
            input.classList.add('error');
            isValid = false;
    } else {
            input.classList.remove('error');
        }
    });
    
    if (isValid) {
        // Here you would typically send the form data to a server
        console.log('Form submitted:', formValues);
        contactForm.reset();
        alert('Thank you for your message! We will get back to you soon.');
    }
});

// Remove error class on input
contactForm.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', () => {
        input.classList.remove('error');
    });
});

// Stats counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            stats.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const step = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        stat.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
      } else {
                        stat.textContent = target;
                    }
                };
                
                updateCounter();
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statsObserver.observe(statsSection);

// Scroll to Top Button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
document.body.appendChild(scrollToTopBtn);

// Style the scroll to top button
const style = document.createElement('style');
style.textContent = `
    .scroll-to-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #0066ff;
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        font-size: 20px;
        transition: opacity 0.3s;
    }
    
    .scroll-to-top:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(style);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'block';
      } else {
        scrollToTopBtn.style.display = 'none';
    }
});

// Scroll to top functionality
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Search functionality
const searchForm = document.getElementById('search-form');
const helpSearchInput = document.getElementById('search-input');
const helpCancelIcon = document.querySelector('.cancel-icon');

// Handle form submission
searchForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission
    
    const searchQuery = helpSearchInput.value.trim();
    if (searchQuery) {
        // Encode the search query for URL
        const encodedQuery = encodeURIComponent(searchQuery);
        // Redirect to help.webex.com with the search query
        window.location.href = `https://help.webex.com/en-us/result/${encodedQuery}?tab=support&offset=10`;
    }
});

// Show/hide cancel icon based on input
helpSearchInput.addEventListener('input', function() {
    helpCancelIcon.style.display = this.value ? 'block' : 'none';
});

// Clear search on cancel icon click
helpCancelIcon.addEventListener('click', function() {
    helpSearchInput.value = '';
    this.style.display = 'none';
    helpSearchInput.focus();
}); 