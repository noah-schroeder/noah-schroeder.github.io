// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        document.getElementById('navbar').classList.add('scrolled');
    } else {
        document.getElementById('navbar').classList.remove('scrolled');
    }
});

// Scroll effects for header and profile image
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const profileImage = document.querySelector('.profile-image-container');
    const headerContent = document.querySelector('.header-content');
    const researchSection = document.querySelector('#research');
    
    if (researchSection) {
        const researchPosition = researchSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (researchPosition < windowHeight) {
            const opacity = Math.max(0, Math.min(1, researchPosition / windowHeight));
            headerContent.style.opacity = opacity;
            profileImage.style.opacity = opacity;
            headerContent.style.transform = `translateY(${(1 - opacity) * -50}px)`;
            profileImage.style.transform = `translateY(${(1 - opacity) * -50}px)`;
        } else {
            headerContent.style.opacity = 1;
            profileImage.style.opacity = 1;
            headerContent.style.transform = 'translateY(0)';
            profileImage.style.transform = 'translateY(0)';
        }
    }
});

// Scholar stats and publications functions
async function updateScholarStats() {
    try {
        const response = await fetch('./assets/data/scholar_stats.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Update stats
        document.getElementById('citation-count').textContent = data.citations;
        document.getElementById('publication-count').textContent = data.publications;
        document.getElementById('h-index').textContent = data.h_index;
        document.getElementById('last-updated').textContent = data.last_updated;
        
        console.log('Scholar stats updated successfully');
    } catch (error) {
        console.error('Error fetching scholar stats:', error);
    }
}

async function updatePublications() {
    try {
        console.log('Starting to fetch publications...');
        const response = await fetch('./assets/data/scholar_stats.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Fetched publication data:', data);
        
        const publicationList = document.getElementById('recent-publications');
        if (!publicationList) {
            console.error('Publication list container not found!');
            return;
        }
        
        // Clear existing publications
        publicationList.innerHTML = '';
        
        // Add new publications
        if (data.recent_publications && data.recent_publications.length > 0) {
            data.recent_publications.forEach(pub => {
                const pubDiv = document.createElement('div');
                pubDiv.className = 'publication-item';
                pubDiv.setAttribute('data-aos', 'fade-up');
                
                pubDiv.innerHTML = `
                    <div class="publication-year">${pub.year}</div>
                    <h3><a href="${pub.url}" target="_blank">${pub.title}</a></h3>
                    <p>${pub.journal}</p>
                `;
                
                publicationList.appendChild(pubDiv);
                console.log('Added publication:', pub.title);
            });
        } else {
            console.log('No publications found in data');
            publicationList.innerHTML = '<p>No recent publications found.</p>';
        }
    } catch (error) {
        console.error('Error updating publications:', error);
        const publicationList = document.getElementById('recent-publications');
        if (publicationList) {
            publicationList.innerHTML = '<p>Error loading publications. Please try again later.</p>';
        }
    }
}

// Single DOMContentLoaded event listener for all initializations
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        navLinksItems.forEach(item => {
            item.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update scholar stats and publications
    updateScholarStats();
    updatePublications();
});

// Optional: Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});