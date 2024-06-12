import { Link } from 'react-router-dom';

function EmptyCart() {
  return (
    <div className="mx-auto mt-8 max-w-lg rounded-lg bg-white p-6 shadow-md">
      <Link to="/menu" className="text-blue-500">
        &larr; Back to menu
      </Link>
      <p className="mt-4 text-lg text-gray-600">
        Your cart is still empty. Start adding some pizzas :)
      </p>
    </div>
  );
}

export default EmptyCart;
