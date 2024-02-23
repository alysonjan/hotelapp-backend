import { Injectable } from '@nestjs/common';
import { RoomsDto } from './dto/rooms.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class RoomsService {
    constructor(private readonly databaseservice : DatabaseService) {}

    async create(roomDto: Prisma.RoomsCreateInput) {
        try {
            // Attempt to create the room
            const createdRoom = await this.databaseservice.rooms.create({
                data: roomDto
            });

            // Return the created room if successful
            return createdRoom;
        } catch (error) {
            // Handle the error appropriately
            console.error('Error creating room:', error);
            // You can rethrow the error or return a custom error message or status code as needed
            throw new Error('Failed to create room');
        }
    }
}
