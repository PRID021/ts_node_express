import { CarousePanel } from "@/components/custom/CarousePanel";
import NonDashBoardNavbar from "@/components/custom/NonDashBoardNavbar";

export default function Home() {
  return (
    <div className="w-screen min-h-screen flex flex-col">
      <NonDashBoardNavbar />
      <main className="w-screen flex justify-center items-center h-auto overflow-hidden max-w-7xl mx-auto">
        <CarousePanel />
      </main>
    </div>
  );
}
