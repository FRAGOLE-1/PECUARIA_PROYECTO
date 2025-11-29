// ================================
// FARMS MODULE – CattleSIS
// ================================

// Datos temporales (luego conectarás con API)
let fincas = [
    { id: 'F001', nombre: 'Finca El Paraíso', ubicacion: 'Sector Norte', hectareas: 150, estado: "Activa" },
    { id: 'F002', nombre: 'Finca La Esperanza', ubicacion: 'Sector Sur', hectareas: 200, estado: "Activa" },
    { id: 'F003', nombre: 'Finca San José', ubicacion: 'Sector Este', hectareas: 100, estado: "Activa" }
];

let potreros = [
    { id: 'P001', nombre: 'Potrero A', fincaId: 'F001', hectareas: 25, capacidad: 50, animales: 45, obs: "" },
    { id: 'P002', nombre: 'Potrero B', fincaId: 'F001', hectareas: 20, capacidad: 40, animales: 38, obs: "" }
];

// ================================
// INICIAR MÓDULO
// ================================
window.initFarmsModule = function () {

    console.log("🌾 Iniciando módulo FINCAS...");

    activarTabs();
    renderFincas();
    renderPotreros();
    actualizarStats();
    setupButtons();

    mostrarTab("fincas");
};

// ================================
// CONFIGURAR BOTONES
// ================================
function setupButtons() {
    // Abrir modal nueva finca
    const btnAddFinca = document.getElementById("btnAddFinca");
    if (btnAddFinca) {
        btnAddFinca.onclick = openFincaModal;
    }

    // Abrir modal nuevo potrero
    const btnAddPotrero = document.getElementById("btnAddPotrero");
    if (btnAddPotrero) {
        btnAddPotrero.onclick = openPotreroModal;
    }
}

// ================================
// ---------- MODALES FINCAS ----------
// ================================

function openFincaModal() {
    document.getElementById("fincaForm").reset();
    document.getElementById("modalFinca").classList.add("active");
}

function closeFincaModal() {
    document.getElementById("modalFinca").classList.remove("active");
}

// GUARDAR NUEVA FINCA
function saveFinca() {

    const nombre = document.getElementById("fincaNombre").value.trim();
    const ubicacion = document.getElementById("fincaUbicacion").value.trim();
    const hectareas = parseFloat(document.getElementById("fincaHectareas").value);
    const estado = document.getElementById("fincaEstado").value;

    if (!nombre || !ubicacion || isNaN(hectareas)) {
        alert("⚠️ Completa todos los campos obligatorios.");
        return;
    }

    // ============================================================
    // MODO EDICIÓN — Si existe fincaEditId, estamos editando
    // ============================================================
    if (window.fincaEditId) {
        const f = fincas.find(x => x.id === window.fincaEditId);
        if (f) {
            f.nombre = nombre;
            f.ubicacion = ubicacion;
            f.hectareas = hectareas;
            f.estado = estado;
        }

        window.fincaEditId = null;
        closeFincaModal();
        renderFincas();
        renderPotreros();
        actualizarStats();
        alert("✏️ Finca actualizada correctamente");
        return;
    }

    // ============================================================
    // ✔️ MODO CREAR — Si NO existe fincaEditId, creamos nueva
    // ============================================================
    const newId = "F" + String(fincas.length + 1).padStart(3, "0");

    fincas.push({
        id: newId,
        nombre,
        ubicacion,
        hectareas,
        estado
    });

    closeFincaModal();
    renderFincas();
    renderPotreros();
    actualizarStats();

    alert("✅ Finca registrada con éxito");
}


// ================================
// ---------- MODALES POTREROS ----------
// ================================

function openPotreroModal() {
    document.getElementById("potreroForm").reset();
    fillPotreroFincas();
    document.getElementById("modalPotrero").classList.add("active");
}

function closePotreroModal() {
    document.getElementById("modalPotrero").classList.remove("active");
}

// Llenar el select con las fincas actuales
function fillPotreroFincas() {
    const select = document.getElementById("potreroFinca");
    select.innerHTML = `<option value="">Seleccionar finca</option>`;

    fincas.forEach(f => {
        const opt = document.createElement("option");
        opt.value = f.id;
        opt.textContent = f.nombre;
        select.appendChild(opt);
    });
}

// GUARDAR POTRERO
function savePotrero() {
    const nombre = document.getElementById("potreroNombre").value.trim();
    const fincaId = document.getElementById("potreroFinca").value;
    const hectareas = parseFloat(document.getElementById("potreroHectareas").value);
    const obs = document.getElementById("potreroObservaciones").value;

    if (!nombre || !fincaId || isNaN(hectareas)) {
        alert("⚠️ Completa todos los campos obligatorios.");
        return;
    }

    const newId = "P" + String(potreros.length + 1).padStart(3, "0");

    potreros.push({
        id: newId,
        nombre,
        fincaId,
        hectareas,
        capacidad: 0,
        animales: 0,
        obs
    });

    closePotreroModal();
    renderPotreros();
    actualizarStats();

    alert("✅ Potrero registrado con éxito");
}

// ================================
// MOSTRAR TAB
// ================================
function activarTabs() {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.onclick = () => mostrarTab(tab.dataset.tab);
    });
}

function mostrarTab(tab) {
    document.getElementById("fincasContent").style.display = tab === "fincas" ? "block" : "none";
    document.getElementById("potrerosContent").style.display = tab === "potreros" ? "block" : "none";

    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelector(`[data-tab="${tab}"]`).classList.add("active");
}

