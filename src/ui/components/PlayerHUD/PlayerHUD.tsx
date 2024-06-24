import styles from "./PlayerHUD.module.css";

const PlayerControls = ({ gameStart, hudData }: ControlProps): JSX.Element => {
  return (
    <div style={{ visibility: gameStart ? "visible" : "hidden" }}>
      <div className={styles.playerRadar}>
        <canvas id="radar-canvas" className={styles.playerRadarCanvas}></canvas>
      </div>{" "}
      <div className={styles.playerStats}>
        <div className={styles.playerStatsContainer}>
          <div className={styles.playerStatsItem}>
            <span className={styles.playerStatsLabel}>Aircraft:</span>
            <span className={styles.playerStatsValue}>{hudData.name}</span>
          </div>
          <div className={styles.playerStatsItem}>
            <span className={styles.playerStatsLabel}>Speed:</span>
            <span className={styles.playerStatsValue}>
              {hudData.speed} km/h
            </span>
          </div>
          <div className={styles.playerStatsItem}>
            <span className={styles.playerStatsLabel}>Altitude:</span>
            <span className={styles.playerStatsValue}>
              {hudData.altitude} ft
            </span>
          </div>
          <div className={styles.playerStatsItem}>
            <span className={styles.playerStatsLabel}>Bank Angle:</span>
            <span className={styles.playerStatsValue}>{hudData.roll}°</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerControls;
