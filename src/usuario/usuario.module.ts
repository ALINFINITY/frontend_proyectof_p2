import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuario.entity';
import { Rol } from 'src/rol/rol.entity';
import { Empresa } from 'src/empresa/empresa.entity';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';

@Module({
    imports: [TypeOrmModule.forFeature([Usuario, Rol, Empresa])],
    controllers: [UsuarioController],
    providers: [UsuarioService],
})
export class UsuarioModule {}
