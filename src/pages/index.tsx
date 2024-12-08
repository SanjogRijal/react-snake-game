import GameComponent from "@/components/GameComponent";
import { useDeviceType } from "@/hooks/useDeviceType";
import localFont from "next/font/local";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  const isMobile = useDeviceType();
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable}
          grid grid-rows-[1fr_auto_57vh] items-center justify-items-center min-h-[100vh] p-8 pb-16 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-cover bg-center ${
            isMobile && "w-[685px]"
          }`}
    >
      <main className="flex flex-col items-center justify-center gap-8 row-start-1 text-center sm:text-left">
        <h1 className="text-3xl sm:text-5xl font-semibold leading-tight tracking-wide">
          Snake Game
        </h1>
        <p className="text-base sm:text-lg text-opacity-80">
          Press the arrow keys to control the snake. <br />
          <span className="font-bold">Rule:</span> Do not collide with the walls
          or overlap the snake.
        </p>
        <div className="w-full sm:w-[600px]">
          <GameComponent />
        </div>
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-sm sm:text-base">
        <p>Designed and built with ❤️ by Sanjog Rijal</p>
      </footer>
    </div>
  );
}
