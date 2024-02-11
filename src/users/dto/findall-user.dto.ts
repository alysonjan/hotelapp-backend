import { Role } from "@prisma/client";
import { IsEnum, IsOptional } from "class-validator";


export class FindAllUserDto {

    @IsOptional()
    @IsEnum(Role, {
        message: 'Valid role required'
    })
    role?: Role;
}