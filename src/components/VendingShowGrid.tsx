import { ActionIcon, Button, Badge, Card, Flex, Group, Menu, SimpleGrid, Text } from "@mantine/core";
import { ClockIcon, DotsThreeIcon, LinkSimpleIcon, MapPinIcon } from "@phosphor-icons/react";
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
        const isToday = today.isSame(showDate, "day");
        let dayDiff;
        if (isToday) {
          dayDiff = 0;
        } else {
          dayDiff = showDate.diff(dayjs(), "day");
          if (dayDiff >= 0) {
            dayDiff++; // if the show is in the future, add 1 day (if past show .diff call results in neg #, do not add 1)
          }
        }

        let dayDiffLabel = `${dayDiff} days left`;
        if (dayDiff === 0) {
          dayDiffLabel = "Today";
        }
        if (dayDiff === 1) {
          dayDiffLabel = "Tomorrow";
        }

        const isCurrentOrFutureShow = dayDiff >= 0;

        return (
          <Card radius="md" key={v.date} className="vending-schedule-card">
            <Group justify={isCurrentOrFutureShow ? "space-between" : "center"}>
              <Badge className="badge">{showDate.format("MMM D YYYY")}</Badge>
              {isCurrentOrFutureShow && <Badge className="badge">{dayDiffLabel}</Badge>}
            </Group>
            <Card.Section className="body">
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
            </Card.Section>
            {isCurrentOrFutureShow && (
              <Card.Section className="footer">
                <Group>
                  <Flex mr={12} mt={12} mb={5}>
                    <Menu withinPortal position="bottom-end" shadow="sm">
                      <Menu.Target>
                        <ActionIcon variant="subtle" color="gray">
                          <DotsThreeIcon weight="bold" />
                        </ActionIcon>
                      </Menu.Target>

                      <Menu.Dropdown>
                        <Menu.Item
                          leftSection={<MapPinIcon />}
                          onClick={() => window.open(getGoogleMapLink(v), "_blank")}
                        >
                          Google Maps
                        </Menu.Item>
                        {v.link && (
                          <Menu.Item leftSection={<LinkSimpleIcon />} onClick={() => window.open(v.link!, "_blank")}>
                            Event Info
                          </Menu.Item>
                        )}
                      </Menu.Dropdown>
                    </Menu>
                  </Flex>
                </Group>
              </Card.Section>
            )}
          </Card>
        );
      })}
    </SimpleGrid>
  );
}
