import { Injectable } from '@nestjs/common';
import { Schedule } from '@ts/interfaces/schedule';

@Injectable()
export class ScheduleHoursService {
  get date() {
    const date = new Date().toLocaleTimeString('en-HN', {
      timeZone: 'America/Tegucigalpa',
      hour12: false,
      weekday: 'long',
    });

    return date.split(' ');
  }

  get day() {
    const [currentDay] = this.date;

    return currentDay;
  }

  get time() {
    const [, currentTime] = this.date;

    return currentTime;
  }

  isClosedSchedule(schedule: Schedule) {
    const day = schedule[this?.day?.toLowerCase()];
    if (!day || day?.closed) {
      return true;
    }

    const [opened, closed] = day?.hours;
    const [hours, minutes] = this.time.split(':');
    const currentMinutes = (Number(minutes) * 100) / 60;
    const currentTime = Number(hours) * 60 + currentMinutes;
    if (opened > currentTime || closed < currentTime) {
      return true;
    }

    return false;
  }
}
