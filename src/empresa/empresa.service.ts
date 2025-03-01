import { Injectable } from "@nestjs/common";
import { Empresa } from "./empresa.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class EmpresaService {


    constructor(
        @InjectRepository(Empresa)
        private readonly empresaRepository: Repository<Empresa>
    ) {}

    findAll(): Promise<Empresa[]> {
        return this.empresaRepository.find({relations:['usuarios','inventarios']});
    }


    create(empresa:Partial<Empresa>): Promise<Empresa> {
        const newEmpresa = this.empresaRepository.create(empresa);
        return this.empresaRepository.save(newEmpresa);
    }


}
