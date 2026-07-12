import dayjs from "dayjs";
import { Accordion, Container, Title, Typography } from "@mantine/core";
import VendingScheduleService from "../models/VendingScheduleService.ts";
import "./FrequentlyAskedQuestions.scss";
import ContactMethodService, { ContactMethod } from "../models/ContactMethodService.ts";

interface FaqEntry {
  question: string;
  getAnswer: () => string;
}

const faqs: FaqEntry[] = [
  {
    question: "Why the name, Route 12?",
    getAnswer: () => `<p>
        Route 12 takes us back to our childhood, when we spent countless hours playing the Pokémon games. One memory always stood out: a sleeping Snorlax blocking the path, refusing to budge until we found the Poké Flute.
        <br /> <br />
        That moment became one of our favorites, and so did Snorlax—still our favorite Pokémon to this day.
        <br /> <br />
        For us, Route 12 is a small reminder of those childhood adventures, the games we grew up with, and the memories that inspired us.
    </p>`,
  },
  {
    question: "Where and when is your next show?",
    getAnswer: () => {
      const vendingScheduleService = new VendingScheduleService();
      const nextShow = vendingScheduleService.getNextUpcomingShow();
      if (nextShow === null) {
        return "<p>We're currently taking a break and do not have a next show scheduled. Check back later for any updates! If you'd like to sell us cards or have a chat, don't hesitate to connect with us on Instagram or email us!</p>";
      }
      return `<p>
        We're excited to meet you and chat! Our next show is at <b>${nextShow.name}</b> on <b>${dayjs(nextShow.date).format("MMM D YYYY")}</b>. For other future shows, check out or schedule <a href="#vending-schedule">here</a>.
        <br /> <br />
        ${nextShow.name}
        <br />
        ${dayjs(nextShow.date).format("MMM D YYYY")} (${nextShow.showTime})
        <br />
        ${nextShow.addressLine1}
        <br />
        ${nextShow.addressLine2}
      </p>`;
    },
  },
  {
    question: "What type of TCG and cards do we specialize in?",
    getAnswer: () =>
      "We're all things Pokémon! As much as we like all eras of Pokémon cards, we mainly collect, buy and sell mid-era to modern Pokémon cards.",
  },
  {
    question: "I want to sell some cards, how do I get in touch?",
    getAnswer: () => {
      const contactMethodService = new ContactMethodService();
      const instagram = contactMethodService.get(ContactMethod.Instagram);
      const email = contactMethodService.get(ContactMethod.Email);

      return `<p>
        You can connect with us on Instagram (<a href=${instagram!.url} target="_blank">${instagram?.display}</a>) or by email (<a href=${email!.url} target="_blank">${email?.display}</a>).
      </p>`;
    },
  },
] as FaqEntry[];

export default function FrequentlyAskedQuestions() {
  return (
    <Container size="lg" py="xl" className="vending-schedule">
      <Title order={2} ta="center" mt="sm" mb={20}>
        Frequently Asked Questions (FAQs)
      </Title>
      <Accordion variant="separated" order={3}>
        {faqs.map((f) => (
          <Accordion.Item key={f.question} value={f.question} className="faq">
            <Accordion.Control>
              <span className="title">{f.question}</span>
            </Accordion.Control>
            <Accordion.Panel className="content">
              <Typography>
                <div dangerouslySetInnerHTML={{ __html: f.getAnswer() }} />
              </Typography>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
}
