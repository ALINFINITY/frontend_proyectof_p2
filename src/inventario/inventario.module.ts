import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventario } from './inventario.entity';
import { InventarioController } from './inventario.controller';
import { InventarioService } from './inventario.service';
import { Empresa } from 'src/empresa/empresa.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Inventario, Empresa])],
    controllers: [InventarioController],
    providers: [InventarioService],
})
export class InventarioModule {}
