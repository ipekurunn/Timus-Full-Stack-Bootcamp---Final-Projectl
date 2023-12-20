// factory.entity.ts
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { FactoryDetail } from '../entities/factory-detail.entity';

@Entity()
export class Factory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  factoryName: string;

  @Column()
  registrationDate: Date;

  @Column()
  employeeCount: number;

  @Column()
  isFreeMember: boolean;

  @OneToMany(() => FactoryDetail, factoryDetail => factoryDetail.factory, { eager: true })
  details: FactoryDetail[];
}
