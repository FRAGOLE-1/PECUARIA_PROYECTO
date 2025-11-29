// ============================================
// CATTLESIS - SANIDAD: JAVASCRIPT COMPLETO
// Para integrar con tu health.html existente
// ============================================

// ============================================
// DATOS DE EJEMPLO (Para poblar las tablas)
// ============================================

const healthData = {
    // Programa Sanitario
    programaSanitario: [
        {
            id: 'PS001',
            animal: 'Mariposa (COW-001)',
            raza: 'Holstein - 4 años',
            tipo: 'Vacunación',
            medicamento: 'Antiaftosa',
            fechaProgramada: '15/10/2025',
            veterinario: 'Dr. Martínez',
            estado: 'vencida',
            proximaDosis: '15/04/2026'
        },
        {
            id: 'PS002',
            animal: 'Luna (COW-002)',
            raza: 'Jersey - 3 años',
            tipo: 'Desparasitación',
            medicamento: 'Ivermectina',
            fechaProgramada: '18/10/2025',
            veterinario: 'Dr. López',
            estado: 'pendiente',
            proximaDosis: '18/01/2026'
        },
        {
            id: 'PS003',
            animal: 'Estrella (COW-003)',
            raza: 'Angus - 5 años',
            tipo: 'Vitaminas',
            medicamento: 'Complejo B',
            fechaProgramada: '12/10/2025',
            veterinario: 'Dr. García',
            estado: 'aplicada',
            proximaDosis: '12/11/2025'
        },
        {
            id: 'PS004',
            animal: 'Paloma (COW-005)',
            raza: 'Holstein - 2 años',
            tipo: 'Vacunación',
            medicamento: 'Brucelosis',
            fechaProgramada: '20/10/2025',
            veterinario: 'Dr. Martínez',
            estado: 'pendiente',
            proximaDosis: '20/10/2026'
        }
    ],

    // Tratamientos
    tratamientos: [
        {
            id: 'T001',
            animal: 'Luna (COW-002)',
            descripcion: 'Fiebre alta detectada',
            diagnostico: 'Infección respiratoria',
            medicamento: 'Penicilina G',
            dosis: '10ml cada 12h',
            duracion: '7 días (3/7 completados)',
            veterinario: 'Dr. Martínez',
            estado: 'en-tratamiento'
        },
        {
            id: 'T002',
            animal: 'Paloma (COW-005)',
            descripcion: 'Cojera pata posterior',
            diagnostico: 'Inflamación articular',
            medicamento: 'Diclofenaco',
            dosis: '5ml cada 24h',
            duracion: '5 días (completado)',
            veterinario: 'Dr. López',
            estado: 'completado'
        }
    ],

    // Enfermedades
    enfermedades: [
        {
            id: 'E001',
            animal: 'Luna (COW-002)',
            raza: 'Jersey - 3 años',
            enfermedad: 'Infección Respiratoria',
            sintomas: 'Fiebre, secreción nasal',
            fechaDiagnostico: '14/10/2025',
            gravedad: 'alto',
            veterinario: 'Dr. Martínez',
            estado: 'en-tratamiento',
            diasTratamiento: '3 días'
        },
        {
            id: 'E002',
            animal: 'Paloma (COW-005)',
            raza: 'Holstein - 2 años',
            enfermedad: 'Mastitis Subclínica',
            sintomas: 'Inflamación cuarto anterior',
            fechaDiagnostico: '10/10/2025',
            gravedad: 'medio',
            veterinario: 'Dr. López',
            estado: 'completado',
            diasTratamiento: '7 días (completado)'
        }
    ],

    // Medicamentos
    medicamentos: [
        {
            id: 'MED001',
            nombre: 'Penicilina G Procaínica',
            presentacion: '100ml frasco',
            categoria: 'Antibióticos',
            stockActual: '3 unidades',
            stockMinimo: '10 unidades',
            fechaVencimiento: '15/12/2025',
            lote: 'PEN-2024-087',
            proveedor: 'VetSupply S.A.',
            estado: 'bajo'
        },
        {
            id: 'MED002',
            nombre: 'Vacuna Antiaftosa',
            presentacion: '50 dosis',
            categoria: 'Vacunas',
            stockActual: '2 frascos',
            stockMinimo: '5 frascos',
            fechaVencimiento: '20/11/2025',
            lote: 'VAC-AFT-2024-156',
            proveedor: 'Laboratorio Bovino',
            estado: 'bajo'
        },
        {
            id: 'MED003',
            nombre: 'Ivermectina 1%',
            presentacion: '500ml frasco',
            categoria: 'Antiparasitarios',
            stockActual: '8 unidades',
            stockMinimo: '5 unidades',
            fechaVencimiento: '30/03/2026',
            lote: 'IVE-2024-203',
            proveedor: 'FarmVet Ltda.',
            estado: 'aplicada'
        },
        {
            id: 'MED004',
            nombre: 'Complejo Vitamínico B',
            presentacion: '20ml ampolla',
            categoria: 'Vitaminas',
            stockActual: '0 unidades',
            stockMinimo: '15 unidades',
            fechaVencimiento: '10/09/2025',
            lote: 'VIT-B-2024-089',
            proveedor: 'VitaGan S.A.',
            estado: 'vencida'
        }
    ]
};

