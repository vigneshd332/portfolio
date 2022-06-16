import About from "../../components/About/About";
import Experience from "../../components/Experience/Experience";
import Footer from "../../components/Footer/Footer";
import Projects from "../../components/Projects/Projects";
import styles from "./AboutPage.module.css";

const AboutPage = () => {
  return (
    <div className={styles.aboutPage}>
      <About />
      <Experience />
      <Projects />
      <Footer />
    </div>
  );
};

export default AboutPage;
