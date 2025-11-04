import { BarChart3 } from "lucide-react";

const Reports = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 text-gray-700">
      <BarChart3 size={60} className="text-purple-700 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Reports Section</h1>
      <p className="text-lg font-medium text-gray-600">
        This feature is under development. Stay tuned for updates!
      </p>
    </div>
  );
};

export default Reports;
