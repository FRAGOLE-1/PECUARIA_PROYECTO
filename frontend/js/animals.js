console.log("🐄 animals.js cargado");

// =====================================================
// MÓDULO: GESTIÓN DE ANIMALES (JS)
// Este archivo se ejecuta cada vez que se carga animals.html
// =====================================================

// ---------- Datos demo ----------
let animalsData = [
    { id: 'COW-001', nombre: 'Mariposa', raza: 'Holstein', sexo: 'Hembra', fechaNac: '2020-03-15', peso: 520, categoria: 'Vaca Lechera', estado: 'Activo', madre: '', padre: '', observaciones: 'Alta productora' },
    { id: 'COW-002', nombre: 'Luna', raza: 'Jersey', sexo: 'Hembra', fechaNac: '2021-06-20', peso: 380, categoria: 'Vaca Lechera', estado: 'Activo', madre: '', padre: '', observaciones: '' },
    { id: 'COW-003', nombre: 'Estrella', raza: 'Holstein', sexo: 'Hembra', fechaNac: '2019-11-10', peso: 550, categoria: 'Vaca Lechera', estado: 'Activo', madre: '', padre: '', observaciones: '' },
    { id: 'TERN-004', nombre: 'Torito', raza: 'Brahman', sexo: 'Macho', fechaNac: '2024-02-14', peso: 85, categoria: 'Ternero', estado: 'Activo', madre: 'COW-020', padre: 'BULL-001', observaciones: 'Recién nacido' },
    { id: 'COW-005', nombre: 'Paloma', raza: 'Simmental', sexo: 'Hembra', fechaNac: '2020-08-22', peso: 480, categoria: 'Vaca Lechera', estado: 'Activo', madre: '', padre: '', observaciones: '' },
    { id: 'NOV-006', nombre: 'Bronco', raza: 'Angus', sexo: 'Macho', fechaNac: '2022-05-10', peso: 420, categoria: 'Novillo', estado: 'Activo', madre: '', padre: '', observaciones: '' },
    { id: 'COW-007', nombre: 'Bella', raza: 'Holstein', sexo: 'Hembra', fechaNac: '2021-01-18', peso: 495, categoria: 'Vaca Lechera', estado: 'Activo', madre: '', padre: '', observaciones: '' },
    { id: 'TERN-008', nombre: 'Chispita', raza: 'Jersey', sexo: 'Hembra', fechaNac: '2024-05-30', peso: 65, categoria: 'Ternero', estado: 'Activo', madre: 'COW-002', padre: '', observaciones: '' },
    { id: 'BULL-009', nombre: 'Titan', raza: 'Brahman', sexo: 'Macho', fechaNac: '2018-12-05', peso: 780, categoria: 'Toro', estado: 'Activo', madre: '', padre: '', observaciones: 'Reproductor principal' },
    { id: 'COW-010', nombre: 'Rosa', raza: 'Holstein', sexo: 'Hembra', fechaNac: '2020-07-12', peso: 510, categoria: 'Vaca Lechera', estado: 'Activo', madre: '', padre: '', observaciones: '' },
    { id: 'COW-011', nombre: 'Princesa', raza: 'Jersey', sexo: 'Hembra', fechaNac: '2019-09-25', peso: 410, categoria: 'Vaca Lechera', estado: 'Vendido', madre: '', padre: '', observaciones: 'Vendida a Finca El Prado' },
    { id: 'NOV-012', nombre: 'Fuego', raza: 'Angus', sexo: 'Macho', fechaNac: '2023-01-08', peso: 320, categoria: 'Novillo', estado: 'Activo', madre: '', padre: '', observaciones: '' },
];

let filteredAnimals = [...animalsData];
let currentPage = 1;
const itemsPerPage = 10;

