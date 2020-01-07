//Comando para establecer la conexión
var socket = io();

var label = $('#lblNuevoTicket'); //Referencia directa a la variable HTML por medio de query

// 'on' - Escucha información
socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

//on 'Estado Actual' || Ticket actual en pantalla
socket.on('estadoActual', function(resp) {
    console.log(resp);
    label.text(resp.actual); //'resp.actual' || 'De la mano con: 'estadoActual' de socket.js'
});

//Condición para query y botones || muestra el siguiente ticket incrementando 1 en 1.
$('button').on('click', function() {
    socket.emit('siguienteTicket', function(siguienteTicket) {
        label.text(siguienteTicket);
    });
});