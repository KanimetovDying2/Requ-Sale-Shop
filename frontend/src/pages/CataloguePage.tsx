import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosApi from "../axiosApi";
import SidebarCategories from "../components/SidebarCategories";
import ItemCard from "../components/ItemCard";
import Spinner from "../components/Spinner";

interface Item {
  _id: string;
  title: string;
  price: number;
  image: string;
  category: {
    _id: string;
    name: string;
  };
}

const CataloguePage = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const url = categoryId ? `/items?category=${categoryId}` : "/items";
        const response = await axiosApi.get<Item[]>(url);
        setItems(response.data);
      } catch (e) {
        console.error("Failed to fetch items", e);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [categoryId]);

  return (
    <div className="flex gap-8 items-start">
      <SidebarCategories />

      <div className="flex-1">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {categoryId ? "Category Items" : "All Items"}
        </h2>

        {loading ? (
          <Spinner />
        ) : items.length === 0 ? (
          <div className="text-gray-500 text-center py-12 bg-white rounded-lg border border-gray-200">
            No items found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {items.map((item) => (
              <ItemCard
                key={item._id}
                id={item._id}
                title={item.title}
                price={item.price}
                image={item.image}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CataloguePage;
