import { Badge, Card, Group, SimpleGrid, Text } from "@mantine/core";
import { ClockIcon, MapPinSimpleIcon } from "@phosphor-icons/react";
import dayjs from "dayjs";
import type { VendingSchedule } from "../models/vendingSchedule.ts";
import "./VendingShowGrid.scss";

interface VendingShowGridProps {
  shows: VendingSchedule[];
}

export default function VendingShowGrid({ shows }: VendingShowGridProps) {
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
          <Card withBorder padding="xl" radius="md" key={v.date} className="vending-schedule-card">
            <Group justify={dayDiff >= 0 ? "space-between" : "center"}>
              <Badge>{showDate.format("MMM D YYYY")}</Badge>
              {dayDiff >= 0 && <Badge>{dayDiffLabel}</Badge>}
            </Group>
            <Text fz="xl" fw={600} mt="md">
              {v.name}
            </Text>
            <Text fz="md" mt={5} className="text-with-icon">
              <ClockIcon className="icon" />
              {v.showTime}
            </Text>
            <Text fz="md" mt={20} className="text-with-icon">
              <MapPinSimpleIcon className="icon" />
              {v.venueName}
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
