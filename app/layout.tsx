import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "../components/Header"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "API Proyect",
  description: "Consumo de APIS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header/>
        <main className="p-10 container mx-auto">
          {children}
        </main>
        
        <footer className="text-gray-400 text-center text-xs py-5">
          <div>Copyright &copy;{new Date().getFullYear()} - Todos los derechos Reservados </div>
        </footer>
      </body>
    </html>
  );
}