import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../../hook/UseAxiosSecure';
import Loader from '../../../Loader/Loader';
import { FaBullhorn, FaCalendarAlt, FaInfoCircle } from 'react-icons/fa';
import { MdAnnouncement } from 'react-icons/md';

const Announcements = () => {
  const axiosSecure = UseAxiosSecure();
  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ['announcements'],
    queryFn: async () => {
      const res = await axiosSecure.get('/announcements');
      return res.data;
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-yellow-400 mb-2 flex items-center gap-3">
            <FaBullhorn className="text-2xl sm:text-3xl" />
            Club Announcements
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Stay updated with the latest news and important information
          </p>
        </div>

        {isLoading ? (
          <Loader />
        ) : announcements.length === 0 ? (
          <div className="bg-gradient-to-br from-gray-800 to-black rounded-2xl shadow-2xl border border-yellow-400/20 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-yellow-400/10 rounded-full flex items-center justify-center">
                <MdAnnouncement className="w-12 h-12 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No Announcements Yet</h3>
              <p className="text-gray-400">
                There are no announcements at the moment. Check back later for updates!
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {announcements.map((item) => (
              <div
                key={item._id}
                className="bg-gradient-to-br from-gray-800 to-black rounded-xl shadow-xl border border-yellow-400/20 overflow-hidden hover:border-yellow-400/40 transition-all duration-300 hover:shadow-2xl group"
              >
                {/* Announcement Header */}
                <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-400/5 px-6 py-4 border-b border-yellow-400/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-yellow-400/20 rounded-lg">
                        <FaBullhorn className="w-5 h-5 text-yellow-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                        {item.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <FaCalendarAlt className="w-3 h-3" />
                      {new Date(item.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                </div>

                {/* Announcement Body */}
                <div className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg flex-shrink-0 mt-1">
                      <FaInfoCircle className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-300 text-base leading-relaxed">
                        {item.message}
                      </p>
                    </div>
                  </div>

                  {/* Footer Metadata */}
                  <div className="mt-4 pt-4 border-t border-gray-700/50 flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Announcement ID: {item._id.slice(-8)}
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-400/10 border border-yellow-400/30 rounded-full text-yellow-400 text-xs font-semibold">
                      <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
                      Active
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcements;
