"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  CakeSlice,
  Check,
  Clock3,
  Gift,
  MapPin,
  Search,
  Sparkles,
  TicketPercent,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";

type Offer = {
  brand: string;
  initials: string;
  title: string;
  value: string;
  category: "Dining" | "Shopping" | "Experiences";
  area: "Hong Kong-wide" | "Hong Kong Island" | "Kowloon";
  access: "Free membership" | "Paid / tiered membership";
  timing: string;
  requirement: string;
  url: string;
  tone: string;
};

const offers: Offer[] = [
  {
    brand: "Outback Steakhouse",
    initials: "OS",
    title: "Birthday month cash coupon",
    value: "HK$88 off",
    category: "Dining",
    area: "Hong Kong-wide",
    access: "Free membership",
    timing: "During your birthday month",
    requirement: "Member • Min. HK$400 spend",
    url: "https://www.outback.com.hk/news-and-promotions/article/222?lang=en",
    tone: "coral",
  },
  {
    brand: "Genki Sushi",
    initials: "元",
    title: "Birthday discount at all HK outlets",
    value: "20–25% off",
    category: "Dining",
    area: "Hong Kong-wide",
    access: "Paid / tiered membership",
    timing: "Once during your birthday month",
    requirement: "Silver or Premium Pass",
    url: "https://order.genkisushi.com.hk/en/genki-membership-program-terms-and-conditions",
    tone: "sun",
  },
  {
    brand: "FRITES",
    initials: "F",
    title: "Birthday dessert, wine or prosecco",
    value: "Free treat",
    category: "Dining",
    area: "Hong Kong-wide",
    access: "Free membership",
    timing: "During your birthday month",
    requirement: "Reward depends on member tier",
    url: "https://rewards.frites.hk/",
    tone: "plum",
  },
  {
    brand: "PizzaExpress Club",
    initials: "PE",
    title: "Tier-based birthday surprise",
    value: "Treat + Dough",
    category: "Dining",
    area: "Hong Kong-wide",
    access: "Free membership",
    timing: "During your birthday month",
    requirement: "Join before your birthday month",
    url: "https://www.pizzaexpress.com.hk/club-home",
    tone: "mint",
  },
  {
    brand: "Ocean Park",
    initials: "OP",
    title: "Dining discount and birthday gift",
    value: "25% off + gift",
    category: "Experiences",
    area: "Hong Kong Island",
    access: "Paid / tiered membership",
    timing: "Once during your birthday month",
    requirement: "Gold Annual Member",
    url: "https://www.oceanpark.com.hk/en/annual-membership/annual-membership-gold-birthday-offers",
    tone: "blue",
  },
  {
    brand: "The Point",
    initials: "TP",
    title: "Bonus points across 29 malls",
    value: "Up to 2× points",
    category: "Shopping",
    area: "Hong Kong-wide",
    access: "Paid / tiered membership",
    timing: "All birthday month",
    requirement: "Gold member • Eligible spending",
    url: "https://www.thepoint.com.hk/en/The-Point-VIP_tnc.html",
    tone: "blue",
  },
  {
    brand: "UCHINO",
    initials: "U",
    title: "First birthday-month purchase",
    value: "20–30% off",
    category: "Shopping",
    area: "Hong Kong-wide",
    access: "Paid / tiered membership",
    timing: "First order in birthday month",
    requirement: "Classic or Premium member",
    url: "https://www.uchino.com.hk/uchino-membership",
    tone: "mint",
  },
  {
    brand: "Go Royal",
    initials: "GR",
    title: "Hotel birthday cake privilege",
    value: "Free 1 lb cake",
    category: "Dining",
    area: "Kowloon",
    access: "Paid / tiered membership",
    timing: "Birth month ± 1 month",
    requirement: "Gold member • Min. 2 diners",
    url: "https://www.goroyal.com.hk/",
    tone: "plum",
  },
  {
    brand: "CLUB ic × Four Seasons",
    initials: "4S",
    title: "Birthday champagne at Caprice",
    value: "Welcome glass",
    category: "Dining",
    area: "Hong Kong Island",
    access: "Paid / tiered membership",
    timing: "Valid through 15 Dec 2026",
    requirement: "Gold tier or above • Dinner",
    url: "https://ifc.com.hk/clubic/en/happenings/promotions-events/",
    tone: "coral",
  },
];

