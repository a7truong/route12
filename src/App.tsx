import logo from "./assets/logo.png";
import charmander from "./assets/charmander.gif";
import bulbasaur from "./assets/bulbasaur.gif";
import squirtle from "./assets/squirtle.gif";
import pikachu from "./assets/pikachu.gif";
import { useDisclosure } from "@mantine/hooks";
import { Box, Burger, Container, Group, Flex, Menu, Text } from "@mantine/core";
import VendingSchedule from "./sections/VendingSchedule";
import AboutUs from "./sections/AboutUs";
import Contact from "./sections/Contact";
import FrequentlyAskedQuestions from "./sections/FrequentlyAskedQuestions";
import "./App.scss";

const links = [
  { id: "about-us", label: "About Us", component: AboutUs },
  { id: "vending-schedule", label: "Vending Schedule", component: VendingSchedule },
  { id: "contact", label: "Connect With Us", component: Contact },
  { id: "frequently-asked-questions", label: "FAQs", component: FrequentlyAskedQuestions },
];

function App() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <>
      {
        // large screen navigation bar
        <Box component="span" visibleFrom="md" className="sticky">
          <header className="header">
            <Container size="md" className="inner-container static">
              <Group gap={5} justify="space-between" className="group static-header">
                <Group justify="left">
                  <Text fw={700} ml={14}>
                    Route 12 Cards & Collectibles
                  </Text>
                </Group>
                <Group justify="right">
                  <Flex mr={14}>
                    {links.map((link) => (
                      <a key={link.label} href={`#${link.id}`} className="link">
                        {link.label}
                      </a>
                    ))}
                  </Flex>
                </Group>
              </Group>
            </Container>
          </header>
        </Box>
      }
      {
        // small screen navigation bar
        <Box component="span" hiddenFrom="md">
          <header className="header">
            <Container size="md" className="inner-container">
              <Group justify="space-between" className="group">
                <Group justify="left">
                  <Text fw={700}>Route 12</Text>
                </Group>
                <Group justify="right">
                  <Menu opened={opened} onChange={toggle} position="bottom-end">
                    <Menu.Target>
                      <Burger opened={opened} onClick={toggle} />
                    </Menu.Target>

                    <Menu.Dropdown>
                      {links.map((link) => (
                        <Menu.Item key={link.id} component="a" href={`#${link.id}`}>
                          {link.label}
                        </Menu.Item>
                      ))}
                    </Menu.Dropdown>
                  </Menu>
                </Group>
              </Group>
            </Container>
          </header>
        </Box>
      }
      <section className="section full-view-minus-header" id="top">
        <div>
          <img src={logo} width="400" alt="route-12-logo" />
        </div>
        <div>
          <img src={bulbasaur} width="50" alt="bulbasaur" className="pokemon-image" />
          <img src={charmander} width="50" alt="charmander" className="pokemon-image" />
          <img src={squirtle} width="50" alt="squirtle" className="pokemon-image" />
          <img src={pikachu} width="50" alt="pikachu" className="pokemon-image" />
        </div>
      </section>
      {links.map((l) => (
        <section className="section standard-view" id={l.id} key={l.id}>
          <l.component />
        </section>
      ))}
      <div className="footer">
        <Flex className="content" justify="center">
          Coded by Slowpoke and Psyduck at Route 12 Headquarters.
        </Flex>
      </div>
    </>
  );
}

export default App;
