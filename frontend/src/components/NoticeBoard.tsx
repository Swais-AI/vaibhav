export default function NoticeBoard({ notices }: { notices: any[] }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-2">
        <div className="flex items-center gap-2">
          <span className="text-orange-500 text-xl">📢</span>
          <h2 className="text-lg font-bold text-gray-800">Notice Board</h2>
        </div>
        <button className="text-sm text-orange-600 hover:text-orange-700 font-medium">View All</button>
      </div>

      {!notices || notices.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500 italic">No notices available</p>
        </div>
      ) : (
        <div className="space-y-4 flex-1">
          {notices.map((notice, idx) => {
            let formattedDate = notice.date;
            try {
               if (notice.date) {
                   formattedDate = new Date(notice.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
               }
            } catch(e) {}

            return (
              <div key={idx} className="p-4 bg-orange-50/50 rounded-xl border border-orange-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-1 gap-4">
                  <h3 className="font-bold text-gray-800 text-sm">{notice.title}</h3>
                  <span className="text-[10px] font-semibold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full whitespace-nowrap">{formattedDate}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2 leading-relaxed">{notice.content}</p>
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-orange-200/50">
                  <div className="w-5 h-5 rounded-full bg-orange-200 flex items-center justify-center text-orange-700 font-bold text-[10px]">
                    {notice.posted_by_name?.charAt(0) || 'A'}
                  </div>
                  <p className="text-xs text-gray-500 font-medium">{notice.posted_by_name}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
