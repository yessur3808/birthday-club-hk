"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  CakeSlice,
  CheckCircle2,
  Clock3,
  MapPin,
  Search,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";

const cities = ["All cities", "Hong Kong", "Tokyo", "Los Angeles", "London", "New York", "Berlin"] as const;
const categories = ["All categories", "Dining", "Shopping", "Experiences"] as const;
const accessOptions = ["All access", "No membership", "Free to join", "Paid / tiered"] as const;

type City = Exclude<(typeof cities)[number], "All cities">;
type Category = Exclude<(typeof categories)[number], "All categories">;
type Access = Exclude<(typeof accessOptions)[number], "All access">;

type Offer = {
  brand: string;
  city: City;
  country: string;
  title: string;
  value: string;
  category: Category;
  access: Access;
  timing: string;
  requirement: string;
  url: string;
};

const offers: Offer[] = [
  {
    brand: "Outback Steakhouse",
    city: "Hong Kong",
    country: "Hong Kong",
    title: "Birthday-month cash coupon",
    value: "HK$88 off",
    category: "Dining",
    access: "Free to join",
    timing: "During your birthday month",
    requirement: "Member account and HK$400 minimum spend",
    url: "https://www.outback.com.hk/news-and-promotions/article/222?lang=en",
  },
  {
    brand: "Genki Sushi",
    city: "Hong Kong",
    country: "Hong Kong",
    title: "Birthday discount at Hong Kong outlets",
    value: "20–25% off",
    category: "Dining",
    access: "Paid / tiered",
    timing: "Once during your birthday month",
    requirement: "Silver or Premium Pass",
    url: "https://order.genkisushi.com.hk/en/genki-membership-program-terms-and-conditions",
  },
  {
    brand: "FRITES",
    city: "Hong Kong",
    country: "Hong Kong",
    title: "Birthday dessert, wine or prosecco",
    value: "Complimentary treat",
    category: "Dining",
    access: "Free to join",
    timing: "During your birthday month",
    requirement: "Reward depends on membership tier",
    url: "https://rewards.frites.hk/",
  },
  {
    brand: "PizzaExpress Club",
    city: "Hong Kong",
    country: "Hong Kong",
    title: "Tier-based birthday surprise",
    value: "Treat + Dough",
    category: "Dining",
    access: "Free to join",
    timing: "During your birthday month",
    requirement: "Join before your birthday month",
    url: "https://www.pizzaexpress.com.hk/club-home",
  },
  {
    brand: "Ocean Park",
    city: "Hong Kong",
    country: "Hong Kong",
    title: "Dining discount and birthday gift",
    value: "25% off + gift",
    category: "Experiences",
    access: "Paid / tiered",
    timing: "Once during your birthday month",
    requirement: "Gold Annual Member",
    url: "https://www.oceanpark.com.hk/en/annual-membership/annual-membership-gold-birthday-offers",
  },
  {
    brand: "The Point",
    city: "Hong Kong",
    country: "Hong Kong",
    title: "Bonus points across participating malls",
    value: "Up to 2× points",
    category: "Shopping",
    access: "Paid / tiered",
    timing: "Throughout your birthday month",
    requirement: "Gold member and eligible spending",
    url: "https://www.thepoint.com.hk/en/The-Point-VIP_tnc.html",
  },
  {
    brand: "UCHINO",
    city: "Hong Kong",
    country: "Hong Kong",
    title: "Discount on first birthday-month purchase",
    value: "20–30% off",
    category: "Shopping",
    access: "Paid / tiered",
    timing: "First order in your birthday month",
    requirement: "Classic or Premium member",
    url: "https://www.uchino.com.hk/uchino-membership",
  },
  {
    brand: "Go Royal",
    city: "Hong Kong",
    country: "Hong Kong",
    title: "Hotel birthday cake privilege",
    value: "Complimentary 1 lb cake",
    category: "Dining",
    access: "Paid / tiered",
    timing: "Birthday month, plus or minus one month",
    requirement: "Gold member and at least two diners",
    url: "https://www.goroyal.com.hk/",
  },
  {
    brand: "CLUB ic × Four Seasons",
    city: "Hong Kong",
    country: "Hong Kong",
    title: "Birthday champagne at Caprice",
    value: "Welcome glass",
    category: "Dining",
    access: "Paid / tiered",
    timing: "Offer currently listed through 15 Dec 2026",
    requirement: "Gold tier or above and dinner booking",
    url: "https://ifc.com.hk/clubic/en/happenings/promotions-events/",
  },
  {
    brand: "Syabuyo",
    city: "Tokyo",
    country: "Japan",
    title: "Birthday cake and dining discount",
    value: "Cake + 10% off",
    category: "Dining",
    access: "Free to join",
    timing: "During your birthday month",
    requirement: "Register your birthday in the Skylark app",
    url: "https://www.skylark.co.jp/syabuyo/birthday/",
  },
  {
    brand: "Tokyo Kaikan Club",
    city: "Tokyo",
    country: "Japan",
    title: "Points, a drink and dessert plate",
    value: "1,500 points + treats",
    category: "Dining",
    access: "Free to join",
    timing: "Until the end of the month after your birthday",
    requirement: "Reserve two days ahead and show the coupon",
    url: "https://www.kaikan.co.jp/special/tkc-birthday/index.html",
  },
  {
    brand: "Bubba Gump Tokyo",
    city: "Tokyo",
    country: "Japan",
    title: "Soft serve, photo card and birthday song",
    value: "Complimentary celebration",
    category: "Dining",
    access: "No membership",
    timing: "On your birthday visit",
    requirement: "Order a meal and bring birthday ID",
    url: "https://www.tokyo-dome.co.jp/feature/birthday/",
  },
  {
    brand: "Pacific Dining Car",
    city: "Los Angeles",
    country: "United States",
    title: "Birthday steak for 1921 Club members",
    value: "Complimentary steak",
    category: "Dining",
    access: "Free to join",
    timing: "Birthday reward period shown in your account",
    requirement: "Join the 1921 Club before your birthday",
    url: "https://pacificdiningcar.com/1921-club-landing/",
  },
  {
    brand: "Porterhouse LA",
    city: "Los Angeles",
    country: "United States",
    title: "Birthday-month dining reward",
    value: "$25 off",
    category: "Dining",
    access: "Free to join",
    timing: "During your birthday month",
    requirement: "Friends of Ronnie loyalty account",
    url: "https://www.porterhousela.com/loyalty-program",
  },
  {
    brand: "Lawry's VIP Rewards",
    city: "Los Angeles",
    country: "United States",
    title: "Birthday reward at participating restaurants",
    value: "Member reward",
    category: "Dining",
    access: "Paid / tiered",
    timing: "Around your birthday",
    requirement: "$25 enrollment; participating locations include Beverly Hills",
    url: "https://www.lawrysonline.com/vip-rewards/",
  },
  {
    brand: "Browns Covent Garden",
    city: "London",
    country: "United Kingdom",
    title: "Birthday dining discount",
    value: "£25 off",
    category: "Dining",
    access: "Free to join",
    timing: "Birthday reward window shown in your account",
    requirement: "Register at least 30 days before your birthday",
    url: "https://www.browns-restaurants.co.uk/restaurants/london/covent-garden/my-account",
  },
  {
    brand: "Five Guys Rewards",
    city: "London",
    country: "United Kingdom",
    title: "Birthday shake reward",
    value: "Complimentary shake",
    category: "Dining",
    access: "Free to join",
    timing: "Birthday reward period shown in your account",
    requirement: "Join Five Guys Rewards and add your date of birth",
    url: "https://www.fiveguys.co.uk/rewards/",
  },
  {
    brand: "M&S Sparks",
    city: "London",
    country: "United Kingdom",
    title: "Personalised birthday treat",
    value: "Selected free treat",
    category: "Shopping",
    access: "Free to join",
    timing: "Around your birthday",
    requirement: "Add your date of birth and opt in to marketing",
    url: "https://www.marksandspencer.com/help-and-support/loyalty-and-rewards",
  },
  {
    brand: "Socarrat NYC",
    city: "New York",
    country: "United States",
    title: "Birthday-month restaurant discount",
    value: "$15 off",
    category: "Dining",
    access: "Free to join",
    timing: "During your birthday month",
    requirement: "Visit and check in with your loyalty account",
    url: "https://socarratnyc.com/loyalty-program/",
  },
  {
    brand: "Havana Central",
    city: "New York",
    country: "United States",
    title: "Birthday dining credit",
    value: "$25 credit",
    category: "Dining",
    access: "Free to join",
    timing: "During your birthday month",
    requirement: "$50 dine-in spend, member barcode and photo ID",
    url: "https://www.havanacentral.com/rewards-club/",
  },
  {
    brand: "Sbarro Rewards",
    city: "New York",
    country: "United States",
    title: "Birthday XL New York slice",
    value: "Complimentary slice",
    category: "Dining",
    access: "Free to join",
    timing: "One week before through two weeks after your birthday",
    requirement: "$5 minimum purchase at participating locations",
    url: "https://sbarro.com/faq/",
  },
  {
    brand: "Britzer Garten",
    city: "Berlin",
    country: "Germany",
    title: "Birthday admission to the gardens",
    value: "Free entry",
    category: "Experiences",
    access: "No membership",
    timing: "On your actual birthday",
    requirement: "Show valid photo ID at the entrance",
    url: "https://www.britzergarten.de/en/plan-your-visit/visitor-information/cost-of-admission/",
  },
  {
    brand: "Madame Tussauds Berlin",
    city: "Berlin",
    country: "Germany",
    title: "Birthday admission",
    value: "Free entry",
    category: "Experiences",
    access: "No membership",
    timing: "On your actual birthday",
    requirement: "Show valid photo ID at the entrance",
    url: "https://www.madametussauds.com/berlin/en/plan-your-visit/before-you-visit/faq/",
  },
  {
    brand: "Berlin Dungeon",
    city: "Berlin",
    country: "Germany",
    title: "Birthday admission",
    value: "Free entry",
    category: "Experiences",
    access: "No membership",
    timing: "On your actual birthday",
    requirement: "Reserve a free time slot and bring ID or passport",
    url: "https://www.thedungeons.com/berlin/en/plan/plan-your-day/visitor-informations/",
  },
];

