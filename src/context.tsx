import React, { createContext, useContext, useState } from 'react';

type ThemeContextType = {
  isNight: boolean;
  setIsNight: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ThemeContext = createContext<ThemeContextType>({
  isNight: false,
  setIsNight: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isNight, setIsNight] = useState(false);
  return (
    <ThemeContext.Provider value={{ isNight, setIsNight }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
