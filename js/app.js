//Variables
const generar = document.querySelector('#generar-nombre');


//Event Listeners
generar.addEventListener('submit', cargarNombres);


//Funciones
function cargarNombres(e) {
    e.preventDefault();

    //Leer las variables
    const origen = document.getElementById('origen');
    const origenSeleccionado = origen.options[origen.selectedIndex].value;


    const genero = document.getElementById('genero');
    const generoSeleccionado = genero.options[genero.selectedIndex].value;


    const numero = document.getElementById('numero').value;


    let url = '';
    url += 'https://uinames.com/api/?';

    //Si hay origen agregarlo a la URL

    if(origenSeleccionado !== '') {
        url += `region=${origenSeleccionado}&`;
    }

    //Si hay genero agregarlo a la URL

    if(generoSeleccionado !== '') {
        url += `gender=${generoSeleccionado}&`;
    }

    //Si hay cantidad agregarlo a la URL

    if(numero !== '') {
        url += `amount=${numero}`;
    }

    // Conectar con Ajax
    //Iniciar XMLHTTPRequest
    const xhr = new XMLHttpRequest();

    //Abrir la conexion
    xhr.open('GET', url, true);

    //Datos e impresion del template
    xhr.onload = function() {
        if(this.status === 200) {
            const nombres = JSON.parse(this.responseText);
            //Generar HTML
            let htmlNombres = '<h2>Nombres generados</h2>';

            htmlNombres += '<ul class="lista">';

            //Imprimir cada nombre
            nombres.forEach(function(nombre){
                htmlNombres += `
                <li>${nombre.name}</li>
                `;
            })

            htmlNombres += '</ul>'

            document.getElementById('resultado').innerHTML = htmlNombres;
        }
    }

    //Enviar el request
    xhr.send();
}
