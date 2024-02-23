import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports:[ DatabaseModule],
  providers: [RoomsService],
  controllers: [RoomsController]
})
export class RoomsModule {}
