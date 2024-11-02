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

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    // Toggle menu
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent click from bubbling to document
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinksItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // Smooth scrolling for anchor links
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
});

// Optional: Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Optional: Parallax effect for header
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('header');
    if (header) {
        header.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Optional: Add active state to navigation links based on scroll position
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });


window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const profileImage = document.querySelector('.profile-image-container');
    const headerContent = document.querySelector('.header-content');
    const researchSection = document.querySelector('#research');
    
    // Get the position of the research section
    const researchPosition = researchSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    // Calculate fade based on research section position
    if (researchPosition < windowHeight) {
        // Calculate opacity (1 to 0 as research section approaches)
        const opacity = Math.max(0, Math.min(1, researchPosition / windowHeight));
        
        // Apply fade to header content and profile image
        headerContent.style.opacity = opacity;
        profileImage.style.opacity = opacity;
        
        // Optional: Add a transform effect as it fades
        headerContent.style.transform = `translateY(${(1 - opacity) * -50}px)`;
        profileImage.style.transform = `translateY(${(1 - opacity) * -50}px)`;
    } else {
        // Reset styles when scrolling back up
        headerContent.style.opacity = 1;
        profileImage.style.opacity = 1;
        headerContent.style.transform = 'translateY(0)';
        profileImage.style.transform = 'translateY(0)';
    }
});
async function updateScholarStats() {
    try {
        const response = await fetch('/assets/data/scholar_stats.json');
        const data = await response.json();
        
        // Update your HTML elements
        document.getElementById('citation-count').textContent = data.citations;
        document.getElementById('publication-count').textContent = data.publications;
        document.getElementById('h-index').textContent = data.h_index;
        document.getElementById('last-updated').textContent = data.last_updated;
    } catch (error) {
        console.error('Error fetching scholar stats:', error);
    }
}

// Call when page loads
document.addEventListener('DOMContentLoaded', updateScholarStats);
async function updateScholarStats() {
    try {
        const response = await fetch('/assets/data/scholar_stats.json');
        const data = await response.json();
        
        // Update your HTML elements
        document.getElementById('citation-count').textContent = data.citations;
        document.getElementById('publication-count').textContent = data.publications;
        document.getElementById('h-index').textContent = data.h_index;
        document.getElementById('last-updated').textContent = data.last_updated;
    } catch (error) {
        console.error('Error fetching scholar stats:', error);
    }
}

async function updatePublications() {
    try {
        const response = await fetch('/website/assets/data/scholar_stats.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const publicationList = document.getElementById('recent-publications');
        
        // Clear existing publications
        publicationList.innerHTML = '';
        
        // Add new publications
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
        });
        
    } catch (error) {
        console.error('Error updating publications:', error);
    }
}

// Add this to your existing DOMContentLoaded listener
document.addEventListener('DOMContentLoaded', () => {
    updateScholarStats();
    updatePublications();
});

// Call when page loads
document.addEventListener('DOMContentLoaded', updateScholarStats);
});