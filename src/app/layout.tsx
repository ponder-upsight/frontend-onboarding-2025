import ChakraLayoutProvider from "@/lib/theme";
import "./globals.css";
import AppHeader from "@/components/AppHeader";

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
          {children}
        </ChakraLayoutProvider>
      </body>
    </html>
  );
}
