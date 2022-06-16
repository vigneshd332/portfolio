import styles from "./Card.module.css";

interface Website {
  icon: string;
  url: string;
}

interface CardProps {
  img: string;
  title: string;
  text: string;
  websites?: Website[];
}

const Card = ({ img, title, text, websites }: CardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardImg}>
        <img src={img} alt="Vignesh Duraisamy" />
      </div>
      <div className={styles.cardTitle}>{title}</div>
      <div className={styles.cardBody}>{text}</div>
      <div className={styles.extras}>
        {websites &&
          websites.map((website, index) => {
            return (
              <a
                key={index}
                href={website.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className={styles.websiteIcon}
                  src={website.icon}
                  alt="Vignesh Duraisamy"
                />
              </a>
            );
          })}
      </div>
    </div>
  );
};

export default Card;
