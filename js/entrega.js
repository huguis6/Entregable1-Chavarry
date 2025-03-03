//Sistema videoclub (volvieron)
//Aclaro videoclub sistema de alquilar/vender peliculas en formato digital o fisico


let pelisAlquiladas = JSON.parse(localStorage.getItem("pelisAlquiladas")) || [];


function agregarPelicula(pelicula) {
    if (!pelisAlquiladas.some(p => p.nombre === pelicula.nombre)) {
        pelicula.disponibilidad = false;
        pelisAlquiladas.push(pelicula);

        videoClubInstance.peliculas = videoClubInstance.peliculas.filter(p => p.nombre !== pelicula.nombre);

        localStorage.setItem("pelisAlquiladas", JSON.stringify(pelisAlquiladas));
        localStorage.setItem("peliculasDisponibles", JSON.stringify(videoClubInstance.peliculas));
    }
    mostrarPeliculas();
}


const devolverPelicula = (pelicula) => {
    if (!videoClubInstance.peliculas.some(p => p.nombre === pelicula.nombre)) {
        pelicula.disponibilidad = true;
        videoClubInstance.peliculas.push(pelicula);

        pelisAlquiladas = pelisAlquiladas.filter(p => p.nombre !== pelicula.nombre);

        localStorage.setItem("pelisAlquiladas", JSON.stringify(pelisAlquiladas));
        localStorage.setItem("peliculasDisponibles", JSON.stringify(videoClubInstance.peliculas));
    }
    mostrarPeliculas("alquiladas");
};

class videoClub {
    constructor(direccion, cPostal, ) {
        this.direccion = direccion;
        this.cPostal = cPostal;
        this.peliculas=JSON.parse(localStorage.getItem("peliculasDisponibles")) || [];
    }

    agregarPelicula(peli) {
        let peliculasGuardadas = JSON.parse(localStorage.getItem("peliculasDisponibles")) || [];
        if (!peliculasGuardadas.some(p => p.nombre === peli.nombre)) {
            peliculasGuardadas.push(peli);
            localStorage.setItem("peliculasDisponibles", JSON.stringify(peliculasGuardadas));
        }
        this.peliculas = peliculasGuardadas;
    }
}



class Peliculas {
    constructor(nombre, genero, duracion, idioma, disponible) {
        this.nombre = nombre;
        this.genero = genero;
        this.duracion = duracion;
        this.directores=[];
        this.actores=[];
        this.idioma=idioma;
        this.disponibilidad=disponible;
    }
    agregarDirector(director) {
        this.directores.push(director);
        }

    agregarActor(Actor) {
        this.directores.push(Actor);
    }

}



const videoClubInstance = new videoClub("Av. Principal 123", "12345");

const pelicula1 = new Peliculas("Inception", "Ciencia Ficción", 148, "Español", true);
pelicula1.agregarDirector("Christopher Nolan");
pelicula1.agregarActor("Leonardo DiCaprio");
pelicula1.agregarActor("Joseph Gordon-Levitt");

const pelicula2 = new Peliculas("Titanic", "Romance", 195, "Inglés", true);
pelicula2.agregarDirector("James Cameron");
pelicula2.agregarActor("Leonardo DiCaprio");
pelicula2.agregarActor("Kate Winslet");

const pelicula3 = new Peliculas("Interstellar", "Ciencia Ficción", 169, "Inglés", true);
pelicula3.agregarDirector("Christopher Nolan");
pelicula3.agregarActor("Matthew McConaughey");
pelicula3.agregarActor("Anne Hathaway");

const pelicula4 = new Peliculas("Pulp Fiction", "Ciencia Ficción", 200, "Inglés", true);


videoClubInstance.agregarPelicula(pelicula1);
videoClubInstance.agregarPelicula(pelicula2);
videoClubInstance.agregarPelicula(pelicula3);
videoClubInstance.agregarPelicula(pelicula4);

videoClubInstance.peliculas = videoClubInstance.peliculas.filter(peli => !pelisAlquiladas.some(alquilada => alquilada.nombre === peli.nombre)
);

const container = document.getElementById("container");

const crearCard = (pelicula) => {
    const card = document.createElement("div");
    card.className = "card";

    const nombre = document.createElement("p");
    nombre.innerText = `Nombre: ${pelicula.nombre}`;

    const genero = document.createElement("p");
    genero.innerText = `Genero: ${pelicula.genero}`;

    const duracion = document.createElement("p");
    duracion.innerText = `Duración: ${pelicula.duracion} min`;

    const disponibilidad = document.createElement("p");
    disponibilidad.innerText = `Disponible: ${pelicula.disponibilidad ? "Sí" : "No"}`;


    card.appendChild(nombre);
    card.appendChild(genero);
    card.appendChild(duracion);
    card.appendChild(disponibilidad);
    if (pelicula.disponibilidad) {
        const alquilarPelicula = document.createElement("button");
        alquilarPelicula.innerText = "Alquilar";
        alquilarPelicula.onclick = () => agregarPelicula(pelicula);
        card.appendChild(alquilarPelicula);
    }
    else{
        const devolverBtn = document.createElement("button");
        devolverBtn.innerText = "Devolver";
        devolverBtn.onclick = () => devolverPelicula(pelicula);
        card.appendChild(devolverBtn);
};
container.appendChild(card);
}

const mostrarPeliculas = (filtro = "disponibles") => {
    container.innerHTML = ""; 
    if (filtro === "disponibles") {
        videoClubInstance.peliculas.forEach((pelicula) => crearCard(pelicula));
    } else {
        pelisAlquiladas.forEach((pelicula) => crearCard(pelicula));
    }
};

document.getElementById("select_options").addEventListener("change", (e) => {
    mostrarPeliculas(e.target.value);
});




mostrarPeliculas();




