// ============================
// DEFINICIÓN DE TIPOS
// ============================

// Tipo de datos para un usuario
interface Usuario {
    nombre: string; // Nombre del usuario
    email: string;  // Email del usuario
    password: string; // Contraseña del usuario
}

// Tipo de datos para una reserva
interface Reserva {
    fecha: string; // Fecha de la reserva
    auto: string;  // Nombre o tipo de auto
}

// ============================
// FUNCIONES
// ============================

// Función para registrar un usuario
function registrarUsuario(nombre: string, email: string, password: string) {
    // Validar que todos los campos estén completos
    if (!nombre || !email || !password) {
        alert("Completa todos los campos");
        return; // Si falta algún dato, salimos de la función
    }

    // Obtener los usuarios guardados en localStorage
    const usuarios: Usuario[] = JSON.parse(localStorage.getItem("usuarios") || "[]");

    // Agregar el nuevo usuario al array
    usuarios.push({ nombre, email, password });

    // Guardar el array actualizado en localStorage
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Usuario registrado!");
}

// Función para hacer login de usuario
function loginUsuario(email: string, password: string) {
    // Obtener los usuarios guardados en localStorage
    const usuarios: Usuario[] = JSON.parse(localStorage.getItem("usuarios") || "[]");

    // Buscar un usuario que coincida con email y contraseña
    const usuarioValido = usuarios.find(u => u.email === email && u.password === password);

    if (usuarioValido) {
        localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioValido));
        alert("Login exitoso");
    } else {
        alert("Usuario o contraseña incorrectos");
    }
}

// Función para guardar una reserva
function guardarReserva(fechaInicio: string, fechaFin: string, auto: string) {
    if (!fechaInicio || !fechaFin || !auto) {
        alert("Por favor, complete todos los campos");
        return false;
    }

    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);

    if (fin <= inicio) {
        alert("La fecha de fin debe ser posterior a la fecha de inicio");
        return false;
    }

    const reservas: Reserva[] = JSON.parse(localStorage.getItem("reservas") || "[]");
    reservas.push({ fecha: `${fechaInicio} - ${fechaFin}`, auto });

    localStorage.setItem("reservas", JSON.stringify(reservas));
    alert("¡Reserva guardada con éxito!");
    return true;
}

// ============================
// EVENTOS
// ============================
document.getElementById("registroForm")?.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevenir el envío del formulario
    const nombre = (document.getElementById("nombre") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;
    registrarUsuario(nombre, email, password);
});

document.getElementById("loginForm")?.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevenir el envío del formulario
    const email = (document.getElementById("loginEmail") as HTMLInputElement).value;
    const password = (document.getElementById("loginPassword") as HTMLInputElement).value;
    loginUsuario(email, password);
});
