import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { ProductsService } from 'src/products/service/products.service';
import { CustomersService } from 'src/customers/service/customers.service';
import { User, UserRole } from '../entities/user.entity';

import { UserRoleDto } from '../dto/role-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly productsService: ProductsService,
    private readonly customersService: CustomersService,
  ) {}

  mapToRole(role: UserRoleDto) {
    switch (role) {
      case UserRoleDto.Admin:
        return UserRole.Admin;
      case UserRoleDto.Basic:
        return UserRole.Basic;
      default:
        return UserRole.Supervissor;
    }
  }

  async create(
    createUserDto: CreateUserDto,
  ): Promise<User> {
    const newUser = this.usersRepository.create({
      ...createUserDto,
      role: this.mapToRole(createUserDto.role),
    });

    const hashPassword = await bcrypt.hash(
      createUserDto.password,
      10,
    );

    newUser.password = hashPassword;

    const { customerId } = createUserDto;
    if (customerId) {
      const customer =
        await this.customersService.findOne(customerId);

      newUser.customer = customer;
    }
    return await this.usersRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find({
      relations: ['customer'],
    });
  }

  async findOne(id: number): Promise<User | null> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['customer'],
    });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({
      email,
    });

    if (!user) throw new UnauthorizedException();

    return user;
  }

  // async findOrdersByUser(
  //   id: number,
  // ): Promise<Order | null> {
  //   const user = await this.findOne(id);

  //   return {
  //     // date: new Date(),
  //     // user: user,
  //     // products: await this.productsService.findAll(),
  //   };
  // }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (!user) return null;

    this.usersRepository.merge(user, {
      ...updateUserDto,
      role: this.mapToRole(updateUserDto.role),
    });

    return await this.usersRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user)
      throw new NotFoundException(`User #${id} not found`);

    return this.usersRepository.delete(id);
  }
}
