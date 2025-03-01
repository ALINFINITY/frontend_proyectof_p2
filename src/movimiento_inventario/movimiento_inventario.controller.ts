import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MovimientoService } from './movimineto_inventario.service';
import { Movimiento } from './movimiento_inventario.entity';

@Controller('movimientos')
export class MovimientoController {
  constructor(private readonly movimientoService: MovimientoService) {}

  @Get()
  async getAll() {
    return await this.movimientoService.findAll();
  }

  @Post('usuario/:id_usuario/producto/:id_producto')
  async create(
    @Param('id_usuario') id_usuario: number,
    @Param('id_producto') id_producto: number,
    @Body() data: Movimiento,
  ): Promise<Movimiento> {
    return await this.movimientoService.create(id_usuario, id_producto, data);
  }
}
