import { use} from 'react';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../../Loader/Loader';
import { AuthContext } from '../../../contexts/AuthContext';
import UseAxiosSecure from '../../../hook/UseAxiosSecure';

const MemberProfile = () => {
  const { user } = use(AuthContext);
  const axiosSecure = UseAxiosSecure();

  // Fetch earliest approved booking to get membership date
  const { data: memberSince, isLoading } = useQuery({
    queryKey: ['memberSince', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/member/first-approved-booking?email=${user.email}`);
      return res.data?.date || null;
    }
  });

  if (isLoading) return <Loader />;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>

      <div className="bg-white rounded-lg shadow p-6 flex items-center gap-6">
        <img
          src={user?.photoURL}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border"
        />
        <div className="space-y-2">
          <p><strong>Name:</strong> {user?.displayName}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Member Since:</strong> {memberSince ? new Date(memberSince).toLocaleDateString() : 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default MemberProfile;