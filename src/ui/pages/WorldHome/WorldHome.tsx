import { useState, useEffect } from "react";
import WorldUI from "../../components/WorldUI/WorldUI";
import styles from "./WorldHome.module.css";
import init from "../../../world/world";

const WorldHome = (): JSX.Element => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [gameStart, setGameStart] = useState<boolean>(false);

  useEffect(() => {
    if (loaded) document.getElementById("Loader")?.remove();
    window.addEventListener("keydown", () => {
      setGameStart(true);
    });
    return () => {
      window.removeEventListener("keydown", () => {});
    };
  }, [loaded]);

  useEffect(() => {
    init(setLoaded);
    console.log("App initialized");
  }, []);

  return (
    <div className={styles.worldContainer}>
      <div id="world" className={styles.worldHome}>
        <div id="Loader" className={styles.loader} />
      </div>
      {loaded && !gameStart && (
        <div className={styles.worldUIContainer}>
          <WorldUI />
        </div>
      )}
    </div>
  );
};

export default WorldHome;
