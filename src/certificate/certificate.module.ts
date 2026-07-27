import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CertificateController } from './certificate.controller';
import { CertificateService } from './certificate.service';
import { Certificate } from './certificate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Certificate])],
  controllers: [CertificateController],
  providers: [CertificateService],
  exports: [CertificateService],
})
export class CertificateModule {}
