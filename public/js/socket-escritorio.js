//Comando para establecer la conexión
var socket = io();

// 'on' - Escucha información
socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

var searchParams = new URLSearchParams(window.location.search);

//console.log(searchParams.has('escritorio')); //Pregunta si existe el escritorio
if (!searchParams.has('escritorio')) {
    window.location = 'index.html'; //Sale de la pantalla, regresa a index.html
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
var label = $('small');

console.log(escritorio);
$('h1').text('Escritorio ' + escritorio); //Enumera el escritorio

//Listener del botón
$('button').on('click', () => {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {
        //Cuando ya no existan más tickets, dejará de enviar información
        if (resp === 'No hay tickets') {
            label.text(resp);
            alert(resp);
            return;
        }
        label.text('Ticket ' + resp.numero);
    });
});