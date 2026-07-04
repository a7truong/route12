import { Container, Title, Text } from "@mantine/core";

export default function AboutUs() {
  return (
    <Container size="lg" py="xl" className="vending-schedule">
      <Title order={2} ta="center" mt="sm" mb={20}>
        About Us
      </Title>
      <Text>
        We are a passionate Pokémon TCG vendor based in the Greater Toronto Area (GTA), dedicated to sharing the joy of
        collecting and connecting with local trainers. For us, Pokémon is more than just a hobby—it’s a community. You
        can regularly find us at card shows across Mississauga, Brampton, Markham, and Vaughan. Whether you’re looking
        for your ultimate grail, completing your master set, or just chat about the hobby, we’d love to meet you. Check
        out our schedule and come find us at one of our upcoming shows!
      </Text>
    </Container>
  );
}
