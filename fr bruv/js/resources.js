document.addEventListener('DOMContentLoaded', () => {
    // Resource filtering functionality
    const resourceFilter = document.getElementById('resource-filter');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const resourceSections = document.querySelectorAll('.resource-category');
    const featuredSection = document.querySelector('.featured-resources');
    
    if (resourceFilter) {
        resourceFilter.addEventListener('input', filterResources);
    }
    
    // Filter button functionality
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const filter = button.getAttribute('data-filter');
                
                // Show/hide sections based on filter
                if (filter === 'all') {
                    resourceSections.forEach(section => {
                        section.style.display = 'block';
                    });
                    if (featuredSection) featuredSection.style.display = 'block';
                } else {
                    resourceSections.forEach(section => {
                        if (section.getAttribute('data-category') === filter) {
                            section.style.display = 'block';
                        } else {
                            section.style.display = 'none';
                        }
                    });
                    // Always hide featured when filtering by category
                    if (featuredSection) featuredSection.style.display = 'none';
                }
                
                // Clear text filter when using buttons
                if (resourceFilter) resourceFilter.value = '';
            });
        });
    }
    
    function filterResources() {
        const searchTerm = resourceFilter.value.toLowerCase().trim();
        
        // If search is empty, reset to showing everything
        if (searchTerm === '') {
            // Find the active filter button and use its filter
            const activeButton = document.querySelector('.filter-btn.active');
            if (activeButton) {
                activeButton.click(); // Trigger the active filter
            } else {
                // Default: show everything
                document.querySelector('[data-filter="all"]').click();
            }
            return;
        }
        
        // Filter featured resources
        if (featuredSection) {
            const featuredCards = featuredSection.querySelectorAll('.resource-card');
            let hasVisibleFeatured = false;
            
            featuredCards.forEach(card => {
                const cardText = card.textContent.toLowerCase();
                if (cardText.includes(searchTerm)) {
                    card.style.display = 'flex';
                    hasVisibleFeatured = true;
                } else {
                    card.style.display = 'none';
                }
            });
            
            featuredSection.style.display = hasVisibleFeatured ? 'block' : 'none';
        }
        
        // Filter main resource categories
        resourceSections.forEach(section => {
            const resourceItems = section.querySelectorAll('.resource-item, .book-card');
            let hasVisibleItems = false;
            
            resourceItems.forEach(item => {
                const itemText = item.textContent.toLowerCase();
                if (itemText.includes(searchTerm)) {
                    item.style.display = '';
                    hasVisibleItems = true;
                } else {
                    item.style.display = 'none';
                }
            });
            
            section.style.display = hasVisibleItems ? 'block' : 'none';
        });
    }
}); 