function renderFincas() {
    const grid = document.getElementById("farmsGrid");
    grid.innerHTML = fincas.map(f => `
        <div class="farm-card">
            <div class="farm-header">
                <div class="farm-name">${f.nombre}</div>
                <div class="farm-location">📍 ${f.ubicacion}</div>
            </div>

            <div class="farm-body">
                <div class="farm-stats">
                    <div class="farm-stat">
                        <div class="farm-stat-value">${f.hectareas}</div>
                        <div class="farm-stat-label">Hectáreas</div>
                    </div>
                    <div class="farm-stat">
                        <div class="farm-stat-value">
                        ${potreros.filter(p => p.fincaId === f.id).length}
                        </div>
                        <div class="farm-stat-label">Potreros</div>
                    </div>
                </div>

                <div class="farm-actions">
                    <button class="btn-action-full" onclick="verPotreros('${f.id}')">🌾 Potreros</button>
                    <button class="btn-action-full" onclick="editFinca('${f.id}')">✏️ Editar</button>
                    <button class="btn-action-full" onclick="deleteFinca('${f.id}')">🗑️ Eliminar</button>
                </div>
            </div>
        </div>
    `).join("");
}


function renderPotreros() {
    const tbody = document.getElementById("potrerosTableBody");

    tbody.innerHTML = potreros.map(p => `
        <tr>
            <td><strong>${p.nombre}</strong></td>
            <td>${getFincaNombre(p.fincaId)}</td>
            <td>${p.hectareas} ha</td>
            <td>${p.capacidad}</td>
            <td>${p.animales}</td>
            <td>
                <button class="btn-action btn-edit" onclick="editPotrero('${p.id}')">✏️</button>
                <button class="btn-action btn-delete" onclick="deletePotrero('${p.id}')">🗑️</button>
            </td>
        </tr>
    `).join("");
}


function getFincaNombre(id) {
    const f = fincas.find(x => x.id === id);
    return f ? f.nombre : "-";
}

// ================================
// ACTUALIZAR ESTADÍSTICAS
// ================================
function actualizarStats() {
    document.querySelector(".stat-card:nth-child(1) .stat-value").textContent = fincas.length;
    document.querySelector(".stat-card:nth-child(2) .stat-value").textContent = potreros.length;
    document.querySelector(".stat-card:nth-child(3) .stat-value").textContent = fincas.reduce((t, f) => t + f.hectareas, 0);
    document.querySelector(".stat-card:nth-child(4) .stat-value").textContent = potreros.reduce((t, p) => t + p.animales, 0);
}

// ================================
// ACCIONES: EDITAR / ELIMINAR FINCA
// ================================

function editFinca(id) {
    const finca = fincas.find(f => f.id === id);
    if (!finca) return;

    document.getElementById("modalFincaTitle").innerHTML = "✏️ Editar Finca";
    document.getElementById("fincaNombre").value = finca.nombre;
    document.getElementById("fincaUbicacion").value = finca.ubicacion;
    document.getElementById("fincaHectareas").value = finca.hectareas;
    document.getElementById("fincaEstado").value = finca.estado;

    document.getElementById("modalFinca").classList.add("active");

    window.fincaEditId = id;
}

function deleteFinca(id) {
    if (!confirm("¿Eliminar esta finca?")) return;

    fincas = fincas.filter(f => f.id !== id);
    potreros = potreros.filter(p => p.fincaId !== id);

    renderFincas();
    renderPotreros();
    actualizarStats();
}

function editPotrero(id) {
    const p = potreros.find(x => x.id === id);
    if (!p) return;

    document.getElementById("modalPotreroTitle").innerHTML = "✏️ Editar Potrero";

    fillPotreroFincas();

    document.getElementById("potreroNombre").value = p.nombre;
    document.getElementById("potreroFinca").value = p.fincaId;
    document.getElementById("potreroHectareas").value = p.hectareas;
    document.getElementById("potreroObservaciones").value = p.obs;

    document.getElementById("modalPotrero").classList.add("active");

    window.potreroEditId = id;
}

function deletePotrero(id) {
    if (!confirm("¿Eliminar este potrero?")) return;

    potreros = potreros.filter(p => p.id !== id);
    renderPotreros();
    actualizarStats();
}
// ================================
// VER POTREROS DE UNA FINCA (MODAL)
// ================================
function verPotreros(fincaId) {
    const finca = fincas.find(f => f.id === fincaId);
    if (!finca) return;

    // Título dinámico
    document.getElementById("modalPotrerosTitle").innerHTML =
        `🌾 Potreros de ${finca.nombre}`;

    // Filtrar potreros
    const lista = document.getElementById("potrerosList");
    const listaPotreros = potreros.filter(p => p.fincaId === fincaId);

    // Si no hay potreros
    if (listaPotreros.length === 0) {
        lista.innerHTML = `
            <div class="potrero-item">
                <p>No hay potreros registrados para esta finca.</p>
            </div>
        `;
    } else {
        // Renderizar potreros
        lista.innerHTML = listaPotreros.map(p => `
            <div class="potrero-item">
                <div class="potrero-info">
                    <h4>${p.nombre}</h4>
                    <p>${p.hectareas} ha • ${p.animales} animales</p>
                </div>
                <div class="potrero-actions">
                    <button class="btn-action btn-edit" onclick="editPotrero('${p.id}')">✏️</button>
                    <button class="btn-action btn-delete" onclick="deletePotrero('${p.id}')">🗑️</button>
                </div>
            </div>
        `).join("");
    }

    // Abrir modal
    document.getElementById("modalPotreros").classList.add("active");
}

function closePotrerosModal() {
    document.getElementById("modalPotreros").classList.remove("active");
}

