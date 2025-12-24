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

          <div className="flex flex-col items-center py-4 border-t w-full">
            <p className="text-sm text-muted-foreground mb-4">
              Contact: <a href="mailto:kisskalilou@gmail.com" className="text-primary hover:underline">kisskalilou@gmail.com</a>
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <span>© {new Date().getFullYear()} Habaru Media.</span>
              <span>L'information en toute transparence.</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
