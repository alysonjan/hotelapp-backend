import { IsEmail, IsEnum, IsString, IsNotEmpty } from "class-validator"

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    firstname: string;

    @IsString()
    @IsNotEmpty()
    lastname: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEmail()
    email: string;

    @IsEnum(["ADMIN", "GUEST"], {
        message: 'Valid role required'
    })
    
    role: "ADMIN" | "GUEST";
}