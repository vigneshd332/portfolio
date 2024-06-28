import { useNavigate } from "react-router-dom";
import styles from "./StartPage.module.css";
import worldImg from "../../../assets/portfolio.webp";
import simpleImg from "../../../assets/portfolio-about.webp";

const StartPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.startPageWrapper}>
      <div className={styles.startPage}>
        <div className={styles.header}>Vignesh's Portfolio</div>
        <div className={styles.redPillOrBluePill}>
          <div className={styles.card} onClick={() => navigate("/about")}>
            <div className={styles.imgContainer}>
              <img className={styles.img} src={simpleImg} alt="About Me" />
            </div>
            <div className={styles.imgAbout}>About Me</div>
          </div>
          <div
            className={styles.card}
            onClick={() => (window.location.pathname = "/world")}
          >
            <div className={styles.imgContainer}>
              <img className={styles.img} src={worldImg} alt="3D Simulation" />
            </div>
            <div className={styles.imgAbout}>
              Interactive 3D Simulation [Work in Progress]
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
