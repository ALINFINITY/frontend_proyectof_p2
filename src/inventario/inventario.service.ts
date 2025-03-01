import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventario } from './inventario.entity';
import { Repository } from 'typeorm';
import { Empresa } from 'src/empresa/empresa.entity';

@Injectable()
export class InventarioService {
  constructor(
    @InjectRepository(Inventario)
    private inventarioRepository: Repository<Inventario>,
    @InjectRepository(Empresa)
    private empresaRepository: Repository<Empresa>,
  ) {}

  findAll(): Promise<Inventario[]> {
    return this.inventarioRepository.find({
      relations: ['empresa', 'productos'],
    });
  }

  async findOne(id: number): Promise<Inventario> {
    const inventario = await this.inventarioRepository.findOne({
      where: { id_inventario: id },
      relations: ['empresa', 'productos'],
    });

    if (!inventario) {
      throw new Error(`Inventario con id ${id} no encontrado`);
    }

    return inventario;
  }

  async create(
    idEmpresa: number,
  ): Promise<Inventario> {
    const inventariotmp = this.inventarioRepository.create();

    const empresa = await this.empresaRepository.findOne({
      where: { id_empresa: idEmpresa },
    });

    if (!empresa) {
      throw new NotFoundException(`Empresa con id ${idEmpresa} no encontrada`);
    }

    inventariotmp.empresa = empresa;
    return await this.inventarioRepository.save(inventariotmp);
  }
}
