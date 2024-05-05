import { Poppins } from "next/font/google";
import "./globals.css";
import DownerNav from "@/components/DownerNav";
const poppins = Poppins({ subsets: ["latin"], weight: ['100','200','300','400','500', '600', '700', '800','900'] });

export function Layout({ children }) {
  return (
    <div style={{ minHeight: '100vh'}} className={poppins.className}>
      {children}
      

    </div>
  );
}

export function CentralizedLayout({ children }) {
  return (
    <div className={`${poppins.className} min-h-screen flex items-center justify-center`}>
      {children}
    </div>
    
  );
}