const barrios = [
  {
    id: "barrio1",
    nombre: "Barrio Los Álamos",
    imagen: "img/barrio1.png",
    lotes: []
  }
];

function cargarBarrios() {
  const cont = document.getElementById("lista-barrios");
  barrios.forEach(b => {
    const div = document.createElement("div");
    div.innerHTML = `<a href="barrio.html?id=${b.id}">${b.nombre}</a>`;
    cont.appendChild(div);
  });
}

function iniciarBarrio() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const barrio = barrios.find(b => b.id === id);

  document.getElementById("titulo-barrio").textContent = barrio.nombre;
  const img = document.getElementById("mapa-barrio");
  const canvas = document.getElementById("lienzo-lotes");
  const ctx = canvas.getContext("2d");

  img.src = barrio.imagen;
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    dibujarLotes();

    canvas.addEventListener("click", e => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      barrio.lotes.push({ x, y });
      dibujarLotes();
    });
  };

  function dibujarLotes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    barrio.lotes.forEach(l => {
      ctx.beginPath();
      ctx.arc(l.x, l.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = "red";
      ctx.fill();
      ctx.stroke();
    });
  }
}
