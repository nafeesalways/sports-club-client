import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../../hook/UseAxiosSecure';
import Loader from '../../../Loader/Loader';




const Announcements = () => {
    const axiosSecure = UseAxiosSecure();
  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ['announcements'],
    queryFn:  async () => {
  const res = await axiosSecure.get('/announcements');
  return res.data;
},
  });

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Club Announcements</h2>

      {isLoading ? (
        <Loader></Loader>
      ) : announcements.length === 0 ? (
        <p>No announcements available.</p>
      ) : (
        <ul className="space-y-3">
          {announcements.map(item => (
            <li key={item._id} className="bg-blue-100 p-3 rounded shadow">
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm text-gray-700">{item.message}</p>
              <p className="text-xs text-gray-500">
                Date: {new Date(item.date).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Announcements;
