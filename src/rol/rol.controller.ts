import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RolService } from './rol.service';
import { Rol } from './rol.entity';

@Controller('roles')
export class RolController {
  constructor(private readonly rolservice: RolService) {}

  @Get()
  async findAll() {
    return this.rolservice.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Rol | null> {
    return this.rolservice.findById(id);
  }

  @Post()
  async create(@Body() rol: Partial<Rol>): Promise<Rol> {
    return this.rolservice.create(rol);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() rol: Partial<Rol>,
  ): Promise<Rol | null> {
    return this.rolservice.update(id, rol);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.rolservice.delete(id);
  }
}
