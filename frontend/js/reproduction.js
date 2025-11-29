// ============================================
// DATOS DE EJEMPLO (IGUAL A TU SCRIPT ORIGINAL)
// ============================================

const animalesHembra = [
    { id: 'COW-001', nombre: 'Mariposa' },
    { id: 'COW-002', nombre: 'Luna' },
    { id: 'COW-003', nombre: 'Estrella' },
    { id: 'COW-005', nombre: 'Paloma' },
    { id: 'COW-007', nombre: 'Bella' },
    { id: 'COW-010', nombre: 'Rosa' },
];

let celosData = [
    { id: 'C001', animalId: 'COW-001', animal: 'Mariposa (COW-001)', fecha: '2025-10-10', intensidad: 'Fuerte', duracion: 24, observaciones: 'Comportamiento activo' },
    { id: 'C002', animalId: 'COW-002', animal: 'Luna (COW-002)', fecha: '2025-10-12', intensidad: 'Moderada', duracion: 18, observaciones: '' },
    { id: 'C003', animalId: 'COW-003', animal: 'Estrella (COW-003)', fecha: '2025-10-14', intensidad: 'Fuerte', duracion: 20, observaciones: 'Múltiples montas' },
];

let inseminacionesData = [
    { id: 'IA001', animalId: 'COW-001', animal: 'Mariposa (COW-001)', fecha: '2025-09-15', tipo: 'Artificial', toro: 'Semen Holstein #4502', tecnico: 'Dr. García', estado: 'Confirmada' },
    { id: 'IA002', animalId: 'COW-002', animal: 'Luna (COW-002)', fecha: '2025-09-20', tipo: 'Natural', toro: 'BULL-009 (Titan)', tecnico: '', estado: 'Confirmada' },
    { id: 'IA003', animalId: 'COW-005', animal: 'Paloma (COW-005)', fecha: '2025-10-05', tipo: 'Artificial', toro: 'Semen Jersey #3401', tecnico: 'Dr. García', estado: 'Pendiente' },
];

let gestacionesData = [
    { id: 'G001', animalId: 'COW-001', animal: 'Mariposa (COW-001)', fechaServicio: '2025-09-15', diasGestacion: 31, fechaPartoEstimada: '2026-06-23', estado: 'Confirmada' },
    { id: 'G002', animalId: 'COW-002', animal: 'Luna (COW-002)', fechaServicio: '2025-09-20', diasGestacion: 26, fechaPartoEstimada: '2026-06-28', estado: 'Confirmada' },
];

let partosData = [
    { id: 'P001', madreId: 'COW-003', madre: 'Estrella (COW-003)', fecha: '2025-09-05', tipo: 'Normal', dificultad: 'Sin problemas', criaSexo: 'Hembra', criaPeso: 35, criaId: 'TERN-015', criaEstado: 'Vivo', observaciones: 'Parto normal, cría saludable' },
    { id: 'P002', madreId: 'COW-007', madre: 'Bella (COW-007)', fecha: '2025-09-18', tipo: 'Asistido', dificultad: 'Leve', criaSexo: 'Macho', criaPeso: 38, criaId: 'TERN-016', criaEstado: 'Vivo', observaciones: 'Requirió asistencia menor' },
];

let currentEventId = null;


// ============================================
// SELECTS
// ============================================

function initializeSelects() {
    const selects = [
        document.getElementById('celoAnimal'),
        document.getElementById('inseminacionAnimal'),
        document.getElementById('partoMadre'),
        document.getElementById('diagnosticoAnimal')  // ⭐ FALTABA ESTE
    ];

    selects.forEach(select => {
        if (!select) return;
        select.innerHTML = '<option value="">Seleccionar animal</option>';

        animalesHembra.forEach(animal => {
            const option = document.createElement('option');
            option.value = animal.id;
            option.textContent = `${animal.nombre} (${animal.id})`;
            select.appendChild(option);
        });
    });
}




// ============================================
// ACTIVAR BOTONES
// ============================================