// ============================================
// FUNCIONES DE PESTAÑAS (TABS)
// ============================================

function switchTab(tabName) {
    // Remover clase active de todos los botones
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Remover clase active de todos los contenidos
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Activar el botón seleccionado
    document.querySelector(`[onclick="switchTab('${tabName}')"]`).classList.add('active');
    
    // Activar el contenido seleccionado
    document.getElementById(tabName).classList.add('active');
    
    // Cargar datos según la pestaña
    switch(tabName) {
        case 'programa-sanitario':
            loadProgramaSanitario();
            break;
        case 'tratamientos':
            loadTratamientos();
            break;
        case 'enfermedades':
            loadEnfermedades();
            break;
        case 'inventario-med':
            loadMedicamentos();
            break;
        case 'reportes':
            // Los reportes no necesitan carga dinámica
            break;
    }
}

// ============================================
// CARGAR DATOS EN TABLAS
// ============================================

function loadProgramaSanitario() {
    const tbody = document.getElementById('programaSanitarioTable');
    tbody.innerHTML = '';
    
    healthData.programaSanitario.forEach(item => {
        const row = `
            <tr>
                <td>
                    <div style="font-weight: 600;">${item.animal}</div>
                    <div style="font-size: 12px; color: #6B7280;">${item.raza}</div>
                </td>
                <td>${item.tipo}</td>
                <td>${item.medicamento}</td>
                <td>${item.fechaProgramada}</td>
                <td>${item.veterinario}</td>
                <td><span class="badge ${item.estado}">${getBadgeText(item.estado)}</span></td>
                <td>${item.proximaDosis}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-action btn-edit" onclick="editProgramaItem('${item.id}')">✏️</button>
                        <button class="btn-action btn-view" onclick="viewProgramaDetail('${item.id}')">👁️</button>
                        <button class="btn-action btn-delete" onclick="deleteProgramaItem('${item.id}')">🗑️</button>
                    </div>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function loadTratamientos() {
    const tbody = document.getElementById('tratamientosTable');
    tbody.innerHTML = '';
    
    healthData.tratamientos.forEach(item => {
        const row = `
            <tr>
                <td>
                    <div style="font-weight: 600;">${item.animal}</div>
                    <div style="font-size: 12px; color: #6B7280;">${item.descripcion}</div>
                </td>
                <td>${item.diagnostico}</td>
                <td>${item.medicamento}</td>
                <td>${item.dosis}</td>
                <td>${item.duracion}</td>
                <td>${item.veterinario}</td>
                <td><span class="badge ${item.estado}">${getBadgeText(item.estado)}</span></td>
                <td>
                    <div class="action-buttons">
                        ${item.estado === 'en-tratamiento' ? `<button class="btn-action btn-edit" onclick="editTratamiento('${item.id}')">✏️</button>` : ''}
                        <button class="btn-action btn-view" onclick="viewTratamientoDetail('${item.id}')">👁️</button>
                    </div>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function loadEnfermedades() {
    const tbody = document.getElementById('enfermedadesTable');
    tbody.innerHTML = '';
    
    healthData.enfermedades.forEach(item => {
        const row = `
            <tr>
                <td>
                    <div style="font-weight: 600;">${item.animal}</div>
                    <div style="font-size: 12px; color: #6B7280;">${item.raza}</div>
                </td>
                <td>
                    <div style="font-weight: 600;">${item.enfermedad}</div>
                    <div style="font-size: 12px; color: #6B7280;">${item.sintomas}</div>
                </td>
                <td>${item.fechaDiagnostico}</td>
                <td><span class="badge ${item.gravedad}">${getBadgeText(item.gravedad)}</span></td>
                <td>${item.veterinario}</td>
                <td><span class="badge ${item.estado}">${getBadgeText(item.estado)}</span></td>
                <td>${item.diasTratamiento}</td>
                <td>
                    <div class="action-buttons">
                        ${item.estado === 'en-tratamiento' ? `<button class="btn-action btn-edit" onclick="editEnfermedad('${item.id}')">✏️</button>` : ''}
                        <button class="btn-action btn-view" onclick="viewEnfermedadDetail('${item.id}')">👁️</button>
                    </div>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function loadMedicamentos() {
    const tbody = document.getElementById('medicamentosTable');
    tbody.innerHTML = '';
    
    healthData.medicamentos.forEach(item => {
        const row = `
            <tr>
                <td>
                    <div style="font-weight: 600;">${item.nombre}</div>
                    <div style="font-size: 12px; color: #6B7280;">${item.presentacion}</div>
                </td>
                <td>${item.categoria}</td>
                <td>${item.stockActual}</td>
                <td>${item.stockMinimo}</td>
                <td>${item.fechaVencimiento}</td>
                <td>${item.lote}</td>
                <td>${item.proveedor}</td>
                <td><span class="badge ${item.estado}">${getBadgeText(item.estado)}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-action btn-edit" onclick="editMedicamento('${item.id}')">✏️</button>
                        <button class="btn-action btn-view" onclick="viewMedicamentoDetail('${item.id}')">👁️</button>
                    </div>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// ============================================
// FUNCIONES DE MODALES
// ============================================

function openVacunaModal() {
    document.getElementById('modalVacuna').classList.add('active');
    // Establecer fecha actual como predeterminada
    document.getElementById('vacunaFecha').value = new Date().toISOString().split('T')[0];
}

function closeVacunaModal() {
    document.getElementById('modalVacuna').classList.remove('active');
    document.getElementById('formVacuna').reset();
}

function openTratamientoModal() {
    document.getElementById('modalTratamiento').classList.add('active');
    // Establecer fecha actual como predeterminada
    document.getElementById('tratamientoFechaInicio').value = new Date().toISOString().split('T')[0];
}

function closeTratamientoModal() {
    document.getElementById('modalTratamiento').classList.remove('active');
    document.getElementById('formTratamiento').reset();
}

function openAlertDetail(alertId) {
    const modal = document.getElementById('modalAlertDetail');
    const content = document.getElementById('alertDetailContent');
    
    // Contenido de ejemplo basado en la alerta
    let alertContent = '';
    switch(alertId) {
        case 'alert1':
            alertContent = `
                <h3 style="color: #1F2937; margin-bottom: 16px;">Vacuna Antiaftosa Vencida</h3>
                <p><strong>Animales afectados:</strong> 12 animales</p>
                <p><strong>Última aplicación:</strong> 15/04/2024</p>
                <p><strong>Veterinario responsable:</strong> Dr. Martínez</p>
                <p><strong>Acción requerida:</strong> Aplicar vacuna inmediatamente</p>
            `;
            break;
        case 'alert2':
            alertContent = `
                <h3 style="color: #1F2937; margin-bottom: 16px;">Animal con Fiebre Alta</h3>
                <p><strong>Animal:</strong> Luna (COW-002)</p>
                <p><strong>Temperatura:</strong> 41°C</p>
                <p><strong>Síntomas:</strong> Fiebre, decaimiento, falta de apetito</p>
                <p><strong>Acción requerida:</strong> Examen veterinario urgente</p>
            `;
            break;
        case 'alert3':
            alertContent = `
                <h3 style="color: #1F2937; margin-bottom: 16px;">Stock Bajo de Medicamentos</h3>
                <p><strong>Medicamento:</strong> Penicilina G Procaínica</p>
                <p><strong>Stock actual:</strong> 3 dosis</p>
                <p><strong>Stock mínimo:</strong> 10 dosis</p>
                <p><strong>Acción requerida:</strong> Realizar pedido urgente</p>
            `;
            break;
    }
    
    content.innerHTML = alertContent;
    modal.classList.add('active');
}

function closeAlertDetailModal() {
    document.getElementById('modalAlertDetail').classList.remove('active');
}

// ============================================
// FUNCIONES DE FORMULARIOS
// ============================================

function saveVacuna() {
    const animal = document.getElementById('vacunaAnimal').value;
    const tipo = document.getElementById('vacunaTipo').value;
    const fecha = document.getElementById('vacunaFecha').value;
    const dosis = document.getElementById('vacunaDosis').value;
    const lote = document.getElementById('vacunaLote').value;
    const veterinario = document.getElementById('vacunaVeterinario').value;
    
    if (!animal || !tipo || !fecha || !dosis || !lote || !veterinario) {
        showNotification('Por favor complete todos los campos requeridos', 'error');
        return;
    }
    
    // Aquí iría la lógica para guardar en la base de datos
    showNotification('Vacuna registrada correctamente', 'success');
    closeVacunaModal();
    
    // Recargar datos de programa sanitario
    loadProgramaSanitario();
}

function saveTratamiento() {
    const animal = document.getElementById('tratamientoAnimal').value;
    const diagnostico = document.getElementById('tratamientoDiagnostico').value;
    const medicamento = document.getElementById('tratamientoMedicamento').value;
    const dosis = document.getElementById('tratamientoDosis').value;
    
    if (!animal || !diagnostico || !medicamento || !dosis) {
        showNotification('Por favor complete todos los campos requeridos', 'error');
        return;
    }
    
    // Aquí iría la lógica para guardar en la base de datos
    showNotification('Tratamiento registrado correctamente', 'success');
    closeTratamientoModal();
    
    // Recargar datos de tratamientos
    loadTratamientos();
}

// ============================================
// FUNCIONES DE ACCIONES
// ============================================

function editProgramaItem(id) {
    showNotification(`Editando item del programa: ${id}`, 'info');
    // Aquí iría la lógica para editar
}

function viewProgramaDetail(id) {
    showNotification(`Viendo detalles del item: ${id}`, 'info');
    // Aquí iría la lógica para mostrar detalles
}

function deleteProgramaItem(id) {
    if (confirm('¿Está seguro de eliminar este registro?')) {
        showNotification('Registro eliminado correctamente', 'success');
        // Aquí iría la lógica para eliminar
        loadProgramaSanitario();
    }
}

function editTratamiento(id) {
    showNotification(`Editando tratamiento: ${id}`, 'info');
}

function viewTratamientoDetail(id) {
    showNotification(`Viendo detalles del tratamiento: ${id}`, 'info');
}

function editEnfermedad(id) {
    showNotification(`Editando enfermedad: ${id}`, 'info');
}

function viewEnfermedadDetail(id) {
    showNotification(`Viendo detalles de enfermedad: ${id}`, 'info');
}

function editMedicamento(id) {
    showNotification(`Editando medicamento: ${id}`, 'info');
}

function viewMedicamentoDetail(id) {
    showNotification(`Viendo detalles del medicamento: ${id}`, 'info');
}

function markAllAlertsRead() {
    showNotification('Todas las alertas marcadas como leídas', 'success');
}

function resolveAlert() {
    showNotification('Alerta marcada como resuelta', 'success');
    closeAlertDetailModal();
}

// ============================================
// FUNCIONES DE REPORTES
// ============================================

function generateReport(reportType) {
    const reportNames = {
        'estado-sanitario': 'Estado Sanitario del Hato',
        'programa-cumplimiento': 'Cumplimiento del Programa',
        'morbi-mortalidad': 'Morbi-Mortalidad', 
        'consumo-medicamentos': 'Consumo de Medicamentos',
        'certificaciones': 'Certificaciones Sanitarias',
        'trazabilidad': 'Trazabilidad Sanitaria'
    };
    
    showNotification(`Generando: ${reportNames[reportType]}`, 'info');
    
    setTimeout(() => {
        showNotification(`${reportNames[reportType]} generado correctamente`, 'success');
    }, 2000);
}

function generateCustomReport() {
    const tipo = document.getElementById('tipoReportePersonalizado').value;
    const periodo = document.getElementById('periodoReporte').value;
    const formato = document.getElementById('formatoReporte').value;
    
    showNotification(`Generando reporte personalizado (${formato.toUpperCase()})`, 'info');
    
    setTimeout(() => {
        showNotification('Reporte personalizado generado correctamente', 'success');
    }, 2000);
}

function generateHealthReport() {
    showNotification('Generando reporte general de sanidad', 'info');
    
    setTimeout(() => {
        showNotification('Reporte general generado correctamente', 'success');
    }, 2000);
}

// ============================================
// FUNCIONES DE UTILIDAD
// ============================================

function getBadgeText(status) {
    const statusMap = {
        'aplicada': 'Aplicada',
        'pendiente': 'Pendiente', 
        'vencida': 'Vencida',
        'completado': 'Completado',
        'en-tratamiento': 'En Tratamiento',
        'alto': 'Alto',
        'medio': 'Medio',
        'bajo': 'Bajo'
    };
    return statusMap[status] || status;
}

function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 400px;
    `;
    
    // Establecer colores según el tipo
    switch(type) {
        case 'success':
            notification.style.background = '#10B981';
            break;
        case 'error':
            notification.style.background = '#EF4444';
            break;
        case 'info':
            notification.style.background = '#3B82F6';
            break;
        default:
            notification.style.background = '#6B7280';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================
// FILTROS Y BÚSQUEDAS
// ============================================

function setupFilters() {
    // Filtros para Programa Sanitario
    const filtroTipo = document.getElementById('filtroTipoActividad');
    const filtroEstado = document.getElementById('filtroEstado');
    const filtroVeterinario = document.getElementById('filtroVeterinario');
    const searchPrograma = document.getElementById('searchProgramaSanitario');
    
    if (filtroTipo) filtroTipo.addEventListener('change', filterProgramaSanitario);
    if (filtroEstado) filtroEstado.addEventListener('change', filterProgramaSanitario);
    if (filtroVeterinario) filtroVeterinario.addEventListener('change', filterProgramaSanitario);
    if (searchPrograma) searchPrograma.addEventListener('input', filterProgramaSanitario);
    
    // Filtros para Tratamientos
    const filtroEstadoTrat = document.getElementById('filtroEstadoTratamiento');
    const filtroTipoTrat = document.getElementById('filtroTipoTratamiento');
    const searchTrat = document.getElementById('searchTratamientos');
    
    if (filtroEstadoTrat) filtroEstadoTrat.addEventListener('change', filterTratamientos);
    if (filtroTipoTrat) filtroTipoTrat.addEventListener('change', filterTratamientos);
    if (searchTrat) searchTrat.addEventListener('input', filterTratamientos);
    
    // Filtros para Enfermedades
    const filtroGravedad = document.getElementById('filtroGravedad');
    const filtroEstadoEnf = document.getElementById('filtroEstadoEnfermedad');
    const searchEnf = document.getElementById('searchEnfermedades');
    
    if (filtroGravedad) filtroGravedad.addEventListener('change', filterEnfermedades);
    if (filtroEstadoEnf) filtroEstadoEnf.addEventListener('change', filterEnfermedades);
    if (searchEnf) searchEnf.addEventListener('input', filterEnfermedades);
    
    // Filtros para Medicamentos
    const filtroCategoria = document.getElementById('filtroCategoriaMed');
    const filtroStock = document.getElementById('filtroStockMed');
    const searchMed = document.getElementById('searchMedicamentos');
    
    if (filtroCategoria) filtroCategoria.addEventListener('change', filterMedicamentos);
    if (filtroStock) filtroStock.addEventListener('change', filterMedicamentos);
    if (searchMed) searchMed.addEventListener('input', filterMedicamentos);
}

function filterProgramaSanitario() {
    const tipo = document.getElementById('filtroTipoActividad')?.value || 'todos';
    const estado = document.getElementById('filtroEstado')?.value || 'todos';
    const veterinario = document.getElementById('filtroVeterinario')?.value || 'todos';
    const search = document.getElementById('searchProgramaSanitario')?.value.toLowerCase() || '';
    
    let filtered = healthData.programaSanitario;
    
    if (tipo !== 'todos') {
        filtered = filtered.filter(item => item.tipo.toLowerCase().includes(tipo));
    }
    
    if (estado !== 'todos') {
        filtered = filtered.filter(item => item.estado === estado);
    }
    
    if (veterinario !== 'todos') {
        const vetName = veterinario.replace('dr-', 'Dr. ');
        filtered = filtered.filter(item => item.veterinario.includes(vetName));
    }
    
    if (search) {
        filtered = filtered.filter(item => 
            item.animal.toLowerCase().includes(search) ||
            item.medicamento.toLowerCase().includes(search)
        );
    }
    
    renderFilteredProgramaSanitario(filtered);
}

function renderFilteredProgramaSanitario(data) {
    const tbody = document.getElementById('programaSanitarioTable');
    tbody.innerHTML = '';
    
    data.forEach(item => {
        const row = `
            <tr>
                <td>
                    <div style="font-weight: 600;">${item.animal}</div>
                    <div style="font-size: 12px; color: #6B7280;">${item.raza}</div>
                </td>
                <td>${item.tipo}</td>
                <td>${item.medicamento}</td>
                <td>${item.fechaProgramada}</td>
                <td>${item.veterinario}</td>
                <td><span class="badge ${item.estado}">${getBadgeText(item.estado)}</span></td>
                <td>${item.proximaDosis}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-action btn-edit" onclick="editProgramaItem('${item.id}')">✏️</button>
                        <button class="btn-action btn-view" onclick="viewProgramaDetail('${item.id}')">👁️</button>
                        <button class="btn-action btn-delete" onclick="deleteProgramaItem('${item.id}')">🗑️</button>
                    </div>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function filterTratamientos() {
    // Lógica similar para tratamientos
    loadTratamientos(); // Por simplicidad, recargar todos
}

function filterEnfermedades() {
    // Lógica similar para enfermedades
    loadEnfermedades(); // Por simplicidad, recargar todos
}

function filterMedicamentos() {
    // Lógica similar para medicamentos
    loadMedicamentos(); // Por simplicidad, recargar todos
}

// ============================================
// CERRAR MODALES CON ESC Y CLICK FUERA
// ============================================

function setupModalEvents() {
    // Cerrar modales con ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.active').forEach(modal => {
                modal.classList.remove('active');
            });
        }
    });
    
    // Cerrar modales al hacer clic fuera
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });
}

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🏥 Inicializando módulo de Sanidad');
    
    // Cargar datos iniciales
    loadProgramaSanitario();
    
    // Configurar filtros y eventos
    setupFilters();
    setupModalEvents();
    
    console.log('✅ Módulo de Sanidad listo');
});

