import { use, useState } from "react";

import { useMutation } from "@tanstack/react-query";
import UseAxiosSecure from "../../../hook/UseAxiosSecure";
import { AuthContext } from "../../../contexts/AuthContext";

const MakeAdmin = () => {
  const { user } = use(AuthContext);
  const [searchEmail, setSearchEmail] = useState("");
  const [message, setMessage] = useState("");
  const [searchedUsers,setSearchedUsers] = useState([]);

  const [loading, setLoading] = useState(false);
  const axiosSecure = UseAxiosSecure();

  const handleSearch = async () => {
    setLoading(true);
    setMessage("");
   

    try {
      const res = await axiosSecure.get(`/users/search?email=${searchEmail}`);
      console.log(res.data)
      setSearchedUsers(res.data)
      searchEmail()
      // setUser(res.data);
    } finally {
      setLoading(false);
    }
  };

  // Mutation to toggle role
  const toggleRoleMutation = useMutation({
    mutationFn: async ({ role }) => {
      const res = await axiosSecure.patch(`/users/role/${user.email}`, {
        role,
      });
      return res.data;
    },
    onSuccess: ( variables) => {
      setMessage(`Role changed to ${variables.role}`);
  
      handleSearch();
    },
  
    
  });

  const handleRoleChange = (newRole,email) => {
    if (user) {
      toggleRoleMutation.mutate({ email: email, role: newRole });
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Admins</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          placeholder="Enter user email"
          className="border p-2 flex-grow rounded"
        />
        <button
          onClick={handleSearch}
          className="bg-yellow-600 text-white px-4 rounded hover:bg-yellow-700"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {message && <p className="text-green-600">{message}</p>}

     {
      searchedUsers &&
      searchedUsers.map(user=> <div key={user?._id} className="mt-4 border rounded p-4 shadow bg-white">
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
          <p>
            <strong>Joined:</strong>{" "}
            {new Date(user.created_at).toLocaleDateString()}
          </p>

          <div className="mt-4 flex gap-2">
            {user.role !== "admin" && (
              <button
                onClick={() => handleRoleChange("admin",user?.email)}
                className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700"
                disabled={toggleRoleMutation.isPending}
              >
                {toggleRoleMutation.isPending ? "Processing..." : "Make Admin"}
              </button>
            )}
            {user.role === "admin" && (
              <button
                onClick={() => handleRoleChange("user",user?.email)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                disabled={toggleRoleMutation.isPending}
              >
                {toggleRoleMutation.isPending
                  ? "Processing..."
                  : "Remove Admin"}
              </button>
            )}
          </div>
        </div>)
     }
    </div>
  );
};

export default MakeAdmin;
