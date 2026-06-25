const columns = [
  {
    title: "Collections",
    links: ["Refrigeration", "Induction Cooking", "Built-In Ovens", "Range Hoods", "Dishwashers", "Wine & Beverage"],
  },
  {
    title: "Company",
    links: ["About Atlanteos", "Sustainability", "Press", "Careers"],
  },
  {
    title: "Support",
    links: ["Owner's Manuals", "Warranty", "Service Network", "Contact"],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-accent/40 text-sm font-semibold text-accent">
                A
              </span>
              <span className="text-base font-semibold tracking-[0.18em]">
                ATLANTEOS
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted">
              Smart kitchen appliances engineered for intelligence,
              efficiency, and a quieter home.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-foreground">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-muted transition-colors hover:text-foreground">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Atlanteos Appliances. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Energy Ratings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
