import "./App.css";
import Header from "./components/Header";
import { Outlet } from "react-router";
import { SkeletonTheme } from "react-loading-skeleton";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {

  return (
    <ThemeProvider>
      <SkeletonTheme baseColor="#e9ecef" highlightColor="#dee2e6">
        <Header />
        <Outlet />
      </SkeletonTheme>
    </ThemeProvider>
  );
}

export default App;
