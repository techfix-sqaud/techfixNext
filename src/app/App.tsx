"use client";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import Header from "@/components/UI/headerandfooter/header";
import Footer from "@/components/UI/headerandfooter/footer";
import Banner from "@/components/UI/headerandfooter/topHeader";
import BannerTheme from "@/components/UI/banner";
import { Inter, Architects_Daughter } from "next/font/google";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingOverlay from "@/components/UI/LoadingOverlay";
import useLogin from "@/components/hooks/useLogin";
import AuthContext from "@/components/contexts/AuthContext";
import Sidebar from "@/components/UI/headerandfooter/sideNavBar";
import TopHeaderAdmin from "@/components/UI/headerandfooter/topHeaderAdmin";
import UseLocalStorage from "@/components/hooks/useLocalStorage";
import { ThemeProvider } from "@/components/contexts/ThemProvider";
import EmployeeNav from "@/components/UI/headerandfooter/EmployeeNav";
import { configartion } from "@/components/helpers/techfixAPI";
import DashboardBanner from "@/components/UI/DashboardBanner";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const architects_daughter = Architects_Daughter({
  subsets: ["latin"],
  variable: "--font-architects-daughter",
  weight: "400",
  display: "swap",
});

interface ThemedContentProps {
  children: ReactNode;
}

function ThemedContent({ children }: ThemedContentProps) {
  return (
    <div
      className={`${inter.variable} ${architects_daughter.variable} font-inter antialiased bg-white dark:bg-gray-900 text-black dark:text-gray-200 tracking-tight min-h-screen`}
    >
      {children}
    </div>
  );
}

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const { userProfile } = useContext(AuthContext)!;
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { handleLogin, handleLogout } = useLogin();
  const [token, setToken] = UseLocalStorage("token", "");
  const [expires, setExpires] = UseLocalStorage("expires", null);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  useEffect(() => {
    if (token && expires) {
      configartion(token);
      const expireDate = new Date(expires);
      if (expireDate > new Date()) {
        handleLogin(token, expireDate, false);
      } else {
        handleLogout();
        toast.error("Your session has expired. Please log in again.", {
          autoClose: false,
        });
      }
    }
  }, [token, expires]);

  return (
    <html lang="en">
      <head>
        {/* Google Analytics start */}
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
        {/* Google Analytics End */}
      </head>
      <body
        className={`${inter.variable} ${architects_daughter.variable} font-inter antialiased tracking-tight`}
      >
        <ToastContainer className={"toastify-container"} autoClose={false} />
        <ThemeProvider>
          {isLoading ? (
            <LoadingOverlay />
          ) : !userProfile.isAuthenticated ? (
            <>
              <Banner />
              <Header />
              <ThemedContent>
                <div className="flex flex-col min-h-screen overflow-hidden">
                  {children}
                  <BannerTheme />
                </div>
              </ThemedContent>
              <Footer />
            </>
          ) : userProfile.isAuthenticated && userProfile.role === "ADMIN" ? (
            <div className="flex h-screen overflow-hidden">
              <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
              <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden bg-gray-100">
                <TopHeaderAdmin
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                />
                <ThemedContent>
                  <div className="flex flex-col min-h-screen overflow-hidden bg-white dark:bg-gray-900 text-black dark:text-gray-200">
                    {children}
                    <BannerTheme />
                  </div>
                </ThemedContent>
              </div>
            </div>
          ) : (
            <div className="relative flex flex-col min-h-screen">
              {/* Banner at the top, stays fixed */}
              {/* <div className="fixed top-0 left-0 right-0 z-20">
                <Banner />
              </div> */}

              {/* Main content area, padding added to prevent overlap */}
              <div className="flex h-screen overflow-hidden">
                {/* Adjusted for EmployeeNav */}
                <EmployeeNav />
                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden bg-gray-100">
                  <ThemedContent>
                    <div className="flex flex-col min-h-screen overflow-hidden bg-white dark:bg-gray-900 text-black dark:text-gray-200">
                      {/* Padding added to ensure content is not covered by the banner */}
                      <div className="pt-4">{children}</div>
                      <BannerTheme />
                    </div>
                  </ThemedContent>
                </div>
              </div>
            </div>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
