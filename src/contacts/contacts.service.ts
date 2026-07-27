import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './contacts.entity';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactsRepository: Repository<Contact>,
  ) {}

  create(createContactDto: CreateContactDto): Promise<Contact> {
    const contact = this.contactsRepository.create(createContactDto);
    return this.contactsRepository.save(contact);
  }

  findAll(): Promise<Contact[]> {
    return this.contactsRepository.find();
  }

  async findOne(id: string): Promise<Contact> {
    const contact = await this.contactsRepository.findOne({ where: { id } });
    if (!contact) throw new NotFoundException(`Contact #${id} not found`);
    return contact;
  }

  async update(id: string, updateContactDto: UpdateContactDto): Promise<Contact> {
    await this.contactsRepository.update(id, updateContactDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.contactsRepository.delete(id);
  }
}
