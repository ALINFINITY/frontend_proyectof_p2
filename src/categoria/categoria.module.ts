import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './categoria.entity';
import { CategoriaController } from './categoria.controller';
import { CategoriaService } from './categoria.service';
import { Producto } from 'src/producto/producto.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Categoria])],
    controllers: [CategoriaController],
    providers: [CategoriaService],
})
export class CategoriaModule {}
