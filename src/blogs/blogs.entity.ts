import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('blogs')
export class Blog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column({ nullable: true, type: 'text' })
  content: string;

  @Column({ nullable: true })
  coverImageUrl: string;

  @Column({ nullable: true })
  excerpt: string;

  @Column({ default: false })
  isPublished: boolean;

  @Column('simple-array', { nullable: true })
  tags: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
