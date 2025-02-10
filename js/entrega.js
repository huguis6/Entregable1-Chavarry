//Sistema videoclub (volvieron)
//Aclaro videoclub sistema de alquilar/vender peliculas en formato digital o fisico




let peliculasDisponibles = [];
let peliculasNoDisponibles= [];



function verPeliculasDisponibles() {
    if (peliculasDisponibles.length === 0) {
        alert("No hay peliculas disponibles, ingresa alguna :)");
        return;
    }

    let lista = "";
    for (let i = 0; i < peliculasDisponibles.length; i++) {
        lista += i+1 + " . " + peliculasDisponibles[i] + "\n";
    }

    let opcion;
    while (true) {
        opcion = parseInt(prompt(lista + "\nSeleccione una pelicula para alquilar *elija el número* (0 para volver al menu)"));

        if (opcion === 0) {
            return;
        }

        if (!isNaN(opcion) && opcion > 0 && opcion <= peliculasDisponibles.length) {
            if (confirm("Estas seguro?")) {
                peliculasNoDisponibles.push(peliculasDisponibles[opcion - 1]);
                peliculasDisponibles.splice(opcion - 1, 1);
                alert("Pelicula alquilada con exito");
            }
            break;
        }
        alert("Opcion invalida, vuelva a intentar");
    }
    menu();

}

function devolverPelicula() {
    if (peliculasNoDisponibles.length === 0) {
        alert("No hay películas alquiladas");
        return;
    }

    let lista = "";
    for (let i = 0; i < peliculasNoDisponibles.length; i++) {
        lista += i+1 + " . " + peliculasNoDisponibles[i] + "\n";
    }

    let opcion;
    while (true) {
        opcion = parseInt(prompt(lista + "\nSeleccione una pelicula para devolver *seleccione el número* (0 para volver al menu)"));

        if (opcion === 0) {
            return;
        }

        if (!isNaN(opcion) && opcion > 0 && opcion <= peliculasNoDisponibles.length) {
            if (confirm("Estas seguro?")) {
                peliculasDisponibles.push(peliculasNoDisponibles[opcion - 1]);
                peliculasNoDisponibles.splice(opcion - 1, 1);
                alert("Pelicula devuelta con exito");
            }
            break;
        }
        alert("Opcion invalida, vuelva a intentar");
    }
}

function agregarPelicula() {
    let nombre;
    while (true) {
        nombre = prompt("Ingrese el nombre de la pelicula (0 para volver al menu)").trim();

        if (nombre === "0") {
            return;
        }

        if (nombre.length > 0) {
            peliculasDisponibles.push(nombre);
            alert("Pelicula agregada con exito");
            break;
        }
        alert("Nombre invalido, vuelva a intentar");
    }
}

function menu() {
    let opcion;
    do {
        opcion = parseInt(prompt(
            "Bienvenido al VideoClub\n\n" +
            "1 Para alquilar una pelicula\n" +
            "2 Para devolver una pelicula\n" +
            "3 Para agregar una pelicula\n\n" +
            "Para salir ingrese 0"
        ));

        switch (opcion) {
            case 1:
                verPeliculasDisponibles();
                break;
            case 2:
                devolverPelicula();
                break;
            case 3:
                agregarPelicula();
                break;
            case 0:
                alert("Gracias vuelva pronto");
                break;
            default:
                alert("Opcion invalida vuelva a intentar");
        }
    } while (opcion !== 0);
}


menu();