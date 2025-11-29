// ============================================
// GESTOR DE USUARIO
// Preparado para conectar con Base de Datos
// ============================================

class UserManager {
    constructor() {
        this.user = null;
    }

    // Inicializar
    async init() {
        await this.loadUser();
        this.renderHeader();
        this.renderMenu();
    }

    // Cargar usuario (FUTURO: desde API/Base de datos)
    async loadUser() {
        // TEMPORAL: Datos de ejemplo
        // FUTURO: const response = await fetch('/api/user/current');
        // FUTURO: this.user = await response.json();
        
        this.user = {
            id: 1,
            nombre: 'Juan Pérez',
            email: 'juan.perez@ganaderia.com',
            rol: 'Administrador',
            avatar: null, // URL de la imagen o null
            iniciales: 'JP'
        };
    }

    // Renderizar header
    renderHeader() {
        document.getElementById('userAvatar').textContent = this.user.iniciales;
        document.getElementById('userName').textContent = this.user.nombre;
        document.getElementById('userRole').textContent = this.user.rol;
    }

    // Renderizar menú
    renderMenu() {
        const menu = document.getElementById('userMenu');
        
        const header = `
            <div class="dropdown-header">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <div class="user-avatar" style="width: 48px; height: 48px; font-size: 18px;">
                        ${this.user.iniciales}
                    </div>
                    <div>
                        <div style="font-size: 16px; font-weight: 800; color: #1F2937;">${this.user.nombre}</div>
                        <div style="font-size: 13px; color: #6B7280;">${this.user.email}</div>
                    </div>
                </div>
            </div>
        `;

        const body = `
            <div class="dropdown-body">
                <button class="user-menu-item" onclick="UserManager.goToProfile()">
                    <div class="user-menu-item-icon" style="background: var(--color-primary-light); color: var(--color-primary);">👤</div>
                    <div class="user-menu-item-text">
                        <div class="user-menu-item-title">Mi Perfil</div>
                        <div class="user-menu-item-desc">Ver y editar información personal</div>
                    </div>
                </button>

                <button class="user-menu-item" onclick="UserManager.goToSettings()">
                    <div class="user-menu-item-icon" style="background: rgba(245, 158, 11, 0.1); color: #F59E0B;">⚙️</div>
                    <div class="user-menu-item-text">
                        <div class="user-menu-item-title">Configuración</div>
                        <div class="user-menu-item-desc">Preferencias del sistema</div>
                    </div>
                </button>

                <button class="user-menu-item" onclick="NotificationManager.toggle()">
                    <div class="user-menu-item-icon" style="background: rgba(139, 92, 246, 0.1); color: #8B5CF6;">🔔</div>
                    <div class="user-menu-item-text">
                        <div class="user-menu-item-title">Notificaciones</div>
                        <div class="user-menu-item-desc">${NotificationManager.unreadCount} notificaciones sin leer</div>
                    </div>
                </button>

                <button class="user-menu-item" onclick="alert('📚 Centro de ayuda en desarrollo')">
                    <div class="user-menu-item-icon" style="background: rgba(16, 185, 129, 0.1); color: #10B981;">❓</div>
                    <div class="user-menu-item-text">
                        <div class="user-menu-item-title">Ayuda y Soporte</div>
                        <div class="user-menu-item-desc">Documentación y tutoriales</div>
                    </div>
                </button>

                <div class="user-menu-divider"></div>

                <button class="user-menu-item user-menu-logout" onclick="UserManager.logout()">
                    <div class="user-menu-item-icon">🚪</div>
                    <div class="user-menu-item-text">
                        <div class="user-menu-item-title">Cerrar Sesión</div>
                        <div class="user-menu-item-desc">Salir del sistema</div>
                    </div>
                </button>
            </div>
        `;

        menu.innerHTML = header + body;
    }

    // Toggle menú
    toggle() {
        const menu = document.getElementById('userMenu');
        const notificationsMenu = document.getElementById('notificationsMenu');
        
        notificationsMenu.classList.remove('show');
        menu.classList.toggle('show');
    }

    // Ir a perfil
    goToProfile() {
        this.toggle();
        if (typeof loadModule === 'function') {
            loadModule('settings');
        }
    }

    // Ir a configuración
    goToSettings() {
        this.toggle();
        if (typeof loadModule === 'function') {
            loadModule('settings');
        }
    }

    // Cerrar sesión (FUTURO: llamar a API)
    async logout() {
        if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
            // FUTURO: await fetch('/api/auth/logout', { method: 'POST' });
            
            alert('👋 Sesión cerrada. Redirigiendo al login...');
            // window.location.href = '/login.html';
        }
    }
}

// Instancia global
const UserManager = new UserManager();