import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Palette, Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/hooks/useTheme";

const Navigation = () => {
  const location = useLocation();
  const { theme, colorTheme, fontFamily, toggleTheme, setColorTheme, setFontFamily } = useTheme();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card shadow-soft">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <h1 className="text-2xl font-display font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Habaru Blog
            </h1>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`transition-colors hover:text-primary ${
                isActive("/") ? "text-primary font-medium" : "text-foreground"
              }`}
            >
              Accueil
            </Link>
            <Link
              to="/blog"
              className={`transition-colors hover:text-primary ${
                isActive("/blog") ? "text-primary font-medium" : "text-foreground"
              }`}
            >
              Blog
            </Link>
            <Link
              to="/about"
              className={`transition-colors hover:text-primary ${
                isActive("/about") ? "text-primary font-medium" : "text-foreground"
              }`}
            >
              À propos
            </Link>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full hover:bg-primary/10"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
                  <Palette className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="glass-card">
                <DropdownMenuItem onClick={() => setColorTheme("rose")}>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-[hsl(350,85%,75%)]" />
                    <span>Rose Pastel</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setColorTheme("lavender")}>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-[hsl(280,60%,70%)]" />
                    <span>Lavande</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setColorTheme("beige")}>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-[hsl(35,45%,65%)]" />
                    <span>Beige Chaleureux</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
                  <Type className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="glass-card">
                <DropdownMenuItem onClick={() => setFontFamily("playfair")}>
                  <span className="font-display">Playfair Display</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFontFamily("cormorant")}>
                  <span className="font-serif">Cormorant Garamond</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFontFamily("inter")}>
                  <span className="font-sans">Inter</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
