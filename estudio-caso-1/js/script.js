// Profe acá hice el JavaScript de la página

// Lista con los estudiantes precargados
var estudiantes = [
    { nombre: "Maria", apellidos: "Mora Perez", nota: 90 },
    { nombre: "Pedro", apellidos: "Sibaja Lopez", nota: 60 },
    { nombre: "Marco", apellidos: "Rojas Castro", nota: 78 }
];

// Traigo los elementos del HTML
var formulario = document.getElementById("formulario");
var inputNombre = document.getElementById("nombre");
var inputApellidos = document.getElementById("apellidos");
var inputNota = document.getElementById("nota");
var mensajeError = document.getElementById("mensaje-error");
var tabla = document.getElementById("tabla-estudiantes");

// Función para calcular y mostrar el resumen
function actualizarResumen() {
    var mayor = estudiantes[0];
    var menor = estudiantes[0];
    var suma = 0;

    for (var i = 0; i < estudiantes.length; i++) {
        suma = suma + estudiantes[i].nota;

        if (estudiantes[i].nota > mayor.nota) {
            mayor = estudiantes[i];
        }
        if (estudiantes[i].nota < menor.nota) {
            menor = estudiantes[i];
        }
    }

    var promedio = suma / estudiantes.length;

    document.getElementById("mayor-nota").textContent = mayor.nombre + " " + mayor.apellidos + " (" + mayor.nota + ")";
    document.getElementById("promedio").textContent = promedio.toFixed(2);
    document.getElementById("menor-nota").textContent = menor.nota;
}

// Función para agregar una fila a la tabla
function agregarFila(estudiante) {
    var fila = document.createElement("tr");

    var celdaNombre = document.createElement("td");
    celdaNombre.textContent = estudiante.nombre;

    var celdaApellidos = document.createElement("td");
    celdaApellidos.textContent = estudiante.apellidos;

    var celdaNota = document.createElement("td");
    celdaNota.textContent = estudiante.nota;

    // Clases CSS según la nota
    if (estudiante.nota >= 80) {
        celdaNota.className = "nota-alta";
    } else if (estudiante.nota < 65) {
        celdaNota.className = "nota-baja";
    }

    fila.appendChild(celdaNombre);
    fila.appendChild(celdaApellidos);
    fila.appendChild(celdaNota);
    tabla.appendChild(fila);
}

// Cuando se envía el formulario
formulario.addEventListener("submit", function (evento) {
    // Evito que la página se recargue
    evento.preventDefault();

    var nombre = inputNombre.value.trim();
    var apellidos = inputApellidos.value.trim();
    var notaTexto = inputNota.value.trim();

    // Validación: campos vacíos
    if (nombre === "" || apellidos === "" || notaTexto === "") {
        mensajeError.textContent = "Todos los campos son obligatorios.";
        return;
    }

    var nota = Number(notaTexto);

    // Validación: la nota debe estar entre 0 y 100
    if (nota < 0 || nota > 100) {
        mensajeError.textContent = "La nota debe estar entre 0 y 100.";
        return;
    }

    // Si todo está bien, agrego el estudiante
    var nuevo = { nombre: nombre, apellidos: apellidos, nota: nota };
    estudiantes.push(nuevo);
    agregarFila(nuevo);
    actualizarResumen();

    // Limpio el mensaje y el formulario
    mensajeError.textContent = "";
    formulario.reset();
});

// Al cargar la página muestro el resumen inicial
actualizarResumen();
