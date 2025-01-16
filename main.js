// Font size controls
document.querySelectorAll('.font-size a').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const html = document.documentElement;
        const currentSize = parseInt(window.getComputedStyle(html).fontSize);
        
        switch(e.target.className) {
            case 'decrease':
                if (currentSize > 12) {
                    html.style.fontSize = (currentSize - 1) + 'px';
                }
                break;
            case 'normal':
                html.style.fontSize = '16px';
                break;
            case 'increase':
                if (currentSize < 20) {
                    html.style.fontSize = (currentSize + 1) + 'px';
                }
                break;
        }
        
        // Store preference in localStorage
        localStorage.setItem('fontSize', html.style.fontSize);
    });
});

// Restore font size preference
const savedFontSize = localStorage.getItem('fontSize');
if (savedFontSize) {
    document.documentElement.style.fontSize = savedFontSize;
}

// News ticker functionality
let currentNewsIndex = 0;
const newsItems = document.querySelectorAll('.news-item');
let isPlaying = true;
let tickerInterval;

function showNextNews() {
    newsItems.forEach(item => item.style.display = 'none');
    currentNewsIndex = (currentNewsIndex + 1) % newsItems.length;
    newsItems[currentNewsIndex].style.display = 'block';
}

function showPrevNews() {
    newsItems.forEach(item => item.style.display = 'none');
    currentNewsIndex = (currentNewsIndex - 1 + newsItems.length) % newsItems.length;
    newsItems[currentNewsIndex].style.display = 'block';
}

// Initialize news display
newsItems.forEach((item, index) => {
    item.style.display = index === 0 ? 'block' : 'none';
});

// Ticker controls
document.querySelector('.ticker-controls .next').addEventListener('click', () => {
    showNextNews();
    resetInterval();
});

document.querySelector('.ticker-controls .prev').addEventListener('click', () => {
    showPrevNews();
    resetInterval();
});

document.querySelector('.ticker-controls .pause').addEventListener('click', function() {
    isPlaying = !isPlaying;
    this.textContent = isPlaying ? '||' : '▶';
    if (isPlaying) {
        startInterval();
    } else {
        clearInterval(tickerInterval);
    }
});

function startInterval() {
    tickerInterval = setInterval(() => {
        if (isPlaying) {
            showNextNews();
        }
    }, 5000);
}

function resetInterval() {
    clearInterval(tickerInterval);
    startInterval();
}

// Start the ticker
startInterval();

// Tab panel functionality
const tabPanels = document.querySelectorAll('.tab-panel > div');
const noticesList = document.querySelector('.public-notices ul');

// Store original notices
const originalNotices = noticesList.innerHTML;

tabPanels.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        // Remove active state from all tabs
        tabPanels.forEach(t => {
            t.style.backgroundColor = '';
            t.style.color = '';
        });

        // Set active state
        tab.style.backgroundColor = '#e17f35';
        tab.style.color = 'white';

        // Update content based on tab
        switch(index) {
            case 0: // Public Notices
                noticesList.innerHTML = originalNotices;
                break;
            case 1: // News & Events
                noticesList.innerHTML = `
                    <li>
                        <a href="#">► JEE(Main) 2024 Session-2 Results Announced <span class="new-tag">NEW</span></a>
                    </li>
                    <li>
                        <a href="#">► Important Update: JEE Advanced Registration to Begin Soon <span class="new-tag">NEW</span></a>
                    </li>
                `;
                break;
            case 2: // Candidate Activity
                noticesList.innerHTML = `
                    <li>
                        <a href="#">► Download JEE(Main) 2024 Session-2 Admit Card</a>
                    </li>
                    <li>
                        <a href="#">► View JEE(Main) 2024 Session-2 Response Sheet</a>
                    </li>
                `;
                break;
        }
    });
});

// Add hover effect to navigation
document.querySelectorAll('.main-nav a').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.backgroundColor = '#d17025';
        link.style.transition = 'background-color 0.3s';
    });

    link.addEventListener('mouseleave', () => {
        link.style.backgroundColor = '';
    });
});

// Make announcement banner text blink
const redTexts = document.querySelectorAll('.red-text');
let isVisible = true;

setInterval(() => {
    isVisible = !isVisible;
    redTexts.forEach(text => {
        text.style.visibility = isVisible ? 'visible' : 'hidden';
    });
}, 800);

// Add link hover effects
document.querySelectorAll('.public-notices a').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.textDecoration = 'underline';
        link.style.color = '#003d7a';
    });

    link.addEventListener('mouseleave', () => {
        link.style.textDecoration = 'none';
        link.style.color = '#0056b3';
    });
});

// Skip to main content functionality
document.querySelector('a[href="#main-content"]').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.content').scrollIntoView({ behavior: 'smooth' });
});

// Initialize tooltips for new tags
document.querySelectorAll('.new-tag').forEach(tag => {
    tag.title = 'Added in last 24 hours';
});