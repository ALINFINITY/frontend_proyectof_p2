import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categoria } from "./categoria.entity";
import { Repository } from "typeorm";

@Injectable()
export class CategoriaService {

    constructor(
        @InjectRepository(Categoria)
        private readonly categoriaRepository: Repository<Categoria>
    ) {}

    findAll(): Promise<Categoria[]> {
        return this.categoriaRepository.find();
    }

    create(categoria: Partial<Categoria>): Promise<Categoria> {
        const newCategoria = this.categoriaRepository.create(categoria);
        return this.categoriaRepository.save(newCategoria);
    }

}