import delta from "../../../assets/delta.webp";
import tedx from "../../../assets/tedx-logo.svg";
import citi from "../../../assets/citi.webp";
import globe from "../../../assets/globe.svg";
import github from "../../../assets/github.svg";

export const cardData: CardData[] = [
  {
    img: citi,
    title: "Citi",
    text: "Developed an update automation tool for creating update snapshots for the OpenLink Endur application. The tool was used by the team to automate the process of creating update snapshots, saving hours of manual work. Developed a node-wise XML comparison tool for comparing the XML Feeds of the Endur application's subcomponents.",
    websites: [{ icon: globe, url: "https://www.citi.com/" }],
  },
  {
    img: delta,
    title: "Delta Force",
    text: "Software Developer in the official coding club and web team of NIT Trichy, which produces and maintains most of the web and app development for various activities, festivals and admin-related projects in the college.",
    websites: [
      { icon: globe, url: "https://delta.nitt.edu/" },
      { icon: github, url: "https://github.com/delta" },
    ],
  },
  {
    img: tedx,
    title: "TEDxNITTrichy",
    text: "Developed and Deployed the Main, Blog and Event Websites accessed by 100s of unique visitors. Helped ideate 3+ TEDx events and handled all the tech requirements for online events.",
    websites: [
      { icon: globe, url: "https://tedxnittrichy.com/" },
      { icon: globe, url: "https://blog.tedxnittrichy.com/" },
      { icon: github, url: "https://github.com/tedxnittrichy" },
    ],
  },
];
