//Sistema videoclub (volvieron)
//Aclaro videoclub sistema de alquilar/vender peliculas en formato digital o fisico


let pelisAlquiladas = JSON.parse(localStorage.getItem("pelisAlquiladas")) || [];


function agregarPelicula(pelicula) {
    if (!pelisAlquiladas.some(p => p.nombre === pelicula.nombre)) {
        pelicula.disponible = false;
        pelisAlquiladas.push(pelicula);

        videoClubInstance.peliculas = videoClubInstance.peliculas.filter(p => p.nombre !== pelicula.nombre);

        localStorage.setItem("pelisAlquiladas", JSON.stringify(pelisAlquiladas));
        localStorage.setItem("peliculasDisponibles", JSON.stringify(videoClubInstance.peliculas));
    }
    mostrarPeliculas();
}


const devolverPelicula = (pelicula) => {
    if (!videoClubInstance.peliculas.some(p => p.nombre === pelicula.nombre)) {
        pelicula.disponible = true;
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
        this.peliculas = JSON.parse(localStorage.getItem("peliculasDisponibles")) || [];
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
//tuve que agregar esta fucnion ya que cuando guardaba la pelicula en el localStorage, la imagen de esta pelicula no se guardaba bien, asi que lo


class Peliculas {
    constructor(nombre, genero, duracion, idioma, directores ,año, actores, imagen) {
        this.nombre = nombre;
        this.genero = genero;
        this.duracion = duracion;
        this.año = año;
        this.directores=directores;
        this.actores=actores;
        this.idioma=idioma;
        this.disponible=true;
        this.imagen=imagen;
    }

}

async function agregarPeliculasFerth(nombre) {
    try {
        const apiKey = "37e82952";
        const respuesta = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(nombre)}`)
        
        const datos = await respuesta.json();
        if(!datos || datos.Response === "False"){
            Swal.fire({
                icon: "error",
                title: "Esa película no esta disponible",
                text: "Something went wrong!",
              });
        }

        else if (!pelisAlquiladas.some(p => p.nombre === datos.Title)) {
            const peli = new Peliculas(datos.Title, datos.Genre, datos.Runtime, datos.Language, datos.Director, datos.Year, datos.Actors, datos.Poster);
            videoClubInstance.agregarPelicula(peli); 
            

            const actualizada = videoClubInstance.peliculas.find(p => p.nombre === peli.nombre);
            console.log("Película después de agregar:", actualizada);


            if (actualizada) {
                actualizada.imagen = actualizada.imagen || datos.Poster;
                container.innerHTML = "";
                crearCard(actualizada);
            }
        }
        
        else{
            Swal.fire({
                icon: "error",
                title: "Esa película ya está en alquilada",
                text: "Something went wrong!",
              });
        }
    } catch (error) {
    }
}


const videoClubInstance = new videoClub("PepE 20", 1221);







videoClubInstance.peliculas = videoClubInstance.peliculas.filter(peli => !pelisAlquiladas.some(alquilada => alquilada.nombre === peli.nombre));

const container = document.getElementById("container");

const formulario = document.getElementById("formulario")

formulario.addEventListener("submit", async (e) => {
    e.preventDefault();
    const peliNombre = e.target[0].value.trim();
    if (peliNombre !== "") {
        await agregarPeliculasFerth(peliNombre);
    }
});



const crearCard = (pelicula) => {
    

    const card = document.createElement("div");
    card.className = "card";

    const nombre = document.createElement("p");
    nombre.innerText = `Nombre: ${pelicula.nombre}`;

    const genero = document.createElement("p");
    genero.innerText = `Genero: ${pelicula.genero}`;

    const duracion = document.createElement("p");
    duracion.innerText = `Duración: ${pelicula.duracion}`;

    const disponibilidad = document.createElement("p");
    disponibilidad.innerText = `Disponible: ${pelicula.disponible ? "Sí" : "No"}`;


    const iamge = document.createElement("img");
    iamge.src = pelicula.imagen || "ruta/a/una-imagen-default.jpg";
    

    card.appendChild(nombre);
    card.appendChild(genero);
    card.appendChild(duracion);
    card.appendChild(disponibilidad);
    card.style.backgroundImage = `url(${pelicula.imagen || "img/default.jpg"})`;
    if (pelicula.disponible) {
        const alquilarPelicula = document.createElement("button");
        alquilarPelicula.innerText = "Alquilar";
        alquilarPelicula.onclick = () => {
            Swal.fire({
                title: "¿Seguro que querés alquilar?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, quiero alquilar!"
              }).then((result) => {
                if (result.isConfirmed) {
                agregarPelicula(pelicula);
                  Swal.fire({
                    title: "Alquilado",
                    text: "Tu pelicula fue alquilada con exito",
                    icon: "success"
                  });
                }
              });
        }
        card.appendChild(alquilarPelicula);
    }
    else{
        const devolverBtn = document.createElement("button");
        devolverBtn.innerText = "Devolver";
        devolverBtn.onclick = () =>{
            Swal.fire({
                title: "¿Seguro que querés devolver?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, quiero devolver!"
              }).then((result) => {
                if (result.isConfirmed) {
                    devolverPelicula(pelicula);
                  Swal.fire({
                    title: "Devuelta",
                    text: "Tu pelicula fue devuleta con exito",
                    icon: "success"
                  });
                }
              });
           
        }
        card.appendChild(devolverBtn);
    } 
    container.appendChild(card);
}



const mostrarPeliculas = (filtro = "disponibles") => {
    container.innerHTML = "";
    if (filtro === "disponibles") {
    } else {
        pelisAlquiladas.forEach((pelicula) => crearCard(pelicula));
    }
};

document.getElementById("select_options").addEventListener("change", (e) => {
    mostrarPeliculas(e.target.value);
});








