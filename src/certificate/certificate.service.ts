import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Certificate } from './certificate.entity';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';

@Injectable()
export class CertificateService {
  constructor(
    @InjectRepository(Certificate)
    private readonly certificateRepository: Repository<Certificate>,
  ) {}

  create(createCertificateDto: CreateCertificateDto): Promise<Certificate> {
    const cert = this.certificateRepository.create(createCertificateDto);
    return this.certificateRepository.save(cert);
  }

  findAll(): Promise<Certificate[]> {
    return this.certificateRepository.find();
  }

  async findOne(id: string): Promise<Certificate> {
    const cert = await this.certificateRepository.findOne({ where: { id } });
    if (!cert) throw new NotFoundException(`Certificate #${id} not found`);
    return cert;
  }

  async update(id: string, updateCertificateDto: UpdateCertificateDto): Promise<Certificate> {
    await this.certificateRepository.update(id, updateCertificateDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.certificateRepository.delete(id);
  }
}
