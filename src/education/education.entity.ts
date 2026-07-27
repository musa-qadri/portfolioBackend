import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('education')
export class Education {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  institution: string;

  @Column()
  degree: string;

  @Column({ nullable: true })
  fieldOfStudy: string;

  @Column({ nullable: true })
  startDate: Date;

  @Column({ nullable: true })
  endDate: Date;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
