import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-600 text-white p-6 sticky top-0 h-screen overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">ManifestMe</h1>
        </div>
        <nav>
          <ul className="space-y-4">
            <li><Link href="/coach" className="block py-2 px-4 hover:bg-indigo-700 rounded">My Coach</Link></li>
            <li><Link href="/goals" className="block py-2 px-4 hover:bg-indigo-700 rounded">My Goals</Link></li>
            <li><Link href="/vision-board" className="block py-2 px-4 hover:bg-indigo-700 rounded">Vision Board</Link></li>
            <li><Link href="/community" className="block py-2 px-4 hover:bg-indigo-700 rounded">Connect with Other Manifesters</Link></li>
            <li><Link href="/settings" className="block py-2 px-4 hover:bg-indigo-700 rounded">Settings</Link></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div> {/* Placeholder for logo */}
          <h2 className="text-xl font-semibold">Ready to manifest today?</h2>
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div> {/* Placeholder for profile icon */}
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Daily Affirmation */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-semibold mb-2">Daily Affirmation</h3>
            <p className="text-gray-600 italic">"Believe you can and you're halfway there." - Theodore Roosevelt</p>
          </div>

          {/* AI Chat Quick Access */}
          <div className="mb-6">
            <Link href="/coach" className="bg-indigo-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition duration-300 inline-block">
              Chat with My Coach
            </Link>
          </div>

          {/* Goal Progress Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Goal Progress Summary</h3>
            <div className="space-y-4">
              <GoalProgressBar title="Career Advancement" progress={75} />
              <GoalProgressBar title="Health Improvement" progress={50} />
              <GoalProgressBar title="Financial Stability" progress={30} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

interface GoalProgressBarProps {
  title: string;
  progress: number;
}

function GoalProgressBar({ title, progress }: GoalProgressBarProps) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium text-indigo-700">{title}</span>
        <span className="text-sm font-medium text-indigo-700">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}
