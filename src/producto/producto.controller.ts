import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { Producto } from './producto.entity';

@Controller('producto')
export class ProductoController {
  constructor(private readonly ProductoService: ProductoService) {}

  @Get()
  async getAll() {
    return await this.ProductoService.getAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Producto | null> {
    return this.ProductoService.findOne(id);
  }

  @Post()
  async create(@Body() producto: Producto): Promise<Producto> {
    return this.ProductoService.create(producto);
  }

  @Post(':productoId/categoria/:categoriaId/inventario/:inventarioId')
  async asignarCaracteristicas(
    @Param('productoId', ParseIntPipe) productoId: number,
    @Param('categoriaId', ParseIntPipe) categoriaId: number,
    @Param('inventarioId', ParseIntPipe) inventarioId: number,
  ):Promise<Producto> {
    return this.ProductoService.asignarCaracteristicas(
      productoId,
      categoriaId,
      inventarioId,
    );
  }
  
}
