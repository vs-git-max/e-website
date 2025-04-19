import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { Toaster } from "./components/ui/sonner";

createRoot(document.getElementById("root")).render(
  <Router>
    <Provider store={store}>
      <App />
      <Toaster />
    </Provider>
  </Router>
);
