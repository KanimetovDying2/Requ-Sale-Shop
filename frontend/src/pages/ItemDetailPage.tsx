import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosApi from "../axiosApi";
import { useUserStore } from "../features/useUserStore";
import Spinner from "../components/Spinner";
import type { Item, ApiError } from "../types";

const ItemDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useUserStore();

  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        const response = await axiosApi.get<Item>(`/items/${id}`);
        setItem(response.data);
      } catch (e: unknown) {
        const err = e as ApiError;
        setError(err.response?.data?.error || "Failed to fetch item details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchItem();
    }
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      setDeleting(true);
      await axiosApi.delete(`/items/${id}`);
      navigate("/");
    } catch (e: unknown) {
      const err = e as ApiError;
      alert(err.response?.data?.error || "Failed to delete item.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <Spinner />;

  if (error || !item) {
    return (
      <div className="max-w-2xl mx-auto mt-8 bg-red-50 border border-red-200 text-red-600 p-6 rounded-lg text-center">
        {error || "Item not found."}
      </div>
    );
  }

  const isOwner = user && item.user && user._id === item.user._id;

  return (
    <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-lg p-6 shadow-sm mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="w-full h-80 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
          <img
            src={`http://localhost:3000/${item.image}`}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <span className="inline-block bg-blue-50 text-blue-600 text-xs font-semibold px-2.5 py-1 rounded-md mb-2">
              {item.category?.name || "Category"}
            </span>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {item.title}
            </h2>
            <div className="text-2xl font-bold text-blue-600 mb-4">
              {item.price} som
            </div>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              {item.description}
            </p>
          </div>

          <div className="border-t border-gray-200 pt-4 mt-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">
              Seller Information
            </h3>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Name:</span>{" "}
              {item.user?.displayName || "Unknown"}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Phone:</span>{" "}
              {item.user?.phoneNumber || "N/A"}
            </p>

            {isOwner && (
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="mt-6 w-full bg-red-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition disabled:opacity-50 flex justify-center items-center"
              >
                {deleting ? "Deleting..." : "Delete item (Sold)"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailPage;
