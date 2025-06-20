import { NavLink } from "react-router-dom";

const Sidebar = () => (
  <aside className="w-64 bg-white text-gray-900 flex flex-col border-r border-gray-200">
    <nav className="flex-1 p-4">
      <ul>
        <li>
          <NavLink
            to="/users"
            className={({ isActive }) =>
              [
                "block w-full py-2.5 px-4 my-1 rounded-xl font-semibold transition-all duration-200 text-center",
                isActive
                  ? "bg-react text-white shadow"
                  : "text-gray-700 hover:bg-react hover:text-white hover:shadow"
              ].join(" ")
            }
          >
            <span className="inline-flex items-center gap-2 justify-center">
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