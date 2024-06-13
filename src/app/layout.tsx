import Header from "@/components/UI/headerandfooter/header";
import "./css/style.css";
import { Inter, Architects_Daughter } from "next/font/google";
import Footer from "@/components/UI/headerandfooter/footer";
import Banner from "@/components/UI/headerandfooter/topHeader";
import BannerTheme from "@/components/UI/banner";
import { ThemeProvider } from "@/components/contexts/ThemProvider";

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

export const metadata = {
  title: "techfix",
  description: "Techfix ",
};

function ThemedContent({ children }: { children: React.ReactNode }) {

  return (
    <div
      className={`${inter.variable} ${architects_daughter.variable} font-inter antialiased bg-white dark:bg-gray-900 text-black dark:text-gray-200 tracking-tight min-h-screen`}
    >
      {children}
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${architects_daughter.variable} font-inter antialiased tracking-tight`}
      >
        <Banner />
        <Header />
        <ThemeProvider>
          <ThemedContent>
            <div className="flex flex-col min-h-screen overflow-hidden">
              {children}
              <BannerTheme />
            </div>
          </ThemedContent>
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  );
}
