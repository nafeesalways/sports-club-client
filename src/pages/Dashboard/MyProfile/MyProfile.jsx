import { use } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';


const MyProfile = () => {
  const { user } = use(AuthContext); // assuming you're using context
  const registrationDate = new Date(user?.metadata?.creationTime).toLocaleDateString();

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold text-yellow-400">My Profile</h2>
      <div className="bg-white rounded-lg shadow p-4 max-w-md space-y-2">
        <img src={user?.photoURL} alt="Profile" className="w-24 h-24 rounded-full object-cover text-yellow-600" />
        <p><strong className='text-yellow-600'>Name:</strong> <span className='text-yellow-600'>{user?.displayName}</span></p>
        <p><strong className='text-yellow-600'>Email:</strong> <span className='text-yellow-700'>{user?.email}</span></p>
        <p><strong className='text-yellow-600'>Registration Date:</strong> <span className='text-yellow-700'>{registrationDate}</span></p>
      </div>
    </div>
  );
};

export default MyProfile;
