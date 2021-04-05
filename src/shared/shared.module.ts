import { Module } from '@nestjs/common';
import { ScheduleHoursModule } from './modules/schedule-hours.module';

@Module({
  imports: [ScheduleHoursModule],
  controllers: [],
  providers: [],
})
export class SharedModule {}
