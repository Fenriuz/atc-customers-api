import { Injectable } from '@nestjs/common';
import { Schedule } from '@ts/interfaces/schedule';

@Injectable()
export class ScheduleHoursService {
  private date: string;
  private day: string;
  private time: string;

  constructor() {
    this.date = new Date().toLocaleTimeString('en-HN', {
      timeZone: 'UTC',
      hour12: false,
      weekday: 'long',
    });
    [this.day, this.time] = this.date.split(' ');
  }

  isClosedSchedule(schedule: Schedule) {
    const day = schedule[this?.day?.toLowerCase()];
    if (!day || day?.closed) {
      return true;
    }
    console.log(this.date);

    const [opened, closed] = day?.hours;
    const [hours, minutes] = this.time.split(':');
    const currentTime = Number(hours) * 60 + Number(minutes);

    if (opened > currentTime || closed < currentTime) {
      return true;
    }

    return false;
  }
}
