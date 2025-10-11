import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Palette, Type, Menu, X, Home, BookOpen, User } from "lucide-react";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;
  
  const colorThemes = [
    { id: "rose" as const, name: "Rose Pastel", color: "bg-[hsl(350,85%,75%)]" },
    { id: "lavender" as const, name: "Lavande", color: "bg-[hsl(280,60%,70%)]" },
    { id: "beige" as const, name: "Beige Chaleureux", color: "bg-[hsl(35,45%,65%)]" },
    { id: "emerald" as const, name: "Émeraude", color: "bg-[hsl(160,60%,60%)]" },
    { id: "ocean" as const, name: "Océan", color: "bg-[hsl(220,60%,60%)]" },
  ];

  const fonts = [
    { id: "playfair" as const, name: "Playfair Display", className: "font-display" },
    { id: "cormorant" as const, name: "Cormorant Garamond", className: "font-serif-alt" },
    { id: "inter" as const, name: "Inter", className: "font-sans" },
  ];

  const navItems = [
    { path: "/", label: "Accueil", icon: Home },
    { path: "/blog", label: "Blog", icon: BookOpen },
    { path: "/about", label: "À propos", icon: User },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card shadow-soft backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
              <h1 className="text-xl sm:text-2xl font-display font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Habaru Blog
              </h1>
            </Link>

            {/* Navigation desktop */}
            <div className="hidden md:flex items-center space-x-8 mx-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-3 py-2 transition-colors hover:text-primary ${
                    isActive(item.path) 
                      ? "text-primary font-medium" 
                      : "text-foreground"
                  }`}
                >
                  {item.label}
                  {isActive(item.path) && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 gradient-primary rounded-full" />
                  )}
                </Link>
              ))}
            </div>

            {/* Contrôles */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              {/* Contrôles desktop */}
              <div className="hidden sm:flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className="rounded-full hover:bg-primary/10"
                  aria-label={theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"}
                >
                  {theme === "dark" ? (
                    <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
                  ) : (
                    <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
                  )}
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-full hover:bg-primary/10"
                      aria-label="Changer le thème de couleur"
                    >
                      <Palette className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="glass-card min-w-[180px]">
                    {colorThemes.map((themeOption) => (
                      <DropdownMenuItem 
                        key={themeOption.id} 
                        onClick={() => setColorTheme(themeOption.id)}
                        className="flex items-center space-x-2"
                      >
                        <div className={`w-4 h-4 rounded-full ${themeOption.color}`} />
                        <span>{themeOption.name}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-full hover:bg-primary/10"
                      aria-label="Changer la police"
                    >
                      <Type className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="glass-card min-w-[200px]">
                    {fonts.map((font) => (
                      <DropdownMenuItem 
                        key={font.id} 
                        onClick={() => setFontFamily(font.id)}
                        className={font.className}
                      >
                        {font.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Bouton menu mobile */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="rounded-full hover:bg-primary/10 md:hidden"
                aria-label="Menu principal"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Menu mobile overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 glass-card border-t border-glass-border shadow-elegant backdrop-blur-sm">
            <div className="container mx-auto px-4 py-6">
              {/* Navigation mobile */}
              <nav className="space-y-4 mb-8">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center space-x-3 p-4 rounded-2xl transition-all duration-300 ${
                        isActive(item.path)
                          ? "gradient-primary text-white shadow-soft"
                          : "glass-card border border-glass-border text-foreground hover:shadow-soft"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium text-lg">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Contrôles de thème dans le menu mobile */}
              <div className="space-y-6">
                {/* Sélecteur de thème de couleur */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Thème de couleur
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {colorThemes.map((themeOption) => (
                      <button
                        key={themeOption.id}
                        onClick={() => {
                          setColorTheme(themeOption.id);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`flex flex-col items-center space-y-2 p-3 rounded-xl transition-all ${
                          colorTheme === themeOption.id
                            ? "gradient-primary text-white shadow-soft"
                            : "glass-card border border-glass-border hover:shadow-soft"
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full ${themeOption.color} border-2 border-white/50`} />
                        <span className="text-xs font-medium">{themeOption.name.split(' ')[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sélecteur de police */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Police
                  </h3>
                  <div className="space-y-2">
                    {fonts.map((font) => (
                      <button
                        key={font.id}
                        onClick={() => {
                          setFontFamily(font.id);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full text-left p-3 rounded-xl transition-all ${
                          fontFamily === font.id
                            ? "gradient-primary text-white shadow-soft"
                            : "glass-card border border-glass-border hover:shadow-soft"
                        } ${font.className}`}
                      >
                        {font.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bouton mode sombre/clair */}
                <Button
                  onClick={toggleTheme}
                  className="w-full rounded-xl gradient-primary text-white shadow-soft hover:shadow-elegant transition-all"
                >
                  {theme === "dark" ? (
                    <>
                      <Sun className="h-4 w-4 mr-2" />
                      Mode clair
                    </>
                  ) : (
                    <>
                      <Moon className="h-4 w-4 mr-2" />
                      Mode sombre
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Overlay pour fermer le menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navigation;