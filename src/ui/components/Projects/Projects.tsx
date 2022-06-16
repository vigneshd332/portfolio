import Card from "../Card/Card";
import { cardData } from "./data";
import styles from "./Projects.module.css";

const Projects = () => {
  return (
    <div className={styles.projectsWrapper}>
      <div className={styles.projects}>
        <span id="projects" />
        <h1 className={styles.projectsHeader}>Projects_</h1>
        <div className={styles.projectCards}>
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

export default Projects;
