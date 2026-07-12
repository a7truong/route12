import type { Icon } from "@phosphor-icons/react";
import { EnvelopeSimpleOpenIcon, InstagramLogoIcon, YoutubeLogoIcon } from "@phosphor-icons/react";

export const ContactMethod = {
  Instagram: "INSTAGRAM",
  Youtube: "YOUTUBE",
  Email: "EMAIL",
};
export type ContactMethod = (typeof ContactMethod)[keyof typeof ContactMethod];

export interface ContactMethodEntry {
  method: ContactMethod;
  display: string;
  url: string;
  icon: Icon;
}

export default class ContactMethodService {
  readonly contactMethods: ContactMethodEntry[];

  constructor() {
    this.contactMethods = [
      {
        method: ContactMethod.Instagram,
        display: "@route12.cards",
        url: "https://www.instagram.com/route12.cards/",
        icon: InstagramLogoIcon,
      },
      {
        method: ContactMethod.Youtube,
        display: "@route12cards",
        url: "https://www.youtube.com/@route12cards",
        icon: YoutubeLogoIcon,
      },
      {
        method: ContactMethod.Email,
        display: "route12.cc@gmail.com",
        url: "mailto:route12.cc@gmail.com",
        icon: EnvelopeSimpleOpenIcon,
      },
    ] as ContactMethodEntry[];
  }

  getAll = (): ContactMethodEntry[] => {
    return this.contactMethods;
  };

  get = (method: ContactMethod) => {
    return this.contactMethods.find((m) => m.method === method);
  };
}
