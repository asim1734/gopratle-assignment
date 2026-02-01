import { Playfair_Display, Lato } from "next/font/google"; // Import fonts
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import Navbar from "@/components/Navbar";

// Configure fonts
const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: '--font-playfair' // Custom CSS variable
});

const lato = Lato({ 
  weight: ['400', '700'],
  subsets: ["latin"],
  variable: '--font-lato'
});

export const metadata = {
  title: "GoPratle | Exclusive Events",
  description: "Curated event staffing.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${lato.variable} bg-stone-50 text-gray-900`}>
        <Navbar />
        <main className="min-h-[calc(100vh-80px)] font-sans">
           {children}
        </main>
        <Toaster 
            position="top-center" 
            toastOptions={{
                className: '!rounded-none !border !border-black !bg-white !text-black !shadow-none',
            }}
        />
      </body>
    </html>
  );
}