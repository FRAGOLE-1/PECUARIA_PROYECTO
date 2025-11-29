// ====================================================
// DASHBOARD.JS — Versión estable (solo funciones)
// Se ejecuta **cuando index.html llama reinitializeDashboardFeatures()**
// ====================================================

// ======================
// 👉 ACTIVAR ACCESOS DIRECTOS KPI
// ======================
function setupKpiShortcuts() {
    console.log("⚡ Activando accesos rápidos KPI...");

    const cards = document.querySelectorAll('.kpi-card[data-module]');

    if (!cards.length) {
        console.warn("⏳ KPIs aún no cargan... Reintentando...");
        setTimeout(setupKpiShortcuts, 300);
        return;
    }

    // Limpia eventos viejos
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        card.replaceWith(clone);
    });

    // Re-seleccionar después de clonar
    const freshCards = document.querySelectorAll('.kpi-card[data-module]');

    freshCards.forEach(card => {
        card.style.cursor = "pointer";
        card.addEventListener("click", () => {
            const moduleName = card.dataset.module;
            console.log("➡️ Abriendo módulo desde KPI:", moduleName);
            if (typeof loadModule === "function") {
                loadModule(moduleName);
            } else {
                console.error("❌ loadModule no está disponible todavía");
            }
        });
    });

    console.log("✅ Accesos KPI listos.");
}



// ============================================
// 🔻 VER MÁS / VER MENOS (ALERTAS + ACTIVIDAD)
// ============================================
function initVerMasMenos() {
    console.log("🔄 Activando Ver más / Ver menos...");

    const alertasSection = document.querySelector('.bottom-section .section-card:nth-child(1)');
    const actividadSection = document.querySelector('.bottom-section .section-card:nth-child(2)');

    const alertasBtn = alertasSection?.querySelector('.section-link');
    const actividadBtn = actividadSection?.querySelector('.section-link');

    const alertasItems = alertasSection?.querySelectorAll('.alert-item') || [];
    const actividadItems = actividadSection?.querySelectorAll('.activity-item') || [];

    function toggle(section, button, items, visible = 3) {
        if (!section || !button || !items.length) {
            console.warn("⏳ Esperando elementos para toggle...");
            return;
        }

        // Estado inicial forzado (siempre colapsado)
        section.classList.remove("expanded");
        section.classList.add("collapsed");

        button.dataset.expanded = "false";
        button.textContent = "Ver más ↓";

        // Forzar ocultación INMEDIATA
        items.forEach((el, i) => {
            el.classList.remove("hidden"); // limpiamos por si quedó bugueado
            if (i >= visible) {
                el.classList.add("hidden");
            }
        });


        // → Evento clic
        button.onclick = (e) => {
            e.preventDefault();
            const exp = button.dataset.expanded === "true";

            if (exp) {
                section.classList.add("collapsed");
                section.classList.remove("expanded");

                items.forEach((el, i) => {
                    if (i >= visible) el.classList.add("hidden");
                });

                button.textContent = "Ver más ↓";
                button.dataset.expanded = "false";

            } else {
                section.classList.remove("collapsed");
                section.classList.add("expanded");

                items.forEach(el => el.classList.remove("hidden"));

                button.textContent = "Ver menos ↑";
                button.dataset.expanded = "true";
            }
        };
    }

    toggle(alertasSection, alertasBtn, alertasItems, 3);
    toggle(actividadSection, actividadBtn, actividadItems, 4);


    console.log("✅ Ver más / Ver menos activo.");
}



// ============================================
// 📝 TAREAS INTERACTIVAS
// ============================================
function setupTasks() {
    console.log("🟢 Activando sistema de tareas...");

    const tasks = document.querySelectorAll('.task-item');

    if (!tasks.length) {
        console.warn("⏳ Tareas aún no cargan...");
        setTimeout(setupTasks, 300);
        return;
    }

    // Evitar duplicar eventos
    tasks.forEach(task => {
        const clone = task.cloneNode(true);
        task.replaceWith(clone);
    });

    const fresh = document.querySelectorAll('.task-item');

    fresh.forEach(item => {
        item.addEventListener('click', function () {
            const checkbox = this.querySelector('.task-checkbox');
            const text = this.querySelector('.task-text');

            checkbox.classList.toggle('checked');
            text.classList.toggle('completed');
        });
    });

    console.log("✅ Tareas activadas.");
}



// ============================================
// 🔁 FUNCIÓN PRINCIPAL QUE SE LLAMA DESDE index.html
// ============================================
function reinitializeDashboardFeatures() {
    console.log("♻️ Re-Inicializando Dashboard...");

    // 1️⃣ Accesos directos
    setupKpiShortcuts();

    // 2️⃣ Botones Ver más / Ver menos
    initVerMasMenos();

    // 3️⃣ Tareas
    setupTasks();

    console.log("✅ Dashboard completamente activo.");
}

// ============================================
// 📊 FUNCIONES DE GRÁFICOS DEL DASHBOARD
// ============================================

// === Gráfico principal de Producción ===

let produccionChart = null; // permite destruir y redibujar

