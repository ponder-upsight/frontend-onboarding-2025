import ChakraLayoutProvider from "@/lib/theme";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ChakraLayoutProvider>{children}</ChakraLayoutProvider>
    </html>
  );
}
