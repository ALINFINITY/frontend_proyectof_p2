import { Body, Controller, Get, Post } from '@nestjs/common';
import exp from 'constants';
import { EmpresaService } from './empresa.service';
import { Empresa } from './empresa.entity';

@Controller('empresas')
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  @Get()
  async findAll(): Promise<Empresa[]> {
    return this.empresaService.findAll();
  }

  @Post()
  async create(@Body() empresa: Partial<Empresa>): Promise<Empresa> {
    return this.empresaService.create(empresa);
  }
}
