import { Button, Badge, Card, Group, SimpleGrid, Text } from "@mantine/core";
import { ClockIcon } from "@phosphor-icons/react";
import dayjs from "dayjs";
import type { VendingScheduleEntry } from "../models/VendingScheduleEntry.ts";
import "./VendingShowGrid.scss";

interface VendingShowGridProps {
  shows: VendingScheduleEntry[];
}

export default function VendingShowGrid({ shows }: VendingShowGridProps) {
  const getGoogleMapLink = (show: VendingScheduleEntry) => {
    const googleMapPrefix = "https://www.google.com/maps/search";
    return encodeURI(`${googleMapPrefix}/${show.venueName} ${show.addressLine1} ${show.addressLine2}`);
  };

  const today = dayjs();
  return (
    <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg" mt={50}>
      {shows.map((v) => {
        const showDate = dayjs(v.date);
        const dayDiff = today.isSame(showDate, "day") ? 0 : showDate.diff(dayjs(), "day") + 1;
        let dayDiffLabel = `${dayDiff} days left`;
        if (dayDiff === 0) {
          dayDiffLabel = "Today";
        }
        if (dayDiff === 1) {
          dayDiffLabel = "Tomorrow";
        }

        return (
          <Card radius="md" key={v.date} className="vending-schedule-card">
            <Group justify={dayDiff >= 0 ? "space-between" : "center"}>
              <Badge className="badge">{showDate.format("MMM D YYYY")}</Badge>
              {dayDiff >= 0 && <Badge className="badge">{dayDiffLabel}</Badge>}
            </Group>
            <Text fz="xl" fw={600} mt="md">
              {v.name}
            </Text>
            <Text fz="md" mt={5} className="text-with-icon">
              <ClockIcon className="icon" />
              {v.showTime}
            </Text>
            <Text fz="md" mt={20}>
              <Button variant="subtle" onClick={() => window.open(getGoogleMapLink(v), "_blank")}>
                {v.venueName}
              </Button>
            </Text>
            <Text fz="sm" c="dimmed" mt={10}>
              {v.addressLine1}
            </Text>
            <Text fz="sm" c="dimmed">
              {v.addressLine2}
            </Text>
            {v.additionalDetail && (
              <Text fz="sm" c="dimmed" mt={10}>
                {v.additionalDetail}
              </Text>
            )}
          </Card>
        );
      })}
    </SimpleGrid>
  );
}
