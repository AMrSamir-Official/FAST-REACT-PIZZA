import { useRouteError } from 'react-router-dom';
import LinkButton from './LinkButton';

function Error() {
  const error = useRouteError();
  console.log(error);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Something went wrong 😢</h1>
      <p className="text-lg text-gray-700 mb-4">{error.data || error.message}</p>
      <LinkButton to="-1" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300">
        &larr; Go back
      </LinkButton>
    </div>
  );
}
export default Error;
