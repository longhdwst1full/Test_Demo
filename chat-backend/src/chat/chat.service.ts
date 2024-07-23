import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat, ChatDocument } from '../schemas/chat.schema';
import { User, UserDocument } from '../schemas/user.schema';
import { SendMessageDto } from './dto/send-message.dto';

@Injectable()
export class ChatService {
    constructor(
        @InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) { }

    async createChat(participants: string[]): Promise<Chat> {
        const newChat = new this.chatModel({
            participants: participants,
            messages: [],
        });
        return newChat.save();
    }

    async getChats(userId: string): Promise<Chat[]> {
        return this.chatModel.find({ participants: userId }).populate('participants', 'username').exec();
    }

    async getChatDetails(chatId: string): Promise<Chat> {
        return this.chatModel.findById(chatId).populate('participants', 'username').populate('messages.sender', 'username').exec();
    }

    async sendMessage(chatId: string, userId: string, sendMessageDto: SendMessageDto): Promise<Chat> {
        const chat = await this.chatModel.findById(chatId);
        if (!chat) {
            throw new NotFoundException('Chat not found');
        }

        chat.messages.push({
            sender: userId,
            content: sendMessageDto.content,
            timestamp: new Date(),
        });

        return chat.save();
    }
}