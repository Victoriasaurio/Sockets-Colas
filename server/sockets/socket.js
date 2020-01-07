const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl(); //Lllama el constructor de TicketControl


io.on('connection', (client) => {

    //data = null || Llamando el callback'siguienteTicket'
    client.on('siguienteTicket', function(callback) {
        let siguiente = ticketControl.siguiente(); //Importando el método siguiente de TicketControl

        console.log(siguiente);
        callback(siguiente);
    });

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    client.on('atenderTicket', function(data, callback) {

        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket); //Retorna ticket para el front-end

        // Actualiza página || Notifica cambios de los últimos 4.
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        });
    });

});