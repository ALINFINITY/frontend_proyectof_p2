import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Rol } from 'src/rol/rol.entity';
import { Empresa } from 'src/empresa/empresa.entity';
import { Auth } from 'src/auth/auth.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
    @InjectRepository(Empresa)
    private readonly empresaRepository: Repository<Empresa>,
  ) {}

  findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find({ relations: ['roles'] });
  }

  async findOne(id: number): Promise<Usuario> {
    const user = await this.usuarioRepository.findOne({
      where: { id_usuario: id },
      relations: ['roles','auth'],
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return user;
  }

  create(usuario: Partial<Usuario>): Promise<Usuario> {
    const newUser = this.usuarioRepository.create(usuario);
    return this.usuarioRepository.save(newUser);
  }

  async asigarRol(idUsuario: number, idRol: number): Promise<Usuario> {
    const newUser = await this.usuarioRepository.findOne({
      where: { id_usuario: idUsuario },
      relations: ['roles'],
    });

    if (!newUser) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const role = await this.rolRepository.findOne({
      where: { id_rol: idRol },
    });

    if (!role) {
      throw new NotFoundException('Rol no encontrado');
    }

    if (newUser.roles.find((r) => r.id_rol === idRol)) {
      return newUser;
    }

    newUser.roles.push(role);
    return this.usuarioRepository.save(newUser);
  }

  async asignarEmpresa(idUsuario: number, idEmpresa: number): Promise<Usuario> {
    const newUser = await this.usuarioRepository.findOne({
      where: { id_usuario: idUsuario },
      relations: ['empresa'],
    });

    if (!newUser) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const empresa = await this.empresaRepository.findOne({
      where: { id_empresa: idEmpresa },
    });

    if (!empresa) {
      throw new NotFoundException('Empresa no encontrada');
    }

    if (newUser.empresa?.id_empresa === idEmpresa) {
      return newUser;
    }

    newUser.empresa = empresa;
    return this.usuarioRepository.save(newUser);
  }


}
