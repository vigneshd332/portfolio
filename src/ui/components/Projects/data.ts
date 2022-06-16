import dwoc from "../../../assets/dwoc.jpg";
import proximity from "../../../assets/proximity.png";
import code from "../../../assets/codecharacter.png";
import globe from "../../../assets/globe.svg";
import github from "../../../assets/github.svg";

export const cardData = [
  {
    img: code,
    title: "Code Character | A strategy based programming game",
    text: "Developed the Renderer for the game using Phaser. Designed and Developed an intuitive UI with robust State Management using React and Redux.",
    websites: [
      { icon: globe, url: "https://code.pragyan.org" },
      { icon: github, url: "https://github.com/delta/codecharacter-web-2022" },
    ],
  },
  {
    img: dwoc,
    title: "DWOC | A GSOC-like program",
    text: "Worked extensively in the frontend of the site, mainly the homepage and mentor invites section. Worked with React, GraphQL (Both Client and Server) and MUI and created custom CSS animations.",
    websites: [
      { icon: globe, url: "https://dwoc.io" },
      { icon: github, url: "https://github.com/delta/dwoc-client" },
    ],
  },
  {
    img: proximity,
    title: "Proximity | An intelligent Discord bot",
    text: "Built a Discord Bot with Music, Image Search and lots of fun commands using Node.js. Integrated IBM Watson Image Recognition and Google Text to Speech API to provide Image Classification and Text to Speech Features on Discord.",
    websites: [
      { icon: github, url: "https://github.com/vigneshd332/proximity" },
    ],
  },
];
