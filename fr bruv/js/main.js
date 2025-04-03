// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add active class to current navigation item
const currentLocation = location.href;
const menuItems = document.querySelectorAll('.nav-links a');
menuItems.forEach(item => {
    if(item.href === currentLocation){
        item.classList.add('active');
    }
});

// Smooth reveal animation for elements
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

document.querySelectorAll('.feature-card, .timeline-item, .application-card').forEach(el => {
    observer.observe(el);
});

// Add dark mode toggle
const darkModeToggle = document.createElement('button');
darkModeToggle.innerHTML = '🌙';
darkModeToggle.classList.add('dark-mode-toggle');
document.body.appendChild(darkModeToggle);

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    darkModeToggle.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// Add search functionality
const searchInput = document.createElement('input');
searchInput.type = 'search';
searchInput.placeholder = 'Rechercher...';
searchInput.classList.add('search-input');
document.querySelector('.main-nav').appendChild(searchInput);

// Hamburger Menu Toggle
const hamburgerButton = document.getElementById('hamburger-button');
const navLinks = document.getElementById('nav-links');
// Optional: Select header controls if they need to be part of the mobile menu flow
// const headerControls = document.querySelector('.header-controls');

hamburgerButton.addEventListener('click', () => {
    navLinks.classList.toggle('is-active');
    hamburgerButton.classList.toggle('is-active');

    // Toggle ARIA attribute for accessibility
    const isExpanded = navLinks.classList.contains('is-active');
    hamburgerButton.setAttribute('aria-expanded', isExpanded);

    // Optional: Toggle header controls visibility if needed
    // if (headerControls) {
    //    headerControls.classList.toggle('is-active');
    // }
});

// Close mobile menu if a link is clicked (optional but good UX)
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('is-active')) {
            navLinks.classList.remove('is-active');
            hamburgerButton.classList.remove('is-active');
            hamburgerButton.setAttribute('aria-expanded', 'false');
            // if (headerControls) headerControls.classList.remove('is-active');
        }
    });
});

// --- Keep existing JS code below ---

// Add smooth scrolling for navigation links (check if still needed/working)
// ... (rest of your existing JS)

// Add active class to current navigation item
// ... (rest of your existing JS)

// Smooth reveal animation for elements
// ... (rest of your existing JS)

// Add dark mode toggle
// ... (rest of your existing JS - consider moving the button creation/placement logic if needed)

// Add search functionality
// ... (rest of your existing JS - consider moving the input creation/placement logic if needed)

// --- Modification for Dark Mode Toggle and Search Placement ---
// Instead of appending to body/main-nav directly, you might want to
// append them to the '.header-controls' div for better layout control.
const headerControlsContainer = document.querySelector('.header-controls');
const darkModeToggle = document.createElement('button');
// ... (setup dark mode toggle) ...
if (headerControlsContainer) {
    headerControlsContainer.appendChild(darkModeToggle);
} else {
    // Fallback if container doesn't exist (e.g., append to nav)
    document.querySelector('.main-nav').appendChild(darkModeToggle);
}

const searchInput = document.createElement('input');
// ... (setup search input) ...
if (headerControlsContainer) {
    headerControlsContainer.appendChild(searchInput);
} else {
     // Fallback
    document.querySelector('.main-nav').appendChild(searchInput);
}

// Dark mode toggle logic remains the same
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    darkModeToggle.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    // Optional: Save preference to localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// Optional: Check for saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '☀️';
    } else {
        darkModeToggle.innerHTML = '🌙';
    }

    // Re-apply active class correctly after DOM is loaded
    const currentLocation = window.location.href;
    const menuItems = document.querySelectorAll('.nav-links a');
    let foundActive = false;
    menuItems.forEach(item => {
        // Remove existing active classes first
        item.classList.remove('active');
        // Check for exact match or if it's the homepage index.html
        if (item.href === currentLocation || (currentLocation.endsWith('/') && item.pathname.endsWith('index.html'))) {
            item.classList.add('active');
            foundActive = true;
        }
    });
    // Default to 'Accueil' if no other match is found on the root path
    if (!foundActive && currentLocation.endsWith('/')) {
         const homeLink = document.querySelector('.nav-links a[href$="index.html"]');
         if (homeLink) homeLink.classList.add('active');
    }
});

