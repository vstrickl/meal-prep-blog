import { MenuNav } from "@/components/navs/menu-nav"

export default function TestComponentPage() {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-16">
          <header className="flex flex-col items-center gap-9">
            <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
              Test Component
            </h1>
          </header>
          <div className="min-h-screen p-8">
            <MenuNav />
          </div>
        </div>
      </div>
    );
  }