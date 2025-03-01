import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movimiento } from './movimiento_inventario.entity';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuario/usuario.entity';
import { Producto } from 'src/producto/producto.entity';

@Injectable()
export class MovimientoService {
  constructor(
    @InjectRepository(Movimiento)
    private readonly movimientoRepository: Repository<Movimiento>,

    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,

    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  findAll() {
    return this.movimientoRepository.find({
      relations: ['usuario', 'producto'],
    });
  }

  async create(id_usuario: number, id_producto: number, data: Movimiento): Promise<Movimiento> {
    // Convertir los IDs a números, por si vienen como strings en la URL
    id_usuario = Number(id_usuario);
    id_producto = Number(id_producto);

    // Buscar el usuario y el producto
    const usuario = await this.usuarioRepository.findOne({ where: { id_usuario } });
    const producto = await this.productoRepository.findOne({ where: { id_producto } });

    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    if (!producto) {
      throw new Error('Producto no encontrado');
    }

    // Crear y guardar el movimiento
    const movimiento = this.movimientoRepository.create({
      tipo_movimiento: data.tipo_movimiento,
      cantidad: data.cantidad,
      motivo: data.motivo,
      costo_unitario: data.costo_unitario,
      ubicacion: data.ubicacion,
      usuario,
      producto,
    });

    return this.movimientoRepository.save(movimiento);
  }
}