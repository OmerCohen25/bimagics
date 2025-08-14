<script>
document.addEventListener('DOMContentLoaded', () => {

    // --- State and DOM Elements ---
    let allProducts = [];
    let swiper;
    const productGrid = document.getElementById('product-grid');
    const searchInput = document.getElementById('search-input');
    const categoryFiltersContainer = document.getElementById('category-filters');
    const cardTemplate = document.getElementById('product-card-template');
    const placeholder = document.getElementById('catalog-placeholder');

    // --- Main Function to Load and Render Everything ---
    async function initializeCatalog() {
        try {
            // הוספת פרמטר ייחודי למניעת שמירה במטמון (cache) של הדפדפן
            const response = await fetch(`products.json?v=${new Date().getTime()}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            allProducts = await response.json();
            
            if (allProducts.length > 0) {
                placeholder.remove(); // הסרת הודעת הטעינה
                renderCategories(allProducts);
                renderProducts(allProducts);
            } else {
                placeholder.innerHTML = '<p>לא נמצאו מוצרים בקטלוג.</p>';
            }

        } catch (error) {
            console.error("Could not load or render products:", error);
            placeholder.innerHTML = '<p style="color: red;">שגיאה בטעינת הקטלוג.</p>';
        }
    }

    // --- Rendering Functions ---
    function renderCategories(products) {
        const categories = ['הכל', ...new Set(products.map(p => p.category).filter(Boolean))];
        categoryFiltersContainer.innerHTML = ''; // ניקוי פילטרים קיימים
        
        categories.forEach(category => {
            const btn = document.createElement('button');
            btn.className = 'category-btn';
            btn.textContent = category;
            if (category === 'הכל') btn.classList.add('active');
            
            btn.addEventListener('click', () => handleFilter(category));
            categoryFiltersContainer.appendChild(btn);
        });
    }

    function renderProducts(productsToRender) {
        productGrid.innerHTML = ''; // ניקוי הגריד לפני רינדור מחדש
        
        if (productsToRender.length === 0) {
            productGrid.innerHTML = '<p style="text-align:center; padding: 20px; width: 100%;">לא נמצאו מוצרים התואמים לחיפוש.</p>';
            destroySwiper();
            return;
        }

        productsToRender.forEach(product => {
            const cardClone = cardTemplate.content.cloneNode(true);
            
            cardClone.querySelector('.product-name').textContent = product.name;
            cardClone.querySelector('.product-sku').textContent = `מק״ט: ${product.sku || 'N/A'}`;
            cardClone.querySelector('.product-description').textContent = product.description || '';
            cardClone.querySelector('.product-image').src = product.imageUrl;
            cardClone.querySelector('.product-image').alt = product.name;
            
            productGrid.appendChild(cardClone);
        });

        initOrUpdateSwiper();
    }

    // --- Swiper (Slider) Initialization ---
    function initOrUpdateSwiper() {
        destroySwiper();
        swiper = new Swiper('.swiper-container', {
            loop: false,
            spaceBetween: 20,
            pagination: { el: '.swiper-pagination', clickable: true },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
            breakpoints: {
                320: { slidesPerView: 1, spaceBetween: 10 },
                768: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 20 },
                1300: { slidesPerView: 4, spaceBetween: 25 },
            }
        });
    }

    function destroySwiper() {
        if (swiper) {
            swiper.destroy(true, true);
            swiper = undefined;
        }
    }

    // --- Event Handlers ---
    function handleFilter(category) {
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        const activeBtn = Array.from(document.querySelectorAll('.category-btn')).find(b => b.textContent === category);
        if (activeBtn) activeBtn.classList.add('active');
        
        searchInput.value = ''; // ניקוי החיפוש בעת לחיצה על קטגוריה
        const productsToRender = category === 'הכל' ? allProducts : allProducts.filter(p => p.category === category);
        renderProducts(productsToRender);
    }
    
    function handleSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        // באירוע חיפוש, נסמן את קטגוריית 'הכל' כפעילה
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        const allButton = Array.from(document.querySelectorAll('.category-btn')).find(b => b.textContent === 'הכל');
        if (allButton) allButton.classList.add('active');

        const filteredProducts = allProducts.filter(p => 
            (p.name && p.name.toLowerCase().includes(searchTerm)) ||
            (p.sku && p.sku.toLowerCase().includes(searchTerm)) ||
            (p.description && p.description.toLowerCase().includes(searchTerm))
        );
        renderProducts(filteredProducts);
    }

    // --- Mobile Navigation Logic ---
    function setupMobileNav() {
        const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
        const mobileNav = document.querySelector('.mobile-nav');
        const closeNavBtn = document.querySelector('.close-nav-btn');
        const navOverlay = document.querySelector('.nav-overlay');
        const navLinks = document.querySelectorAll('.mobile-nav a');

        const toggleNav = () => {
            mobileNav.classList.toggle('active');
            navOverlay.classList.toggle('active');
        };

        mobileNavToggle.addEventListener('click', toggleNav);
        closeNavBtn.addEventListener('click', toggleNav);
        navOverlay.addEventListener('click', toggleNav);
        navLinks.forEach(link => link.addEventListener('click', toggleNav));
    }
    
    // --- Initial Setup ---
    searchInput.addEventListener('input', handleSearch);
    setupMobileNav();
    initializeCatalog();
});
</script>
