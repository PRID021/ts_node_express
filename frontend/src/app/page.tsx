import ArchivePanel from "@/components/custom/ArchivePanel";
import { CarouseFeaturingPanel } from "@/components/custom/CarouseFeaturingPanel";
import CategoryModule from "@/components/custom/CategoryModule";
import NonDashBoardNavbar from "@/components/custom/NonDashBoardNavbar";

export default function Home() {
  return (
    <div className="w-screen min-h-screen flex flex-col">
      <NonDashBoardNavbar />
      <main className="w-screen flex  flex-col justify-center items-center h-auto overflow-hidden max-w-7xl mx-auto">
        <CarouseFeaturingPanel />
        <CategoryModule />
        <ArchivePanel />
      </main>
    </div>
  );
}
