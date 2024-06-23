// pages/layout.tsx
import React, { ReactNode } from "react";
import App from "./App";
import { AuthProvider } from "@/components/contexts/AuthContext";

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
      <body>
        <AuthProvider>
          <App>{children}</App>
        </AuthProvider>
      </body>
    </html>
  );
};

export default Layout;
