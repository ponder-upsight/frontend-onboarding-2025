import ChakraLayoutProvider from "@/lib/theme";
import "./globals.css";
import AppHeader from "@/components/AppHeader";
import LayoutProvider from "@/lib/layout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ChakraLayoutProvider>
          <AppHeader />
          <LayoutProvider>{children}</LayoutProvider>
        </ChakraLayoutProvider>
      </body>
    </html>
  );
}
