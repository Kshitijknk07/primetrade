'use client';

interface BulkActionsProps {
  selectedCount: number;
  onStatusChange: (status: string) => void;
  onDelete: () => void;
  onClear: () => void;
}

export const BulkActions = ({
  selectedCount,
  onStatusChange,
  onDelete,
  onClear,
}: BulkActionsProps) => {
  if (selectedCount === 0) return null;

  return (
    <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-200 flex flex-wrap items-center gap-4">
      <span className="text-sm font-medium text-blue-900">
        {selectedCount} selected
      </span>

      <select
        onChange={(e) => {
          if (e.target.value) {
            onStatusChange(e.target.value);
            e.target.value = '';
          }
        }}
        className="px-3 py-1 text-sm border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Change Status...</option>
        <option value="pending">→ Pending</option>
        <option value="in_progress">→ In Progress</option>
        <option value="completed">→ Completed</option>
      </select>

      <button
        onClick={onDelete}
        className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition"
      >
        Delete Selected
      </button>

      <button
        onClick={onClear}
        className="ml-auto px-3 py-1 text-sm text-blue-700 hover:bg-blue-100 font-medium rounded transition"
      >
        Clear
      </button>
    </div>
  );
};
