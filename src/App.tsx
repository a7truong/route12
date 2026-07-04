import logo from "./assets/logo.png";
import charmander from "./assets/charmander.gif";
import bulbasaur from "./assets/bulbasaur.gif";
import squirtle from "./assets/squirtle.gif";
import pikachu from "./assets/pikachu.gif";
import { useDisclosure } from "@mantine/hooks";
import { Burger, Container, Group, Menu, Text } from "@mantine/core";
import VendingSchedule from "./sections/VendingSchedule";
import AboutUs from "./sections/AboutUs";
import Contact from "./sections/Contact";
import "./App.scss";

const links = [
  { id: "#about-us", label: "About Us" },
  { id: "#vending-schedule", label: "Vending Schedule" },
  { id: "#contact", label: "Connect With Us" },
];

function App() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <>
      <header className="header">
        <Container size="md" className="inner-container">
          <Group gap={5} visibleFrom="md" justify="space-between" className="group">
            <Group justify="left">
              <Text fw={700}>Route 12 Cards & Collectibles</Text>
            </Group>
            <Group justify="right">
              {links.map((link) => (
                <a key={link.label} href={link.id} className="link">
                  {link.label}
                </a>
              ))}
            </Group>
          </Group>
          <Group hiddenFrom="md" justify="space-between" className="group">
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
                    <Menu.Item component="a" href={link.id}>
                      {link.label}
                    </Menu.Item>
                  ))}
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Group>
        </Container>
      </header>
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
      <section className="section standard-view" id="about-us">
        <AboutUs />
      </section>
      <section className="section standard-view" id="vending-schedule">
        <VendingSchedule />
      </section>
      <section className="section standard-view" id="contact">
        <Contact />
      </section>
    </>
  );
}

export default App;
