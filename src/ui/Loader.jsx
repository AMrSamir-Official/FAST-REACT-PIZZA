function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      <div className="ml-4 text-xl font-semibold text-gray-900">Loading...</div>
    </div>
  );
}
export default Loader;
