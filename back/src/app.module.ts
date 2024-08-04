import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TorrentModule } from './torrent/torrent.module';

@Module({
  imports: [TorrentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
