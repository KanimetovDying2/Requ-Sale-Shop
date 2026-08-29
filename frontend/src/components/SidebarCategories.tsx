import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosApi from "../axiosApi";

interface Category {
  _id: string;
  name: string;
}

const SidebarCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axiosApi.get<Category[]>("/categories");
        setCategories(response.data);
      } catch (e) {
        console.error("Failed to fetch categories", e);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <aside className="w-64 bg-white border border-gray-200 rounded-lg p-4 shadow-sm h-fit">
      <h3 className="font-semibold text-gray-800 mb-3 text-lg">Categories</h3>
      <ul className="space-y-1">
        <li>
          <Link
            to="/"
            className={`block px-3 py-2 rounded-md text-sm font-medium transition ${
              !categoryId
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            All items
          </Link>
        </li>
        {loading && (
          <div className="text-sm text-gray-400 px-3 py-1">Loading...</div>
        )}
        {categories.map((cat) => (
          <li key={cat._id}>
            <Link
              to={`/categories/${cat._id}`}
              className={`block px-3 py-2 rounded-md text-sm font-medium transition ${
                categoryId === cat._id
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {cat.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SidebarCategories;
