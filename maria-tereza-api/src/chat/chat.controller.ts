import { Body, Controller, Post } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';

@Controller('chat')
export class ChatController {
    constructor(private gateway: ChatGateway) {
    }

    @Post()
    send(@Body('message') message: string): boolean {
        return this.gateway.server.emit('message', { message, to: '5511900000000' });
    }
}
