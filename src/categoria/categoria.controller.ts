import { Body, Controller, Get, Post } from "@nestjs/common";
import { CategoriaService } from "./categoria.service";
import { Categoria } from "./categoria.entity";

@Controller('categoria')
export class CategoriaController {

    constructor(private readonly CategoriaService:CategoriaService) {}

    @Get()
    async findAll() {
        return await this.CategoriaService.findAll();
    }

    @Post()
    async create(@Body() categoria: Partial<Categoria>):Promise<Categoria> {
        return this.CategoriaService.create(categoria);
    }
}
