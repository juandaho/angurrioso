let objetivo = 100;
let jugadorActual = 1;
let puntosJugadores;
let nombresJugadores;
let puntosRonda = 0;

document.getElementById('definirJugadores').addEventListener('click', function() {
    const numeroJugadores = parseInt(document.getElementById('numeroJugadores').value, 10);
    const contenedorNombres = document.getElementById('nombresJugadores');
    contenedorNombres.innerHTML = '';
    for (let i = 1; i <= numeroJugadores; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.id = `nombreJugador${i}`;
        input.placeholder = `Nombre del Jugador ${i}`;
        contenedorNombres.appendChild(input);
    }
    document.getElementById('iniciarJuego').disabled = false;
});

document.getElementById('iniciarJuego').addEventListener('click', function() {
    objetivo = parseInt(document.getElementById('puntosObjetivo').value, 10);
    const numeroJugadores = parseInt(document.getElementById('numeroJugadores').value, 10);
    puntosJugadores = new Array(numeroJugadores).fill(0);
    nombresJugadores = [];
    for (let i = 1; i <= numeroJugadores; i++) {
        nombresJugadores.push(document.getElementById(`nombreJugador${i}`).value || `Jugador ${i}`);
    }
    jugadorActual = 1;
    document.getElementById('jugadorActual').innerText = nombresJugadores[jugadorActual - 1];
    document.getElementById('ingresarDado').disabled = false;
    document.getElementById('parar').disabled = false;
    actualizarTablaProgreso();
});

document.getElementById('ingresarDado').addEventListener('click', function() {
    const resultado = parseInt(document.getElementById('resultadoDado').value, 10);
    if(resultado < 1 || resultado > 6) {
        alert('Por favor, ingresa un número válido entre 1 y 6.');
        return;
    }
    if(resultado === 1) {
        alert(`Lo siento, ${nombresJugadores[jugadorActual - 1]}, sacaste 1. Pierdes tus puntos de esta ronda.`);
        puntosRonda = 0;
        siguienteJugador();
    } else {
        puntosRonda += resultado;
        document.getElementById('puntosRonda').innerText = puntosRonda;
    }
});

document.getElementById('parar').addEventListener('click', function() {
    puntosJugadores[jugadorActual - 1] += puntosRonda;
    puntosRonda = 0;
    document.getElementById('puntosRonda').innerText = puntosRonda;
    siguienteJugador();
});

function siguienteJugador() {
    jugadorActual = (jugadorActual % puntosJugadores.length) + 1;
    document.getElementById('jugadorActual').innerText = nombresJugadores[jugadorActual - 1];
    document.getElementById('resultadoDado').value = '';
    actualizarTablaProgreso();
}

function actualizarTablaProgreso() {
    const tbody = document.getElementById('tablaProgreso').querySelector('tbody');
    tbody.innerHTML = '';
    puntosJugadores.forEach((puntos, index) => {
        const tr = document.createElement('tr');
        const puntosFaltantes = objetivo - puntos > 0 ? objetivo - puntos : '---';
        tr.innerHTML = `<td>${nombresJugadores[index]}</td><td>${puntos}</td><td>${puntosFaltantes}</td>`;
        tbody.appendChild(tr);
    });
}

function finalizarJuego() {
    document.getElementById('ingresarDado').disabled = true;
    document.getElementById('parar').disabled = true;
}
