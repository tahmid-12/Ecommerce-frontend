import { gumelaArabic } from "@/assets/fonts";
import { Footer, MobileFooter, Navbar } from "@/components";
import { LoadingSpinner } from "@/components/ui/loading";
import { ToastProvider } from "@/layouts/Toaster";
import ReduxWrapper from "@/redux/provider";
import { Suspense } from "react";
import "./globals.css";
import { AuthProvider } from "@/auth";

export const metadata = {
  title: "Darkak Mart",
  description: "Leading Ecommerce of Bangladesh",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={gumelaArabic.className}>
        <ReduxWrapper>
          <AuthProvider>
            <ToastProvider>
              <div className="grid grid-rows-[auto_1fr_auto] min-h-[100dvh]">
                <Navbar />
                <div className="container">{children}</div>
                <Footer />
                <MobileFooter />
              </div>
            </ToastProvider>
          </AuthProvider>
        </ReduxWrapper>
      </body>
    </html>
  );
}
