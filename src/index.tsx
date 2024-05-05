import ReactDOM from "react-dom/client";
import App from "./App";
import { DataProvider } from "./utils/DataContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <DataProvider>
    <App />
  </DataProvider>
);
