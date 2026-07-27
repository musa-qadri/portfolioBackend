import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('certificates')
export class Certificate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  issuer: string;

  @Column({ nullable: true })
  issueDate: Date;

  @Column({ nullable: true })
  expiryDate: Date;

  @Column({ nullable: true })
  credentialId: string;

  @Column({ nullable: true })
  credentialUrl: string;

  @Column({ nullable: true })
  imageUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
