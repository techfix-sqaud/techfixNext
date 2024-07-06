// pages/layout.tsx
import React, { ReactNode } from "react";
import App from "./App";
import { AuthProvider } from "@/components/contexts/AuthContext";
import Script from "next/script";

export const metadata = {
  title: "techfix",
  description: "Techfix",
};

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <Script
          strategy="lazyOnload"
          src={`async src="https://www.googletagmanager.com/gtag/js?id=G-7CX0HWB9JS"`}
        />

        <Script id="" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7CX0HWB9JS');
          `}
        </Script>
      </head>
      <body>
        <AuthProvider>
          <App>{children}</App>
        </AuthProvider>
      </body>
    </html>
  );
};

export default Layout;
