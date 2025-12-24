import { useState, useEffect } from "react";
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

  // Gestion du scroll quand le menu mobile est ouvert
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Bloquer le scroll du body
      document.body.style.overflow = 'hidden';
    } else {
      // Réactiver le scroll
      document.body.style.overflow = '';
    }

    // Cleanup
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Fermer le menu quand la route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] h-16 glass-card shadow-soft backdrop-blur-md border-b border-glass-border">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0 relative z-[101]">
            <h1 className="text-xl sm:text-2xl font-display font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Habaru Media
            </h1>
          </Link>

          {/* Navigation desktop */}
          <div className="hidden md:flex items-center space-x-8 mx-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-3 py-2 transition-colors hover:text-primary ${isActive(item.path)
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
          <div className="flex items-center space-x-1 sm:space-x-2 relative z-[101]">
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
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
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
                    <Palette className="h-5 w-5" />
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
                    <Type className="h-5 w-5" />
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
              onClick={toggleMobileMenu}
              className="rounded-full hover:bg-primary/10 md:hidden relative z-[110]"
              aria-label="Menu principal"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-primary" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[90]">
          {/* Backdrop avec flou prononcé sur le reste du site */}
          <div
            className="absolute inset-0 bg-background/40 backdrop-blur-xl animate-in fade-in duration-300"
            onClick={closeMobileMenu}
          />

          {/* Contenu du menu qui descend */}
          <div className="absolute top-16 left-0 right-0 bg-background/98 border-t border-glass-border shadow-2xl animate-in slide-in-from-top duration-300 overflow-y-auto max-h-[calc(100vh-4rem)]">
            <div className="container mx-auto px-4 py-8 pb-12">
              <nav className="space-y-4 mb-8">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={closeMobileMenu}
                      className={`flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 ${isActive(item.path)
                        ? "gradient-primary text-white shadow-lg scale-[1.02]"
                        : "glass-card border border-glass-border text-foreground hover:bg-primary/5"
                        }`}
                    >
                      <div className={`p-2 rounded-xl ${isActive(item.path) ? "bg-white/20" : "bg-primary/10"}`}>
                        <Icon className={`h-6 w-6 ${isActive(item.path) ? "text-white" : "text-primary"}`} />
                      </div>
                      <span className="font-semibold text-lg">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="space-y-8">
                {/* Themes */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1">
                    Thème Visuel
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    {colorThemes.map((themeOption) => (
                      <button
                        key={themeOption.id}
                        onClick={() => {
                          setColorTheme(themeOption.id);
                        }}
                        className={`flex flex-col items-center space-y-3 p-4 rounded-2xl transition-all ${colorTheme === themeOption.id
                          ? "gradient-primary text-white shadow-md ring-2 ring-primary ring-offset-2 ring-offset-background"
                          : "glass-card border border-glass-border"
                          }`}
                      >
                        <div className={`w-8 h-8 rounded-full ${themeOption.color} border-2 border-white shadow-inner`} />
                        <span className="text-[10px] font-bold">{themeOption.name.split(' ')[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fonts */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1">
                    Typographie
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {fonts.map((font) => (
                      <button
                        key={font.id}
                        onClick={() => setFontFamily(font.id)}
                        className={`w-full text-left p-4 rounded-2xl transition-all ${fontFamily === font.id
                          ? "gradient-primary text-white shadow-md"
                          : "glass-card border border-glass-border"
                          } ${font.className}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-base">{font.name}</span>
                          <Type className="h-4 w-4 opacity-50" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mode Button */}
                <Button
                  onClick={toggleTheme}
                  className="w-full h-16 rounded-2xl gradient-primary text-white shadow-lg text-lg font-bold"
                >
                  {theme === "dark" ? (
                    <><Sun className="h-6 w-6 mr-3" /> Mode Clair</>
                  ) : (
                    <><Moon className="h-6 w-6 mr-3" /> Mode Sombre</>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;