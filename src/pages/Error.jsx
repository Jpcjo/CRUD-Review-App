import { useRouteError, Link } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  //   console.log(error);

  if (error.status === 404)
    return (
      <main className="grid min-h-[100vh] place-items-center px-8 ">
        <div className="text-center">
          <p className="text-8xl font-semibold text-gray-500">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-lg leading-7 text-gray-500">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 ">
            <Link to="/" className="btn ">
              Go back home
            </Link>
          </div>
        </div>
      </main>
    );

  return (
    <main className="grid min-h-[100vh] place-items-center px-8 ">
      {/* [100vh] is daisy UI */}
      <h4 className="text-center font-bold text-4xl">
        Oops! There was an error...{" "}
      </h4>
    </main>
  );
};
export default Error;
