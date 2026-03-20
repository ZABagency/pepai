import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./NavBar";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});


export const metadata: Metadata = {
  title: "Pep AI — Find Your Protocol",
  description: "Answer 5 questions and get a personalized peptide protocol. Pep AI matches you with the best peptides for your goals and where to get them safely.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="app-shell">

          <NavBar />

          {children}

        </div>
      </body>
    </html>
  );
}