function createProduccionChart(rango = "semana") {
    const ctx = document.getElementById("produccionChart");

    if (!ctx) return;

    // Datos por rango (luego los conectarás al backend real)
    const dataPorRango = {
        semana: {
            labels: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
            valores: [450, 520, 480, 530, 610, 720]
        },
        mes: {
            labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
            valores: [1800, 2100, 1950, 2300]
        },
        trimestre: {
            labels: ["Ene", "Feb", "Mar"],
            valores: [5600, 6100, 5900]
        }
    };

    // Si no hay datos → mensaje
    if (!dataPorRango[rango] || dataPorRango[rango].valores.length === 0) {
        ctx.parentElement.innerHTML = `
            <p style="text-align:center; color:#6B7280; padding:30px;">❌ No hay datos disponibles para este rango.</p>
        `;
        return;
    }

    // Si ya existe la gráfica → destruir
    if (produccionChart) {
        produccionChart.destroy();
    }

    // 🎨 Degradado moderno estilo premium
    const gradient = ctx.getContext("2d").createLinearGradient(0, 0, 0, 350);
    gradient.addColorStop(0, "rgba(16,185,129,0.35)");
    gradient.addColorStop(1, "rgba(16,185,129,0.02)");

    // Dibujar nueva
    produccionChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: dataPorRango[rango].labels,
            
            datasets: [{
                label: "Litros producidos",
                data: dataPorRango[rango].valores,
                borderWidth: 4,
                borderColor: "#10B981",
                backgroundColor: gradient,
                fill: true,
                tension: 0.45,
                pointRadius: 6,
                pointHoverRadius: 8,
                pointBackgroundColor: "#fff",
                pointBorderColor: "#10B981",
                pointBorderWidth: 3
            }]

        },
        
        options: {
    responsive: true,
    plugins: {
        legend: { display: false },
        tooltip: {
            backgroundColor: "rgba(0,0,0,0.75)",
            padding: 12,
            titleFont: { size: 14 },
            bodyFont: { size: 13 },
            boxPadding: 4,
            cornerRadius: 8
        }
    },
    elements: {
        line: {
            borderWidth: 4,
            tension: 0.45,
            borderCapStyle: "round"
        },
        point: {
            radius: 6,
            hoverRadius: 8,
            backgroundColor: "#fff",
            borderWidth: 3,
            borderColor: "#3B82F6"
        }
    },
    scales: {
        y: {
            beginAtZero: true,
            ticks: { color: "#4B5563", font: { size: 12 } }
        },
        x: {
            ticks: { color: "#4B5563", font: { size: 12 } }
        }
    }
}

    });
}


// === Gráfico de Distribución de Animales ===
function createDistribucionChart() {
    const ctx = document.getElementById("distribucionChart");

    if (!ctx) {
        console.warn("⛔ No se encontró el canvas de distribución.");
        return;
    }

    new Chart(ctx, {
    type: "doughnut",
    data: {
        labels: ["Vacas Lecheras", "Terneros", "Novillos", "Toros"],
        datasets: [{
            data: [120, 45, 54, 15],
            backgroundColor: [
                "#10B981",
                "#3B82F6",
                "#F59E0B",
                "#EF4444"
            ],
            borderWidth: 0,
            hoverOffset: 10
        }]
    },
    options: {
        responsive: true,
        cutout: "72%",
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    padding: 18,
                    color: "#374151",
                    font: { size: 14, weight: "600" }
                }
            }
        }
    }
});


    console.log("🐮 Gráfico de distribución creado");
}


// === Gráfico de Finanzas ===
function createFinanzasChart() {
    const ctx = document.getElementById("finanzasChart");

    if (!ctx) {
        console.warn("⛔ No se encontró el canvas de finanzas.");
        return;
    }

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
            datasets: [
                {
                    label: "Ingresos",
                    data: [12000, 15000, 11000, 18000],
                    backgroundColor: "rgba(16,185,129,0.8)",
                    borderRadius: 12,
                    barThickness: 38

                },
                {
                    label: "Gastos",
                    data: [7000, 5000, 6500, 7200],
                    backgroundColor: "rgba(239,68,68,0.8)",
                    borderRadius: 12,
                    barThickness: 38

                }
            ]
        },
        
        options: {
    responsive: true,
    plugins: {
        legend: {
            labels: {
                color: "#374151",
                font: { size: 14, weight: "600" }
            }
        },
        tooltip: {
            backgroundColor: "rgba(0,0,0,0.75)",
            padding: 12,
            cornerRadius: 8,
            bodyFont: { size: 13 }
        }
    },
    scales: {
        y: {
            beginAtZero: true,
            ticks: { color: "#4B5563", font: { size: 12 } }
        },
        x: {
            ticks: { color: "#4B5563", font: { size: 12 } }
        }
    }
}


    });

    console.log("💰 Gráfico financiero creado");
}



// ============================================
// 🔧 Filtros del gráfico principal
// ============================================

function setupFilters() {
    console.log("🔧 Activando filtros del gráfico...");

    const buttons = document.querySelectorAll(".filter-btn");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {

            // Quitar activo a todos
            buttons.forEach(b => b.classList.remove("active"));

            // Activar botón clickeado
            btn.classList.add("active");

            const rango = btn.dataset.range;
            console.log("📌 Filtro seleccionado:", rango);

            // Redibuja usando el rango elegido
            createProduccionChart(rango);
        });
    });

    console.log("✅ Filtros activos");
}


// ============================================
// 🚀 FUNCIÓN FINAL → CREA TODAS LAS GRÁFICAS
// ============================================
function initDashboardCharts() {
    console.log("📊 Iniciando todas las gráficas del dashboard...");

    createProduccionChart("semana");

    createDistribucionChart();
    createFinanzasChart();
    setupFilters();
}


// ====================================================
// ⚠️ IMPORTANTE: ESTE ARCHIVO NO SE EJECUTA SOLO
// Lo ejecuta index.html DESPUÉS de cargar el módulo:
//      if (moduleName === "dashboard") reinitializeDashboardFeatures();
// ====================================================
