import ChakraLayoutProvider from "@/lib/theme";
import "./globals.css";
import AppHeader from "@/components/AppHeader";
import LayoutProvider from "@/lib/layout";
import QueryProvider from "@/lib/react-query";

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
          </QueryProvider>
        </ChakraLayoutProvider>
      </body>
    </html>
  );
}
