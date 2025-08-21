import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "@/components/ui/sonner";

import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
createRoot(document.getElementById("root")).render(
  <Router>
    <Provider store={store}>
      <Toaster />
      <App />
    </Provider>
  </Router>
);
