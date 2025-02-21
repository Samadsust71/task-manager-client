import { useEffect, useState } from "react";
import { MdOutlineWbSunny } from "react-icons/md";
import { IoMoonOutline } from "react-icons/io5";


const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark"); // Apply dark mode
    } else {
      document.documentElement.classList.remove("dark"); // Remove dark mode
    }
    localStorage.setItem("theme", theme); // Save theme preference
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="p-2 rounded-full"
    >
      {theme === "light" ? <IoMoonOutline className="text-xl" /> : <MdOutlineWbSunny className="text-xl" />}
    </button>
  );
};

export default ThemeToggle;
