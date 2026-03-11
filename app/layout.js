import "./globals.css";
import ReduxProvider from "@/components/ReduxProvider";

export const metadata = {
  title: "ShipTrack — Shipment Tracker",
  description: "Real-time shipment tracking dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-[#080C14] text-[#C8D6E5]">
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
