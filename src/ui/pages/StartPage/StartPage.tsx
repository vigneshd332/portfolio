import { useNavigate } from "react-router-dom";
import styles from "./StartPage.module.css";
import worldImg from "../../../assets/portfolio.webp";
import simpleImg from "../../../assets/portfolio-about.webp";

const StartPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.startPageWrapper}>
      <div className={styles.startPage}>
        <div className={styles.header}>Choose a portfolio version</div>
        <div className={styles.redPillOrBluePill}>
          <div
            className={styles.card}
            onClick={() => (window.location.pathname = "/world")}
          >
            <div className={styles.imgContainer}>
              <img
                className={styles.img}
                src={worldImg}
                alt="3D World Portfolio"
              />
            </div>
            <div className={styles.imgAbout}>
              3D Portfolio Game [Work in Progress]
            </div>
          </div>
          <div className={styles.card} onClick={() => navigate("/about")}>
            <div className={styles.imgContainer}>
              <img
                className={styles.img}
                src={simpleImg}
                alt="Simple Portfolio"
              />
            </div>
            <div className={styles.imgAbout}>Simple Portfolio</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
