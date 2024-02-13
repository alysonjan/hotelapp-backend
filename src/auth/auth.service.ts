import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { SignInDto } from './dto/auth.dto';
import { compare } from 'utils/Encryption';

@Injectable()
export class AuthService {
    constructor(private readonly databaseservice : DatabaseService) {}

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
        return {
            statusCode: 200, // Assuming successful creation status code
            message: 'successfully login',
            data: userWithoutPassword
          };
    }
}
