import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { encrypt } from 'utils/Encryption';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '@prisma/client';
import { FindAllUserDto } from './dto/findall-user.dto';
import { error } from 'console';



@Injectable()
export class UsersService {

  constructor(private readonly databaseservice : DatabaseService) {}


  async create(createUserDto: CreateUserDto) {

        const encryptedPassword = await encrypt(createUserDto.password)

        const userWithEncryptedPassword = {...createUserDto, password: encryptedPassword }
    
        return this.databaseservice.users.create({
          data: userWithEncryptedPassword
        }).then((createdUser) => {
          // User creation was successful
          return {
            statusCode: 201, // Assuming successful creation status code
            message: 'User created successfully',
            data: createdUser
          };
        }).catch((error) => {
          // User creation failed
          if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002' && Array.isArray(error.meta.target) && error.meta.target.includes('email')) {
              // Unique constraint violation on the email field
              return {
                statusCode: 400,
                message: 'Email already exists'
              };
            } else {
              // Other Prisma errors
              return {
                statusCode: error.code,
                message: error.message
              };
            }
          } else {
            // Other types of errors
            return {
              statusCode: 500,
              message: 'Internal server error'
            }
          }
        })
  }

  async findAll(dto : FindAllUserDto) {

    if(dto.role) {
      return await this.databaseservice.users.findMany({
        where: {
          role: dto.role,
        }
      })
    }

    return this.databaseservice.users.findMany();

  }

  async findOne(id: number) {

    const findUser = await this.databaseservice.users.findUnique({
      where: {
        id
      } 
    })
    if(!findUser) {
      return {
        statusCode : 404,
        message: 'User Not Found'
      }
    }

    return findUser
  }
  

  update(id: number, updateUserDto: UpdateUserDto) {
    const updateUser = this.databaseservice.users.update({
      where:{
        id
      },
      data: updateUserDto
    })

    if(!updateUser) {
      return {
        statusCode : 404,
        message: 'User Not Found'
      }
    }
    return updateUser
  }

  remove(id: number) {
    return this.databaseservice.users.delete({
      where:{
        id
      }
    })
  }
}
