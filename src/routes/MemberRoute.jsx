import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';


import { useQuery } from '@tanstack/react-query';
import Loader from '../Loader/Loader';
import UseAxiosSecure from '../hook/UseAxiosSecure';

const MemberRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const axiosSecure = UseAxiosSecure();

  // If auth state is loading
  if (loading) return <Loader />;

  // If not logged in, redirect to login
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  // Fetch user role securely
  const { data: role, isLoading } = useQuery({
    queryKey: ['userRole', user.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data?.role;
    }
  });

  // Show loader while role is loading
  if (isLoading) return <Loader />;

  // If role is member → grant access
  if (role === 'member') return children;

  // Else redirect to unauthorized or home
  return <Navigate to="/" replace />;
};

export default MemberRoute;
