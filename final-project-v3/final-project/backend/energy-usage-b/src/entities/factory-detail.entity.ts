// factory-detail.entity.ts
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Factory } from '../entities/factory-list.entity';

@Entity()
export class FactoryDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Factory, factory => factory.details)
  factory: Factory;

  @Column()
  usingUnit: string;

  @Column()
  dateRange: Date;

  @Column()
  usageKw: number;

  @Column()
  usageCost: number;

  @Column()
  discountedPrice: boolean;
}
