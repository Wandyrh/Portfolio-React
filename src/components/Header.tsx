import React from "react";
import { useNavigate } from "react-router-dom";
import reactLogo from "../assets/react.svg";
import { logout } from "../services/authService";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";

const Header = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-react text-white shadow p-4 flex items-center w-full justify-between">
      <div className="flex items-center">
        <span className="bg-white rounded-full p-1 shadow mr-3 flex items-center justify-center">
          <img src={reactLogo} alt="React Logo" className="h-7 w-7" />
        </span>
        <h1 className="text-4xl font-normal">Portfolio-React</h1>
      </div>
      <div className="flex items-center gap-4">
        <LanguageSelector />
        <div className="relative" ref={menuRef}>
        <button
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="User menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
            <path stroke="currentColor" strokeWidth="2" d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4" />
          </svg>
        </button>
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-36 bg-white text-gray-800 rounded-xl shadow-lg z-50 py-2 animate-fade-in">
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-xl transition"
              onClick={handleLogout}
            >
              {t("General.logout")}
            </button>
          </div>
        )}
    </div>
    </div>
  </header>
  );
};

export default Header;