import Link from "next/link";
import Logo from "../common/logo";
import Container from "../common/container";
import Github from "../svgs/Github";

interface FooterProps {
  className?: string;
}

const socialLinks: {
  label: string;
  icon: React.ReactNode;
  href: string;
}[] = [
  {
    label: "github",
    icon: <Github className="size-4 md:size-5" />,
    href: "https://github.com/vinnlee",
  },
];

export default function Footer({ className }: FooterProps) {
  return (
    <Container className="pt-8 pb-44">
      <footer>
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-start gap-y-4">
            <Link
              href="/"
              aria-label="go home"
              className="flex items-center gap-2 transition-opacity hover:opacity-80"
            >
              <Logo width="34" />
              <span className="font-advercase-regular text-xl font-medium tracking-tight text-neutral-200">
                Money Manager
              </span>
            </Link>

            <div className="text-muted-foreground flex items-center gap-1 text-sm tracking-tight">
              Build by
              <Link
                target="_blank"
                href="https://github.com/vinnlee/"
                className="text-semibold text-neutral-200"
              >
                Vincent Lee
              </Link>
              with 💖
            </div>
          </div>

          <div className="flex flex-col items-end gap-y-4">
            <p className="font-advercase-regular text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()} Money Manager.
            </p>

            {/* Social Link */}
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-emerald-400"
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </Container>
  );
}