// ---------- Utilidades ----------
function calcularEdad(fechaNac) {
    const hoy = new Date();
    const nacimiento = new Date(fechaNac);
    const diffTime = Math.abs(hoy - nacimiento);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 30) return `${diffDays} días`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} meses`;

    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    return months > 0 ? `${years} años ${months} meses` : `${years} años`;
}

function renderTable() {
    const tbody = document.getElementById('animalsTableBody');
    if (!tbody) return;

    const totalPages = Math.ceil(filteredAnimals.length / itemsPerPage);
    if (currentPage > totalPages) currentPage = totalPages || 1;

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageAnimals = filteredAnimals.slice(start, end);

    tbody.innerHTML = pageAnimals.map(animal => `
        <tr>
            <td><strong>${animal.id}</strong></td>
            <td>${animal.nombre}</td>
            <td><span class="badge-raza">${animal.raza}</span></td>
            <td><span class="badge ${animal.sexo.toLowerCase()}">${animal.sexo}</span></td>
            <td>${calcularEdad(animal.fechaNac)}</td>
            <td>${animal.peso} kg</td>
            <td>${animal.categoria}</td>
            <td><span class="badge ${animal.estado.toLowerCase()}">${animal.estado}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn-action btn-view" onclick="viewAnimal('${animal.id}')" title="Ver detalles">👁️</button>
                    <button class="btn-action btn-edit" onclick="editAnimal('${animal.id}')" title="Editar">✏️</button>
                    <button class="btn-action btn-delete" onclick="deleteAnimal('${animal.id}')" title="Eliminar">🗑️</button>
                </div>
            </td>
        </tr>
    `).join('');

    updatePaginationInfo();
}

function updatePaginationInfo() {
    const info = document.querySelector('.pagination-info');
    const total = filteredAnimals.length;
    if (!info || total === 0) return;

    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(startIndex + itemsPerPage - 1, total);
    const totalPages = Math.ceil(total / itemsPerPage);

    info.innerHTML = `Mostrando <strong>${startIndex}-${endIndex}</strong> de <strong>${total}</strong> animales`;

    const btnPrev = document.getElementById('btnPrevPage');
    const btnNext = document.getElementById('btnNextPage');

    if (btnPrev) btnPrev.disabled = currentPage === 1;
    if (btnNext) btnNext.disabled = currentPage === totalPages || totalPages === 0;
}

function applyFilters() {
    const searchTerm = (document.getElementById('searchInput')?.value || '').toLowerCase();
    const filterRaza = document.getElementById('filterRaza')?.value;
    const filterSexo = document.getElementById('filterSexo')?.value;
    const filterEstado = document.getElementById('filterEstado')?.value;
    const filterCategoria = document.getElementById('filterCategoria')?.value;

    filteredAnimals = animalsData.filter(animal => {
        const matchSearch =
            animal.id.toLowerCase().includes(searchTerm) ||
            animal.nombre.toLowerCase().includes(searchTerm) ||
            animal.raza.toLowerCase().includes(searchTerm);

        const matchRaza = filterRaza === 'todas' || !filterRaza || animal.raza === filterRaza;
        const matchSexo = !filterSexo || animal.sexo === filterSexo;
        const matchEstado = !filterEstado || animal.estado === filterEstado;
        const matchCategoria = !filterCategoria || animal.categoria === filterCategoria;

        return matchSearch && matchRaza && matchSexo && matchEstado && matchCategoria;
    });

    currentPage = 1;
    renderTable();
}

// ---------- Modales ----------
function openModal() {
    const modal = document.getElementById('modalAnimal');
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('modalAnimal');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    document.getElementById('animalForm')?.reset();
    const idInput = document.getElementById('animalId');
    if (idInput) idInput.disabled = false;
}

function closeDetailsModal() {
    const modal = document.getElementById('modalDetails');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ---------- CRUD ----------
function viewAnimal(id) {
    const animal = animalsData.find(a => a.id === id);
    if (!animal) return;

    const container = document.getElementById('animalDetailsContent');
    if (!container) return;

    const detailsHTML = `
        <div class="detail-section">
            <h3 class="detail-section-title">Información General</h3>
            <div class="detail-grid">
                <div class="detail-item"><div class="detail-label">ID / Identificación</div><div class="detail-value">${animal.id}</div></div>
                <div class="detail-item"><div class="detail-label">Nombre</div><div class="detail-value">${animal.nombre}</div></div>
                <div class="detail-item"><div class="detail-label">Raza</div><div class="detail-value">${animal.raza}</div></div>
                <div class="detail-item"><div class="detail-label">Sexo</div><div class="detail-value"><span class="badge ${animal.sexo.toLowerCase()}">${animal.sexo}</span></div></div>
                <div class="detail-item"><div class="detail-label">Fecha de Nacimiento</div><div class="detail-value">${new Date(animal.fechaNac).toLocaleDateString('es-ES')}</div></div>
                <div class="detail-item"><div class="detail-label">Edad</div><div class="detail-value">${calcularEdad(animal.fechaNac)}</div></div>
                <div class="detail-item"><div class="detail-label">Peso Actual</div><div class="detail-value">${animal.peso} kg</div></div>
                <div class="detail-item"><div class="detail-label">Categoría</div><div class="detail-value">${animal.categoria}</div></div>
                <div class="detail-item"><div class="detail-label">Estado</div><div class="detail-value"><span class="badge ${animal.estado.toLowerCase()}">${animal.estado}</span></div></div>
            </div>
        </div>
        <div class="detail-section">
            <h3 class="detail-section-title">Genealogía</h3>
            <div class="detail-grid">
                <div class="detail-item"><div class="detail-label">Madre</div><div class="detail-value">${animal.madre || 'No registrada'}</div></div>
                <div class="detail-item"><div class="detail-label">Padre</div><div class="detail-value">${animal.padre || 'No registrado'}</div></div>
            </div>
        </div>
        ${animal.observaciones ? `
        <div class="detail-section">
            <h3 class="detail-section-title">Observaciones</h3>
            <p style="color: #6B7280; line-height: 1.6;">${animal.observaciones}</p>
        </div>` : ''}
    `;

    container.innerHTML = detailsHTML;
    const modal = document.getElementById('modalDetails');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function editAnimal(id) {
    const animal = animalsData.find(a => a.id === id);
    if (!animal) return;

    document.getElementById('modalTitle').innerHTML = '<span>✏️</span> Editar Animal';
    document.getElementById('animalId').value = animal.id;
    document.getElementById('animalId').disabled = true;
    document.getElementById('animalNombre').value = animal.nombre;
    document.getElementById('animalRaza').value = animal.raza;
    document.getElementById('animalSexo').value = animal.sexo;
    document.getElementById('animalFechaNac').value = animal.fechaNac;
    document.getElementById('animalPeso').value = animal.peso;
    document.getElementById('animalCategoria').value = animal.categoria;
    document.getElementById('animalEstado').value = animal.estado;
    document.getElementById('animalMadre').value = animal.madre;
    document.getElementById('animalPadre').value = animal.padre;
    document.getElementById('animalObservaciones').value = animal.observaciones;

    openModal();
}

function deleteAnimal(id) {
    const animal = animalsData.find(a => a.id === id);
    if (!animal) return;

    if (confirm(`¿Estás seguro de eliminar al animal "${animal.nombre}" (${animal.id})?\n\nEsta acción no se puede deshacer.`)) {
        animalsData = animalsData.filter(a => a.id !== id);
        applyFilters();
        alert('✅ Animal eliminado correctamente');
    }
}

function saveAnimal() {
    const id = document.getElementById('animalId').value;
    const nombre = document.getElementById('animalNombre').value;
    const raza = document.getElementById('animalRaza').value;
    const sexo = document.getElementById('animalSexo').value;
    const fechaNac = document.getElementById('animalFechaNac').value;
    const peso = document.getElementById('animalPeso').value;
    const categoria = document.getElementById('animalCategoria').value;
    const estado = document.getElementById('animalEstado').value;
    const madre = document.getElementById('animalMadre').value;
    const padre = document.getElementById('animalPadre').value;
    const observaciones = document.getElementById('animalObservaciones').value;

    if (!id || !nombre || !raza || !sexo || !fechaNac || !peso) {
        alert('⚠️ Por favor completa todos los campos requeridos');
        return;
    }

    const existingIndex = animalsData.findIndex(a => a.id === id);

    const animalData = {
        id, nombre, raza, sexo, fechaNac,
        peso: parseFloat(peso),
        categoria, estado, madre, padre, observaciones
    };

    if (existingIndex >= 0) {
        animalsData[existingIndex] = animalData;
        alert('✅ Animal actualizado correctamente');
    } else {
        animalsData.push(animalData);
        alert('✅ Animal registrado correctamente');
    }

    closeModal();
    applyFilters();
}

// ---------- Inicialización del módulo ----------
function initAnimalsModule() {
    console.log('🐄 initAnimalsModule() llamado');

    // Inputs y filtros
    const btnAddAnimal = document.getElementById('btnAddAnimal');
    const btnPrevPage = document.getElementById('btnPrevPage');
    const btnNextPage = document.getElementById('btnNextPage');
    const searchInput = document.getElementById('searchInput');
    const filterRaza = document.getElementById('filterRaza');
    const filterSexo = document.getElementById('filterSexo');
    const filterEstado = document.getElementById('filterEstado');
    const filterCategoria = document.getElementById('filterCategoria');

    if (!btnNextPage || !btnPrevPage) {
        console.warn('⚠️ Elementos de paginación no encontrados. ¿Se cargó bien animals.html?');
        return;
    }

    // Botón registrar
    if (btnAddAnimal) {
        btnAddAnimal.addEventListener('click', () => {
            document.getElementById('modalTitle').innerHTML = '<span>🐄</span> Registrar Nuevo Animal';
            const idInput = document.getElementById('animalId');
            if (idInput) idInput.disabled = false;
            document.getElementById('animalForm')?.reset();
            openModal();
        });
    }

    // Paginación
    btnPrevPage.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderTable();
        }
    });

    btnNextPage.addEventListener('click', () => {
        const totalPages = Math.ceil(filteredAnimals.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderTable();
        }
    });

    // Filtros
    if (searchInput) searchInput.addEventListener('input', applyFilters);
    if (filterRaza) filterRaza.addEventListener('change', applyFilters);
    if (filterSexo) filterSexo.addEventListener('change', applyFilters);
    if (filterEstado) filterEstado.addEventListener('change', applyFilters);
    if (filterCategoria) filterCategoria.addEventListener('change', applyFilters);

    // Cerrar modales haciendo click fuera
    const modalAnimal = document.getElementById('modalAnimal');
    if (modalAnimal) {
        modalAnimal.addEventListener('click', (e) => {
            if (e.target.id === 'modalAnimal') closeModal();
        });
    }

    const modalDetails = document.getElementById('modalDetails');
    if (modalDetails) {
        modalDetails.addEventListener('click', (e) => {
            if (e.target.id === 'modalDetails') closeDetailsModal();
        });
    }

    // Estado inicial
    filteredAnimals = [...animalsData];
    currentPage = 1;
    renderTable();
}

// Exponer funciones globales para los onclick del HTML
window.initAnimalsModule   = initAnimalsModule;
window.viewAnimal          = viewAnimal;
window.editAnimal          = editAnimal;
window.deleteAnimal        = deleteAnimal;
window.saveAnimal          = saveAnimal;
window.closeModal          = closeModal;
window.openModal           = openModal;
window.closeDetailsModal   = closeDetailsModal;
