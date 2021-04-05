import { SectionsService } from './sections.service';
import { Module } from '@nestjs/common';
import { SectionsDao } from './sections.dao';

@Module({
  imports: [],
  controllers: [],
  providers: [SectionsService, SectionsDao],
})
export class SectionsModule {}
