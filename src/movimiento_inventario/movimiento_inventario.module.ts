import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movimiento } from './movimiento_inventario.entity';
import { MovimientoController } from './movimiento_inventario.controller';
import { MovimientoService } from './movimineto_inventario.service';
import { Usuario } from 'src/usuario/usuario.entity';
import { Producto } from 'src/producto/producto.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Movimiento,Usuario,Producto])],
    controllers:[MovimientoController],
    providers:[MovimientoService]
})
export class MovimientoInventarioModule {}
