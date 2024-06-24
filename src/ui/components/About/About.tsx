import { useEffect } from "react";
import TxtRotate from "../../helpers/TypeCarousel";
import styles from "./About.module.css";
import god from "../../../assets/god.webp";
import linkedin from "../../../assets/linkedin.svg";
import github from "../../../assets/github.svg";
import instagram from "../../../assets/instagram.svg";
import twitter from "../../../assets/twitter.svg";

const About = (): JSX.Element => {
  useEffect(() => {
    const rotateElement = document.getElementById("nav-title") as HTMLElement;
    const toRotate = ["netrunner_", "Vignesh Duraisamy_"];
    const period = 1500;
    if (toRotate) new TxtRotate(rotateElement, toRotate, period);
  }, []);

  return (
    <div className={styles.aboutBgWrapper}>
      <div className={styles.About}>
        <div className={styles.aboutNavContainer}>
          <div className={styles.aboutNav}>
            <div id="nav-title" className={styles.navTitle}>
              Vignesh Duraisamy_
            </div>
            <div className={styles.aboutNavButtons}>
              <button
                className={styles.aboutNavButton}
                onClick={() => {
                  window.location.pathname = "/world";
                }}
              >
                GO TO WORLD
              </button>
            </div>
          </div>
        </div>
        <div className={styles.aboutBody}>
          <div className={styles.vesselOfGod}>
            <img className={styles.god} src={god} alt="Vignesh Duraisamy" />
          </div>
          <div className={styles.doGodsHaveToGiveIntros}>
            Hey! I'm Vignesh, a software developer who also knows iron and steel
            making &#40;can't say I'm very fond of it&#41; and a graduate from
            NIT Trichy &#40;batch of 2024&#41;. I love taking on challenges that
            are out of the ordinary and doings things that I haven't done
            before. In my free-time, you can find me producing music or sipping
            on coffee. I've currently taken an interest to game development and
            am learing about shader programming. Feel free to reach out to me on
            my socials for a chat :&#41;
          </div>
          <div className={styles.socials}>
            <a
              href="https://www.instagram.com/netrunner._/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className={styles.socialIcon}
                src={instagram}
                alt="Instagram"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/vduraisamy/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className={styles.socialIcon}
                src={linkedin}
                alt="LinkedIn"
              />
            </a>
            <a
              href="https://www.github.com/vigneshd332"
              target="_blank"
              rel="noreferrer"
            >
              <img className={styles.socialIcon} src={github} alt="GitHub" />
            </a>
            <a
              href="https://www.twitter.com/HBM2E"
              target="_blank"
              rel="noreferrer"
            >
              <img className={styles.socialIcon} src={twitter} alt="Twitter" />
            </a>
          </div>
          <div className={styles.links}>
            <button className={styles.link}>
              <a href="#projects">PROJECTS</a>
            </button>
            <button className={styles.link}>
              <a href="#experience">EXPERIENCE</a>
            </button>
            <button
              className={styles.link}
              onClick={() => {
                window.open("/resume.pdf");
              }}
            >
              RESUME
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
