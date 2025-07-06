import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";

import LandingPage from "./pages/landing";
import EditorPage from "./pages/editor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/editor" element={<EditorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
