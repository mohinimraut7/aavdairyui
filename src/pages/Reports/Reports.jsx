import { FileBarChart } from "lucide-react";

// SRS Phase 20 (Reports) has no backend model/controller yet - this is a
// placeholder so the route/nav link exists without breaking the app.
// Once a reportsController + routes are added (Animal/Milk/Feed/Medicine/
// Finance/Health reports with date/breed/category filters + PDF/Excel
// export), this page should be wired the same way the other pages are.
export default function Reports() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">📊 Reports</h2>
        <p className="text-sm text-gray-400">Farm-wide reports and exports</p>
      </div>

      <div className="bg-white rounded-[20px] shadow-xs p-12 text-center text-gray-400">
        <FileBarChart className="mx-auto mb-3" size={32} />
        <p className="font-medium text-gray-600 mb-1">Reports module coming soon</p>
        <p className="text-sm max-w-md mx-auto">
          Animal, Milk, Feed, Medicine, Finance and Health reports with filters and PDF/Excel export
          will appear here once the backend reporting endpoints are built.
        </p>
      </div>
    </div>
  );
}
