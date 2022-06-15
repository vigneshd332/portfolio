import styles from "./WorldUI.module.css";
import wasd from "../../../assets/wasd.png";
import arrows from "../../../assets/arrows.png";
import rkey from "../../../assets/r.png";
import fkey from "../../../assets/f.png";
import uparrow from "../../../assets/upArrow.png";

const WorldUI = (): JSX.Element => {
  return (
    <div className={styles.worldUI}>
      <div className={styles.worldUINavContainer}>
        <div className={styles.worldUINav}>
          <h2 className={styles.theChosenOne}>Vignesh's World</h2>
          <div className={styles.navButtons}>
            <button className={styles.navButton}>ABOUT</button>
            <button className={styles.navButton}>RESUME</button>
          </div>
        </div>
      </div>
      <div className={styles.worldUIBody}>
        <div className={styles.instructions}>
          <div className={styles.instructionListItem}>
            <p>
              • You can move around and interact with different elements to see
              my work, to see a simpler version click the about button .
            </p>
          </div>
          <div className={styles.instructionListItem}>
            <p>
              • Use the{" "}
              <img className={styles.keyImg} src={wasd} alt="WASD keys" /> keys
              or <img className={styles.keyImg} src={arrows} alt="arrow keys" />
              to move around .
            </p>
          </div>
          <div className={styles.instructionListItem}>
            <p>
              • Use the{" "}
              <img className={styles.keyImgSmall} src={rkey} alt="WASD keys" />{" "}
              key to increase and{" "}
              <img className={styles.keyImgSmall} src={fkey} alt="Arrow keys" />{" "}
              key to decrease height .
            </p>
          </div>
          <div className={styles.instructionListItem}>
            <p>Happy Exploring :&#41;</p>
          </div>
        </div>
        <div className={styles.startMessage}>
          <p>
            Press the{" "}
            <img
              className={`${styles.keyImgSmall} ${styles.upArrow}`}
              src={uparrow}
              alt="UpArrow Key"
            />{" "}
            key to begin...
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorldUI;
