"use client";

import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "@/store/slices/uiSlice";
import { useEffect } from "react";

export default function useTheme() {
  const theme = useSelector((state) => state.ui.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggle = () => dispatch(toggleTheme());

  return { theme, toggle };
}
