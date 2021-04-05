import { ScheduleHoursService } from './../services/schedule-hours.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [],
  providers: [ScheduleHoursService],
  exports: [ScheduleHoursService],
})
export class ScheduleHoursModule {}
