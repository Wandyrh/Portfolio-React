import reactLogo from "../assets/react.svg";

const Header = () => (
  <header className="bg-react text-white shadow p-4 flex items-center w-full">
    <span className="bg-white rounded-full p-1 shadow mr-3 flex items-center justify-center">
      <img src={reactLogo} alt="React Logo" className="h-7 w-7" />
    </span>
    <h1 className="text-4xl font-normal">Portfolio-React</h1>
  </header>
);

export default Header;