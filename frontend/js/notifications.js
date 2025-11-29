// ============================================
// GESTOR DE NOTIFICACIONES
// Preparado para conectar con Base de Datos
// ============================================

class NotificationManager {
    constructor() {
        this.notifications = [];
        this.unreadCount = 0;
    }

    // Inicializar
    async init() {
        await this.loadNotifications();
        this.render();
        this.updateBadge();
    }

    // Cargar notificaciones (FUTURO: desde API/Base de datos)
    async loadNotifications() {
        // TEMPORAL: Datos de ejemplo
        // FUTURO: const response = await fetch('/api/notifications');
        // FUTURO: this.notifications = await response.json();
        
        this.notifications = [
            {
                id: 1,
                type: 'urgente',
                icon: '⚠️',
                title: 'Mantenimiento Vencido',
                description: 'Tractor John Deere requiere mantenimiento urgente',
                time: 'Hace 2 horas',
                read: false,
                createdAt: new Date('2025-10-18T08:00:00')
            },
            {
                id: 2,
                type: 'advertencia',
                icon: '💊',
                title: 'Stock Bajo',
                description: 'Antibiótico Terramicina - Solo 3 frascos disponibles',
                time: 'Hace 5 horas',
                read: false,
                createdAt: new Date('2025-10-18T05:00:00')
            },
            {
                id: 3,
                type: 'info',
                icon: '🤰',
                title: 'Parto Próximo',
                description: 'Vaca Margarita (#1234) - Parto estimado en 8 días',
                time: 'Hace 1 día',
                read: false,
                createdAt: new Date('2025-10-17T10:00:00')
            },
            {
                id: 4,
                type: 'exito',
                icon: '💰',
                title: 'Pago Recibido',
                description: 'Venta de leche - $2,450.00 depositados',
                time: 'Hace 1 día',
                read: false,
                createdAt: new Date('2025-10-17T09:00:00')
            },
            {
                id: 5,
                type: 'info',
                icon: '📊',
                title: 'Reporte Generado',
                description: 'Reporte mensual de producción disponible',
                time: 'Hace 2 días',
                read: false,
                createdAt: new Date('2025-10-16T10:00:00')
            }
        ];

        this.unreadCount = this.notifications.filter(n => !n.read).length;
    }

    // Renderizar notificaciones
    render() {
        const menu = document.getElementById('notificationsMenu');
        
        const header = `
            <div class="dropdown-header">
                <div class="dropdown-title">🔔 Notificaciones</div>
                <div class="dropdown-subtitle">
                    ${this.unreadCount > 0 ? `Tienes ${this.unreadCount} notificaciones sin leer` : 'No tienes notificaciones sin leer'}
                </div>
            </div>
        `;

        const body = `
            <div class="dropdown-body">
                ${this.notifications.map(notif => `
                    <div class="dropdown-item notification-item notification-${notif.type} ${!notif.read ? 'unread' : ''}" 
                         onclick="NotificationManager.markAsRead(${notif.id})">
                        <div class="dropdown-item-icon">${notif.icon}</div>
                        <div class="dropdown-item-content">
                            <div class="dropdown-item-title">${notif.title}</div>
                            <div class="dropdown-item-desc">${notif.description}</div>
                            <div class="dropdown-item-time">${notif.time}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        const footer = `
            <div class="dropdown-footer">
                <a href="#" class="dropdown-footer-link" onclick="NotificationManager.markAllAsRead(); return false;">
                    ✓ Marcar todas como leídas
                </a>
            </div>
        `;

        menu.innerHTML = header + body + footer;
    }

    // Actualizar badge
    updateBadge() {
        const badge = document.getElementById('notificationBadge');
        if (this.unreadCount > 0) {
            badge.classList.add('show');
        } else {
            badge.classList.remove('show');
        }
    }

    // Toggle menú
    toggle() {
        const menu = document.getElementById('notificationsMenu');
        const userMenu = document.getElementById('userMenu');
        
        userMenu.classList.remove('show');
        menu.classList.toggle('show');
    }

    // Marcar como leída (FUTURO: actualizar en base de datos)
    async markAsRead(id) {
        // FUTURO: await fetch(`/api/notifications/${id}/read`, { method: 'POST' });
        
        const notif = this.notifications.find(n => n.id === id);
        if (notif && !notif.read) {
            notif.read = true;
            this.unreadCount--;
            this.render();
            this.updateBadge();
        }
    }

    // Marcar todas como leídas (FUTURO: actualizar en base de datos)
    async markAllAsRead() {
        // FUTURO: await fetch('/api/notifications/read-all', { method: 'POST' });
        
        this.notifications.forEach(n => n.read = true);
        this.unreadCount = 0;
        this.render();
        this.updateBadge();
        
        alert('✅ Todas las notificaciones marcadas como leídas');
    }
}

// Instancia global
const NotificationManager = new NotificationManager();