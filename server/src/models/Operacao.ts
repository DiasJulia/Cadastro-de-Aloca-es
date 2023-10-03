import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Operacao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  CNPJ: string;

  @Column()
  razao_social: string;

  @Column()
  tipo: number;

  @Column()
  data: Date;

  @Column()
  quantidade: number;

  @Column()
  valor: number;
}
