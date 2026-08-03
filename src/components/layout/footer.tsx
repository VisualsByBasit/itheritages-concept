import Image from "next/image";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.5 21v-8.2h2.75l.41-3.2h-3.16V7.6c0-.93.26-1.56 1.6-1.56h1.7V3.14C15.98 3.1 15.02 3 13.9 3c-2.34 0-3.95 1.43-3.95 4.04v2.56H7.19v3.2h2.76V21h3.55Z" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M6.94 8.5H3.56V20.5H6.94V8.5ZM5.25 3.5A1.97 1.97 0 1 0 5.25 7.44 1.97 1.97 0 0 0 5.25 3.5ZM20.5 20.5H17.13V14.6c0-1.4-.03-3.2-1.95-3.2-1.96 0-2.26 1.53-2.26 3.1v6H9.55V8.5h3.24v1.64h.05c.45-.86 1.56-1.77 3.2-1.77 3.42 0 4.05 2.25 4.05 5.18v6.95Z" />
    </svg>
  );
}

const SERVICES = [
  { label: "Infrastructure Management", href: "/services/infrastructure" },
  { label: "Cloud Computing", href: "/services/cloud-computing" },
  { label: "Cyber Security", href: "/services/cyber-security" },
  { label: "Unified Communications & Collaboration", href: "/services/unified-communications" },
  { label: "Modern Workspace", href: "/services/modern-workspace" },
  { label: "Audio-Video", href: "/services/audio-video" },
  { label: "AI", href: "/services/ai" },
  { label: "Managed Services", href: "/services/managed-services" },
  { label: "Professional Consulting", href: "/services/consulting" },
  { label: "Enterprise Networking", href: "/services/enterprise-networking" },
];

const COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Industries", href: "/industries" },
  { label: "Insights", href: "/insights" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
];

const OFFICES = [
  {
    label: "Islamabad — HQ",
    address: "1st Floor, H-1, Street-34, G-10/1, Islamabad, Pakistan",
    phone: "+92-300-0607639",
  },
  {
    label: "Lahore",
    address: "No. 204, 30-M Civic Center, Model Town, Lahore, Pakistan",
    phone: "+92-300-0607639",
  },
  {
    label: "United Kingdom",
    address: "175 Humber Road, Coventry CV3 1NZ, United Kingdom",
    phone: "+44 785 2421806",
  },
];

export function Footer() {
  return (
    <footer id="site-footer" className="border-t border-border bg-secondary/40">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_1fr_1fr_1.4fr]">
          <div>
            <Link href="/" aria-label="IT Heritages home">
              <Image
                src="/it-heritages-logo-header.png"
                alt="IT Heritages"
                width={1133}
                height={386}
                className="h-8 w-auto"
              />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              CCIE, MSCP, and CTS-certified systems integrator delivering
              infrastructure, cloud, cyber security, and unified
              communications since 2018.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://facebook.com/itheritages"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="IT Heritages on Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com/company/it-heritages"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="IT Heritages on LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Services</h3>
            <ul className="mt-4 space-y-2.5">
              {SERVICES.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Company</h3>
            <ul className="mt-4 space-y-2.5">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-2">
              <a
                href="mailto:info@itheritages.com"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                info@itheritages.com
              </a>
              <a
                href="mailto:sales@itheritages.com"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                sales@itheritages.com
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Offices</h3>
            <ul className="mt-4 space-y-5">
              {OFFICES.map((office) => (
                <li key={office.label}>
                  <p className="text-sm font-medium text-foreground">{office.label}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{office.address}</p>
                  <a
                    href={`tel:${office.phone.replace(/\s+/g, "")}`}
                    className="mt-1 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    {office.phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} IT Heritages. All rights reserved.</p>
          <p>Mon–Fri 09:00–18:00 · CCIE · MSCP · CTS Certified</p>
        </div>
      </div>
    </footer>
  );
}
