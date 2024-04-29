import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ['100','200','300','400','500', '600', '700', '800','900'] });

export default function Layout({ children }) {
  return (
    <div style={{ minHeight: '100vh', minWidth: '100vh' }} className={poppins.className}>
      {children}
    </div>
  );
}
