const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

// Function to set canvas dimensions dynamically
function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

setCanvasSize();
window.addEventListener('resize', setCanvasSize);

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
const fontSize = 14;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(1);

// Dark mode toggle
document.getElementById('themeToggle').addEventListener('click', function () {
    const container = document.querySelector('.container');
    container.classList.toggle('dark-mode');

    // Toggle icon
    const icon = this.querySelector('i');
    if (container.classList.contains('dark-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// Load saved theme
window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('theme');
    const container = document.querySelector('.container');
    const icon = document.getElementById('themeToggle').querySelector('i');

    if (savedTheme === 'dark') {
        container.classList.add('dark-mode');
        icon.classList.replace('fa-moon', 'fa-sun');
    }
});

// Matrix animation
function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff00';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(draw, 50);

document.querySelectorAll('.socials a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); 
        window.open(this.href, '_blank', 'noopener,noreferrer');
    });
});