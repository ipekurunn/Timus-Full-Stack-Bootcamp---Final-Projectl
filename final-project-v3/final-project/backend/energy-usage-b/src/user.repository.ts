// user.repository.ts

import { DataSource, Repository, FindOptionsWhere, DeleteResult } from 'typeorm';
import { User } from './entities/user.entity';

export class UserRepository {
  private repository: Repository<User>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(User);
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.repository.findOneBy({ email });
  }

  create(user: Partial<User>): User {
    return this.repository.create(user);
  }

  async save(user: User): Promise<User> {
    return this.repository.save(user);
  }

  async findOneBy(criteria: FindOptionsWhere<User> | FindOptionsWhere<User>[]): Promise<User | null> {
    return this.repository.findOneBy(criteria);
  }

  async delete(criteria: Partial<User>): Promise<DeleteResult> {
    return this.repository.delete(criteria);
  }

}