// --- Add Glossary Filter Functionality ---
const glossaryFilter = document.getElementById('glossary-filter');
const glossaryList = document.getElementById('glossary-list');

if (glossaryFilter && glossaryList) {
    const glossaryEntries = glossaryList.querySelectorAll('.glossary-entry');

    glossaryFilter.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();

        glossaryEntries.forEach(entry => {
            const term = entry.querySelector('dt').textContent.toLowerCase();
            const definition = entry.querySelector('dd').textContent.toLowerCase();

            if (term.includes(searchTerm) || definition.includes(searchTerm)) {
                entry.classList.remove('hidden');
            } else {
                entry.classList.add('hidden');
            }
        });
    });
}

// --- Add Scroll-to-Top Button Functionality ---
const scrollToTopButton = document.getElementById('scroll-to-top');

if (scrollToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) { // Show button after scrolling 300px
            scrollToTopButton.classList.add('visible');
        } else {
            scrollToTopButton.classList.remove('visible');
        }
    });

    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// --- Improved Active Link Handling ---
document.addEventListener('DOMContentLoaded', () => {
    // Theme handling (existing code)
    const savedTheme = localStorage.getItem('theme');
    const darkModeToggle = document.querySelector('.dark-mode-toggle'); // Ensure toggle exists
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
       if(darkModeToggle) darkModeToggle.innerHTML = '☀️';
    } else {
       if(darkModeToggle) darkModeToggle.innerHTML = '🌙';
    }

    // Active link logic
    const currentLocation = window.location.href;
    const menuItems = document.querySelectorAll('.nav-links a');

    menuItems.forEach(item => {
        // Remove existing active classes and aria-current
        item.classList.remove('active');
        item.removeAttribute('aria-current');

        // Normalize URLs for comparison (remove trailing slash, hash, query params)
        const itemHref = item.href.replace(/#.*$/, '').replace(/\?.*$/, '').replace(/\/$/, '');
        const currentHref = currentLocation.replace(/#.*$/, '').replace(/\?.*$/, '').replace(/\/$/, '');

        // Check for exact match or if it's the homepage index.html on root path
        if (itemHref === currentHref || (currentHref.endsWith('/') && item.pathname === '/index.html')) {
             item.classList.add('active');
             item.setAttribute('aria-current', 'page'); // Use aria-current
        }
    });

     // Default to 'Accueil' if no other match is found and we are on the root path
     // Check if any link already has aria-current
     const hasActiveLink = document.querySelector('.nav-links a[aria-current="page"]');
     if (!hasActiveLink && (window.location.pathname === '/' || window.location.pathname.endsWith('index.html'))) {
          const homeLink = document.querySelector('.nav-links a[href$="index.html"]');
          if (homeLink) {
              homeLink.classList.add('active');
              homeLink.setAttribute('aria-current', 'page');
          }
     }
});

// Ensure Dark mode toggle logic is placed correctly (likely within DOMContentLoaded or similar)
const darkModeToggle = document.querySelector('.dark-mode-toggle'); // Select it again if needed
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        darkModeToggle.innerHTML = isDarkMode ? '☀️' : '🌙';
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });
}

// Hamburger Menu Toggle (existing code - ensure it's present)
const hamburgerButton = document.getElementById('hamburger-button');
const navLinks = document.getElementById('nav-links');
if (hamburgerButton && navLinks) {
    hamburgerButton.addEventListener('click', () => {
        // ... (toggle logic as before) ...
    });
    // ... (close menu on link click logic as before) ...
}

// Intersection Observer (existing code - ensure it's present)
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Optional: Stop observing once visible
        }
    });
}, observerOptions);
document.querySelectorAll('.feature-card, .timeline-item, .application-card, .ethical-issue, .glossary-entry, .type-card').forEach(el => {
    observer.observe(el);
});

// Search Input (existing code - ensure it's present and placed correctly)
// ...

