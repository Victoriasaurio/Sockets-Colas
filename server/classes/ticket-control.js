const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {
    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        let data = require('../data/data.json'); //Importando la data donde se guardaran los registros

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo; //Actualizando la data con el último número
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarConteo();
        }
    }

    siguiente() {
        this.ultimo += 1; //Incrementa último de 1 en 1.

        //Creando nueva instancia de ticket
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket); //Agregando ticket al arreglo de tickets

        this.grabarArchivo();

        return `Ticket ${this.ultimo}`;
    }

    getUltimoTicket() {
        return `Ticket ${this.ultimo}`;
    }

    getUltimos4() {
        return this.ultimos4;
    }

    atenderTicket(escritorio) {
        //Tickets pendientes por atender
        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }

        let numeroTicket = this.tickets[0].numero; //Rompe la referencia de los objetos JavaScript
        this.tickets.shift(); //Borra el primer elemento del arreglo.

        let atenderTicket = new Ticket(numeroTicket, escritorio);

        //Lo manda al inicio del arreglo
        this.ultimos4.unshift(atenderTicket);

        //Verefica que existan solo 4 elementos en el arreglo
        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1); //Borra el último elemento
        }

        console.log('Últimos 4: ');
        console.log(this.ultimos4);

        this.grabarArchivo();
        return atenderTicket;
    }

    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];

        console.log('Se ha inicializado el sistema');
        this.grabarArchivo();
    }

    grabarArchivo() {

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };

        let jsonDataString = JSON.stringify(jsonData); //Convirtiendo en JSON

        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}

module.exports = {
    TicketControl
}