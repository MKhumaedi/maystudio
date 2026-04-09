import React from "react";
import Section from "./Section";
import { discordBlack } from "../assets";

const socials = [
  {
    title: "Discord",
    iconUrl: discordBlack,
    url: "#",
  },
];

const Footer = () => {
  return (
    <Section crosses className="!px-0 !py-10">
      <div className="container flex sm:justify-between justify-center items-center gap-10 max-sm:flex-col">
        <p className="caption text-n-4 lg:block">
          © {new Date().getFullYear()} . All rights reserved. Maystudio
        </p>

        <ul className="flex gap-5 flex-wrap">
          {socials.map((item, i) => (
            <li key={i}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-[#15131D] rounded-full transition-colors hover:bg-n-6"
              >
                <img src={item.iconUrl} width={16} height={16} alt={item.title} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
};

export default Footer;