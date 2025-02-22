import React from "react";
import { Route, Routes } from "react-router-dom";

import Academics from "../pages/Academics";
import Entertainment from "../pages/Entertainment";
import Gaming from "../pages/Gaming";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Shop from "../pages/Shop";
import ScrollToTop from "./ScrollToTop";

const PublicRouter: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/entertainment" element={<Entertainment />} />
        <Route path="/academics" element={<Academics />} />
        <Route path="/gaming" element={<Gaming />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <ScrollToTop />
    </>
  );
};

export default PublicRouter;
