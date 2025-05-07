// demo/feed.js

const feedCardData = [
    { type: 'kpi', value: '$ 12,473,920', label: 'Total Revenue · Last 12 M', views: 1900, likes: 120 },
    { type: 'score-card', title: 'Monthly Revenue vs Target', current: '$1.48 M', target: '$1.60 M', progress: 92, views: 870, likes: 75 },
    { type: 'score-card', title: 'Active Users vs Competitor', current: '157 K', target: '142 K', progress: 110, views: 1400, likes: 92 },
    { type: 'chart', chartId: 'revenueLine', title: 'Revenue Trend', height: 220, views: 2300, likes: 150, code: 'SELECT month, SUM(revenue) FROM monthly_sales GROUP BY month ORDER BY month;' },
    { type: 'chart', chartId: 'regionPie', title: 'Sales by Region', height: 200, containerClass: 'pie-doughnut-container', views: 2100, likes: 130 },
    { type: 'chart', chartId: 'productBar', title: 'Top Products (Revenue)', height: 220, views: 980, likes: 60 },
    { type: 'table', title: 'Top Customers', headers: ['Customer', 'Country', 'Spend ($)'],
        rows: [
            ['Acme Corp', 'USA', '1,200,000'], ['Globex', 'Canada', '985,500'], ['Initech', 'UK', '873,000'],
            ['Umbrella', 'Germany', '712,400'], ['Stark Industries', 'USA', '598,900']
        ], views: 650, likes: 45
    },
    { type: 'kpi', value: '157,332', label: 'Monthly Active Users', views: 1100, likes: 88 },
    { type: 'chart', chartId: 'deviceDoughnut', title: 'Device Distribution', height: 200, containerClass: 'pie-doughnut-container', views: 740, likes: 50 },
    { type: 'chart', chartId: 'trafficBar', title: 'Traffic Sources (Users)', height: 220, views: 920, likes: 70 },
    { type: 'kpi', value: '3.8 %', label: 'Monthly Churn Rate', views: 530, likes: 30 },
    { type: 'chart', chartId: 'forecastLine', title: 'Revenue Forecast (Next 6M)', height: 220, views: 1200, likes: 100, code: 'PREDICT future_revenue USING sales_model FOR NEXT 6 MONTHS;' },
];


function createCardElement(card, index) {
    const article = document.createElement('article');
    article.className = 'bi-card';
    article.setAttribute('data-aos', 'fade-up');
    article.setAttribute('data-aos-delay', `${index * 60}`);
    if (card.type === 'chart') {
        article.setAttribute('data-chart-id', card.chartId);
    }

    let contentHTML = '<div class="card-content">';
    if (card.title) contentHTML += `<h3 class="card-title">${card.title}</h3>`;

    switch (card.type) {
        case 'kpi':
            contentHTML += `<span class="kpi-big">${card.value}</span><span class="kpi-small">${card.label}</span>`;
            break;
        case 'score-card':
            contentHTML += `<div class="kpi-small">${card.current} / ${card.target}</div>`;
            contentHTML += `<div class="progress"><div style="width:${Math.min(card.progress, 100)}%"></div></div>`; // Cap progress at 100% for display
            if(card.progress > 100) contentHTML += `<div class="kpi-small" style="color:var(--accent); margin-top:5px;">Exceeded target!</div>`;
            break;
        case 'chart':
            contentHTML += `<div class="chart-container ${card.containerClass || ''}" style="height:${card.height}px;"><canvas id="${card.chartId}"></canvas></div>`;
            break;
        case 'table':
            contentHTML += '<div class="table-wrap"><table><thead><tr>';
            card.headers.forEach(h => contentHTML += `<th>${h}</th>`);
            contentHTML += '</tr></thead><tbody>';
            card.rows.forEach(r => {
                contentHTML += '<tr>';
                r.forEach(cell => contentHTML += `<td>${cell}</td>`);
                contentHTML += '</tr>';
            });
            contentHTML += '</tbody></table></div>';
            break;
    }
    contentHTML += '</div>'; // end card-content

    // Card Actions (Toolbar from feed.html)
    contentHTML += `
        <div class="card-actions">
            <div class="action-buttons-group">
                <button class="icon-btn like" aria-label="Like this card">
                    <i class="fa-regular fa-heart"></i><span class="label like-count">${card.likes || 0}</span>
                </button>
                <button class="icon-btn share" aria-label="Share this card">
                    <i class="fa-solid fa-share-nodes"></i><span class="label">Share</span>
                </button>
                ${card.code ? `<button class="icon-btn code-toggle" aria-label="Toggle code snippet"><i class="fa-solid fa-code"></i><span class="label">Code</span></button>` : ''}
            </div>
            <span class="views-count"><i class="fa-regular fa-eye"></i> ${card.views || 0}</span>
        </div>
    `;
    if (card.code) {
        contentHTML += `<pre class="code-block">${card.code}</pre>`;
    }

    article.innerHTML = contentHTML;
    return article;
}

