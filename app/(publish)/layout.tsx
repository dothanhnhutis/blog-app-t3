import React from "react";
import NavBar from "../_components/NavBar";
import Footer from "../_components/Footer";
type Props = {
  children: React.ReactNode;
};
const DefaultLayout = ({ children }: Props) => {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
};

export default DefaultLayout;