function activateButtons() {
    const addCeloBtn = document.getElementById('btnAddCelo');
    const addIaBtn = document.getElementById('btnAddInseminacion');
    const addPartoBtn = document.getElementById('btnAddParto');
    const addDiagBtn = document.getElementById('btnAddDiagnostico'); // ⭐ MOVIDO AQUÍ

    // Registrar CELO
    if (addCeloBtn) {
        addCeloBtn.onclick = () => {
            document.getElementById('modalCeloTitle').innerHTML = '<span>🌸</span> Registrar Celo';
            document.getElementById('celoForm').reset();
            currentEventId = null;
            openCeloModal();
        };
    }

    // Registrar INSEMINACIÓN
    if (addIaBtn) {
        addIaBtn.onclick = () => {
            document.getElementById('modalInseminacionTitle').innerHTML = '<span>💉</span> Registrar Inseminación';
            document.getElementById('inseminacionForm').reset();
            currentEventId = null;
            openInseminacionModal();
        };
    }

    // Registrar PARTO
    if (addPartoBtn) {
        addPartoBtn.onclick = () => {
            document.getElementById('modalPartoTitle').innerHTML = '<span>🐄</span> Registrar Parto';
            document.getElementById('partoForm').reset();
            currentEventId = null;
            openPartoModal();
        };
    }

    // ⭐⭐ Registrar DIAGNÓSTICO (corregido)
    if (addDiagBtn) {
        addDiagBtn.onclick = () => {
            document.getElementById('diagnosticoForm').reset();
            currentEventId = null;
            openDiagnosticoModal();
        };
    }
}



// ============================================
// ACTIVAR TABS
// ============================================

function activateTabs() {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.onclick = function () {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            const tabName = this.dataset.tab;

            hideAllTabs();
            showTab(tabName);
        };
    });
}

function hideAllTabs() {
    document.getElementById('celosContent').style.display = 'none';
    document.getElementById('inseminacionesContent').style.display = 'none';
    document.getElementById('gestacionesContent').style.display = 'none';
    document.getElementById('partosContent').style.display = 'none';
    document.getElementById('calendarioContent').style.display = 'none';
    
    // Cerrar modal de detalles al cambiar de pestaña
    const md = document.getElementById("modalDetails");
    if (md) md.classList.remove("active");
}

function showTab(name) {
    const map = {
        'celos': renderCelos,
        'inseminaciones': renderInseminaciones,
        'gestaciones': renderGestaciones,
        'partos': renderPartos,
        'calendario': renderCalendar
    };

    document.getElementById(name + 'Content').style.display = 'block';
    map[name]();
}



// ============================================
// RENDERIZAR CELOS
// ============================================
function renderCelos() {
    const grid = document.getElementById('celosGrid');

    if (celosData.length === 0) {
        grid.innerHTML = '<p style="text-align:center; color:#6B7280; padding:40px; grid-column: 1/-1;">No hay registros de celos</p>';
        return;
    }

    grid.innerHTML = celosData.map(celo => `
        <div class="event-card celo" onclick="viewDetails('celo', '${celo.id}')">
            <div class="card-header">
                <div class="card-title">🌸 ${celo.animal}</div>
                <div class="card-date">${new Date(celo.fecha).toLocaleDateString('es-ES')}</div>
            </div>
            <div class="card-body">
                <div class="card-info">
                    <div class="card-info-item"><strong>Intensidad:</strong> ${celo.intensidad}</div>
                    <div class="card-info-item"><strong>Duración:</strong> ${celo.duracion || 'N/A'} h</div>
                </div>
                ${celo.observaciones ? `<p style="margin-top:12px; color:#6B7280; font-size:13px;">${celo.observaciones}</p>` : ''}
            </div>
            <div class="card-footer" onclick="event.stopPropagation()">
                <button class="btn-action btn-edit" onclick="editCelo('${celo.id}')" title="Editar">✏️</button>
                <button class="btn-action btn-delete" onclick="deleteCelo('${celo.id}')" title="Eliminar">🗑️</button>
            </div>
        </div>
    `).join('');
}



// ============================================
// RENDERIZAR INSEMINACIONES
// ============================================
function renderInseminaciones() {
    const tbody = document.getElementById('inseminacionesTableBody');

    if (inseminacionesData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; color:#6B7280; padding:40px;">No hay registros de inseminaciones</td></tr>';
        return;
    }

    tbody.innerHTML = inseminacionesData.map(ia => `
        <tr>
            <td><strong>${ia.animal}</strong></td>
            <td>${ia.tipo}</td>
            <td>${new Date(ia.fecha).toLocaleDateString('es-ES')}</td>
            <td>${ia.toro}</td>
            <td>${ia.tecnico || 'N/A'}</td>
            <td><span class="badge ${ia.estado.toLowerCase()}">${ia.estado}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn-action btn-view" onclick="viewDetails('inseminacion', '${ia.id}')" title="Ver">👁️</button>
                    <button class="btn-action btn-edit" onclick="editInseminacion('${ia.id}')" title="Editar">✏️</button>
                    <button class="btn-action btn-delete" onclick="deleteInseminacion('${ia.id}')" title="Eliminar">🗑️</button>
                </div>
            </td>
        </tr>
    `).join('');
}



