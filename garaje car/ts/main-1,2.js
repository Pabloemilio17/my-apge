// ============================
// FUNCIONES PARA USUARIOS
// ============================

// Registrar usuario
function registrarUsuario(nombre, email, password) {
    if (!nombre || !email || !password) {
        alert("Completa todos los campos");
        return;
    }

    // Obtener usuarios existentes
    var usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

    // Agregar nuevo usuario
    usuarios.push({ nombre: nombre, email: email, password: password });

    // Guardar usuarios actualizados
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Usuario registrado!");
}

// Login de usuario
function loginUsuario(email, password) {
    // Obtener usuarios existentes
    var usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

    // Buscar usuario válido
    var usuarioValido = usuarios.find(function (u) {
        return u.email === email && u.password === password;
    });

    if (usuarioValido) {
        localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioValido));
        alert("Login exitoso");
    } else {
        alert("Usuario o contraseña incorrectos");
    }
}

// ============================
// FUNCIONES PARA RESERVAS
// ============================

function guardarReserva(fechaInicio, fechaFin, auto) {
    if (!fechaInicio || !fechaFin || !auto) {
        alert("Por favor, complete todos los campos");
        return false;
    }

    var inicio = new Date(fechaInicio);
    var fin = new Date(fechaFin);

    if (fin <= inicio) {
        alert("La fecha de fin debe ser posterior a la fecha de inicio");
        return false;
    }

    // Obtener reservas existentes
    var reservas = JSON.parse(localStorage.getItem("reservas") || "[]");

    // Agregar nueva reserva
    reservas.push({ fechaInicio: fechaInicio, fechaFin: fechaFin, auto: auto });

    // Guardar reservas
    localStorage.setItem("reservas", JSON.stringify(reservas));

    alert("¡Reserva guardada con éxito!");
    return true;
}