// ============================================
// FUNCIONES ADICIONALES PARA COMPATIBILIDAD
// ============================================

// Actualizar contadores del dashboard
function updateDashboardCounters() {
    // Contar estados
    const enTratamiento = healthData.tratamientos.filter(t => t.estado === 'en-tratamiento').length;
    const vacunasPendientes = healthData.programaSanitario.filter(p => p.estado === 'pendiente').length;
    const medicamentosVencidos = healthData.medicamentos.filter(m => m.estado === 'vencida').length;
    const animalesSanos = 234 - enTratamiento; // Total - en tratamiento
    
    // Actualizar elementos si existen
    const elemSanos = document.getElementById('animalesSanos');
    const elemTratamiento = document.getElementById('enTratamiento');
    const elemVacunas = document.getElementById('vacunasPendientes');
    const elemMedicamentos = document.getElementById('medicamentosVencidos');
    
    if (elemSanos) elemSanos.textContent = animalesSanos;
    if (elemTratamiento) elemTratamiento.textContent = enTratamiento;
    if (elemVacunas) elemVacunas.textContent = vacunasPendientes;
    if (elemMedicamentos) elemMedicamentos.textContent = medicamentosVencidos;
}

// Llamar actualización inicial
setTimeout(updateDashboardCounters, 500);

console.log('🚀 Health.js cargado completamente');