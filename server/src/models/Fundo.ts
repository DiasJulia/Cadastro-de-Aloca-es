import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Fundo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  CNPJ: string;

  @Column()
  data: Date;

  @Column("float")
  valor: number;
}
