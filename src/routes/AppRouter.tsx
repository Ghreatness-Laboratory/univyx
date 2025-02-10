import React from "react";
import { Route, Routes } from "react-router-dom";
import AboutUs from "../pages/AboutUs";
import Blog from "../pages/Blog";
import ContactUs from "../pages/ContactUs";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Services from "../pages/Services";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Layout from "../components/Layout";

const AppRouter: React.FC = () => {
   return (
      <Routes>
         <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="*" element={<NotFound />}></Route>
         </Route>
         <Route path="/login" element={<Login />} />
         <Route path="/sign-up" element={<SignUp />} />
      </Routes>
   );
};

export default AppRouter;
