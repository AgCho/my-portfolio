// Function to toggle the navigation menu's visibility
function toggleMenu() {
    const nav = document.querySelector('nav ul');
    nav.classList.toggle('visible');
}

// Add event listener to the hamburger icon (assuming you have one)
const hamburger = document.querySelector('.hamburger');
if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
}

// Implement smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Function to filter projects by category
function filterProjects(category) {
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
        if (category === 'all' || project.classList.contains(category)) {
            project.style.display = 'block';
        } else {
            project.style.display = 'none';
        }
    });
}

// Add event listeners to filter buttons
const filterButtons = document.querySelectorAll('.filter-button');
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        filterProjects(category);
    });
});

// Function to display images in a modal view (lightbox effect)
function openLightbox(src) {
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="${src}" alt="Project Image">
            <span class="close">&times;</span>
        </div>
    `;
    document.body.appendChild(lightbox);

    // Close lightbox when clicking the close button
    lightbox.querySelector('.close').addEventListener('click', () => {
        document.body.removeChild(lightbox);
    });
}

// Add event listeners to project images
const projectImages = document.querySelectorAll('.project img');
projectImages.forEach(img => {
    img.addEventListener('click', () => {
        openLightbox(img.src);
    });
});

/// Form validation and real-time feedback
const form = document.getElementById('contactForm');
const feedback = document.getElementById('formFeedback');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        feedback.textContent = 'Please fill in all fields.';
        feedback.style.color = 'red';
        return;
    }

    // Simple email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        feedback.textContent = 'Please enter a valid email address.';
        feedback.style.color = 'red';
        return;
    }

    feedback.textContent = 'Form submitted successfully!';
    feedback.style.color = 'green';
    form.reset();
});

// Real-time feedback for form fields
form.addEventListener('input', function() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name && email && message) {
        feedback.textContent = '';
    }
});