// ============================================
// RENDERIZAR GESTACIONES
// ============================================
function renderGestaciones() {
    const tbody = document.getElementById('gestacionesTableBody');

    if (gestacionesData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; color:#6B7280; padding:40px;">No hay gestaciones activas</td></tr>';
        return;
    }

    tbody.innerHTML = gestacionesData.map(gest => `
        <tr>
            <td><strong>${gest.animal}</strong></td>
            <td>${new Date(gest.fechaServicio).toLocaleDateString('es-ES')}</td>
            <td>${gest.diasGestacion} días</td>
            <td>${new Date(gest.fechaPartoEstimada).toLocaleDateString('es-ES')}</td>
            <td><span class="badge gestante">Gestante</span></td>
            <td>
                <button class="btn-action btn-view" onclick="viewDetails('gestacion', '${gest.id}')" title="Ver">👁️</button>
            </td>
        </tr>
    `).join('');
}



// ============================================
// RENDERIZAR PARTOS
// ============================================
function renderPartos() {
    const grid = document.getElementById('partosGrid');

    if (partosData.length === 0) {
        grid.innerHTML = '<p style="text-align:center; color:#6B7280; padding:40px; grid-column: 1/-1;">No hay registros de partos</p>';
        return;
    }

    grid.innerHTML = partosData.map(parto => `
        <div class="event-card parto" onclick="viewDetails('parto', '${parto.id}')">
            <div class="card-header">
                <div class="card-title">🐄 ${parto.madre}</div>
                <div class="card-date">${new Date(parto.fecha).toLocaleDateString('es-ES')}</div>
            </div>
            <div class="card-body">
                <div class="card-info">
                    <div class="card-info-item"><strong>Tipo:</strong> ${parto.tipo}</div>
                    <div class="card-info-item"><strong>Cría:</strong> ${parto.criaSexo}</div>
                    <div class="card-info-item"><strong>Peso:</strong> ${parto.criaPeso} kg</div>
                    <div class="card-info-item"><strong>Estado:</strong> ${parto.criaEstado}</div>
                </div>
                ${parto.criaId ? `<p style="margin-top:12px;"><strong>ID Cría:</strong> ${parto.criaId}</p>` : ''}
            </div>
            <div class="card-footer" onclick="event.stopPropagation()">
                <button class="btn-action btn-view" onclick="viewDetails('parto', '${parto.id}')" title="Ver">👁️</button>
                <button class="btn-action btn-edit" onclick="editParto('${parto.id}')" title="Editar">✏️</button>
                <button class="btn-action btn-delete" onclick="deleteParto('${parto.id}')" title="Eliminar">🗑️</button>
            </div>
        </div>
    `).join('');
}



// ============================================
// CALENDARIO
// ============================================
let currentDate = new Date();
function getEventsByDate(dateStr) {
    const eventos = [];

    celosData.forEach(ev => {
        if (ev.fecha === dateStr)
            eventos.push({
                emoji: "🌸",
                titulo: "Celo",
                detalle: `${ev.animal}`
            });
    });

    inseminacionesData.forEach(ev => {
        if (ev.fecha === dateStr)
            eventos.push({
                emoji: "💉",
                titulo: "Inseminación",
                detalle: `${ev.animal}`
            });
    });

    gestacionesData.forEach(ev => {
        if (ev.fechaServicio === dateStr)
            eventos.push({
                emoji: "🤰",
                titulo: "Diagnóstico / Gestación",
                detalle: `${ev.animal}`
            });
    });

    partosData.forEach(ev => {
        if (ev.fecha === dateStr)
            eventos.push({
                emoji: "🐄",
                titulo: "Parto",
                detalle: `${ev.madre}`
            });
    });

    return eventos;
}

