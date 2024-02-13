import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('login')
    signIn(@Body(ValidationPipe) signInDto: SignInDto) {
        return this.authService.signIn(signInDto)
    }
}
