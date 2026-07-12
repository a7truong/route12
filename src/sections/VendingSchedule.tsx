import snorlax from "../assets/snorlax.gif";
import snorlaxSleeping from "../assets/snorlax_sleeping.gif";
import { Container, Grid, Group, Tabs, Title } from "@mantine/core";
import VendingScheduleGrid from "../components/VendingShowGrid";
import VendingScheduleService from "../models/VendingScheduleService.ts";
import "./VendingSchedule.scss";

export default function VendingSchedule() {
  const vendingScheduleService = new VendingScheduleService();
  const pastShows = vendingScheduleService.getPastShows();
  const futureShows = vendingScheduleService.getUpcomingShows();

  return (
    <Container size="lg" py="xl" className="vending-schedule">
      <Title order={2} ta="center" mt="sm" mb={30}>
        Vending Schedule
      </Title>
      <Tabs defaultValue="upcoming">
        <Tabs.List grow className="tab-list">
          <Tabs.Tab value="upcoming" className="tab-name">
            Upcoming Shows ({futureShows.length})
          </Tabs.Tab>
          <Tabs.Tab value="past" className="tab-name">
            Past Shows ({pastShows.length})
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="upcoming">
          {futureShows !== null && futureShows !== undefined && futureShows.length > 0 && (
            <VendingScheduleGrid shows={futureShows} />
          )}
          {futureShows === null ||
            futureShows === undefined ||
            (futureShows.length <= 0 && (
              <Grid mt="50">
                <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                  <img src={snorlaxSleeping} alt="snorlax-sleeping" className="no-upcoming-show-image" />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                  <Group justify="center">
                    <img src={snorlax} width="36" alt="snorlax" />
                    <h3>Snorlax has officially blocked the path</h3>
                  </Group>
                  <p>
                    No upcoming shows for us right now—we're in rest mode. Wake us when the next event is on the
                    calendar!
                  </p>
                </Grid.Col>
              </Grid>
            ))}
        </Tabs.Panel>
        <Tabs.Panel value="past">
          <VendingScheduleGrid shows={pastShows} />
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
}
