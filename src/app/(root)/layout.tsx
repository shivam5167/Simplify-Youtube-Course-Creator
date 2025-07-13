import React, { PropsWithChildren } from "react";

import Header from "@/components/shared/navbar/navbar";
import SignInDialog from "@/feature/auth/components/login-dialog";
import FooterSection from "@/feature/home/components/footer-section";

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      {children}

      <FooterSection />
      <SignInDialog />
    </>
  );
};

export default RootLayout;
