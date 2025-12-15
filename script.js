// Taskbar Navigation
const taskbarItems = document.querySelectorAll('.taskbar-item');
const sections = document.querySelectorAll('.section');

taskbarItems.forEach(item => {
    item.addEventListener('click', () => {
        const sectionId = item.getAttribute('data-section');
        const targetSection = document.getElementById(sectionId);
        
        if (targetSection) {
            // Remove active class from all items
            taskbarItems.forEach(i => i.classList.remove('active'));
            // Add active class to clicked item
            item.classList.add('active');
            
            // Scroll to section
            const offsetTop = targetSection.offsetTop - 20;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Update active taskbar item on scroll
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    taskbarItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-section') === current) {
            item.classList.add('active');
        }
    });
});

// Desktop icon clicks
document.querySelectorAll('.desktop-icon').forEach(icon => {
    icon.addEventListener('dblclick', () => {
        const label = icon.querySelector('.icon-label').textContent;
        if (label === 'My Music') {
            document.getElementById('music').scrollIntoView({ behavior: 'smooth' });
        } else if (label === 'Events') {
            document.getElementById('events').scrollIntoView({ behavior: 'smooth' });
        } else if (label === 'Team') {
            document.getElementById('team').scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Window controls
document.querySelectorAll('.window-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const window = btn.closest('.window');
        
        if (btn.classList.contains('close')) {
            // Don't actually close, just hide (for retro feel)
            window.style.opacity = '0.5';
            setTimeout(() => {
                window.style.opacity = '1';
            }, 500);
        } else if (btn.classList.contains('minimize')) {
            window.style.transform = 'scale(0.8)';
            window.style.opacity = '0.7';
            setTimeout(() => {
                window.style.transform = 'scale(1)';
                window.style.opacity = '1';
            }, 300);
        } else if (btn.classList.contains('maximize')) {
            if (window.style.width === '100%') {
                window.style.width = '';
                window.style.height = '';
            } else {
                window.style.width = '95%';
                window.style.height = '90vh';
            }
        }
    });
});

// Start button menu (simple implementation)
const startButton = document.querySelector('.start-button');
if (startButton) {
    startButton.addEventListener('click', () => {
        // Toggle active state
        startButton.style.border = '2px inset var(--win-bg)';
        setTimeout(() => {
            startButton.style.border = '2px outset var(--win-bg)';
        }, 200);
        
    });
}


// Music card play button functionality
document.querySelectorAll('.music-card').forEach(card => {
    card.addEventListener('click', (e) => {
        if (!e.target.closest('.play-button')) {
            const musicTitle = card.querySelector('h3').textContent;
            
            // Check if it's the "Coming Soon" card
            if (card.classList.contains('coming-soon')) {
                alert(`🎵 ${musicTitle}\n\nNew music coming soon! Stay tuned.`);
                return;
            }
            
            // Check if it has a YouTube link
            const youtubeLink = card.getAttribute('data-youtube-link');
            if (youtubeLink) {
                // Open YouTube link in new tab
                window.open(youtubeLink, '_blank');
            } else {
                // If no link set, show alert (for now)
                alert(`▶ ${musicTitle}\n\nYouTube link will open here.`);
            }
        }
    });
});

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        alert(`✓ Subscribed!\n\nEmail: ${email}\n\nThank you for joining!`);
        newsletterForm.reset();
    });
}

// Event card button functionality
document.querySelectorAll('.event-button').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const eventTitle = button.closest('.event-card').querySelector('h3').textContent;
        alert(`🎫 ${eventTitle}\n\n[Redirecting to ticket purchase...]`);
    });
});

// Make windows draggable (simple implementation)
let isDragging = false;
let currentWindow = null;
let offsetX = 0;
let offsetY = 0;

document.querySelectorAll('.window-titlebar').forEach(titlebar => {
    titlebar.addEventListener('mousedown', (e) => {
        isDragging = true;
        currentWindow = titlebar.closest('.window');
        const rect = currentWindow.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        currentWindow.style.position = 'fixed';
        currentWindow.style.zIndex = '1000';
    });
});

document.addEventListener('mousemove', (e) => {
    if (isDragging && currentWindow) {
        currentWindow.style.left = (e.clientX - offsetX) + 'px';
        currentWindow.style.top = (e.clientY - offsetY) + 'px';
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    if (currentWindow) {
        currentWindow.style.zIndex = '';
    }
    currentWindow = null;
});

// Add some retro glitch effects on hover
document.querySelectorAll('.window').forEach(window => {
    window.addEventListener('mouseenter', () => {
        if (Math.random() > 0.9) {
            window.style.transform = 'translate(2px, 2px)';
            setTimeout(() => {
                window.style.transform = '';
            }, 100);
        }
    });
});

// Update clock (optional - can be made functional)
function updateClock() {
    const clock = document.querySelector('.taskbar-clock');
    if (clock) {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        const displayMinutes = minutes.toString().padStart(2, '0');
        clock.textContent = `${displayHours}:${displayMinutes} ${ampm}`;
    }
}

// Update clock every minute
setInterval(updateClock, 60000);
updateClock(); // Initial update

// Retro cursor effect
document.addEventListener('mousemove', (e) => {
    // Optional: Add custom cursor trail or effects
});

// Show welcome window on load
window.addEventListener('load', () => {
    const welcomeWindow = document.querySelector('.welcome-window');
    if (welcomeWindow) {
        welcomeWindow.style.animation = 'fadeIn 0.5s ease-in';
    }
    
});

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Show team member images when they're loaded
document.querySelectorAll('.member-image img').forEach(img => {
    img.onload = function() {
        this.style.display = 'block';
        const placeholder = this.parentElement;
        placeholder.style.background = '#000';
        const span = placeholder.querySelector('span');
        if (span) span.style.display = 'none';
    };
    img.onerror = function() {
        // Image not found, keep placeholder
        this.style.display = 'none';
    };
    // Trigger check
    if (img.complete) {
        img.onload();
    }
});

// Show behind the scenes photos when they're loaded
document.querySelectorAll('.photo-border img').forEach(img => {
    img.onload = function() {
        this.style.display = 'block';
        const span = this.nextElementSibling;
        if (span) span.style.display = 'none';
    };
    img.onerror = function() {
        // Image not found, show placeholder
        this.style.display = 'none';
        const span = this.nextElementSibling;
        if (span) span.style.display = 'flex';
    };
    // Trigger check
    if (img.complete) {
        img.onload();
    } else {
        // If not complete, check if it exists
        img.onerror();
    }
});