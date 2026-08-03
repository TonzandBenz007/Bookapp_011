export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-white/50 p-10 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
        <svg
          className="h-6 w-6 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </span>
      <p className="mt-4 font-medium text-gray-700">ยังไม่มีรายการ</p>
      <p className="mt-1 text-sm text-gray-400">เริ่มเพิ่มงานแรกของคุณด้านบนได้เลย</p>
    </div>
  );
}
