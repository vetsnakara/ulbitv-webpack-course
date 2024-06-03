import { createRoot } from "react-dom/client";
import { App } from "./components/App";

const root = document.getElementById("root");
const contranier = createRoot(root);

contranier.render(<App />);
