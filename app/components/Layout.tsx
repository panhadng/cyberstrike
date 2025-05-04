import Logo from "./Logo";
import Background from "./Background";

interface LayoutProps {
  children: React.ReactNode;
  showTopLeftLogo?: boolean;
}

export default function Layout({
  children,
  showTopLeftLogo = false,
}: LayoutProps) {
  return (
    <div className="h-screen flex flex-col bg-[#0a0a0a] relative overflow-hidden">
      <Background />
      {/* Navigation */}
      {showTopLeftLogo && (
        <nav className="absolute z-20 top-0 left-0 p-6">
          <Logo size="sm" />
        </nav>
      )}
      {/* Main content */}
      <main className="relative z-10 flex-1 flex items-center justify-center overflow-hidden">
        <div className="h-full w-full flex items-center justify-center">
          {children}
        </div>
      </main>
    </div>
  );
}
