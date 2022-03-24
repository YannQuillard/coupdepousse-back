import {OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway,WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Injectable, Logger } from '@nestjs/common';

@WebSocketGateway({
    cors: {
      origin: '*',
    },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect{
    @WebSocketServer()
    server: Server;

    async handleConnection(socket) {
        Logger.log('Connect');
        // Send list of connected users
        //this.server.emit('users', socket);
      }
    
      async handleDisconnect(socket) {

        Logger.log('Disconnect');
        //this.server.emit('users', socket);
      }

    @SubscribeMessage('message')
    async handleMessage(client, message) {
      Logger.log('Broadcast Message');
      client.broadcast.emit('message', message);
      //this.server.emit('message', message);
    }
}