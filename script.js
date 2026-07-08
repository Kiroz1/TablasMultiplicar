const contenedor = document.getElementById("contenedorEjercicios");
const tituloTabla = document.getElementById("tituloTabla");
const barraProgreso = document.getElementById("barraProgreso");
const textoProgreso = document.getElementById("textoProgreso");

const popupBuho = document.getElementById("popupBuho");
const mensajeBuho = document.getElementById("mensajeBuho");

let temporizadorPopup;
let tablaActual = 1;
let recompensaMostrada = false;

const emojisTablas = {
  1: "🐣",
  2: "🐶",
  3: "🚀",
  4: "🦖",
  5: "🦁",
  6: "🚗",
  7: "⚽",
  8: "🌈",
  9: "🏆",
  10: "👑"
};

const mensajesCorrecto = [
  "¡Excelente!",
  "¡Muy bien!",
  "¡Correcto!",
  "¡Sigue así!",
  "¡Lo lograste!",
  "¡Eres increíble!"
];

const mensajesIncorrecto = [
  "Inténtalo otra vez",
  "Casi lo consigues",
  "Tú puedes",
  "Piensa un poquito más",
  "No pasa nada",
  "Vuelve a intentar"
];

function cargarTabla(numero) {
  tablaActual = numero;
  recompensaMostrada = false;

  tituloTabla.textContent = `${emojisTablas[numero]} Tabla del ${numero}`;
  contenedor.innerHTML = "";

  for (let i = 1; i <= 10; i++) {
    contenedor.innerHTML += `
      <div class="ejercicio">
        ${numero} x ${i} =
        <input
          type="number"
          oninput="verificar(this, ${numero * i})"
        >
        <span class="resultado"></span>
      </div>
    `;
  }

  actualizarProgreso();
  mostrarPopup(`Practiquemos la tabla del ${numero}`, "inicio");
}

function verificar(input, respuestaCorrecta) {
  const ejercicio = input.parentElement;
  const resultado = ejercicio.querySelector(".resultado");
  const respuestaUsuario = Number(input.value);

  ejercicio.classList.remove("correcto", "incorrecto");
  resultado.textContent = "";

  if (input.value === "") {
    actualizarProgreso();
    return;
  }

  if (respuestaUsuario === respuestaCorrecta) {
    ejercicio.classList.add("correcto");
    resultado.textContent = "✅";
    input.disabled = true;
    mostrarPopup(mensajeAleatorio(mensajesCorrecto), "correcto");
  } else {
    ejercicio.classList.add("incorrecto");
    resultado.textContent = "❌";
    mostrarPopup(mensajeAleatorio(mensajesIncorrecto), "incorrecto");
  }

  actualizarProgreso();
}

function actualizarProgreso() {
  const correctos = document.querySelectorAll(".ejercicio.correcto").length;
  const porcentaje = (correctos / 10) * 100;

  barraProgreso.style.height = `${porcentaje}%`;
  textoProgreso.textContent = `${correctos}/10`;

  if (correctos === 10 && !recompensaMostrada) {
    recompensaMostrada = true;

    setTimeout(() => {
      mostrarRecompensa();
    }, 400);
  }
}

function mensajeAleatorio(lista) {
  return lista[Math.floor(Math.random() * lista.length)];
}

function mostrarPopup(texto, tipo) {
  if (recompensaMostrada) {
    return;
  }

  mensajeBuho.textContent = texto;

  popupBuho.classList.remove(
    "correcto-popup",
    "incorrecto-popup",
    "inicio-popup"
  );

  if (tipo === "correcto") {
    popupBuho.classList.add("correcto-popup");
  } else if (tipo === "incorrecto") {
    popupBuho.classList.add("incorrecto-popup");
  } else {
    popupBuho.classList.add("inicio-popup");
  }

  popupBuho.classList.add("mostrar");

  clearTimeout(temporizadorPopup);

  temporizadorPopup = setTimeout(() => {
    popupBuho.classList.remove("mostrar");
  }, 1200);
}

function mostrarRecompensa() {
  const recompensa = document.createElement("div");

  recompensa.classList.add("recompensa");
  recompensa.id = "recompensa";

  let botonSiguiente = "";

  if (tablaActual < 10) {
    botonSiguiente = `
      <button id="btnSiguiente" onclick="siguienteTabla()">
        ➡️ Siguiente tabla
      </button>
    `;
  } else {
    botonSiguiente = `
      <button id="btnSiguiente" onclick="cerrarRecompensa()">
        🏆 Terminar
      </button>
    `;
  }

  recompensa.innerHTML = `
    <div class="tarjeta-recompensa">
      <div class="buho-recompensa">🦉</div>

      <h2 id="tituloRecompensa">🎉 ¡FELICIDADES! 🎉</h2>

      <p id="mensajeRecompensa">
        🏆 Completaste la tabla del ${tablaActual}.<br>
        ⭐⭐⭐⭐⭐<br>
        ¡Excelente trabajo!
      </p>

      ${botonSiguiente}
    </div>
  `;

  document.body.appendChild(recompensa);

  setTimeout(() => {
    recompensa.classList.add("mostrar");
  }, 50);
}

function siguienteTabla() {
  cerrarRecompensa();
  cargarTabla(tablaActual + 1);
}

function cerrarRecompensa() {
  const recompensa = document.getElementById("recompensa");

  if (recompensa) {
    recompensa.remove();
  }
}

cargarTabla(1);