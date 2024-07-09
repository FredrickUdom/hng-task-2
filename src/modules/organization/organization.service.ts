import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from './entities/organization.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class OrganizationService {
  constructor(@InjectRepository(Organization) private organizationRepository: Repository<Organization>, @InjectRepository(User) private userRepository:Repository<User>,){}
  async createOrganization(createOrganizationDto: CreateOrganizationDto): Promise<Organization> {
    const { name, description, userId } = createOrganizationDto;
    
    // Find the user
    const user = await this.userRepository.findOne({ where: { id: userId }, relations:['organization'] });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    delete user.password
    // Create the organization
    const organization = this.organizationRepository.create({ name, description });

    // Add the user to the organization
    organization.user = [user];

    // Save the organization
    await this.organizationRepository.save(organization);

    return organization;
  }

  findAll() {
    const user={
      name: 'fred',
      skill: "Developer",
      occupation: 'Techie'
    }
    return user
  }

  findOne(id: number) {
    return `This action returns a #${id} organization`;
  }

  update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    return `This action updates a #${id} organization`;
  }

  remove(id: number) {
    return `This action removes a #${id} organization`;
  }
}
