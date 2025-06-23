import { useContext } from "react";
import { ThemeContext } from "../context/theme";

const useTheme = () => useContext(ThemeContext) || { setTheme: () => { }, theme: 'light' };

export { useTheme };