import oshawottPikachuDance from "../assets/oshawott_pikachu_dance.gif";
import snorlaxSleeping from "../assets/snorlax_sleeping.gif";
import { useState } from "react";
import dayjs from "dayjs";
import { Alert, Box, Button, Container, Grid, Title, Textarea, TextInput } from "@mantine/core";
import "./Contact.scss";
import ContactMethodService from "../models/ContactMethodService";

const FormSubmitStatus = {
  None: "NONE",
  Success: "SUCCESS",
  Error: "ERROR",
};

export default function Contact() {
  const googleFormId = "1FAIpQLSc9BcqtqkftsqBAhbv8VNYTZC5-w0CcagTTZrWsV30b8KE6tw";

  const subjectPrefix = `[Route 12 Contact Form] - ${dayjs().format("MMM D YYYY hh:mma")}`;

  const getFormFieldValueByGoogleFormId: { [id: string]: () => string } = {
    "entry.490110159": () => formData.name.trim(),
    "entry.949644054": () => formData.email.trim(),
    "entry.1169261569": () => `${subjectPrefix} - ${formData.name.trim()} - ${formData.email.trim()}`,
    "entry.616831463": () => formData.message.trim(),
  };

  const [formData, setFormData] = useState({
    name: "",
    nameHasError: false,
    email: "",
    emailHasError: false,
    message: "",
    messageHasError: false,
  });

  const validationByFieldName: { [id: string]: (value: string) => boolean } = {
    name: (v) => (v.trim() ?? "").length > 0,
    email: (v) => (v.trim() ?? "").length > 0 && /^\S+@\S+$/.test(v.trim()),
    message: (v) => (v.trim() ?? "").length > 0,
  };

  const tryValidateForm = () => {
    const isNameValid = validationByFieldName["name"](formData.name);
    const isEmailValid = validationByFieldName["email"](formData.email);
    const isMessageValid = validationByFieldName["message"](formData.message);

    setFormData({
      ...formData,
      ["nameHasError"]: !isNameValid,
      ["emailHasError"]: !isEmailValid,
      ["messageHasError"]: !isMessageValid,
    });

    return isNameValid && isEmailValid && isMessageValid;
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(FormSubmitStatus.None);

  // @ts-expect-error - ignore any check
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // @ts-expect-error - ignore any check
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(FormSubmitStatus.None);

    // Basic validation
    if (!tryValidateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      const formURL = `https://docs.google.com/forms/d/e/${googleFormId}/formResponse`;
      const formDataToSubmit = new FormData();
      for (const formFieldId in getFormFieldValueByGoogleFormId) {
        formDataToSubmit.append(formFieldId, getFormFieldValueByGoogleFormId[formFieldId]());
      }

      // Submit to Google Forms
      await fetch(formURL, {
        method: "POST",
        mode: "no-cors",
        body: formDataToSubmit,
      });

      setSubmitStatus(FormSubmitStatus.Success);

      setFormData({
        name: "",
        nameHasError: false,
        email: "",
        emailHasError: false,
        message: "",
        messageHasError: false,
      });

      setTimeout(() => setSubmitStatus(FormSubmitStatus.None), 20000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus(FormSubmitStatus.Error);
      setTimeout(() => setSubmitStatus(FormSubmitStatus.None), 20000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethodService = new ContactMethodService();
  const contactMethods = contactMethodService.getAll();

  return (
    <Container size="lg" py="xl" className="contact-container">
      <Title order={2} ta="center" mt="sm" mb={50}>
        Connect With Us
      </Title>
      <Grid>
        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
          {contactMethods.map((m) => (
            <div className="left" key={m.method}>
              {
                // Large screen
                <Box visibleFrom="md">
                  <Button
                    size="xl"
                    leftSection={<m.icon size={32} />}
                    variant="subtle"
                    onClick={() => window.open(m.url, "_blank")}
                  >
                    {m.display}
                  </Button>
                </Box>
              }
              {
                // Small screen
                <Box hiddenFrom="md">
                  <Button
                    size="md"
                    leftSection={<m.icon size={24} />}
                    variant="subtle"
                    onClick={() => window.open(m.url, "_blank")}
                  >
                    {m.display}
                  </Button>
                </Box>
              }
            </div>
          ))}
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
          {submitStatus === FormSubmitStatus.Error && (
            <Alert variant="filled" title="Error! A wild Snorlax appeared!" className="submission-alert failed">
              <>
                <span>
                  Oh no! A wild Snorlax has fallen asleep on the network path, blocking all traffic. Please try again
                  later or connect with us on Instagram or email us directly!
                </span>
                <img src={snorlaxSleeping} alt="snorlax-sleeping" />
              </>
            </Alert>
          )}
          {submitStatus === FormSubmitStatus.Success && (
            <Alert variant="filled" title="Message successfully sent!" className="submission-alert sucessful">
              <>
                <span>Your form has been successfully submitted, courtesy of Oshawott and Pikachu.</span>
                <img src={oshawottPikachuDance} alt="oshawott-pikachu-dance" />
              </>
            </Alert>
          )}
          {submitStatus === FormSubmitStatus.None && (
            <>
              <TextInput
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                withAsterisk
                required
                className="form-input"
                error={formData.nameHasError ? <span>Please enter a name</span> : false}
              />
              <TextInput
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                withAsterisk
                required
                className="form-input"
                error={formData.emailHasError ? <span>Please enter a valid email (e.g. name@example.com)</span> : false}
              />
              <Textarea
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                withAsterisk
                required
                autosize
                minRows={4}
                maxRows={4}
                className="form-input"
                error={formData.messageHasError ? <span>Please enter a message</span> : false}
              />
              <Button fullWidth onClick={handleSubmit} loading={isSubmitting} className="submit-button">
                Submit
              </Button>
            </>
          )}
        </Grid.Col>
      </Grid>
    </Container>
  );
}
