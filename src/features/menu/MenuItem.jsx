import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import DeleteItem from '../../ui/DeleteItem';
import UpdateQuaintity from '../../ui/UpdateQuaintity';
import { formatCurrency } from '../../utils/helpers';
import { addItem, getcart, increaseItemQuantity } from '../cart/cartSlice';

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const cart = useSelector(getcart);
  const alreadyInCart = cart.some((item) => item.pizzaId === id);

  function handelAdd() {
    if (alreadyInCart) {
      dispatch(increaseItemQuantity(id));
    } else {
      dispatch(
        addItem({
          pizzaId: id,
          unitPrice,
          name,
          quantity: 1,
          totalPrice: unitPrice,
        })
      );
    }
  }
  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />
      <div className="flex-grow">
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm capitalize italic text-gray-500">
            {ingredients.join(', ')}
          </p>
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-gray-500">
              Sold out
            </p>
          )}
        </div>
        <div className="mt-2 flex justify-end">
          {!soldOut && (
            <>
              {alreadyInCart && (
                <>
                  <DeleteItem id={id} />
                  <UpdateQuaintity id={id} />
                </>
              )}
              <Button onClick={handelAdd} type="small">
                Add to cart
              </Button>
            </>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