function initializeCharts(sectionElement) {
    const chartCards = sectionElement.querySelectorAll('.bi-card[data-chart-id]');
    const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
    const mutedColor = 'rgba(110, 238, 158, .15)'; // Soft accent for fills/grids
    const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-muted').trim();
    const gridColor = 'rgba(255, 255, 255, 0.08)';

    const commonOptions = (isDonutOrPie = false) => ({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: isDonutOrPie, // Show legend for pie/doughnut
                position: 'bottom',
                labels: { color: textColor, padding:15, font: {size: 12} }
            },
            tooltip: {
                backgroundColor: 'rgba(12, 12, 18, 0.85)', // Darker tooltip
                titleColor: accentColor,
                bodyColor: '#e0e0e0',
                borderColor: 'rgba(255,255,255,0.1)',
                borderWidth: 1,
                padding: 10,
                cornerRadius: 6,
            }
        },
        scales: isDonutOrPie ? {} : { // No scales for pie/doughnut
            y: {
                beginAtZero: true,
                grid: { color: gridColor, drawBorder: false },
                ticks: { color: textColor, font: {size: 11} }
            },
            x: {
                grid: { display: false }, // Usually no vertical grid lines for these charts
                ticks: { color: textColor, font: {size: 11} }
            }
        },
        // Default font color for any text not covered by specific labels/ticks options
        color: textColor 
    });

    const chartConfigs = {
        revenueLine: (ctx) => new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                datasets: [{
                    label: 'Revenue', data: [65, 59, 80, 81, 56, 55, 72].map(d => d * 10000),
                    borderColor: accentColor, tension: 0.35, fill: true, backgroundColor: mutedColor,
                    pointRadius: 2, pointBackgroundColor: accentColor, pointHoverRadius: 5
                }]
            },
            options: commonOptions()
        }),
        regionPie: (ctx) => new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['North America', 'EMEA', 'APAC', 'LATAM'],
                datasets: [{ data: [45, 25, 20, 10], backgroundColor: ['#6eee9e', '#5ad78f', '#47c080', '#34a871'] }]
            },
            options: commonOptions(true)
        }),
        productBar: (ctx) => new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Gizmo X', 'Widget Pro', 'Bolt Mini', 'Nano S'],
                datasets: [{
                    label: 'Revenue', data: [1200, 950, 700, 450].map(d => d * 100),
                    backgroundColor: accentColor, borderRadius: 4, barPercentage: 0.7
                }]
            },
            options: {...commonOptions(), indexAxis: 'y' } // Horizontal bar chart
        }),
        deviceDoughnut: (ctx) => new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Mobile', 'Desktop', 'Tablet'],
                datasets: [{ data: [62, 30, 8], backgroundColor: ['#6eee9e', '#47c080', '#2a8c62'] }]
            },
            options: commonOptions(true)
        }),
        trafficBar: (ctx) => new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Organic', 'Paid', 'Referral', 'Social', 'Email'],
                datasets: [{
                    label: 'Users', data: [3500, 2200, 1500, 1200, 800],
                    backgroundColor: mutedColor, borderColor: accentColor, borderWidth:1, borderRadius: 4, barPercentage: 0.6
                }]
            },
            options: commonOptions()
        }),
        forecastLine: (ctx) => new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Forecast', data: [75, 78, 82, 80, 85, 88].map(d => d * 10000),
                    borderColor: accentColor, borderDash: [5, 5], tension: 0.3, fill: false,
                    pointRadius: 2, pointBackgroundColor: accentColor, pointHoverRadius: 5
                }, {
                    label: 'Actual (Past)', data: [65, 59, 80, 81, 56, 55].map(d => d * 10000), // Example past data
                    borderColor: '#555e68', tension: 0.3, fill: false,
                    pointRadius: 0
                }]
            },
            options: commonOptions()
        }),
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const chartId = card.dataset.chartId;
                const canvas = card.querySelector(`canvas#${chartId}`);
                if (canvas && chartConfigs[chartId] && !card.dataset.chartInitialized) {
                    const ctx = canvas.getContext('2d');
                    chartConfigs[chartId](ctx);
                    card.dataset.chartInitialized = 'true';
                    // obs.unobserve(card); // Optional: unobserve after loading
                }
            }
        });
    }, { rootMargin: "0px", threshold: 0.1 });

    chartCards.forEach(card => observer.observe(card));
}


