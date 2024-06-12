import { useDispatch, useSelector } from 'react-redux';
import {
  decreaseItemQuantity,
  getcart,
  increaseItemQuantity,
} from '../features/cart/cartSlice';

function UpdateQuaintity({ id }) {
  const cart = useSelector(getcart);
  const dispach = useDispatch();
  const item = cart.find((state) => state.pizzaId === id);
  const quantity = item.quantity;
  function handleMinus() {
    console.log('minus', id);
    dispach(decreaseItemQuantity(id));
  }
  function handlePlus() {
    dispach(increaseItemQuantity(id));
  }

  return (
    <div className="flex items-center">
      <button
        className="rounded-l bg-blue-500 px-3 py-1 text-white"
        onClick={handleMinus}
      >
        -
      </button>
      <span className="select-none px-3">{quantity}</span>
      <button
        className="mr-12 rounded-r bg-blue-500 px-3 py-1 text-white"
        onClick={handlePlus}
      >
        +
      </button>
    </div>
  );
}
export default UpdateQuaintity;
