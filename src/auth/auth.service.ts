import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './auth.entity';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuario/usuario.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async crearAuthParaUsuario(
    usuarioId: number,
    authData: { email: string; password_hash: string },
  ): Promise<Auth> {
    // Buscar el usuario
    const usuario = await this.usuarioRepository.findOne({
      where: { id_usuario: usuarioId },
    });

    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    // Crear la instancia de Auth
    const auth = this.authRepository.create({
      email: authData.email,
      password_hash: authData.password_hash,
      usuario: usuario, // Asociamos el Auth al Usuario
    });

    // Guardamos el Auth
    return this.authRepository.save(auth);
  }

  findAll():Promise<Auth[]>{
    return this.authRepository.find({relations:['usuario']});
  }
}
