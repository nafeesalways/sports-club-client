import { useQuery } from '@tanstack/react-query';
import Loader from '../../../Loader/Loader';
import useAxiosSecure from '../../../hook/UseAxiosSecure';
import { FaBullhorn, FaCalendarAlt, FaInfoCircle } from 'react-icons/fa';
import { MdAnnouncement } from 'react-icons/md';

const MemberAnnouncements = () => {
  const axiosSecure = useAxiosSecure();

  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ['member-announcements'],
    queryFn: async () => {
      const res = await axiosSecure.get('/announcements/public');
      return res.data;
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-yellow-400 mb-2 flex items-center gap-2 sm:gap-3">
            <FaBullhorn className="text-xl sm:text-2xl lg:text-3xl flex-shrink-0" />
            <span>Club Announcements</span>
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm lg:text-base">
            Stay updated with the latest news and updates from the club
          </p>
        </div>

        {announcements.length === 0 ? (
          <div className="bg-gradient-to-br from-gray-800 to-black rounded-xl sm:rounded-2xl shadow-2xl border border-yellow-400/20 p-8 sm:p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-yellow-400/10 rounded-full flex items-center justify-center">
                <MdAnnouncement className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">No Announcements</h3>
              <p className="text-gray-400 text-sm sm:text-base">
                There are no announcements at the moment. Check back later for updates!
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {announcements.map((a, index) => (
              <div
                key={a._id}
                className="bg-gradient-to-br from-gray-800 to-black rounded-xl sm:rounded-2xl shadow-xl border border-yellow-400/20 overflow-hidden hover:border-yellow-400/40 transition-all duration-300 group"
              >
                {/* Announcement Header */}
                <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-400/5 px-4 sm:px-6 py-3 sm:py-4 border-b border-yellow-400/20">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                      <div className="p-1.5 sm:p-2 bg-yellow-400/20 rounded-lg flex-shrink-0">
                        <FaBullhorn className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-yellow-400 transition-colors line-clamp-2 sm:line-clamp-1">
                        {a.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400 pl-8 sm:pl-0 flex-shrink-0">
                      <FaCalendarAlt className="w-3 h-3 flex-shrink-0" />
                      <span className="whitespace-nowrap">
                        {new Date(a.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Announcement Body */}
                <div className="p-4 sm:p-6">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 bg-blue-500/10 rounded-lg flex-shrink-0 mt-0.5">
                      <FaInfoCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-300 text-sm sm:text-base leading-relaxed whitespace-pre-wrap break-words">
                        {a.message}
                      </p>
                    </div>
                  </div>

                  {/* Announcement Number */}
                  <div className="mt-4 pt-4 border-t border-gray-700/50">
                    <p className="text-xs text-gray-500">
                      Announcement #{announcements.length - index}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Info Box */}
        {announcements.length > 0 && (
          <div className="mt-6 sm:mt-8 bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 sm:p-6">
            <div className="flex items-start gap-3">
              <FaInfoCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-blue-400 font-semibold mb-1 text-sm sm:text-base">Important Notice</p>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                  Make sure to check announcements regularly for important updates about court schedules, 
                  maintenance, special events, and club policies.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberAnnouncements;
