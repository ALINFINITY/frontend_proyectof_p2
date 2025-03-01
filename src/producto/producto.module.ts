import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './producto.entity';
import { Categoria } from 'src/categoria/categoria.entity';
import { Inventario } from 'src/inventario/inventario.entity';
import { ProductoController } from './producto.controller';
import { ProductoService } from './producto.service';

@Module({
    imports: [TypeOrmModule.forFeature([Producto,Categoria,Inventario])],
    controllers: [ProductoController],
    providers: [ProductoService],
})
export class ProductoModule {}
