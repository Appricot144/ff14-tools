import ReactDom from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./Layout";
import "./main.css";

const root = document.getElementById("root") as HTMLElement;

ReactDom.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<>not ready yet</>} />
        <Route path="/todo" element={<>not ready yet</>} />
        <Route path="/planner" element={<>not ready yet</>} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
