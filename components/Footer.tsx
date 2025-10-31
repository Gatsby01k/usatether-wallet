// components/Footer.tsx — профессиональный футер
import Link from "next/link";
import Image from "next/image";
import { Mail, Linkedin, Instagram, Twitter, Send } from "lucide-react";

const socials = [
  {
    href: "https://www.linkedin.com/company/usatether-wallet/",
    label: "LinkedIn",
    Icon: Linkedin,
  },
  {
    href: "https://www.instagram.com/usatether/",
    label: "Instagram",
    Icon: Instagram,
  },
  {
    href: "https://x.com/USATether_io",
    label: "X (Twitter)",
    Icon: Twitter,
  },
  {
    href: "https://t.me/USATether_io",
    label: "Telegram",
    Icon: Send, // аккуратная иконка-замена для Telegram
  },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-gradient-to-t from-black/40 to-transparent backdrop-blur">
      <div className="container mx-auto px-6 py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand + tagline */}
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.svg"
                width={28}
                height={28}
                alt="USATether"
                className="opacity-90"
              />
              <span className="text-base font-semibold tracking-wide">
                USATether
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/65">
              A simple, secure, U.S.-focused stablecoin wallet. Self-custody
              by design.
            </p>

            <a
              href="mailto:info@usatether.io"
              className="mt-4 inline-flex items-center gap-2 text-sm text-sky-300 hover:text-sky-200"
            >
              <Mail className="h-4 w-4" />
              info@usatether.io
            </a>
          </div>

          {/* Columns */}
          <div className="grid grid-cols-2 gap-10 md:grid-cols-3">
            <div>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/70">
                Product
              </h4>
              <ul className="space-y-2 text-sm text-white/65">
                <li>
                  <Link className="hover:text-white" href="/swap">
                    Swap
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white" href="/bridge">
                    Bridge
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white" href="/buy">
                    Buy
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white" href="/faq">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/70">
                Company
              </h4>
              <ul className="space-y-2 text-sm text-white/65">
                <li>
                  <Link className="hover:text-white" href="/about">
                    About
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white" href="/support">
                    Support
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white" href="/compliance">
                    Compliance
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/70">
                Follow
              </h4>
              <div className="flex items-center gap-3">
                {socials.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/55 md:flex-row">
          <p>© {new Date().getFullYear()} USATether. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-white/80">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white/80">
              Terms
            </Link>
            <Link href="/compliance" className="hover:text-white/80">
              Compliance
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
