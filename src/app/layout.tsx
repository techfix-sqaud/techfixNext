// pages/layout.tsx
import React, { ReactNode } from "react";
import App from "./App";
import { AuthProvider } from "@/components/contexts/AuthContext";
import { SearchProvider } from "@/components/contexts/SearchContext";

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
          <SearchProvider>
            <App>{children}</App>
          </SearchProvider>
        </AuthProvider>
      </body>
    </html>
  );
};

export default Layout;
