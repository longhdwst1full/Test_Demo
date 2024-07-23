import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { FileModule } from './file/file.module';
import { User, UserSchema } from './schemas/user.schema';
import { MeetingModule } from './meeting/meeting.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/chat-nest-next-v2'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    AuthModule,
    ChatModule,
    FileModule,
    MeetingModule,
  ],
})
export class AppModule { }  