function getInitials(brand: string) {
  return brand
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState<(typeof cities)[number]>("All cities");
  const [category, setCategory] = useState<(typeof categories)[number]>("All categories");
  const [access, setAccess] = useState<(typeof accessOptions)[number]>("All access");

  const filteredOffers = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return offers.filter((offer) => {
      const searchable = `${offer.brand} ${offer.city} ${offer.country} ${offer.title} ${offer.value} ${offer.requirement}`.toLowerCase();
      const matchesQuery = !normalized || searchable.includes(normalized);
      const matchesCity = city === "All cities" || offer.city === city;
      const matchesCategory = category === "All categories" || offer.category === category;
      const matchesAccess = access === "All access" || offer.access === access;

      return matchesQuery && matchesCity && matchesCategory && matchesAccess;
    });
  }, [access, category, city, query]);

  const hasActiveFilters = query !== "" || city !== "All cities" || category !== "All categories" || access !== "All access";
  const heading = city === "All cities" ? "All birthday offers" : `Birthday offers in ${city}`;

  const resetFilters = () => {
    setQuery("");
    setCity("All cities");
    setCategory("All categories");
    setAccess("All access");
  };

  return (
    <main id="top">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Birthday Club home">
          <span className="brand-mark" aria-hidden="true"><CakeSlice size={18} /></span>
          <span>Birthday Club</span>
        </a>
        <div className="header-meta"><CheckCircle2 size={15} /> Sources checked Sep 2026</div>
        <a className="header-link" href="#method">Method</a>
      </header>

      <section className="intro" aria-labelledby="page-heading">
        <p className="eyebrow">A practical birthday directory</p>
        <h1 id="page-heading">Birthday offers,<br /><span>minus the noise.</span></h1>
        <p className="intro-copy">Useful birthday perks in six cities. Filter the list, check the requirements, then go straight to the official source.</p>
        <div className="intro-stats" aria-label="Directory summary">
          <span><strong>{offers.length}</strong> offers</span>
          <span><strong>{cities.length - 1}</strong> cities</span>
          <span><ShieldCheck size={16} /> Official sources only</span>
        </div>
      </section>

      <section className="directory" aria-labelledby="offers-heading">
        <div className="city-switcher" role="group" aria-label="Filter offers by city">
          {cities.map((item) => (
            <button
              className={city === item ? "city-button active" : "city-button"}
              key={item}
              type="button"
              onClick={() => setCity(item)}
              aria-pressed={city === item}
            >
              {item}
              <span>{item === "All cities" ? offers.length : offers.filter((offer) => offer.city === item).length}</span>
            </button>
          ))}
        </div>

        <div className="filter-shell">
          <label className="search-box">
            <Search size={18} aria-hidden="true" />
            <span className="sr-only">Search offers</span>
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search a brand, perk or requirement"
              className="border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
            />
          </label>
          <label>
            <span className="sr-only">Category</span>
            <NativeSelect value={category} onChange={(event) => setCategory(event.target.value as (typeof categories)[number])} className="filter-select">
              {categories.map((item) => <NativeSelectOption key={item} value={item}>{item}</NativeSelectOption>)}
            </NativeSelect>
          </label>
          <label>
            <span className="sr-only">Membership access</span>
            <NativeSelect value={access} onChange={(event) => setAccess(event.target.value as (typeof accessOptions)[number])} className="filter-select">
              {accessOptions.map((item) => <NativeSelectOption key={item} value={item}>{item}</NativeSelectOption>)}
            </NativeSelect>
          </label>
          {hasActiveFilters ? (
            <button className="clear-button" type="button" onClick={resetFilters}><X size={15} /> Clear</button>
          ) : null}
        </div>

        <div className="results-heading">
          <div>
            <p className="section-kicker">Directory</p>
            <h2 id="offers-heading">{heading}</h2>
          </div>
          <span className="result-count">{filteredOffers.length} {filteredOffers.length === 1 ? "result" : "results"}</span>
        </div>

        {filteredOffers.length > 0 ? (
          <div className="offer-list">
            {filteredOffers.map((offer) => (
              <article className="offer-row" key={`${offer.city}-${offer.brand}`}>
                <div className="merchant">
                  <span className="merchant-mark" aria-hidden="true">{getInitials(offer.brand)}</span>
                  <div>
                    <p className="merchant-name">{offer.brand}</p>
                    <p className="location"><MapPin size={13} /> {offer.city}, {offer.country}</p>
                  </div>
                </div>
                <div className="offer-summary">
                  <div className="offer-labels"><span>{offer.category}</span><span>{offer.access}</span></div>
                  <h3>{offer.title}</h3>
                  <p className="offer-value">{offer.value}</p>
                </div>
                <div className="offer-details">
                  <p><Clock3 size={15} /> <span>{offer.timing}</span></p>
                  <p><Users size={15} /> <span>{offer.requirement}</span></p>
                </div>
                <a href={offer.url} target="_blank" rel="noreferrer" className="offer-link" aria-label={`View ${offer.brand} offer on the official website`}>
                  Official source <ArrowUpRight size={16} />
                </a>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Search size={24} />
            <h3>No matching offers</h3>
            <p>Try a different city, category or search term.</p>
            <button type="button" onClick={resetFilters}>Clear all filters</button>
          </div>
        )}
      </section>

      <section className="method" id="method">
        <div>
          <p className="section-kicker">How this works</p>
          <h2>Shortlist first. Fine print second.</h2>
        </div>
        <p>Every listing points to the merchant or venue that publishes the offer. Terms can change, and advance registration, photo ID, minimum spend or specific membership tiers may apply. Confirm the official page before making plans.</p>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top"><span className="brand-mark"><CakeSlice size={16} /></span> Birthday Club</a>
        <p>Hong Kong · Tokyo · Los Angeles · London · New York · Berlin</p>
        <p className="footer-note">Always confirm terms with the merchant.</p>
      </footer>
    </main>
  );
}
