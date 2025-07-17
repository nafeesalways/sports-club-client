import { useQuery } from '@tanstack/react-query';



import Loader from '../../../Loader/Loader';
import UseAxiosSecure from '../../../Hook/UseAxiosSecure';

const MemberAnnouncements = () => {
  const axiosSecure = UseAxiosSecure();

  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ['member-announcements'],
    queryFn: async () => {
      const res = await axiosSecure.get('/announcements/public');
      return res.data;
    }
  });

  if (isLoading) return <Loader />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📢 Club Announcements</h2>

      {announcements.length === 0 ? (
        <p>No announcements available.</p>
      ) : (
        <ul className="space-y-4">
          {announcements.map((a) => (
            <li key={a._id} className="bg-white p-4 rounded shadow border">
              <h3 className="text-xl font-semibold text-yellow-700">{a.title}</h3>
              <p className="text-gray-700 mt-2">{a.message}</p>
              <p className="text-sm text-gray-500 mt-1">
                Posted on: {new Date(a.date).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MemberAnnouncements;
