import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-[#fcfcfe]">
      <h1 className="text-9xl font-extrabold text-tColor tracking-widest">
        404
      </h1>
      <div className="px-2 text-sm rounded font-bold text-red-500">
        Page Not Found
      </div>
      <Link
        to="/"
        className="mt-5 bg-blue-500 text-gray-100 px-4 py-2 rounded-md text-xs bg-gradient-to-r hover:from-blue-500 hover:to-secondary"
      >
        Back to homepage
      </Link>
    </main>
  );
};

export default ErrorPage;
