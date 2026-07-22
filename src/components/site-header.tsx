import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, MapPin } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { rtList } from "@/data/rw";
import { cn } from "@/lib/utils";

const mainLinks = [
  { to: "/", label: "Beranda" },
  { to: "/profil", label: "Profil RW" },
  { to: "/kegiatan", label: "Kegiatan & Pengumuman" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground">
            <MapPin className="h-5 w-5" />
          </div>
          <div className="min-w-0 leading-tight">
            <div className="truncate font-serif text-base font-bold text-foreground">RW 02</div>
            <div className="truncate text-xs text-muted-foreground">Pedurungan Kidul</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {mainLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                pathname === l.to && "bg-accent text-accent-foreground",
              )}
            >
              {l.label}
            </Link>
          ))}
          <div className="relative group">
            <button
              type="button"
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                pathname.startsWith("/rt/") && "bg-accent text-accent-foreground",
              )}
            >
              Halaman RT
            </button>
            <div className="invisible absolute right-0 top-full min-w-40 rounded-md border border-border bg-popover p-1 opacity-0 shadow-md transition-all group-hover:visible group-hover:opacity-100">
              {rtList.map((id) => (
                <Link
                  key={id}
                  to="/rt/$rtId"
                  params={{ rtId: id }}
                  className="block rounded-sm px-3 py-2 text-sm text-popover-foreground transition-colors hover:bg-accent"
                >
                  RT {id}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Buka menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle className="font-serif">Navigasi</SheetTitle>
            </SheetHeader>
            <nav className="mt-6 flex flex-col gap-1">
              {mainLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent",
                    pathname === l.to && "bg-accent text-accent-foreground",
                  )}
                >
                  {l.label}
                </Link>
              ))}
              <div className="mt-4 mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Halaman RT
              </div>
              {rtList.map((id) => (
                <Link
                  key={id}
                  to="/rt/$rtId"
                  params={{ rtId: id }}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent",
                    pathname === `/rt/${id}` && "bg-accent text-accent-foreground",
                  )}
                >
                  RT {id}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
