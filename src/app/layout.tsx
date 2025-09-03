import ChakraLayoutProvider from "@/lib/theme";
import "./globals.css";
import AppHeader from "@/components/Layout/AppHeader";
import LayoutProvider from "@/components/Layout/LayoutProvider";
import QueryProvider from "@/lib/react-query";
import Modals from "@/components/Layout/Modals";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ChakraLayoutProvider>
          <QueryProvider>
            <AppHeader />
            <LayoutProvider>{children}</LayoutProvider>
            <Modals />
          </QueryProvider>
        </ChakraLayoutProvider>
      </body>
    </html>
  );
}