function setupCardInteractions(sectionElement) {
    sectionElement.addEventListener('click', (e) => {
        const target = e.target;

        // Like button
        const likeBtn = target.closest('.icon-btn.like');
        if (likeBtn) {
            likeBtn.classList.toggle('liked');
            const icon = likeBtn.querySelector('i');
            icon.classList.toggle('fa-solid', likeBtn.classList.contains('liked'));
            icon.classList.toggle('fa-regular', !likeBtn.classList.contains('liked'));
            const countSpan = likeBtn.querySelector('.like-count');
            if (countSpan) {
                let currentLikes = parseInt(countSpan.textContent);
                countSpan.textContent = likeBtn.classList.contains('liked') ? currentLikes + 1 : Math.max(0, currentLikes - 1);
            }
        }

        // Share button
        const shareBtn = target.closest('.icon-btn.share');
        if (shareBtn) {
            const cardTitle = shareBtn.closest('.bi-card').querySelector('.card-title')?.textContent || "Check this insight";
            const shareData = {
                title: `BI Magics: ${cardTitle}`,
                text: `Insight from BI Magics Demo: ${cardTitle}`,
                url: window.location.href // Shares the main demo URL
            };
            if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
                navigator.share(shareData).catch(err => console.error("Share failed:", err));
            } else {
                // Fallback for browsers that don't support navigator.share or can't share the data
                navigator.clipboard.writeText(shareData.url)
                    .then(() => alert("Link copied to clipboard! (Sharing not available)"))
                    .catch(err => alert("Could not copy link."));
            }
        }
        
        // Code toggle
        const codeToggleBtn = target.closest('.icon-btn.code-toggle');
        if (codeToggleBtn) {
            const card = codeToggleBtn.closest('.bi-card');
            const codeBlock = card.querySelector('.code-block');
            if (codeBlock) {
                const isVisible = codeBlock.style.display === 'block';
                codeBlock.style.display = isVisible ? 'none' : 'block';
                codeToggleBtn.classList.toggle('active', !isVisible);
            }
        }
    });

    // Card swipe functionality (Simplified: removes card on swipe left/right)
    // This might conflict with main view swipe. Ensure e.stopPropagation() if needed
    // or more careful target checking in main swipe.
    let swipedCard = null;
    let swipeStartX = 0;
    let cardInitialTransform = '';

    sectionElement.addEventListener('pointerdown', e => {
        const cardElement = e.target.closest('.bi-card');
        // IMPORTANT: Prevent swipe if interacting with buttons or other interactive elements within the card
        if (!cardElement || e.target.closest('button, a, canvas, table, .code-block')) {
            swipedCard = null;
            return;
        }
        
        swipedCard = cardElement;
        swipeStartX = e.clientX;
        swipedCard.style.transition = 'none'; // Disable transition during drag
        cardInitialTransform = getComputedStyle(swipedCard).transform;
        if (cardInitialTransform === 'none') cardInitialTransform = '';
        swipedCard.style.cursor = 'grabbing';
        e.stopPropagation(); // Prevent main view swipe
    }, { passive: false }); // Not passive because of stopPropagation

    sectionElement.addEventListener('pointermove', e => {
        if (!swipedCard) return;
        const diffX = e.clientX - swipeStartX;
        swipedCard.style.transform = `${cardInitialTransform} translateX(${diffX}px) rotate(${diffX / 40}deg)`;
        e.stopPropagation();
    }, { passive: true });

    sectionElement.addEventListener('pointerup', e => {
        if (!swipedCard) return;
        const diffX = e.clientX - swipeStartX;
        const threshold = swipedCard.offsetWidth * 0.3; // 30% of card width
        
        swipedCard.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
        swipedCard.style.cursor = 'grab';

        if (Math.abs(diffX) > threshold) { // Swipe out
            swipedCard.style.transform = `translateX(${diffX > 0 ? '120vw' : '-120vw'}) rotate(${diffX / 20}deg)`;
            swipedCard.style.opacity = '0';
            setTimeout(() => {
                if(swipedCard) swipedCard.remove(); // Remove after animation
            }, 300);
        } else { // Snap back
            swipedCard.style.transform = cardInitialTransform || 'none';
        }
        swipedCard = null;
        e.stopPropagation();
    }, { passive: false });

    sectionElement.addEventListener('pointerleave', e => { // If pointer leaves the feed while dragging a card
        if (swipedCard) {
            swipedCard.style.transition = 'transform 0.3s ease-out';
            swipedCard.style.transform = cardInitialTransform || 'none';
            swipedCard.style.cursor = 'grab';
            swipedCard = null;
        }
    }, { passive: true });
}


export function renderFeedView() {
    const section = document.createElement('section');
    section.className = 'view';
    section.id = 'feed';

    const feedLayout = document.createElement('div');
    feedLayout.className = 'feed-layout';

    feedCardData.forEach((card, index) => {
        feedLayout.appendChild(createCardElement(card, index));
    });
    
    section.innerHTML = `<h2 class="view-title" data-aos="fade-up">✨ Magic Feed</h2>`;
    section.appendChild(feedLayout);

    // Initialize charts and interactions after elements are in DOM
    // Defer to allow DOM to update and AOS to potentially run first
    setTimeout(() => {
        initializeCharts(section);
        setupCardInteractions(section);
    }, 0);
    
    return section;
}
