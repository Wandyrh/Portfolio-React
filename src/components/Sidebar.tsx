import { NavLink } from "react-router-dom";

const Sidebar = () => (
  <aside className="w-64 bg-white text-gray-900 flex flex-col border-r border-gray-200">
    <nav className="flex-1 p-4">
      <ul>        
        <li>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              [
                "block w-full py-2.5 px-4 my-1 rounded-xl font-semibold transition-all duration-200 text-left",
                isActive
                  ? "bg-react text-white shadow"
                  : "text-gray-700 hover:bg-react hover:text-white hover:shadow border border-react"
              ].join(" ")
            }
          >
            <span className="inline-flex items-center gap-2 justify-start">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="inline">
                <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                <rect x="7" y="3" width="10" height="4" rx="1" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
              Products
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/product-categories"
            className={({ isActive }) =>
              [
                "block w-full py-2.5 px-4 my-1 rounded-xl font-semibold transition-all duration-200 text-left",
                isActive
                  ? "bg-react text-white shadow"
                  : "text-gray-700 hover:bg-react hover:text-white hover:shadow border border-react"
              ].join(" ")
            }
          >
            <span className="inline-flex items-center gap-2 justify-start">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="inline">
                <path d="M3 7l7-4 7 4v6c0 3.3137-2.6863 6-6 6s-6-2.6863-6-6V7z" stroke="currentColor" strokeWidth="2" fill="none"/>
                <circle cx="10" cy="11" r="2.5" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
              Product Categories
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/users"
            className={({ isActive }) =>
              [
                "block w-full py-2.5 px-4 my-1 rounded-xl font-semibold transition-all duration-200 text-left",
                isActive
                  ? "bg-react text-white shadow"
                  : "text-gray-700 hover:bg-react hover:text-white hover:shadow border border-react"
              ].join(" ")
            }
          >
            <span className="inline-flex items-center gap-2 justify-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
              Users
            </span>
          </NavLink>
        </li>
      </ul>
    </nav>
  </aside>
);

export default Sidebar;