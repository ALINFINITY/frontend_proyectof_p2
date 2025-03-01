import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './auth.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Usuario } from 'src/usuario/usuario.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Auth,Usuario])],
    controllers:[AuthController],
    providers:[AuthService]
})
export class AuthModule {}
