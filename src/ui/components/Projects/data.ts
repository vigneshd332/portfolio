import dwoc from "../../../assets/dwoc.webp";
import proximity from "../../../assets/proximity.webp";
import code from "../../../assets/codecharacter.webp";
import dvote from "../../../assets/dvote.webp";
import portfolio from "../../../assets/portfolio.webp";
import globe from "../../../assets/globe.svg";
import github from "../../../assets/github.svg";

export const cardData: CardData[] = [
  {
    img: code,
    title: "Code Character | A strategy based programming game",
    text: "Developed a proxy web driver to handle C++, Java and Python language servers for the game's editor using Golang. Developed the Renderer and Log Parser for the game using Phaser. Designed and Developed an intuitive UI with React and Redux.",
    websites: [
      { icon: globe, url: "https://code.pragyan.org" },
      { icon: github, url: "https://github.com/delta/codecharacter-web-2022" },
      { icon: github, url: "https://github.com/delta/codecharacter-lsp-2023" },
    ],
  },
  {
    img: portfolio,
    title: "Vignesh Duraisamy | 3D Portfolio",
    text: "Designed and Developed an interactive 3D portfolio with THREE.js and React to show my projects and past work experiences. Integrated various 3D models of aircraft and ships to show a game like portfolio where users can click on relevant links and icons to view information about me.",
    websites: [
      { icon: globe, url: "https://net-runner.dev/" },
      { icon: github, url: "https://github.com/vigneshd332/portfolio" },
    ],
  },
  {
    img: dvote,
    title: "D-Vote | A ZKP based decentralized voting platform",
    text: "DVote is a decentralized Zero Knowledge Proof based voting application ingeniously harnessing the transformative potential of blockchain technology. This innovative platform revolutionizes the traditional voting paradigm by adopting a decentralized approach, mitigating reliance on a centralized authority.",
    websites: [
      {
        icon: github,
        url: "https://github.com/suhailahmed2627/dvote-frontend",
      },
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
  {
    img: dwoc,
    title: "DWOC | A GSOC-like program",
    text: "Worked extensively in the frontend of the site, mainly the homepage and mentor invites section. Worked with React, GraphQL (Both Client and Server) and MUI and created custom CSS animations.",
    websites: [
      { icon: globe, url: "https://dwoc.io" },
      { icon: github, url: "https://github.com/delta/dwoc-client" },
    ],
  },
];
