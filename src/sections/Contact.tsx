import { Button, Container, Title } from "@mantine/core";
import { EnvelopeSimpleOpenIcon, InstagramLogoIcon, YoutubeLogoIcon } from "@phosphor-icons/react";

const contactMethods = [
  {
    method: "instagram",
    display: "@route12.cards",
    url: "https://www.instagram.com/route12.cards/",
    icon: InstagramLogoIcon,
  },
  {
    method: "youtube",
    display: "@route12cards",
    url: "https://www.youtube.com/@route12cards",
    icon: YoutubeLogoIcon,
  },
  {
    method: "email",
    display: "route12.cc@gmail.com",
    url: "mailto:route12.cc@gmail.com",
    icon: EnvelopeSimpleOpenIcon,
  },
];

export default function Contact() {
  return (
    <Container size="lg" py="xl">
      <Title order={2} ta="center" mt="sm" mb={50}>
        Connect With Us
      </Title>
      {contactMethods.map((m) => (
        <div>
          <Button
            size="xl"
            leftSection={<m.icon size={32} />}
            variant="subtle"
            onClick={() => window.open(m.url, "_blank")}
          >
            {m.display}
          </Button>
        </div>
      ))}
    </Container>
  );
}
