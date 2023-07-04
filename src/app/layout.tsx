import ThemeProvider from "@/providers/ThemeProvider";
import "./globals.css";
import { StrictMode } from "react";

export const metadata = {
  title: "Mars Rovers App",
  description: "An app made to complete a challenge using the open NASA API",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StrictMode>
      <ThemeProvider>
        <html lang="en">
          <body>{children}</body>
        </html>
      </ThemeProvider>
    </StrictMode>
  );
}
