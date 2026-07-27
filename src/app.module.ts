import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { BlogsModule } from './blogs/blogs.module';
import { CertificateModule } from './certificate/certificate.module';
import { ContactsModule } from './contacts/contacts.module';
import { EducationModule } from './education/education.module';
import { ExperiencesModule } from './experiences/experiences.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { ProjectImageModule } from './project-image/project-image.module';
import { ProjectsModule } from './projects/projects.module';
import { SkillsModule } from './skills/skills.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT || '5432'),
      username: process.env.DATABASE_USER || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'postgrespassword',
      database: process.env.DATABASE_NAME || 'portfolio_db',
      autoLoadEntities: true,
      synchronize: true, // dev only — disable in production
    }),
    AdminModule,
    AuthModule,
    BlogsModule,
    CertificateModule,
    ContactsModule,
    EducationModule,
    ExperiencesModule,
    PortfolioModule,
    ProjectImageModule,
    ProjectsModule,
    SkillsModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
