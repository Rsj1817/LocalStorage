let lista = document.getElementById("lista");
let input = document.getElementById("tarea");
let boton = document.getElementById("btnAgregar");

// Leer tareas guardadas (si existen)
let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

// Función para mostrar las tareas
function mostrarTareas() {
    lista.innerHTML = "";
    for (let i = 0; i < tareas.length; i++) {
        let li = document.createElement("li");
        li.textContent = tareas[i].texto;

        if (tareas[i].hecho) {
            li.classList.add("completada");
        }

        li.onclick = function() {
            tareas[i].hecho = !tareas[i].hecho; // cambia de hecho a no hecho
            guardar();
            mostrarTareas();
        }

        lista.appendChild(li);
    }
}

// Guardar en localStorage
function guardar() {
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

// Al hacer clic en el botón, agrega la tarea
boton.onclick = function() {
    if (input.value !== "") {
        tareas.push({ texto: input.value, hecho: false });
        input.value = "";
        guardar();
        mostrarTareas();
    }
};

// Mostrar tareas al cargar la página
mostrarTareas();