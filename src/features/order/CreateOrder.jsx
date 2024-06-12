import { useDispatch, useSelector } from 'react-redux';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { getcart } from '../cart/cartSlice';
import { fetchAddress } from '../user/userSlice';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const {
    username,
    status: addressStatus,
    address,
    position,
    error: errorAdress,
  } = useSelector((state) => state.user);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const dispach = useDispatch();
  const formErrors = useActionData();
  const idLoadingAdress = addressStatus == 'Loading';
  // const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getcart);

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            placeholder={`${username}...`}
            className="input grow"
            type="text"
            name="customer"
            required
          />
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5  flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              defaultValue={address}
              disabled={idLoadingAdress}
              required
            />
          </div>
          {!position.longitude && !position.latitude && (
            <span className="z-2 absolute right-[3px] top-[3px]">
              <Button
                disabled={idLoadingAdress}
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispach(fetchAddress());
                }}
              >
                Get location
              </Button>
            </span>
          )}
        </div>

        {addressStatus == 'error' && (
          <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
            {errorAdress}
          </p>
        )}

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? ` ${position.latitude},${position.longitude}`
                : ''
            }
          />
          <Button disabled={isSubmitting} type="primary">
            {isSubmitting || idLoadingAdress
              ? 'Placing order....'
              : 'Order now'}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'on',
  };

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      'Please give us your correct phone number. We might need it to contact you.';

  if (Object.keys(errors).length > 0) return errors;

  // If everything is okay, create new order and redirect

  const newOrder = await createOrder(order);

  return redirect(`/order/${newOrder.id}`);

  return null;
}

export default CreateOrder;
