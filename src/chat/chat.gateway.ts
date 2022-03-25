import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets"
import { Server, Socket } from 'socket.io'
import { CreateMessageDto } from './dto/create-message.dto'

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  private server: Server

  @SubscribeMessage("message")
  handleMessage(client: Socket, createMessageDto: CreateMessageDto): void {
    const { id, ...message } = createMessageDto
    this.server.to(id).emit("message", message)
  }

  @SubscribeMessage("joinRoom")
  handleRoomJoin(client: Socket, room: string) {
    client.join(room)
    client.emit("joinedRoom", room)
  }

  @SubscribeMessage("leaveRoom")
  handleRoomLeave(client: Socket, room: string) {
    client.leave(room)
    client.emit("leftRoom", room)
  }

}