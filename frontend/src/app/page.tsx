import { CarouseFeaturingPanel } from "@/components/custom/CarouseFeaturingPanel";
import CategoryModule from "@/components/custom/CategoryModule";
import CourseTarget from "@/components/custom/CourseTarget";
import Footer from "@/components/custom/Footer";
import NonDashBoardNavbar from "@/components/custom/NonDashBoardNavbar";
import TopTrend from "@/components/custom/TopTrend";
import UserArchivesPanel from "@/components/custom/UserArchivesPanel";

export default function Home() {
  return (
    <div className="w-screen min-h-screen flex flex-col bg-background  ">
      <NonDashBoardNavbar />
      <main className="w-screen flex  flex-col justify-center items-center h-auto overflow-hidden max-w-7xl mx-auto px-4">
        <CarouseFeaturingPanel />
        <CategoryModule />
        <CourseTarget />
        <UserArchivesPanel />
        <TopTrend />
      </main>
      <Footer />
    </div>
  );
}
