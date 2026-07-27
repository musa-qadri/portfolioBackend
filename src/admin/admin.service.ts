import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AdminService {
  constructor(private readonly usersService: UsersService) {}

  getAllUsers() {
    return this.usersService.findAll();
  }

  deleteUser(id: string) {
    return this.usersService.remove(id);
  }
}
