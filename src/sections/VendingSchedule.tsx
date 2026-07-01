import vendingSchedule from "../assets/vendingSchedule.json";
import dayjs from "dayjs";
import { Container, Tabs, Title } from "@mantine/core";
import VendingScheduleGrid from "../components/VendingShowGrid";
import type { VendingSchedule } from "../models/vendingSchedule.ts";
import "./VendingSchedule.scss";

export default function VendingSchedule() {
  const today = dayjs();
  const pastShows = vendingSchedule
    .filter((v) => {
      const showDate = dayjs(v.date);
      return !(today.isSame(showDate, "day") || showDate.diff(dayjs(), "day") + 1 > 0);
    })
    .sort((v1, v2) => v2.date.localeCompare(v1.date)) as VendingSchedule[]; // descending order sort
  const futureShows = vendingSchedule
    .filter((v) => {
      const showDate = dayjs(v.date);
      return today.isSame(showDate, "day") || showDate.diff(dayjs(), "day") + 1 > 0;
    })
    .sort((v1, v2) => v1.date.localeCompare(v2.date)) as VendingSchedule[]; // ascending order sort

  return (
    <Container size="lg" py="xl" className="vending-schedule">
      <Title order={2} ta="center" mt="sm" mb={20}>
        Vending Schedule
      </Title>
      <Tabs defaultValue="upcoming">
        <Tabs.List className="tab-list">
          <Tabs.Tab value="upcoming" className="tab-name">
            Upcoming Shows ({futureShows.length})
          </Tabs.Tab>
          <Tabs.Tab value="past" className="tab-name">
            Past Shows ({pastShows.length})
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="upcoming">
          <VendingScheduleGrid shows={futureShows} />
        </Tabs.Panel>
        <Tabs.Panel value="past">
          <VendingScheduleGrid shows={pastShows} />
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
}
