import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { SignInDto } from './dto/auth.dto';
import { compare } from 'utils/Encryption';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly databaseservice : DatabaseService,
        private jwtService: JwtService
    ) {}

    async signIn(signInDto : SignInDto) {


        const findUser = await this.databaseservice.users.findUnique({
            where: {
                email: signInDto.username
            }
        })

        if(!findUser) {
            throw new UnauthorizedException();
        }

        const isPasswordMatched = await compare(signInDto.password, findUser.password)

        if(!isPasswordMatched) {
            throw new UnauthorizedException();
        }
        
        const { password, ...userWithoutPassword } = findUser;

        const payload = { sub: userWithoutPassword.id, username: userWithoutPassword.email };
        
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
