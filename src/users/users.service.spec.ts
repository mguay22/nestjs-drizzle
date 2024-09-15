import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { DATABASE_CONNECTION } from '../database/database-connection';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: DATABASE_CONNECTION,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
