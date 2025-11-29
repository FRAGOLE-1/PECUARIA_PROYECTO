// ============================================
// CATTLESIS - JAVASCRIPT PRINCIPAL (LIMPIO)
// SOLO: LOGIN + checkAuth
// ============================================

// Configuración de la API
const API_URL = 'http://localhost:8000';

// ============================================
// LOGIN
// ============================================
const loginForm = document.getElementById('loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // DEMO: Login temporal (antes de conectar backend real)
        if (username === 'admin' && password === 'admin123') {

            localStorage.setItem('token', 'demo-token-12345');
            localStorage.setItem('user', JSON.stringify({
                username: username,
                nombre: 'Administrador',
                rol: 'admin'
            }));

            if (window.opener) {
                window.opener.postMessage('login-success', '*');
            }

            window.open('index.html', '_blank', 'fullscreen=yes');

            setTimeout(() => window.close(), 500);

        } else {
            alert('❌ Usuario o contraseña incorrectos\n\nDemo: admin / admin123');
        }
    });
}

// ============================================
// VERIFICAR SESIÓN
// ============================================
function checkAuth() {
    const token = localStorage.getItem('token');
    const currentPage = window.location.pathname;

    if (!token && 
        !currentPage.includes('login.html') &&
        !currentPage.includes('launcher.html')) 
    {
        window.location.href = 'login.html';
    }
}

document.addEventListener('DOMContentLoaded', checkAuth);
