import { Module } from '@nestjs/common';
import { TorrentService } from './torrent.service';
import { TorrentController } from './torrent.controller';

@Module({
  controllers: [TorrentController],
  providers: [TorrentService],
})
export class TorrentModule {}