const categories = ["All", "Dining", "Shopping", "Experiences"] as const;

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [area, setArea] = useState("All areas");
  const [access, setAccess] = useState("All access");

  const filteredOffers = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return offers.filter((offer) => {
      const matchesQuery = !normalized || `${offer.brand} ${offer.title} ${offer.value}`.toLowerCase().includes(normalized);
      return matchesQuery && (category === "All" || offer.category === category) && (area === "All areas" || offer.area === area) && (access === "All access" || offer.access === access);
    });
  }, [access, area, category, query]);

  const resetFilters = () => {
    setQuery("");
    setCategory("All");
    setArea("All areas");
    setAccess("All access");
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Birthday Club Hong Kong home">
          <span className="brand-mark" aria-hidden="true"><CakeSlice size={20} /></span>
          <span>Birthday Club</span>
        </a>
        <div className="header-place"><MapPin size={15} /> Hong Kong</div>
        <a className="header-link" href="#about">How it works</a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><Sparkles size={14} /> Make the month count</div>
          <h1>Your birthday.<br /><em>More treats.</em></h1>
          <p>Real birthday perks around Hong Kong, collected in one place and linked to the official offer.</p>
          <div className="hero-proof">
            <span><Check size={14} /> Official sources</span>
            <span><Clock3 size={14} /> Checked 19 Sep 2026</span>
          </div>
        </div>
        <div className="hero-art" role="img" aria-label="Birthday cake and dim sum overlooking Hong Kong harbour">
          <div className="hero-sticker">9 offers<br /><strong>to unwrap</strong></div>
        </div>
      </section>

      <section className="directory" aria-labelledby="offers-heading">
        <div className="directory-heading">
          <div>
            <p className="section-kicker">Hong Kong birthday guide</p>
            <h2 id="offers-heading">Find your birthday perk</h2>
          </div>
          <span className="result-count">{filteredOffers.length} {filteredOffers.length === 1 ? "offer" : "offers"}</span>
        </div>

        <div className="filter-shell">
          <label className="search-box">
            <span className="sr-only">Search offers</span>
            <Search size={19} aria-hidden="true" />
            <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a brand or treat" className="border-0 bg-transparent p-0 shadow-none focus-visible:ring-0" />
          </label>
          <div className="select-group">
            <label>
              <span className="sr-only">Area</span>
              <NativeSelect value={area} onChange={(event) => setArea(event.target.value)} className="filter-select">
                <NativeSelectOption>All areas</NativeSelectOption><NativeSelectOption>Hong Kong-wide</NativeSelectOption><NativeSelectOption>Hong Kong Island</NativeSelectOption><NativeSelectOption>Kowloon</NativeSelectOption>
              </NativeSelect>
            </label>
            <label>
              <span className="sr-only">Membership access</span>
              <NativeSelect value={access} onChange={(event) => setAccess(event.target.value)} className="filter-select">
                <NativeSelectOption>All access</NativeSelectOption><NativeSelectOption>Free membership</NativeSelectOption><NativeSelectOption>Paid / tiered membership</NativeSelectOption>
              </NativeSelect>
            </label>
          </div>
        </div>

        <div className="category-tabs" role="group" aria-label="Filter by category">
          {categories.map((item) => (
            <Button key={item} type="button" variant="ghost" className={category === item ? "category-tab active" : "category-tab"} onClick={() => setCategory(item)} aria-pressed={category === item}>{item}</Button>
          ))}
        </div>

        {filteredOffers.length > 0 ? (
          <div className="offer-grid">
            {filteredOffers.map((offer) => (
              <article className={`offer-card tone-${offer.tone}`} key={offer.brand}>
                <div className="card-topline"><span className="merchant-mark">{offer.initials}</span><span className="category-label">{offer.category}</span></div>
                <div className="card-main"><p className="merchant-name">{offer.brand}</p><h3>{offer.title}</h3><p className="offer-value">{offer.value}</p></div>
                <div className="card-meta"><p><Clock3 size={15} /> {offer.timing}</p><p><Users size={15} /> {offer.requirement}</p></div>
                <a href={offer.url} target="_blank" rel="noreferrer" className="offer-link" aria-label={`View ${offer.brand} offer on the official website`}>View official offer <ArrowUpRight size={17} /></a>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state"><Gift size={28} /><h3>No matching treats yet</h3><p>Try a broader area or membership filter.</p><Button onClick={resetFilters}>Clear filters</Button></div>
        )}
      </section>

      <section className="about" id="about">
        <div className="about-icon"><TicketPercent size={24} /></div>
        <div><p className="section-kicker">Good to know</p><h2>Birthday fine print, made visible.</h2></div>
        <p>Offers are pulled from official merchant pages. Membership level, advance sign-up, minimum spend and ID checks often apply, so open the source before making plans.</p>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top"><span className="brand-mark"><CakeSlice size={18} /></span> Birthday Club</a>
        <p>Hong Kong birthday offers, without the tab overload.</p>
        <p className="footer-note">Always confirm terms with the merchant.</p>
      </footer>
    </main>
  );
}
