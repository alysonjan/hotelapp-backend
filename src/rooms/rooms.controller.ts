import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { Prisma } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';




@Controller('rooms')
export class RoomsController {

    constructor(private readonly roomService: RoomsService ){}

    @UseGuards(AuthGuard)
    @Post()
    create(@Body() reqBody: Prisma.RoomsCreateInput ) {
        return this.roomService.create(reqBody)
    }
}
