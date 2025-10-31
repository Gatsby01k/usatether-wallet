// components/Footer.tsx
import { Mail, Twitter, Github, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-24 bg-gradient-to-t from-black/40 to-transparent backdrop-blur-sm">
      <div className="container mx-auto px-6 py-12 text-center text-white/70">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white">USATether</h3>
            <p className="text-sm text-white/60">
              © 2025 USATether. All rights reserved.
            </p>
            <p className="text-sm text-white/60">
              Contact: <a href="mailto:info@usatether.io" className="text-sky-400 hover:text-sky-300">info@usatether.io</a>
            </p>
          </div>

          <div className="flex items-center justify-center gap-5 text-white/70">
            <a
              href="https://x.com/USATether"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/Gatsby01k/usatether-wallet"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://usatether.io"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <Globe className="w-5 h-5" />
            </a>
            <a
              href="mailto:info@usatether.io"
              className="hover:text-white transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 text-xs text-white/50">
          Built with ❤️ in the U.S. — secure, compliant, and beautifully simple.
        </div>
      </div>
    </footer>
  );
}
