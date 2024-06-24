import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WorldHome from "./ui/pages/WorldHome/WorldHome";
import AboutPage from "./ui/pages/AboutPage/AboutPage";
import StartPage from "./ui/pages/StartPage/StartPage";
import styles from "./App.module.css";

function App(): JSX.Element {
  return (
    <div className={styles.App}>
      <Router>
        <Routes>
          <Route path="/">
            <Route index element={<StartPage />} />
            <Route path="world" element={<WorldHome />} />
            <Route path="about" element={<AboutPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
