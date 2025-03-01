import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolModule } from './rol/rol.module';
import { UsuarioModule } from './usuario/usuario.module';
import { EmpresaModule } from './empresa/empresa.module';
import { ProductoModule } from './producto/producto.module';
import { InventarioModule } from './inventario/inventario.module';
import { CategoriaModule } from './categoria/categoria.module';
import { MovimientoInventarioModule } from './movimiento_inventario/movimiento_inventario.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'pwa_pic',
      entities:[__dirname+'/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
    RolModule,
    UsuarioModule,
    EmpresaModule,
    ProductoModule,
    InventarioModule,
    CategoriaModule,
    MovimientoInventarioModule,
    AuthModule,
  ]
})
export class AppModule { }