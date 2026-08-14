const inputTarea = document.getElementById("inputTarea");
const botonAgregar = document.getElementById("botonAgregar");
const listaTareas = document.getElementById("listaTareas");

let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

function guardarTareas() {
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

function mostrarTareas() {
    listaTareas.innerHTML = "";

    tareas.forEach((tarea, indice) => {
        const li = document.createElement("li");

        const texto = document.createElement("span");

        texto.textContent = tarea.texto;

        if (tarea.completada) {
            texto.classList.add("completada");
        }

        texto.addEventListener("click", () => {
            tareas[indice].completada = !tareas[indice].completada;

            guardarTareas();
            mostrarTareas();
        });

        const botonEliminar = document.createElement("button");

        botonEliminar.textContent = "Eliminar";

        botonEliminar.addEventListener("click", () => {
            tareas.splice(indice, 1);

            guardarTareas();
            mostrarTareas();
        });

        li.appendChild(texto);
        li.appendChild(botonEliminar);

        listaTareas.appendChild(li);
    });
}

function agregarTarea() {
    const texto = inputTarea.value.trim();

    if (texto === "") {
        return;
    }

    const nuevaTarea = {
        texto: texto,
        completada: false
    };

    tareas.push(nuevaTarea);

    guardarTareas();
    mostrarTareas();

    inputTarea.value = "";
    inputTarea.focus();
}

botonAgregar.addEventListener("click", agregarTarea);

inputTarea.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter") {
        agregarTarea();
    }
});

mostrarTareas();