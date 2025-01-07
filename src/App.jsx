// App.jsx
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import AppRouter from "./routes/AppRouter";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        {/* Now <Header> can use <Link> safely */}
        <AppRouter />
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
