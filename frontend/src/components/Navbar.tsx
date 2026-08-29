import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../features/useUserStore";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-blue-600">
          RequStore Market
        </Link>

        <nav className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-gray-700 font-medium">
                Hello, {user.displayName}!
              </span>
              <Link
                to="/items/new"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
              >
                Add new item
              </Link>
              <button
                onClick={handleLogout}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/register"
                className="text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
              >
                Login
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