function renderCalendar() {
    const monthNames = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

    document.getElementById('currentMonth').textContent =
        `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startingDayOfWeek = firstDay.getDay();

    const calendarDays = document.getElementById('calendarDays');
    calendarDays.innerHTML = '';

    // Días del mes anterior
    for (let i = 0; i < startingDayOfWeek; i++) {
        calendarDays.innerHTML += `<div class="calendar-day other-month"></div>`;
    }

    // Días del mes actual
    const today = new Date();
    for (let i = 1; i <= lastDay.getDate(); i++) {
        const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;

        const hasEvent =
            [...celosData, ...inseminacionesData, ...partosData]
                .some(e => e.fecha === dateStr);

        const eventos = getEventsByDate(dateStr);

        calendarDays.innerHTML += `
            <div class="calendar-day ${eventos.length ? 'has-event' : ''} 
                ${(i === today.getDate() && currentDate.getMonth() === today.getMonth()) ? 'today' : ''}"
                data-date="${dateStr}"
                onclick="onCalendarDayClick('${dateStr}')">

                <div class="day-number">${i}</div>

                <div class="day-events">
                ${eventos.map(ev => `
                    <div class="event-dot">
                        ${ev.emoji} ${ev.titulo}
                    </div>
                    `).join("")}
                 </div>
            </div>
        `;


    }
}

// ============================================
// NAVEGACIÓN DEL CALENDARIO (ANTERIOR / SIGUIENTE)
// ============================================
function attachCalendarNavEvents() {
    const btnPrev = document.getElementById("btnPrevMonth");
    const btnNext = document.getElementById("btnNextMonth");

    if (btnPrev) {
        btnPrev.onclick = () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        };
    }

    if (btnNext) {
        btnNext.onclick = () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        };
    }
}


// ============================================
// GUARDAR CELO
// ============================================
function saveCelo() {
    const animalId = document.getElementById('celoAnimal').value;
    const fecha = document.getElementById('celoFecha').value;
    const intensidad = document.getElementById('celoIntensidad').value;
    const duracion = document.getElementById('celoDuracion').value;
    const observaciones = document.getElementById('celoObservaciones').value;

    if (!animalId || !fecha) {
        alert('⚠️ Completa los campos requeridos');
        return;
    }

    const animal = animalesHembra.find(a => a.id === animalId);

    const data = {
        animalId,
        animal: `${animal.nombre} (${animal.id})`,
        fecha,
        intensidad,
        duracion,
        observaciones
    };

    if (currentEventId) {
        const index = celosData.findIndex(c => c.id === currentEventId);
        celosData[index] = { ...celosData[index], ...data };
        alert('Celo actualizado');
    } else {
        const newId = 'C' + String(celosData.length + 1).padStart(3, '0');
        celosData.push({ id: newId, ...data });
        alert('Celo registrado');
    }

    closeCeloModal();
    renderCelos();
}



// ============================================
// GUARDAR INSEMINACIÓN
// ============================================
function saveInseminacion() {
    const animalId = document.getElementById('inseminacionAnimal').value;
    const fecha = document.getElementById('inseminacionFecha').value;
    const tipo = document.getElementById('inseminacionTipo').value;
    const toro = document.getElementById('inseminacionToro').value;
    const tecnico = document.getElementById('inseminacionTecnico').value;
    const estado = document.getElementById('inseminacionEstado').value;
    const observaciones = document.getElementById('inseminacionObservaciones').value;

    if (!animalId || !fecha || !toro) {
        alert('⚠️ Completa los campos requeridos');
        return;
    }

    const animal = animalesHembra.find(a => a.id === animalId);

    const data = {
        animalId,
        animal: `${animal.nombre} (${animal.id})`,
        fecha,
        tipo,
        toro,
        tecnico,
        estado,
        observaciones
    };

    if (currentEventId) {
        const index = inseminacionesData.findIndex(i => i.id === currentEventId);
        inseminacionesData[index] = { ...inseminacionesData[index], ...data };
        alert('Inseminación actualizada');
    } else {
        const newId = 'IA' + String(inseminacionesData.length + 1).padStart(3, '0');
        inseminacionesData.push({ id: newId, ...data });
        alert('Inseminación registrada');
    }

    closeInseminacionModal();
    renderInseminaciones();
}



// ============================================
// GUARDAR PARTO
// ============================================
function saveParto() {
    const madreId = document.getElementById('partoMadre').value;
    const fecha = document.getElementById('partoFecha').value;
    const tipo = document.getElementById('partoTipo').value;
    const dificultad = document.getElementById('partoDificultad').value;
    const criaSexo = document.getElementById('partoCriaSexo').value;
    const criaPeso = document.getElementById('partoCriaPeso').value;
    const criaId = document.getElementById('partoCriaId').value;
    const criaEstado = document.getElementById('partoCriaEstado').value;
    const observaciones = document.getElementById('partoObservaciones').value;

    if (!madreId || !fecha || !criaSexo) {
        alert('⚠️ Completa los campos requeridos');
        return;
    }

    const madre = animalesHembra.find(a => a.id === madreId);

    const data = {
        madreId,
        madre: `${madre.nombre} (${madre.id})`,
        fecha,
        tipo,
        dificultad,
        criaSexo,
        criaPeso: criaPeso ? parseFloat(criaPeso) : null,
        criaId,
        criaEstado,
        observaciones
    };

    if (currentEventId) {
        const index = partosData.findIndex(p => p.id === currentEventId);
        partosData[index] = { ...partosData[index], ...data };
        alert('Parto actualizado');
    } else {
        const newId = 'P' + String(partosData.length + 1).padStart(3, '0');
        partosData.push({ id: newId, ...data });
        alert('Parto registrado');
    }

    closePartoModal();
    renderPartos();
}



// ============================================
// EDITAR / ELIMINAR
// ============================================
function editCelo(id) {
    const data = celosData.find(c => c.id === id);
    if (!data) return;

    currentEventId = id;

    document.getElementById('modalCeloTitle').innerHTML = '<span>✏️</span> Editar Celo';
    document.getElementById('celoAnimal').value = data.animalId;
    document.getElementById('celoFecha').value = data.fecha;
    document.getElementById('celoIntensidad').value = data.intensidad;
    document.getElementById('celoDuracion').value = data.duracion;
    document.getElementById('celoObservaciones').value = data.observaciones;

    openCeloModal();
}

function deleteCelo(id) {
    if (confirm("¿Eliminar registro?")) {
        celosData = celosData.filter(c => c.id !== id);
        renderCelos();
    }
}

function editInseminacion(id) {
    const data = inseminacionesData.find(i => i.id === id);
    currentEventId = id;

    document.getElementById('modalInseminacionTitle').innerHTML = '<span>✏️</span> Editar Inseminación';
    document.getElementById('inseminacionAnimal').value = data.animalId;
    document.getElementById('inseminacionFecha').value = data.fecha;
    document.getElementById('inseminacionTipo').value = data.tipo;
    document.getElementById('inseminacionToro').value = data.toro;
    document.getElementById('inseminacionTecnico').value = data.tecnico;
    document.getElementById('inseminacionEstado').value = data.estado;
    document.getElementById('inseminacionObservaciones').value = data.observaciones;

    openInseminacionModal();
}

function deleteInseminacion(id) {
    if (confirm("¿Eliminar registro?")) {
        inseminacionesData = inseminacionesData.filter(i => i.id !== id);
        renderInseminaciones();
    }
}

function editParto(id) {
    const data = partosData.find(p => p.id === id);
    currentEventId = id;

    document.getElementById('modalPartoTitle').innerHTML = '<span>✏️</span> Editar Parto';
    document.getElementById('partoMadre').value = data.madreId;
    document.getElementById('partoFecha').value = data.fecha;
    document.getElementById('partoTipo').value = data.tipo;
    document.getElementById('partoDificultad').value = data.dificultad;
    document.getElementById('partoCriaSexo').value = data.criaSexo;
    document.getElementById('partoCriaPeso').value = data.criaPeso;
    document.getElementById('partoCriaId').value = data.criaId;
    document.getElementById('partoCriaEstado').value = data.criaEstado;
    document.getElementById('partoObservaciones').value = data.observaciones;

    openPartoModal();
}

function deleteParto(id) {
    if (confirm("¿Eliminar registro?")) {
        partosData = partosData.filter(p => p.id !== id);
        renderPartos();
    }
}



// ============================================
// VER DETALLES
// ============================================
function viewDetails(type, id) {
    let html = "";

    if (type === "celo") {
        const d = celosData.find(c => c.id === id);
        html = `
            <div class="detail-section">
                <h3 class="detail-section-title">Información del Celo</h3>
                <div class="detail-grid">
                    <div class="detail-item"><div class="detail-label">Animal</div><div class="detail-value">${d.animal}</div></div>
                    <div class="detail-item"><div class="detail-label">Fecha</div><div class="detail-value">${new Date(d.fecha).toLocaleDateString('es-ES')}</div></div>
                    <div class="detail-item"><div class="detail-label">Intensidad</div><div class="detail-value">${d.intensidad}</div></div>
                    <div class="detail-item"><div class="detail-label">Duración</div><div class="detail-value">${d.duracion} h</div></div>
                </div>
                ${d.observaciones ? `<p style="margin-top:16px; color:#6B7280;">${d.observaciones}</p>` : ''}
            </div>
        `;
    }

    else if (type === "inseminacion") {
        const d = inseminacionesData.find(i => i.id === id);
        html = `
            <div class="detail-section">
                <h3 class="detail-section-title">Inseminación</h3>
                <div class="detail-grid">
                    <div class="detail-item"><div class="detail-label">Animal</div><div class="detail-value">${d.animal}</div></div>
                    <div class="detail-item"><div class="detail-label">Fecha</div><div class="detail-value">${new Date(d.fecha).toLocaleDateString('es-ES')}</div></div>
                    <div class="detail-item"><div class="detail-label">Tipo</div><div class="detail-value">${d.tipo}</div></div>
                    <div class="detail-item"><div class="detail-label">Toro/Semen</div><div class="detail-value">${d.toro}</div></div>
                    <div class="detail-item"><div class="detail-label">Técnico</div><div class="detail-value">${d.tecnico || "N/A"}</div></div>
                    <div class="detail-item"><div class="detail-label">Estado</div><div class="detail-value">${d.estado}</div></div>
                </div>
                ${d.observaciones ? `<p style="margin-top:16px; color:#6B7280;">${d.observaciones}</p>` : ''}
            </div>
        `;
    }

    else if (type === "gestacion") {
        const d = gestacionesData.find(g => g.id === id);
        html = `
            <div class="detail-section">
                <h3 class="detail-section-title">Gestación</h3>
                <div class="detail-grid">
                    <div class="detail-item"><div class="detail-label">Animal</div><div class="detail-value">${d.animal}</div></div>
                    <div class="detail-item"><div class="detail-label">Fecha Servicio</div><div class="detail-value">${new Date(d.fechaServicio).toLocaleDateString('es-ES')}</div></div>
                    <div class="detail-item"><div class="detail-label">Días Gestación</div><div class="detail-value">${d.diasGestacion}</div></div>
                    <div class="detail-item"><div class="detail-label">Parto Est.</div><div class="detail-value">${new Date(d.fechaPartoEstimada).toLocaleDateString('es-ES')}</div></div>
                </div>
            </div>
        `;
    }

    else if (type === "parto") {
        const d = partosData.find(p => p.id === id);

        html = `
            <div class="detail-section">
                <h3 class="detail-section-title">Parto</h3>
                <div class="detail-grid">
                    <div class="detail-item"><div class="detail-label">Madre</div><div class="detail-value">${d.madre}</div></div>
                    <div class="detail-item"><div class="detail-label">Fecha</div><div class="detail-value">${new Date(d.fecha).toLocaleDateString('es-ES')}</div></div>
                    <div class="detail-item"><div class="detail-label">Tipo</div><div class="detail-value">${d.tipo}</div></div>
                    <div class="detail-item"><div class="detail-label">Dificultad</div><div class="detail-value">${d.dificultad}</div></div>
                </div>
            </div>

            <div class="detail-section">
                <h3 class="detail-section-title">Cría</h3>
                <div class="detail-grid">
                    <div class="detail-item"><div class="detail-label">Sexo</div><div class="detail-value">${d.criaSexo}</div></div>
                    <div class="detail-item"><div class="detail-label">Peso</div><div class="detail-value">${d.criaPeso} kg</div></div>
                    <div class="detail-item"><div class="detail-label">ID</div><div class="detail-value">${d.criaId || "No asignado"}</div></div>
                    <div class="detail-item"><div class="detail-label">Estado</div><div class="detail-value">${d.criaEstado}</div></div>
                </div>
                ${d.observaciones ? `<p style="margin-top:16px; color:#6B7280;">${d.observaciones}</p>` : ''}
            </div>
        `;
    }

    document.getElementById("detailsContent").innerHTML = html;
    document.getElementById("modalDetails").classList.add('active');
    document.body.style.overflow = 'hidden';
}



// ============================================
// ACTIVAR CIERRE DE MODALES AL CLIC FUERA
// ============================================

function activateModalOutsideClick() {
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });
}
window.onCalendarDayClick = function (dateStr) {
    const container = document.getElementById("calendarEvents");

    const eventos = [
        ...celosData.map(e => ({ ...e, type: "celo", emoji: "🌸", title: "Celo" })),
        ...inseminacionesData.map(e => ({ ...e, type: "inseminación", emoji: "💉", title: "Inseminación" })),
        ...gestacionesData.map(e => ({ ...e, type: "gestación", emoji: "🤰", title: "Diagnóstico / Gestación" })),
        ...partosData.map(e => ({ ...e, type: "parto", emoji: "🐄", title: "Parto" }))
    ].filter(ev =>
        ev.fecha === dateStr ||
        ev.fechaServicio === dateStr
    );

    if (eventos.length === 0) {
        container.innerHTML = `
            <div style="padding:20px; text-align:center; color:#6B7280;">
                No hay actividades registradas en esta fecha.
            </div>
        `;
        return;
    }

    container.innerHTML = eventos.map(ev => `
        <div class="event-card ${ev.type}">
            <div class="card-header">
                <div class="card-title">${ev.emoji} ${ev.title}</div>
                <div class="card-date">
                    ${new Date(dateStr).toLocaleDateString("es-ES")}
                </div>
            </div>
            <div class="card-body">
                <p><strong>Animal:</strong> ${ev.animal || ev.madre}</p>
                ${ev.tipo ? `<p><strong>Tipo:</strong> ${ev.tipo}</p>` : ""}
                ${ev.intensidad ? `<p><strong>Intensidad:</strong> ${ev.intensidad}</p>` : ""}
                ${ev.estado ? `<p><strong>Estado:</strong> ${ev.estado}</p>` : ""}
                ${ev.criaSexo ? `<p><strong>Cría:</strong> ${ev.criaSexo}</p>` : ""}
            </div>
        </div>
    `).join('');
};

// ============================================
// 🟢 INICIALIZACIÓN GLOBAL DEL MÓDULO
// ============================================

window.initializeReproduccionModule = function () {
    console.log("🔥 initializeReproduccionModule ejecutado correctamente");

    // 1. Cargar selects
    initializeSelects();

    // 2. Activar pestañas
    activateTabs();

    // 3. Activar botones
    activateButtons();

    // 4. Renderizar la primera pestaña (Celos)
    hideAllTabs();
    showTab("celos");

    // 5. Activar cierre de modales con click afuera
    activateModalOutsideClick();

    // 6. Inicializar calendario
    renderCalendar();

    attachCalendarNavEvents();

};

// ==================================================
// 🟢 MODALES — ABRIR Y CERRAR (FALTANTES)
// ==================================================

function openCeloModal() {
    document.getElementById("modalCelo").classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeCeloModal() {
    document.getElementById("modalCelo").classList.remove("active");
    document.body.style.overflow = "auto";
}

function openInseminacionModal() {
    document.getElementById("modalInseminacion").classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeInseminacionModal() {
    document.getElementById("modalInseminacion").classList.remove("active");
    document.body.style.overflow = "auto";
}

function openPartoModal() {
    document.getElementById("modalParto").classList.add("active");
    document.body.style.overflow = "hidden";
}

function closePartoModal() {
    document.getElementById("modalParto").classList.remove("active");
    document.body.style.overflow = "auto";
}
function openDiagnosticoModal() {
    document.getElementById("modalDiagnostico").classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeDiagnosticoModal() {
    document.getElementById("modalDiagnostico").classList.remove("active");
    document.body.style.overflow = "auto";
}


function closeDetailsModal() {
    document.getElementById("modalDetails").classList.remove("active");
    document.body.style.overflow = "auto";
}




// ==================================================
// 🔍 FILTROS — CELOS
// ==================================================

const searchCelosInput = document.getElementById("searchCelos");
const filterPeriodo = document.getElementById("filterPeriodo");

if (searchCelosInput) {
    searchCelosInput.addEventListener("input", applyCeloFilters);
}
if (filterPeriodo) {
    filterPeriodo.addEventListener("change", applyCeloFilters);
}

function applyCeloFilters() {
    let list = [...celosData];

    // 📌 Filtro de texto
    const txt = searchCelosInput.value.toLowerCase();
    if (txt) {
        list = list.filter(c => c.animal.toLowerCase().includes(txt));
    }

    // 📌 Filtro de periodo
    const periodo = filterPeriodo.value;
    if (periodo) {
        const today = new Date();

        list = list.filter(celo => {
            const fecha = new Date(celo.fecha);
            const diff = (today - fecha) / (1000 * 60 * 60 * 24); // días

            if (periodo === "ultimos7") return diff <= 7;
            if (periodo === "ultimos30") return diff <= 30;
            if (periodo === "mes") return fecha.getMonth() === today.getMonth();
        });
    }

    renderCelosFiltered(list);
}

// ==================================================
// 🔍 FILTROS — INSEMINACIONES
// ==================================================

const searchInsemi = document.getElementById("searchInseminaciones");
const filterTipo = document.getElementById("filterTipo");
const filterEstadoIA = document.getElementById("filterEstadoIA");

if (searchInsemi) searchInsemi.addEventListener("input", applyInsemiFilters);
if (filterTipo) filterTipo.addEventListener("change", applyInsemiFilters);
if (filterEstadoIA) filterEstadoIA.addEventListener("change", applyInsemiFilters);

function applyInsemiFilters() {
    let list = [...inseminacionesData];

    // 🔍 Texto
    const txt = searchInsemi.value.toLowerCase();
    if (txt) {
        list = list.filter(i => i.animal.toLowerCase().includes(txt));
    }

    // 🐂 Tipo inseminación
    const tipo = filterTipo.value;
    if (tipo) {
        list = list.filter(i => i.tipo === tipo);
    }

    // 🟣 Estado
    const est = filterEstadoIA.value;
    if (est) {
        list = list.filter(i => i.estado === est);
    }

    renderInsemFiltered(list);
}

function renderInsemFiltered(list) {
    const tbody = document.getElementById("inseminacionesTableBody");

    if (!list.length) {
        tbody.innerHTML =
            '<tr><td colspan="7" style="text-align:center; padding:40px;">Sin coincidencias</td></tr>';
        return;
    }

    tbody.innerHTML = list
        .map(ia => `
        <tr>
            <td><strong>${ia.animal}</strong></td>
            <td>${ia.tipo}</td>
            <td>${new Date(ia.fecha).toLocaleDateString('es-ES')}</td>
            <td>${ia.toro}</td>
            <td>${ia.tecnico || 'N/A'}</td>
            <td><span class="badge ${ia.estado.toLowerCase()}">${ia.estado}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn-action btn-view" onclick="viewDetails('inseminacion', '${ia.id}')">👁️</button>
                    <button class="btn-action btn-edit" onclick="editInseminacion('${ia.id}')">✏️</button>
                    <button class="btn-action btn-delete" onclick="deleteInseminacion('${ia.id}')">🗑️</button>
                </div>
            </td>
        </tr>
    `).join('');
}

// ==================================================
// 🔍 FILTRO — GESTACIONES
// ==================================================

const searchGest = document.getElementById("searchGestaciones");

if (searchGest) {
    searchGest.addEventListener("input", () => {
        const txt = searchGest.value.toLowerCase();
        const list = gestacionesData.filter(g => g.animal.toLowerCase().includes(txt));
        renderGestacionesFiltered(list);
    });
}

function renderGestacionesFiltered(list) {
    const tbody = document.getElementById("gestacionesTableBody");

    if (!list.length) {
        tbody.innerHTML =
            '<tr><td colspan="6" style="text-align:center; padding:40px;">Sin coincidencias</td></tr>';
        return;
    }

    tbody.innerHTML = list
        .map(g => `
        <tr>
            <td><strong>${g.animal}</strong></td>
            <td>${new Date(g.fechaServicio).toLocaleDateString('es-ES')}</td>
            <td>${g.diasGestacion} días</td>
            <td>${new Date(g.fechaPartoEstimada).toLocaleDateString('es-ES')}</td>
            <td><span class="badge gestante">Gestante</span></td>
            <td><button class="btn-action btn-view" onclick="viewDetails('gestacion', '${g.id}')">👁️</button></td>
        </tr>
    `).join('');
}

function saveDiagnostico() {
    const animalId = document.getElementById('diagnosticoAnimal').value;
    const fecha = document.getElementById('diagnosticoFecha').value;
    const resultado = document.getElementById('diagnosticoResultado').value;
    const tecnico = document.getElementById('diagnosticoTecnico').value;
    const observaciones = document.getElementById('diagnosticoObservaciones').value;

    if (!animalId || !fecha) {
        alert("⚠️ Completa los campos requeridos");
        return;
    }

    const animal = animalesHembra.find(a => a.id === animalId);

    const data = {
        id: 'G' + String(gestacionesData.length + 1).padStart(3, '0'),
        animalId,
        animal: `${animal.nombre} (${animal.id})`,
        fechaServicio: fecha,
        diasGestacion: 0,
        fechaPartoEstimada: 'N/A',
        estado: resultado,
        tecnico,
        observaciones
    };

    gestacionesData.push(data);

    alert("Diagnóstico registrado");
    closeDiagnosticoModal();
    renderGestaciones();
}

// ==================================================
// 🔍 FILTRO — PARTOS
// ==================================================

const searchPart = document.getElementById("searchPartos");

if (searchPart) {
    searchPart.addEventListener("input", () => {
        const txt = searchPart.value.toLowerCase();
        const list = partosData.filter(p => p.madre.toLowerCase().includes(txt));
        renderPartosFiltered(list);
    });
}

function renderPartosFiltered(list) {
    const grid = document.getElementById("partosGrid");

    if (!list.length) {
        grid.innerHTML =
            '<p style="text-align:center; padding:40px;">Sin coincidencias</p>';
        return;
    }

    grid.innerHTML = list
        .map(p => `
        <div class="event-card parto" onclick="viewDetails('parto','${p.id}')">
            <div class="card-header">
                <div class="card-title">🐄 ${p.madre}</div>
                <div class="card-date">${new Date(p.fecha).toLocaleDateString('es-ES')}</div>
            </div>
        </div>
    `).join('');
}

