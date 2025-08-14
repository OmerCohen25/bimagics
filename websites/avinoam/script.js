document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Elements ---
    const productGrid = document.getElementById('product-grid');
    const searchInput = document.getElementById('search-input');
    const categoryFiltersContainer = document.getElementById('category-filters');
    const cardTemplate = document.getElementById('product-card-template');
    const placeholder = document.getElementById('catalog-placeholder');
    const catalogTitle = document.getElementById('catalog-title');
    
    // New elements for the dropdown functionality
    const categoryFilterToggle = document.getElementById('category-filter-toggle');
    const categoryFilterLabel = document.getElementById('category-filter-label');

    // State variables
    let allProducts = [];
    let swiper;

    // --- Main Initialization ---
    async function initializeApp() {
        setupEventListeners();
        setupMobileNav();
        await loadProducts();
        updateFooter();
    }

    async function loadProducts() {
        try {
            // Fetch products with cache-busting parameter
            const response = await fetch(`products.json?v=${new Date().getTime()}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            allProducts = await response.json();
            
            if (allProducts.length > 0) {
                if (placeholder) placeholder.style.display = 'none';
                renderCategories(allProducts);
                filterAndRender(); // Initial render of all products
            } else {
                if (placeholder) placeholder.innerHTML = '<p>לא נמצאו מוצרים בקטלוג.</p>';
            }
        } catch (error) {
            console.error("Could not load products:", error);
            if (placeholder) placeholder.innerHTML = '<p style="color: red;">שגיאה בטעינת הקטלוג. נסו לרענן את הדף.</p>';
        }
    }

    // --- Rendering and UI Updates ---
    function renderCategories(products) {
        const categories = ['הכל', ...new Set(products.map(p => p.category).filter(Boolean).sort())];
        categoryFiltersContainer.innerHTML = '';
        
        categories.forEach(category => {
            const btn = document.createElement('button');
            btn.className = 'category-btn';
            btn.textContent = category;
            if (category === 'הכל') btn.classList.add('active');
            
            btn.addEventListener('click', () => handleCategoryClick(category));
            categoryFiltersContainer.appendChild(btn);
        });
    }

    function renderProducts(productsToRender) {
        productGrid.innerHTML = '';
        
        if (productsToRender.length === 0) {
            productGrid.innerHTML = '<p style="text-align:center; padding: 20px; width: 100%;">לא נמצאו מוצרים התואמים לסינון.</p>';
            destroySwiper();
            return;
        }

        productsToRender.forEach(product => {
            const cardClone = cardTemplate.content.cloneNode(true);
            
            cardClone.querySelector('.product-name').textContent = product.name;
            cardClone.querySelector('.product-sku').textContent = `מק״ט: ${product.sku || 'N/A'}`;
            cardClone.querySelector('.product-description').textContent = product.description || '';
            
            const imgElement = cardClone.querySelector('.product-image');
            imgElement.src = product.imageUrl;
            imgElement.alt = product.name;
            
            productGrid.appendChild(cardClone);
        });

        initOrUpdateSwiper();
    }

    // --- Unified Filtering Logic ---
    function filterAndRender() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const activeCategory = document.querySelector('#category-filters .category-btn.active').textContent;

        const filteredProducts = allProducts.filter(p => {
            const matchesCategory = (activeCategory === 'הכל' || p.category === activeCategory);
            const matchesSearch = !searchTerm || 
                (p.name && p.name.toLowerCase().includes(searchTerm)) ||
                (p.sku && p.sku.toLowerCase().includes(searchTerm)) ||
                (p.description && p.description.toLowerCase().includes(searchTerm));
            
            return matchesCategory && matchesSearch;
        });

        renderProducts(filteredProducts);
        updateUITexts(activeCategory, searchTerm);
    }
    
    function updateUITexts(category, searchTerm) {
        if (catalogTitle) {
            if (searchTerm) {
                catalogTitle.textContent = `תוצאות חיפוש עבור "${searchTerm}"`;
            } else if (category !== 'הכל') {
                catalogTitle.textContent = `קטלוג המוצרים: ${category}`;
            } else {
                catalogTitle.textContent = 'קטלוג המוצרים';
            }
        }
    }

    // --- Event Handlers ---
    function handleCategoryClick(category) {
        // Update active button
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        const activeBtn = Array.from(document.querySelectorAll('.category-btn')).find(b => b.textContent === category);
        if (activeBtn) activeBtn.classList.add('active');
        
        // Clear search input for a cleaner experience
        searchInput.value = '';

        // On mobile, update label and close dropdown
        if (window.innerWidth < 768) {
            categoryFilterLabel.textContent = category === 'הכל' ? 'סינון לפי קטגוריה' : `קטגוריה: ${category}`;
            closeDropdown();
        }

        filterAndRender();
    }
    
    function closeDropdown() {
        categoryFilterToggle.classList.remove('open');
        categoryFiltersContainer.classList.remove('open');
    }

    // --- Swiper (Slider) Functions ---
    function initOrUpdateSwiper() {
        destroySwiper();
        swiper = new Swiper('.swiper-container', {
            loop: false,
            spaceBetween: 20,
            pagination: { el: '.swiper-pagination', clickable: true },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
            slidesPerView: 1.2,
            centeredSlides: true,
            breakpoints: {
                640: { slidesPerView: 2, spaceBetween: 20, centeredSlides: false },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
                1300: { slidesPerView: 5 },
            }
        });
    }

    function destroySwiper() {
        if (swiper) {
            swiper.destroy(true, true);
            swiper = undefined;
        }
    }

    // --- Mobile Navigation Setup ---
    function setupMobileNav() {
        const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
        const mobileNav = document.querySelector('.mobile-nav');
        const closeNavBtn = document.querySelector('.close-nav-btn');
        const navOverlay = document.querySelector('.nav-overlay');

        const toggleNav = () => {
            mobileNav.classList.toggle('active');
            navOverlay.classList.toggle('active');
        };

        if (mobileNavToggle) mobileNavToggle.addEventListener('click', toggleNav);
        if (closeNavBtn) closeNavBtn.addEventListener('click', toggleNav);
        if (navOverlay) navOverlay.addEventListener('click', toggleNav);
    }
    
    // --- General Event Listeners Setup ---
    function setupEventListeners() {
        // Search functionality
        searchInput.addEventListener('input', () => {
            // When user types, reset category to 'All' visually
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            const allButton = Array.from(document.querySelectorAll('.category-btn')).find(b => b.textContent === 'הכל');
            if (allButton) allButton.classList.add('active');
            filterAndRender();
        });

        // Dropdown toggle logic
        categoryFilterToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            categoryFilterToggle.classList.toggle('open');
            categoryFiltersContainer.classList.toggle('open');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!categoryFilterToggle.contains(e.target) && !categoryFiltersContainer.contains(e.target)) {
                closeDropdown();
            }
        });
    }

    // --- Footer Update ---
    function updateFooter() {
        const footer = document.querySelector('.site-footer p');
        if (footer) {
            footer.innerHTML = `&copy; ${new Date().getFullYear()} כל הזכויות שמורות | אבינועם נעים - א.נ טורקיז שיווק בע"מ`;
        }
    }

    // --- Start the application ---
    initializeApp();
});
