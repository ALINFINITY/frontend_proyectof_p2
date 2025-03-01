import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './producto.entity';
import { Repository } from 'typeorm';
import { Inventario } from 'src/inventario/inventario.entity';
import { Categoria } from 'src/categoria/categoria.entity';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    @InjectRepository(Inventario)
    private readonly inventarioRepository: Repository<Inventario>,
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  getAll(): Promise<Producto[]> {
    return this.productoRepository.find({
      relations: ['categoria', 'inventario'],
    });
  }

  create(producto: Producto): Promise<Producto> {
    return this.productoRepository.save(producto);
  }

  async findOne(id: number): Promise<Producto> {
    const newProducto = await this.productoRepository.findOne({
      where: { id_producto: id },
      relations: ['categoria', 'inventario'],
    });

    if (!newProducto) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }

    return newProducto;
  }

  async asignarCaracteristicas(
    productoId: number,
    categoriaId: number,
    inventarioId: number,
  ) {
    const producto = await this.productoRepository.findOne({
      where: {
        id_producto: productoId,
      }
    });

    const categoria = await this.categoriaRepository.findOne({where: {id_categoria: categoriaId}});
    const inventario = await this.inventarioRepository.findOne({where: {id_inventario: inventarioId}});

    if (!producto || !categoria || !inventario) {
      throw new NotFoundException(
        'Producto, categoria o inventario no encontrado',
      );
    }

    producto.categoria = categoria;
    producto.inventario = inventario;

    return this.productoRepository.save(producto);
  }
}
