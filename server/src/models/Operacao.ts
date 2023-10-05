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
  tipo: string;

  @Column()
  data: Date;

  @Column()
  quantidade: number;

  @Column("float")
  valor: number;
}
