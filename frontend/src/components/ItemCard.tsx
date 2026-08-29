import { Link } from "react-router-dom";

interface ItemCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
}

const ItemCard = ({ id, title, price, image }: ItemCardProps) => {
  return (
    <Link
      to={`/items/${id}`}
      className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition flex flex-col"
    >
      <div className="w-full h-48 bg-gray-100 overflow-hidden relative">
        <img
          src={`http://localhost:3000/${image}`}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 flex flex-col justify-between flex-1">
        <h4 className="font-semibold text-gray-800 text-base truncate mb-1">
          {title}
        </h4>
        <div className="text-blue-600 font-bold">{price} som</div>
      </div>
    </Link>
  );
};

export default ItemCard;
