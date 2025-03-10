import { Link, NavLink, Outlet } from 'react-router-dom';

export function AppLayout() {
  return (
    <>
      <header>
        <nav className="container flex justify-between p-4 mx-auto lg:w-screen-lg">
          <img src="/src/logo.png" alt="React Query Example" width="200" />
          <div className="flex space-x-4">
            <div>
              <NavLink
                className="bg-teal-800 mx-1 px-4 py-2 text-gray-100 font-semibold rounded-md"
                to="/"
              >
                Basic
              </NavLink>
              <NavLink
                className="bg-teal-800 mx-1 px-4 py-2 text-gray-100 font-semibold rounded-md"
                to="/paginated"
              >
                Paginated
              </NavLink>
              <NavLink
                className="bg-teal-800 mx-1 px-4 py-2 text-gray-100 font-semibold rounded-md"
                to="/infinite"
              >
                Infinite
              </NavLink>
            </div>
          </div>
        </nav>
      </header>

      <Outlet />
    </>
  );
}
