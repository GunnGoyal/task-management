const sideMenu = document.querySelector('aside');
const menuBtn = document.querySelector('.right .top button');
const closeBtn = document.getElementById('close_btn');
const themeToggler = document.querySelector('.theme-toggler');

// Show sidebar
menuBtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';
});

// Close sidebar
closeBtn.addEventListener('click', () => {
    sideMenu.style.display = 'none';
});

// Theme Toggler
themeToggler.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme-variables');

    // Toggle active class
    themeToggler.querySelectorAll('span').forEach(span => {
        span.classList.toggle('active');
    });
});
