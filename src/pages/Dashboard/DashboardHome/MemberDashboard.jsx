import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

import { use } from "react";


import UseAxiosSecure from "../../../hook/UseAxiosSecure";
import { AuthContext } from "../../../contexts/AuthContext";
import Loader from "../../../Loader/Loader";

const COLORS = ['#F97316', '#10B981', '#3B82F6', '#F43F5E'];

const MemberDashboard = () => {
  const { user } = use(AuthContext);
  const axiosSecure = UseAxiosSecure();

  const { data = [], isLoading } = useQuery({
    queryKey: ['member-status-count', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/member/bookings/status-count?email=${user.email}`);
      return res.data;
    }
  });

  if (isLoading) return <Loader />;

  return (
    <div className="p-6 bg-white rounded-xl shadow w-full">
      <h2 className="text-xl font-bold mb-4"> Booking Status of Member</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="status"
            outerRadius={100}
            label={(entry) => `${entry.status}: ${entry.count}`}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MemberDashboard;
