import { Suspense } from "react";
import MerchClient from "./MerchClient";

export const metadata = {
  title: "Merchandise | Sahithyotsav 2k26",
  description: "Get your official Sahithyotsav 2k26 merchandise. Limited edition mugs available now.",
};

export default function MerchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#1a0040] flex items-center justify-center text-white">Loading...</div>}>
      <MerchClient />
    </Suspense>
  );
}
