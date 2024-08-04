import { Injectable } from '@nestjs/common';
import { CreateTorrentDto } from './dto/create-torrent.dto';
import { UpdateTorrentDto } from './dto/update-torrent.dto';

@Injectable()
export class TorrentService {
  create(createTorrentDto: CreateTorrentDto) {
    return 'This action adds a new torrent';
  }

  findAll() {
    return `This action returns all torrent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} torrent`;
  }

  update(id: number, updateTorrentDto: UpdateTorrentDto) {
    return `This action updates a #${id} torrent`;
  }

  remove(id: number) {
    return `This action removes a #${id} torrent`;
  }
}
