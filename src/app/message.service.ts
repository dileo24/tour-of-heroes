import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
//Injectable hace que el servicio esté disponible desde la raíz de la app, para que
//pueda ser inyectado en otros componentes sin configuración extra

//clase para gestionar y almacenar mensajes
export class MessageService {
  messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
    //sumo el mensaje al arreglo de mensajeS
  }

  clear() {
    this.messages = [];
  }

  constructor() {}
}
