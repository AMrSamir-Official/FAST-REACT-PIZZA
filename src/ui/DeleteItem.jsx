import { useDispatch } from 'react-redux';
import { delItem } from '../features/cart/cartSlice';

function DeleteItem({ id }) {
  const dispatch = useDispatch();
  // const cart = useSelector(getcart);

  function handelDel() {
    // const item = cart.find((state) => state.pizzaId === id);
    // if (item.quantity > 1) {
    //   dispatch(decreaseItemQuantity(id));
    // } else {
    dispatch(delItem(id));
    // }
  }

  return (
    <button
      onClick={handelDel}
      className="focus:shadow-outline mr-2 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600 focus:outline-none"
    >
      Delete
    </button>
  );
}

export default DeleteItem;
