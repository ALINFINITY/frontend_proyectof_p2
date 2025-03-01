import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empresa } from './empresa.entity';
import { EmpresaController } from './empresa.controller';
import { EmpresaService } from './empresa.service';
import { Usuario } from 'src/usuario/usuario.entity';
import { Inventario } from 'src/inventario/inventario.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Empresa,Usuario,Inventario])],
    controllers: [EmpresaController],
    providers: [EmpresaService],
})
export class EmpresaModule {}
