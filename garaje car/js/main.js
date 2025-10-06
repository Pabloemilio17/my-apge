// =======================
// NAVEGACIÓN
// =======================
function mostrarRentar() {
    window.location.href = 'rentar.html';
}

function mostrarBuscar(event) {
    const boton = event.target.textContent.toLowerCase();
    switch (boton) {
        case 'reservación':
            window.location.href = 'rentar.html';
            break;
        case 'modificar':
            window.location.href = 'modificar.html';
            break;
        case 'eliminar reservación':
            window.location.href = 'eliminar.html';
            break;
    }
}

function volver() {
    window.location.href = 'index.html';
}

// =======================
// MENSAJES ELEGANTES
// =======================
function mostrarMensaje(texto, tipo = "exito") {
    let div = document.getElementById("mensaje");
    if (!div) {
        // Crear el contenedor si no existe
        div = document.createElement("div");
        div.id = "mensaje";
        document.body.appendChild(div);
    }
    div.textContent = texto;
    div.className = "mensaje " + tipo;
    setTimeout(() => {
        div.textContent = "";
        div.className = "";
    }, 3000);
}

// =======================
// RESERVACIÓN
// =======================
function guardarReservacion(nombre, cedula, licencia, fechaRetiro, fechaEntrega, auto) {
    if (!nombre || !cedula || !licencia || !fechaRetiro || !fechaEntrega) {
        mostrarMensaje("Por favor completa todos los campos", "error");
        return false;
    }

    if (fechaEntrega < fechaRetiro) {
        mostrarMensaje("La fecha de entrega no puede ser anterior a la de retiro", "error");
        return false;
    }

    const reservaciones = JSON.parse(localStorage.getItem("reservaciones") || "[]");

    // Evitar duplicados
    const existe = reservaciones.find(r => r.cedula === cedula);
    if (existe) {
        mostrarMensaje("Ya existe una reservación con esa cédula", "error");
        return false;
    }

    reservaciones.push({ nombre, cedula, licencia, fechaRetiro, fechaEntrega, auto });
    localStorage.setItem("reservaciones", JSON.stringify(reservaciones));
    mostrarMensaje("¡Reservación guardada con éxito!", "exito");
    return true;
}

function reservasion() {
    const nombre = document.getElementById("nombre").value.trim();
    const cedula = document.getElementById("cedula").value.trim();
    const licencia = document.getElementById("licencia").value;
    const fechaRetiro = document.getElementById("fechaRetiro").value;
    const fechaEntrega = document.getElementById("fechaEntrega").value;
    const auto = "Sin especificar";

    if (guardarReservacion(nombre, cedula, licencia, fechaRetiro, fechaEntrega, auto)) {
        setTimeout(volver, 500);
    }
mostrarMensaje("¡Reservación  con éxito!", "exito");
}


// =======================
// BUSCAR RESERVACIÓN (actualizado para tu nuevo HTML)
// =======================
function buscarReservacionPorCedula(cedula) {
    const reservaciones = JSON.parse(localStorage.getItem("reservaciones") || "[]");
    return reservaciones.find(r => r.cedula === cedula);
}

function buscar() {
    const cedula = document.getElementById("cedulaBusqueda").value.trim(); // 🔥 ID actualizado
    if (!cedula) {
        mostrarMensaje("Ingrese un número de cédula", "error");
        return;
    }

    const reservacion = buscarReservacionPorCedula(cedula);
    if (reservacion) {
        alert(
            `Nombre: ${reservacion.nombre}\n` +
            `Fecha Retiro: ${reservacion.fechaRetiro}\n` +
            `Fecha Entrega: ${reservacion.fechaEntrega}\n` +
            `Licencia: ${reservacion.licencia}\n` +
            `Vehículo: ${reservacion.auto}`
        );
    } else {
        mostrarMensaje("No se encontró ninguna reservación con esa cédula", "error");
    }
}

// =======================
// MODIFICAR RESERVACIÓN
// =======================
function manejarModificacion() {
    const cedula = document.getElementById("cedulaBusqueda").value.trim(); // 🔥 también actualizado
    const formModificar = document.getElementById("formModificar");

    if (!cedula) {
        mostrarMensaje("Ingrese una cédula", "error");
        if (formModificar) formModificar.style.display = "none";
        return;
    }

    const reservaciones = JSON.parse(localStorage.getItem("reservaciones") || "[]");
    const index = reservaciones.findIndex(r => r.cedula === cedula);

    if (index === -1) {
        mostrarMensaje("No se encontró ninguna reservación con esa cédula", "error");
        if (formModificar) formModificar.style.display = "none";
        return;
    }

    if (!formModificar) {
        mostrarMensaje("No se encontró el formulario de modificación en el HTML", "error");
        return;
    }

    // Mostrar formulario
    formModificar.style.display = "block";

    // Rellenar campos
    document.getElementById("fechaRetiroMod").value = reservaciones[index].fechaRetiro;
    document.getElementById("fechaEntregaMod").value = reservaciones[index].fechaEntrega;
    document.getElementById("autoMod").value = reservaciones[index].auto;

    mostrarMensaje("Reservación encontrada. Modifique los datos.", "exito");

    // Guardar cambios
    const botonGuardar = document.getElementById("guardarModBtn");
    botonGuardar.onclick = function () {
        const fechaRetiro = document.getElementById("fechaRetiroMod").value;
        const fechaEntrega = document.getElementById("fechaEntregaMod").value;
        const auto = document.getElementById("autoMod").value.trim();

        if (!fechaRetiro || !fechaEntrega || !auto) {
            mostrarMensaje("Complete todos los campos", "error");
            return;
        }

        if (fechaEntrega < fechaRetiro) {
            mostrarMensaje("La fecha de entrega no puede ser anterior a la de retiro", "error");
            return;
        }

        reservaciones[index].fechaRetiro = fechaRetiro;
        reservaciones[index].fechaEntrega = fechaEntrega;
        reservaciones[index].auto = auto;
        localStorage.setItem("reservaciones", JSON.stringify(reservaciones));

        mostrarMensaje("¡Reservación modificada con éxito!", "exito");
    };
}
// =======================
// ELIMINAR RESERVACIÓN
// =======================
function eliminarReservacionPorCedula(cedula) {
    const reservaciones = JSON.parse(localStorage.getItem("reservaciones") || "[]");
    const nuevasReservaciones = reservaciones.filter(r => r.cedula !== cedula);
    localStorage.setItem("reservaciones", JSON.stringify(nuevasReservaciones));
    return nuevasReservaciones.length < reservaciones.length; // Retorna true si se eliminó
}

function eliminar() {
    const cedula = document.getElementById("cedulaEliminar").value.trim();
    if (!cedula) {
        mostrarMensaje("Ingrese un número de cédula", "error");
        return;
    }

    const reservacion = buscarReservacionPorCedula(cedula);
    if (!reservacion) {
        mostrarMensaje("No se encontró ninguna reservación con esa cédula", "error");
        return;
    }

    // Confirmación antes de eliminar
    const confirmar = confirm(`Se encontró la reservación de ${reservacion.nombre}. ¿Desea eliminarla?`);
    if (confirmar) {
        if (eliminarReservacionPorCedula(cedula)) {
            mostrarMensaje("¡Reservación eliminada con éxito!", "exito");
            setTimeout(volver, 500); // vuelve al índice
        } else {
            mostrarMensaje("No se pudo eliminar la reservación", "error");
        }
    }
}

