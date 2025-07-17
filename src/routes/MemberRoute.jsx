import { use, } from 'react';
import { Navigate} from 'react-router';
import { AuthContext } from '../contexts/AuthContext';
import Loader from '../Loader/Loader';

import UseUserRole from '../Hook/UseUserRole';


const MemberRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
   const { role, roleLoading } = UseUserRole();
   if (loading || roleLoading) {
     return <Loader></Loader>;
   }
 
   if (!user || role !== "member") {
     return (
       <Navigate state={{ from: location.pathname }} to="/forbidden"></Navigate>
     );
   }
   return children;
}

export default MemberRoute;
