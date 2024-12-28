import ThemeToggle from "@/components/custom/ThemeToggle";

export default function Home() {
  return (
    <div className="min-w-screen min-h-screen">
      <h1 className="text-red-500 text-5xl">Hello world</h1>
      <ThemeToggle />
    </div>
  );
}
