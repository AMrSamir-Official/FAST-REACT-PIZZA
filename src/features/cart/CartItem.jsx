import { useDispatch } from 'react-redux';
import DeleteItem from '../../ui/DeleteItem';
import UpdateQuaintity from '../../ui/UpdateQuaintity';
import { formatCurrency } from '../../utils/helpers';
import { decreaseItemQuantity, delItem } from './cartSlice';
function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const dispach = useDispatch();
  function handelDel() {
    const moreThanOne = quantity > 1;
    console.log('moreThanOne', moreThanOne);
    if (moreThanOne) {
      dispach(decreaseItemQuantity(pizzaId));
    } else {
      dispach(delItem(pizzaId));
    }
  }

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateQuaintity id={pizzaId} />
        <DeleteItem id={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