// Smooth Scrolling (existing code - ensure it's present)
// ... 

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Element Selectors ---
    const body = document.body;
    const hamburgerButton = document.getElementById('hamburger-button');
    const navLinksContainer = document.getElementById('nav-links');
    const navLinks = navLinksContainer ? navLinksContainer.querySelectorAll('a') : [];
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const glossaryFilter = document.getElementById('glossary-filter');
    const glossaryList = document.getElementById('glossary-list');
    const scrollToTopButton = document.getElementById('scroll-to-top');
    const elementsToObserve = document.querySelectorAll('.feature-card, .timeline-item, .application-card, .ethical-issue, .glossary-entry, .type-card, .figure-card');

    // --- Dark Mode ---
    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            if (darkModeToggle) darkModeToggle.textContent = '☀️'; // Fixed: use textContent instead of innerHTML
        } else {
            body.classList.remove('dark-mode');
            if (darkModeToggle) darkModeToggle.textContent = '🌙'; // Fixed: use textContent instead of innerHTML
        }
    }

    // Apply saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    applyTheme(initialTheme);

    // Set up dark mode toggle if it exists
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            const newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // --- Hamburger Menu ---
    if (hamburgerButton && navLinksContainer) {
        hamburgerButton.addEventListener('click', () => {
            const isExpanded = hamburgerButton.getAttribute('aria-expanded') === 'true';
            hamburgerButton.setAttribute('aria-expanded', !isExpanded);
            navLinksContainer.classList.toggle('active');
            hamburgerButton.classList.toggle('active');
            body.classList.toggle('no-scroll'); // Prevent body scroll when menu is open
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navLinksContainer.classList.contains('active')) {
                    hamburgerButton.setAttribute('aria-expanded', 'false');
                    navLinksContainer.classList.remove('active');
                    hamburgerButton.classList.remove('active');
                    body.classList.remove('no-scroll');
                }
            });
        });
    }

    // --- Active Link Highlighting ---
    // Get current page path
    const currentPath = window.location.pathname;
    const currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';
    
    // Set active link
    navLinks.forEach(link => {
        // Get the href value and extract just the filename
        const linkHref = link.getAttribute('href');
        const linkPage = linkHref.substring(linkHref.lastIndexOf('/') + 1);
        
        // If this link points to the current page
        if (linkPage === currentPage) {
            link.setAttribute('aria-current', 'page');
            link.classList.add('active'); // Keep class for styling
        } else {
            link.removeAttribute('aria-current');
            link.classList.remove('active');
        }
    });

    // --- Smooth Reveal Animation ---
    if ('IntersectionObserver' in window) {
        const observerOptions = { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Stop observing once visible
                }
            });
        }, observerOptions);

        // Ensure there are elements to observe before trying to observe them
        if (elementsToObserve.length > 0) {
            elementsToObserve.forEach(el => observer.observe(el));
        }
    } else {
        // Fallback for browsers without IntersectionObserver
        elementsToObserve.forEach(el => el.classList.add('visible'));
    }

    // --- Glossary Filter ---
    if (glossaryFilter && glossaryList) {
        const glossaryEntries = glossaryList.querySelectorAll('.glossary-entry');

        if (glossaryEntries.length > 0) {
            glossaryFilter.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase().trim();

                glossaryEntries.forEach(entry => {
                    const termElement = entry.querySelector('dt');
                    const definitionElement = entry.querySelector('dd');

                    // Safely access text content
                    const term = termElement ? termElement.textContent.toLowerCase() : '';
                    const definition = definitionElement ? definitionElement.textContent.toLowerCase() : '';

                    // Show/hide based on search term
                    if (term.includes(searchTerm) || definition.includes(searchTerm)) {
                        entry.classList.remove('hidden');
                    } else {
                        entry.classList.add('hidden');
                    }
                });
                
                // Optional: Show message if no results
                const hasVisibleEntries = Array.from(glossaryEntries).some(
                    entry => !entry.classList.contains('hidden')
                );
                
                // Handle no results message if you have one
                const noResultsMsg = glossaryList.querySelector('.no-results');
                if (noResultsMsg) {
                    noResultsMsg.style.display = hasVisibleEntries ? 'none' : 'block';
                }
            });
        }
    }

    // --- Scroll-to-Top Button ---
    if (scrollToTopButton) {
        // Initial check in case page is already scrolled
        if (window.pageYOffset > 300) {
            scrollToTopButton.classList.add('visible');
        }
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopButton.classList.add('visible');
            } else {
                scrollToTopButton.classList.remove('visible');
            }
        }, { passive: true }); // Optimize scroll performance

        // Smooth scroll to top on click
        scrollToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}); 