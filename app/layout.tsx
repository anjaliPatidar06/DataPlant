import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dataplant",
  description: "Dataplant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <div className="sideContainer"></div>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
