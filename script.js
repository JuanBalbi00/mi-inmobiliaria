/* =====================================================
   SISTEMA DE DATOS — LOCALSTORAGE
===================================================== */

// Cargar datos desde localStorage o crear base vacía
function getData() {
  const saved = localStorage.getItem("inmobiliariaDB");
  if (saved) return JSON.parse(saved);

  const inicial = { barrios: [] };
  localStorage.setItem("inmobiliariaDB", JSON.stringify(inicial));
  return inicial;
}

// Guardar datos en localStorage
function saveData(data) {
  localStorage.setItem("inmobiliariaDB", JSON.stringify(data));
}

/* =====================================================
   INDEX — MOSTRAR BARRIOS
===================================================== */

function cargarBarrios() {
  const data = getData();
  const contenedor = document.getElementById("lista-barrios");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  data.barrios.forEach((barrio) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${barrio.nombre}</h3>
      <a href="barrio.html?id=${barrio.id}" class="btn">Ver mapa</a>
    `;
    contenedor.appendChild(card);
  });
}

/* =====================================================
   ADMIN — MOSTRAR Y AGREGAR
===================================================== */

function cargarBarriosAdmin() {
  const data = getData();
  const cont = document.getElementById("admin-barrios");
  if (!cont) return;

  cont.innerHTML = "";

  data.barrios.forEach((barrio) => {
    const div = document.createElement("div");
    div.className = "admin-item";
    div.innerHTML = `
      <p><strong>${barrio.nombre}</strong></p>
      <button onclick="eliminarBarrio(${barrio.id})">Eliminar</button>
    `;
    cont.appendChild(div);
  });
}

function agregarBarrio() {
  const nombre = document.getElementById("barrio-nombre").value;
  const imagen = document.getElementById("barrio-imagen").value;

  if (nombre.trim() === "" || imagen.trim() === "") {
    alert("Completá ambos campos");
    return;
  }

  const data = getData();

  data.barrios.push({
    id: Date.now(),
    nombre,
    imagen,
    lotes: []
  });

  saveData(data);
  cargarBarriosAdmin();
  alert("Barrio agregado correctamente");

  document.getElementById("barrio-nombre").value = "";
  document.getElementById("barrio-imagen").value = "";
}

function eliminarBarrio(id) {
  const data = getData();
  data.barrios = data.barrios.filter(b => b.id !== id);
  saveData(data);
  cargarBarriosAdmin();
  alert("Barrio eliminado");
}

/* =====================================================
   AUTO-DETETECCIÓN DE PÁGINA
===================================================== */

if (window.location.pathname.includes("index")) cargarBarrios();
if (window.location.pathname.includes("admin")) cargarBarriosAdmin();
