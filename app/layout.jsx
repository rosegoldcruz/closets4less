import "./globals.css";

export const metadata = {
  title: "Closets4Less | Custom Closets in Maricopa County",
  description:
    "Custom built-in closets designed for your life — installed with precision, priced without compromise. Serving all of Maricopa County.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
