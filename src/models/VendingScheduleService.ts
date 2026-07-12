import vendingSchedule from "../assets/vendingSchedule.json";
import dayjs from "dayjs";
import type { VendingScheduleEntry } from "./VendingScheduleEntry";

export default class VendingScheduleService {
  readonly today: dayjs.Dayjs;
  readonly shows: VendingScheduleEntry[];

  constructor() {
    this.shows = vendingSchedule as VendingScheduleEntry[];
    this.today = dayjs();
  }

  getUpcomingShows = (): VendingScheduleEntry[] => {
    const futureShows = vendingSchedule
      .filter((v) => {
        const showDate = dayjs(v.date);
        return this.today.isSame(showDate, "day") || showDate.diff(dayjs(), "day") + 1 > 0;
      })
      .sort((v1, v2) => v1.date.localeCompare(v2.date)) as VendingScheduleEntry[]; // ascending order sort

    return futureShows;
  };

  getNextUpcomingShow = (): VendingScheduleEntry | null => {
    const upcomingShows = this.getUpcomingShows();

    if (upcomingShows.length <= 0) {
      return null;
    }

    return upcomingShows[0]; // upcoming shows are already sorted in ascending order
  };

  getPastShows = (): VendingScheduleEntry[] => {
    const pastShows = vendingSchedule
      .filter((v) => {
        const showDate = dayjs(v.date);
        return !(this.today.isSame(showDate, "day") || showDate.diff(dayjs(), "day") + 1 > 0);
      })
      .sort((v1, v2) => v2.date.localeCompare(v1.date)) as VendingScheduleEntry[]; // descending order sort

    return pastShows;
  };
}
