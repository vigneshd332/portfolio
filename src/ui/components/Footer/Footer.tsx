import reactIcon from "../../../assets/react-icon.png";
import threeIcon from "../../../assets/threejs.svg";
import styles from "./Footer.module.css";

const Footer = () => {
  const veryProductiveFunction = () => {
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  };

  return (
    <div className={styles.footer}>
      <div className={styles.footerText}>
        Made with{" "}
        <span
          className={styles.footerIcon}
          title="love"
          onClick={veryProductiveFunction}
        >
          ❤️
        </span>
        <img
          className={styles.footerIcon}
          src={reactIcon}
          alt="React Icon"
          title="React"
          onClick={veryProductiveFunction}
        />
        and{" "}
        <img
          className={`${styles.footerIcon} ${styles.threeIcon}`}
          src={threeIcon}
          alt="Three Icon"
          title="Three.js"
          onClick={veryProductiveFunction}
        />{" "}
      </div>
    </div>
  );
};

export default Footer;
