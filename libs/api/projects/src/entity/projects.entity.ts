import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity()
  export class Projects extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;
  
    @Column({ type: 'varchar', length: 150 })
    name: string;
  
    @Column({ type: 'text' })
    description: string;
  
    @Column({ type: 'varchar', length: 250 })
    file: string;
  
    @CreateDateColumn({ type: 'timestamp', name: 'created_at', default: Date.now() })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', default: Date.now() })
    updatedAt: Date;
  }