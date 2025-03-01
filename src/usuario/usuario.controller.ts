import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { find } from 'rxjs';
import { Usuario } from './usuario.entity';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Usuario | null> {
    return this.usuarioService.findOne(id);
  }

  @Post()
  async create(@Body() data: Partial<Usuario>):Promise<Usuario>{
    return await this.usuarioService.create(data);
  }
  
  @Post(':userId/rol/:rolId')
  async asignarRol(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('rolId', ParseIntPipe) rolId: number,
  ): Promise<Usuario> {
    return this.usuarioService.asigarRol(userId, rolId);
  }

  @Post(':userId/empresa/:empresaId')
  async asignarEmpresa(
    @Param('empresaId', ParseIntPipe) empresaId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Usuario> {
    return this.usuarioService.asignarEmpresa(userId, empresaId);
  }

  
}
