import NonDashBoardNavbar from "@/components/custom/NonDashBoardNavbar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gradient-start via-gradient-middle to-gradient-end flex flex-col">
      <div className="w-full pb-4">
        <NonDashBoardNavbar />
      </div>

      <main className="w-full p-6 flex items-center justify-center flex-grow">
        {children}
      </main>
    </div>
  );
}

export default Layout;
