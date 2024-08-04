import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TorrentService } from './torrent.service';
import { CreateTorrentDto } from './dto/create-torrent.dto';
import { UpdateTorrentDto } from './dto/update-torrent.dto';

@Controller('torrent')
export class TorrentController {
  constructor(private readonly torrentService: TorrentService) {}

  @Post()
  create(@Body() createTorrentDto: CreateTorrentDto) {
    return this.torrentService.create(createTorrentDto);
  }

  @Get()
  findAll() {
    return this.torrentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.torrentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTorrentDto: UpdateTorrentDto) {
    return this.torrentService.update(+id, updateTorrentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.torrentService.remove(+id);
  }
}
