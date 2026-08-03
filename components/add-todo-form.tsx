export default function AddTodoForm() {
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm">
      <form className="flex gap-2">
        <input
          type="text"
          placeholder="เพิ่มรายการใหม่..."
          className="flex-1 rounded-lg border border-gray-200 px-4 py-2 text-gray-700 placeholder-gray-400 outline-none focus:border-blue-500"
        />
        <button
          type="button"
          className="rounded-lg bg-blue-500 px-5 py-2 font-medium text-white hover:bg-blue-600"
        >
          เพิ่ม
        </button>
      </form>
      <p className="mt-2 text-sm text-gray-400">กด Enter เพื่อเพิ่มรายการอย่างรวดเร็ว</p>
    </div>
  );
}
