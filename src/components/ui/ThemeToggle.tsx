
import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative overflow-hidden rounded-full w-10 h-10 transition-all duration-300"
      aria-label="Toggle theme"
    >
      <Sun className={`h-5 w-5 transition-all ${theme === 'dark' ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`} />
      <Moon className={`absolute h-5 w-5 transition-all ${theme === 'light' ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`} />
    </Button>
  );
}
