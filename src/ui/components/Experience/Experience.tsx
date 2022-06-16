import Card from "../Card/Card";
import { cardData } from "./data";
import styles from "./Experience.module.css";

const Experience = () => {
  return (
    <div className={styles.experienceWrapper}>
      <div className={styles.experience}>
        <span id="experience" />
        <h1 className={styles.experienceHeader}>Experience_</h1>
        <div className={styles.experienceCards}>
          {cardData.map((card, index) => {
            return (
              <Card
                key={index}
                img={card.img}
                title={card.title}
                text={card.text}
                websites={card.websites}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Experience;
