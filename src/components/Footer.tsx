import { Instagram, Facebook, Twitter, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="glass-card mt-20 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex space-x-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>
          
<div className="flex justify-center items-center py-4 border-t">
  <p className="text-sm text-muted-foreground flex items-center gap-1">
    <span>© {new Date().getFullYear()} Habaru Blog.</span>
    <span>Fait avec</span>
    <Heart className="h-4 w-4 text-rose-500 fill-rose-500 transition-transform duration-300 hover:scale-125" />
    <span>par</span>
    <span className="font-semibold">
      <a 
        href="https://gremah-tech.vercel.app" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-primary hover:text-primary/80 transition-colors"
      >
        GremahTech
      </a>
      {" "} & {" "}
      <a 
        href="https://geo-concept.vercel.app" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-primary hover:text-primary/80 transition-colors"
      >
        Géo-Concept-Tech
      </a>
    </span>
  </p>
</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
