import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WorldUI from "../../components/WorldUI/WorldUI";
import styles from "./WorldHome.module.css";
import init from "../../../world/world";

const WorldHome = (): JSX.Element => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [gameStart, setGameStart] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (loaded) document.getElementById("Loader")?.remove();
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "w" || e.key === "ArrowUp") setGameStart(true);
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
        {!loaded && (
          <div className={styles.loaderContainer}>
            <div id="LoaderText" className={styles.loader} />
            <p className={styles.redirectMessage}>
              This is a page with interactive 3D models and might take a lot of
              time to load on slower connections.
            </p>
            <button
              className={styles.redirectButton}
              onClick={() => navigate("/about")}
            >
              Click here to view a simpler page
            </button>
          </div>
        )}
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
