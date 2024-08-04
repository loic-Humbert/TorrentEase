import { Test, TestingModule } from '@nestjs/testing';
import { TorrentController } from './torrent.controller';
import { TorrentService } from './torrent.service';

describe('TorrentController', () => {
  let controller: TorrentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TorrentController],
      providers: [TorrentService],
    }).compile();

    controller = module.get<TorrentController>(TorrentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
