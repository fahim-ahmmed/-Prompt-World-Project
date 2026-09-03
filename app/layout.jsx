import "@/app/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "PromptWorld — Premium AI Prompt Marketplace",
  description: "Discover and buy production-ready AI prompts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="flex min-h-screen flex-col bg-[#07090e] text-paper antialiased">
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#0d111a",
              color: "#fff",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "16px",
              fontSize: "12px",
              fontWeight: "600",
            },
          }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}