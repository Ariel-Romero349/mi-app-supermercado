import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyBwa0Ugid_wHD05GurL-Yo33KiGiTrvh_Y",
    authDomain: "mi-app-supermercado.firebaseapp.com",
    projectId: "mi-app-supermercado",
    storageBucket: "mi-app-supermercado.firebasestorage.app",
    messagingSenderId: "353242457632",
    appId: "1:353242457632:web:cfa563fbba2bb8bd923e45"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


const inputTarea = document.getElementById("inputTarea");
const botonAgregar = document.getElementById("botonAgregar");
const listaTareas = document.getElementById("listaTareas");


const tareasRef = collection(db, "tareas");


async function agregarTarea() {

    const texto = inputTarea.value.trim();

    if (texto === "") {
        return;
    }

    await addDoc(tareasRef, {
        texto: texto,
        completada: false
    });

    inputTarea.value = "";
    inputTarea.focus();
}


function mostrarTareas(tareas) {

    listaTareas.innerHTML = "";

    tareas.forEach((tarea) => {

        const li = document.createElement("li");

        const texto = document.createElement("span");

        texto.textContent = tarea.texto;


        if (tarea.completada) {
            texto.classList.add("completada");
        }


        texto.addEventListener("click", async () => {

            const tareaDoc = doc(db, "tareas", tarea.id);

            await updateDoc(tareaDoc, {
                completada: !tarea.completada
            });

        });


        const botonEliminar = document.createElement("button");

        botonEliminar.textContent = "Eliminar";


        botonEliminar.addEventListener("click", async () => {

            const tareaDoc = doc(db, "tareas", tarea.id);

            await deleteDoc(tareaDoc);

        });


        li.appendChild(texto);

        li.appendChild(botonEliminar);

        listaTareas.appendChild(li);

    });

}


onSnapshot(tareasRef, (snapshot) => {

    const tareas = [];

    snapshot.forEach((documento) => {

        tareas.push({
            id: documento.id,
            ...documento.data()
        });

    });

    mostrarTareas(tareas);

});


botonAgregar.addEventListener("click", agregarTarea);


inputTarea.addEventListener("keydown", (evento) => {

    if (evento.key === "Enter") {
        agregarTarea();
    }

});
