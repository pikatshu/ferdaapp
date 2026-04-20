import React, { useEffect, useMemo, useState } from 'react';
import {
  Plane,
  Book,
  Hotel,
  Clock3,
  MapPin,
  Train,
  Coffee,
  Beer,
  Info,
  ExternalLink,
  MessageSquare,
  Map as MapIcon,
  Navigation,
  Share2,
  Copy,
  ShieldCheck,
  CalendarDays,
  Building2,
  Landmark,
  Sparkles,
  Phone,
  CircleCheck,
  Route,
  ChevronRight,
  UtensilsCrossed,
} from 'lucide-react';

type TabKey = 'plan' | 'transport' | 'useful' | 'phrases';
type IconType = React.ComponentType<{ className?: string }>;

type Flight = {
  airline: string;
  code: string;
  route: string;
  time: string;
  start: string;
  highlight?: boolean;
};

type EventItem = {
  start: string;
  time: string;
  title: string;
  details?: string;
  location?: string;
  mapsQuery?: string;
  link?: string;
  linkLabel?: string;
  icon: IconType;
  accent: string;
};

type DayItem = {
  day: string;
  date: string;
  events: EventItem[];
};

const tripStart = new Date('2026-04-22T00:00:00+03:00');
const tripEnd = new Date('2026-04-26T23:59:59+03:00');

const outboundFlights: Flight[] = [
  { airline: 'Finnair', code: 'AY992', route: 'KEF → HEL', time: '08:35 – 15:00', start: '2026-04-22T08:35:00+03:00' },
  { airline: 'Finnair', code: 'AY994', route: 'KEF → HEL', time: '17:15 – 23:40', start: '2026-04-22T17:15:00+03:00' },
  { airline: 'Icelandair', code: 'FI342', route: 'KEF → HEL', time: '07:30 – 14:00', start: '2026-04-22T07:30:00+03:00' },
];

const returnFlights: Flight[] = [
  { airline: 'Finnair', code: 'AY991', route: 'HEL → KEF', time: '07:10 – 07:50', start: '2026-04-26T07:10:00+03:00' },
  { airline: 'Finnair', code: 'AY993', route: 'HEL → KEF', time: '15:50 – 16:30', start: '2026-04-26T15:50:00+03:00' },
  { airline: 'Icelandair', code: 'FI343', route: 'HEL → KEF', time: '15:00 – 15:40', start: '2026-04-26T15:00:00+03:00' },
];

const days: DayItem[] = [
  {
    day: 'Miðvikudagur 22. apríl',
    date: '2026-04-22',
    events: [
      {
        start: '2026-04-22T08:35:00+03:00',
        time: '08:35 – 15:00',
        title: 'Flug 1: Finnair (AY992)',
        details: 'KEF → HEL',
        location: 'Helsinki-Vantaa flugvöllur',
        mapsQuery: 'Helsinki Airport',
        icon: Plane,
        accent: 'from-sky-500 to-blue-600',
      },
      {
        start: '2026-04-22T17:15:00+03:00',
        time: '17:15 – 23:40',
        title: 'Flug 2: Finnair (AY994)',
        details: 'KEF → HEL',
        location: 'Helsinki-Vantaa flugvöllur',
        mapsQuery: 'Helsinki Airport',
        icon: Plane,
        accent: 'from-sky-500 to-blue-600',
      },
      {
        start: '2026-04-22T07:30:00+03:00',
        time: '07:30 – 14:00',
        title: 'Flug 3: Icelandair (FI342)',
        details: 'KEF → HEL',
        location: 'Helsinki-Vantaa flugvöllur',
        mapsQuery: 'Helsinki Airport',
        icon: Plane,
        accent: 'from-indigo-500 to-sky-600',
      },
      {
        start: '2026-04-22T18:00:00+03:00',
        time: '18:00 – 20:00',
        title: 'Gufa á Löyly Helsinki',
        details: 'Matur, sauna og útsýni við sjóinn.',
        location: 'Hernesaarenranta 4, Helsinki',
        mapsQuery: 'Loyly Helsinki Hernesaarenranta 4 Helsinki',
        link: 'https://www.loylyhelsinki.fi',
        linkLabel: 'Skoða Löyly',
        icon: Sparkles,
        accent: 'from-amber-500 to-orange-500',
      },
    ],
  },
  {
    day: 'Fimmtudagur 23. apríl',
    date: '2026-04-23',
    events: [
      {
        start: '2026-04-23T08:30:00+03:00',
        time: '08:30',
        title: 'Brottför frá hóteli',
        details: 'Um 15 mín ganga.',
        location: 'Scandic Grand Marina',
        mapsQuery: 'Scandic Grand Marina Katajanokanlaituri 7 Helsinki',
        icon: Hotel,
        accent: 'from-indigo-500 to-slate-700',
      },
      {
        start: '2026-04-23T09:00:00+03:00',
        time: '09:00 – 12:00',
        title: 'Fjármálaráðuneytið',
        details: 'House of the Estates, Snellmaninkatu 9-11. Ræðumenn: Leena Mörttinen, Seppo Orjasniemi, Markus Kari.',
        location: 'Snellmaninkatu 9-11',
        mapsQuery: 'House of the Estates Snellmaninkatu 9 11 Helsinki',
        icon: Landmark,
        accent: 'from-emerald-500 to-teal-600',
      },
      {
        start: '2026-04-23T10:45:00+03:00',
        time: '10:45',
        title: 'Málstofur',
        details: 'Public Governance · Public Sector ICT · Budget & Fiscal Policy.',
        location: 'House of the Estates',
        mapsQuery: 'House of the Estates Helsinki',
        icon: MessageSquare,
        accent: 'from-fuchsia-500 to-pink-500',
      },
      {
        start: '2026-04-23T14:00:00+03:00',
        time: '14:00',
        title: 'Heimsóknir',
        details: 'NIB eða Hansel / Senate.',
        location: 'Helsinki centrum',
        mapsQuery: 'Helsinki city centre',
        icon: Building2,
        accent: 'from-slate-600 to-slate-800',
      },
      {
        start: '2026-04-23T19:00:00+03:00',
        time: '19:00',
        title: 'Kvöldverður á Restaurant Savotta',
        details: 'Finnsk stemning og klassískur matur.',
        location: 'Aleksanterinkatu 22, Helsinki',
        mapsQuery: 'Restaurant Savotta Aleksanterinkatu 22 Helsinki',
        link: 'https://www.savotta.fi',
        linkLabel: 'Skoða Savotta',
        icon: UtensilsCrossed,
        accent: 'from-rose-500 to-red-500',
      },
      {
        start: '2026-04-23T22:00:00+03:00',
        time: '22:00',
        title: 'Djammið með Kidda og Esther',
        details: 'Kvöldstemning.',
        location: 'Helsinki nightlife',
        mapsQuery: 'Helsinki nightlife',
        icon: Beer,
        accent: 'from-violet-500 to-purple-600',
      },
    ],
  },
  {
    day: 'Föstudagur 24. apríl',
    date: '2026-04-24',
    events: [
      {
        start: '2026-04-24T08:45:00+03:00',
        time: '08:45',
        title: 'Stafrænt Finnland (DVV)',
        details: 'Digital and Population Data Services Agency.',
        location: 'Helsinki',
        mapsQuery: 'Digital and Population Data Services Agency Helsinki',
        icon: Route,
        accent: 'from-cyan-500 to-blue-500',
      },
      {
        start: '2026-04-24T12:30:00+03:00',
        time: '12:30',
        title: 'Framtíðarnefndin (þingið)',
        details: 'Heimsókn í finnska þingið.',
        location: 'Mannerheimintie 30, Helsinki',
        mapsQuery: 'Finnish Parliament Mannerheimintie 30 Helsinki',
        icon: Landmark,
        accent: 'from-amber-500 to-yellow-500',
      },
      {
        start: '2026-04-24T17:00:00+03:00',
        time: '17:00',
        title: 'Íslenska sendiráðið',
        details: 'Heimsókn og fordrykkur.',
        location: 'Helsinki',
        mapsQuery: 'Embassy of Iceland Helsinki',
        icon: Building2,
        accent: 'from-indigo-500 to-sky-600',
      },
      {
        start: '2026-04-24T18:00:00+03:00',
        time: '18:00 – 23:00',
        title: 'Hótelveisla',
        details: 'Dresscode: Fínn. Matur: Laxapastrami & nautalund. Atriði: Alvilda Eyvör & DJ Júró Reynir.',
        location: 'Scandic Grand Marina',
        mapsQuery: 'Scandic Grand Marina Katajanokanlaituri 7 Helsinki',
        icon: Hotel,
        accent: 'from-slate-700 to-slate-900',
      },
    ],
  },
  {
    day: 'Laugardagur 25. apríl',
    date: '2026-04-25',
    events: [
      {
        start: '2026-04-25T11:00:00+03:00',
        time: 'Sveigjanlegt',
        title: 'Göngutúr um Helsinki',
        details: 'Gott fyrir kaffihús, markaði og myndir.',
        location: 'Katajanokka / Market Square',
        mapsQuery: 'Kauppatori Helsinki',
        icon: Coffee,
        accent: 'from-emerald-500 to-lime-500',
      },
      {
        start: '2026-04-25T14:00:00+03:00',
        time: '14:00',
        title: 'Frjáls tími',
        details: 'Skoðaðu fögru Helsinki. Listasýning, kaffihús, verslanir.',
        location: 'Central Helsinki',
        mapsQuery: 'Central Helsinki',
        icon: MapIcon,
        accent: 'from-blue-500 to-cyan-500',
      },
    ],
  },
  {
    day: 'Sunnudagur 26. apríl',
    date: '2026-04-26',
    events: [
      {
        start: '2026-04-26T07:10:00+03:00',
        time: '07:10 – 07:50',
        title: 'Flug 1: Finnair (AY991)',
        details: 'HEL → KEF',
        location: 'Helsinki-Vantaa flugvöllur',
        mapsQuery: 'Helsinki Airport',
        icon: Plane,
        accent: 'from-sky-500 to-blue-600',
      },
      {
        start: '2026-04-26T15:50:00+03:00',
        time: '15:50 – 16:30',
        title: 'Flug 2: Finnair (AY993)',
        details: 'HEL → KEF',
        location: 'Helsinki-Vantaa flugvöllur',
        mapsQuery: 'Helsinki Airport',
        icon: Plane,
        accent: 'from-sky-500 to-blue-600',
      },
      {
        start: '2026-04-26T15:00:00+03:00',
        time: '15:00 – 15:40',
        title: 'Flug 3: Icelandair (FI343)',
        details: 'HEL → KEF',
        location: 'Helsinki-Vantaa flugvöllur',
        mapsQuery: 'Helsinki Airport',
        icon: Plane,
        accent: 'from-indigo-500 to-sky-600',
      },
      {
        start: '2026-04-26T11:00:00+03:00',
        time: '06:00',
        title: 'Check out og heimferð',
        details: 'Athuga passann, símahleðslu og ferðatöskur.',
        location: 'Scandic Grand Marina',
        mapsQuery: 'Scandic Grand Marina Katajanokanlaituri 7 Helsinki',
        icon: CircleCheck,
        accent: 'from-slate-600 to-gray-700',
      },
    ],
  },
];

const quickFacts = [
  { label: 'Tímamismunur', value: '+3 klst' },
  { label: 'Gjaldmiðill', value: 'Evra (€)' },
  { label: 'Kranavatn', value: 'Drykkjarhæft' },
  { label: 'Þjórfé', value: 'Ekki ætlast til þess' },
  { label: 'Neyðarnúmer', value: '112' },
];

const phrases = [
  { fi: 'Hei / Terve', is: 'Halló' },
  { fi: 'Kiitos', is: 'Takk' },
  { fi: 'Voisinko saada hanavettä?', is: 'Má ég fá kranavatn?' },
  { fi: 'Yksi olut, kiitos', is: 'Einn bjór, takk' },
  { fi: 'Lasku, kiitos', is: 'Reikninginn, takk' },
  { fi: 'Missä on vessa?', is: 'Hvar er klósettið?' },
  { fi: 'Anteeksi', is: 'Afsakið' },
  { fi: 'Puhutko englantia?', is: 'Talarðu ensku?' },
  { fi: 'Hyvää huomenta', is: 'Góðan daginn' },
  { fi: 'Kippis!', is: 'Skál!' },
  { fi: 'Tervetuloa', is: 'Velkomin' },
  { fi: 'Mitä se maksaa?', is: 'Hvað kostar það?' },
  { fi: 'Sauna', is: 'Sána' },
  { fi: 'Hyvää yötä', is: 'Góða nótt' },
  { fi: 'Näkemiin', is: 'Bless' },
  { fi: 'Minä olen Islannista', is: 'Ég er frá Íslandi' },
  { fi: 'Mitä kuuluu?', is: 'Hvað segirðu gott?' },
];

function formatCountdown(target: Date, now: Date) {
  const diff = target.getTime() - now.getTime();
  if (diff <= 0) return 'Núna';

  const totalMinutes = Math.floor(diff / 60000);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

function googleMapsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('plan');
  const [now, setNow] = useState(() => new Date());
  const [toast, setToast] = useState<string | null>(null);
  const [selectedOutboundFlight, setSelectedOutboundFlight] = useState<Flight | null>(null);
  const [selectedReturnFlight, setSelectedReturnFlight] = useState<Flight | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const allEvents = useMemo(() => days.flatMap((day) => day.events), []);

  const nextEvent = useMemo(() => {
    const upcoming = allEvents
      .map((event) => ({ ...event, startDate: new Date(event.start) }))
      .filter((event) => event.startDate.getTime() >= now.getTime())
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

    return upcoming[0] ?? null;
  }, [allEvents, now]);

  const tripPhase = useMemo(() => {
    if (now < tripStart) return 'Ferðin er fram undan.';
    if (now > tripEnd) return 'Ferðin er búin.';
    return 'Ferðin er í gangi.';
  }, [now]);

  const helsinkiTime = now.toLocaleTimeString('is-IS', {
    timeZone: 'Europe/Helsinki',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const helsinkiDate = now.toLocaleDateString('is-IS', {
    timeZone: 'Europe/Helsinki',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  const copyTripSummary = async () => {
    const text = [
      'Fræðsluferð Finnland — Helsinki 22.–26. apríl 2026',
      'Hótel: Scandic Grand Marina, Katajanokanlaituri 7, Helsinki',
      'Morgunmatur og hjól: innifalið á hóteli.',
    ].join('\n');

    try {
      await navigator.clipboard.writeText(text);
      setToast('Ferðaryfirlit afritað.');
    } catch {
      setToast('Ekki tókst að afrita.');
    }
  };

  const shareTrip = async () => {
    const payload = {
      title: 'Fræðsluferð Finnland — Helsinki',
      text: 'Skoðaðu dagskrána og gagnlegar upplýsingar fyrir ferðina til Helsinki.',
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(payload);
      } else {
        await navigator.clipboard.writeText(`${payload.title}\n${payload.text}\n${payload.url}`);
        setToast('Hlekkur afritaður.');
      }
    } catch {
      setToast('Deiling hætt af notanda.');
    }
  };

  const openInMaps = (query: string) => {
    window.open(googleMapsUrl(query), '_blank', 'noopener,noreferrer');
  };

  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-md flex-col pb-10">
        <header className="overflow-hidden bg-gradient-to-br from-sky-950 via-blue-900 to-indigo-950 text-white shadow-2xl">
          <div className="px-5 pb-6 pt-6">
            <div className="flex items-center justify-between gap-3">
              <div className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90">
                Fræðsluferð til Helsinki
              </div>
              <button
                onClick={shareTrip}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                <Share2 className="h-4 w-4" />
                Deila
              </button>
            </div>

            <div className="mt-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-white/70">Helsinki, Finnland</p>
                <h1 className="mt-1 text-3xl font-bold tracking-tight">Ferðasmáforrit</h1>
                <p className="mt-2 max-w-sm text-sm leading-6 text-white/80">
                  Allt á einum stað: dagskrá, samgöngur, gagnlegar upplýsingar, frasar og kort.
                </p>
              </div>
              <div className="rounded-3xl bg-white/10 p-3 ring-1 ring-white/10">
                <CalendarDays className="h-7 w-7 text-white/90" />
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-3xl bg-white/10 p-4 ring-1 ring-white/10 backdrop-blur">
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">Núna í Helsinki</div>
                <div className="mt-2 text-2xl font-bold tabular-nums">{helsinkiTime}</div>
                <div className="mt-1 text-xs text-white/70">{helsinkiDate}</div>
              </div>

              <div className="rounded-3xl bg-white/10 p-4 ring-1 ring-white/10 backdrop-blur">
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
                  {selectedOutboundFlight ? 'Valið flug' : 'Næst'}
                </div>
                {selectedOutboundFlight ? (
                  <>
                    <div className="mt-2 text-lg font-bold">{selectedOutboundFlight.time}</div>
                    <div className="mt-1 text-sm font-medium text-cyan-200">
                      {selectedOutboundFlight.airline} · {selectedOutboundFlight.code}
                    </div>
                    <div className="mt-1 text-xs text-white/70">{selectedOutboundFlight.route}</div>
                    <button
                      onClick={() => setSelectedOutboundFlight(null)}
                      className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-white/80 underline decoration-white/30 underline-offset-4 hover:text-white"
                    >
                      Hreinsa val
                    </button>
                  </>
                ) : (
                  <>
                    <div className="mt-2 text-lg font-bold">{nextEvent?.time ?? 'Lokið'}</div>
                    <div className="mt-1 line-clamp-2 text-xs text-white/70">
                      {nextEvent?.title ?? 'Engin fleiri atriði skráð.'}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm text-white/85">
              <Sparkles className="h-4 w-4" />
              <span>{tripPhase}</span>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 pt-4">
          <div className="grid grid-cols-3 gap-3">
            <QuickAction icon={MapIcon} label="Hótel á korti" onClick={() => openInMaps('Scandic Grand Marina Katajanokanlaituri 7 Helsinki')} />
            <QuickAction icon={Copy} label="Afrita yfirlit" onClick={copyTripSummary} />
            <QuickAction icon={Book} label="Handbók (PDF)" onClick={() => openLink('https://acrobat.adobe.com/id/urn:aaid:sc:EU:52ecb88a-00df-435b-b40f-5e81c9ad6faf')} />
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            <TabButton active={activeTab === 'plan'} onClick={() => setActiveTab('plan')}>
              Dagskrá
            </TabButton>
            <TabButton active={activeTab === 'transport'} onClick={() => setActiveTab('transport')}>
              Samgöngur
            </TabButton>
            <TabButton active={activeTab === 'useful'} onClick={() => setActiveTab('useful')}>
              Upplýsingar
            </TabButton>
            <TabButton active={activeTab === 'phrases'} onClick={() => setActiveTab('phrases')}>
              Frasar
            </TabButton>
          </div>

          {activeTab === 'plan' && (
            <div className="mt-4 space-y-4">
              <section className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                <SectionHeading icon={Hotel} title="Gisting" />
                <div className="mt-3 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200/70">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                      Morgunmatur & hjól innifalin
                    </span>
                    <span className="text-xs text-slate-500">Hótelið</span>
                  </div>
                  <h2 className="mt-3 text-xl font-bold tracking-tight">Scandic Grand Marina</h2>
                  <p className="mt-1 text-sm text-slate-600">Katajanokanlaituri 7, 00160 Helsinki</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Pill onClick={() => openInMaps('Scandic Grand Marina Katajanokanlaituri 7 Helsinki')}>
                      Opna í korti
                    </Pill>
                    <Pill onClick={() => openLink('https://www.scandichotels.com/hotels/finland/helsinki/scandic-grand-marina')}>
                      Hótelsíða
                    </Pill>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      Morgunmatur innifalinn
                    </li>
                    <li className="flex items-start gap-2">
                      <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      Frí hjól í boði
                    </li>
                  </ul>
                </div>
              </section>

              <section className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                <SectionHeading icon={Plane} title="Flug" />
                <div className="mt-3 space-y-4">
                  <FlightGroup
                    title="Outbound"
                    flights={outboundFlights}
                    selectable
                    selectedFlightCode={selectedOutboundFlight?.code ?? null}
                    onSelectFlight={(flight) => setSelectedOutboundFlight(flight)}
                  />
                  <FlightGroup
                    title="Return"
                    flights={returnFlights}
                    selectable
                    selectedFlightCode={selectedReturnFlight?.code ?? null}
                    onSelectFlight={(flight) => setSelectedReturnFlight(flight)}
                  />
                </div>
              </section>

              <section className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                <SectionHeading icon={Clock3} title="Næsti viðburður" />
                {selectedOutboundFlight ? (
                  <div className="mt-3 rounded-2xl border border-cyan-200 bg-gradient-to-br from-cyan-50 to-white p-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full bg-cyan-600 px-3 py-1 text-xs font-bold text-white">
                        Valið útflug
                      </span>
                      <span className="text-sm font-semibold text-cyan-700">{selectedOutboundFlight.time}</span>
                    </div>
                    <h3 className="mt-3 text-lg font-bold tracking-tight">
                      {selectedOutboundFlight.airline} ({selectedOutboundFlight.code})
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">{selectedOutboundFlight.route}</p>
                    <p className="mt-1 text-sm text-slate-600">Veldu annað outbound flug til að breyta þessari línu.</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Pill onClick={() => setSelectedOutboundFlight(null)}>Hreinsa val</Pill>
                    </div>
                  </div>
                ) : nextEvent ? (
                  <div className="mt-3 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white p-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">
                        Live
                      </span>
                      <span className="text-sm font-semibold text-blue-700">
                        {formatCountdown(new Date(nextEvent.start), now)} eftir
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-bold tracking-tight">{nextEvent.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{nextEvent.time}</p>
                    <p className="mt-1 text-sm text-slate-600">{nextEvent.location}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {nextEvent.mapsQuery && (
                        <Pill onClick={() => openInMaps(nextEvent.mapsQuery!)}>Opna kort</Pill>
                      )}
                      {nextEvent.link && <Pill onClick={() => openLink(nextEvent.link!)}>Opna síðu</Pill>}
                    </div>
                  </div>
                ) : (
                  <div className="mt-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                    Engin fleiri atriði eftir í dagskránni.
                  </div>
                )}
              </section>

              {days.map((day) => (
                <section key={day.date} className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                  <SectionHeading icon={CalendarDays} title={day.day} />
                  <div className="mt-1 text-xs text-slate-500">{day.date}</div>
                  <div className="mt-4 space-y-3">
                    {day.events.map((event) => {
                      const isNext = nextEvent?.start === event.start;
                      const Icon = event.icon;
                      return (
                        <article
                          key={event.start + event.title}
                          className={`rounded-2xl border p-4 transition ${
                            isNext ? 'border-blue-300 bg-blue-50/70 shadow-sm' : 'border-slate-200 bg-slate-50'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`rounded-2xl bg-gradient-to-br ${event.accent} p-3 text-white shadow-sm`}>
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <p className="font-bold tracking-tight text-slate-900">{event.title}</p>
                                <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
                                  {event.time}
                                </span>
                              </div>
                              {event.details && (
                                <p className="mt-1 text-sm leading-6 text-slate-600">{event.details}</p>
                              )}
                              {event.location && (
                                <div className="mt-2 flex items-start gap-2 text-sm text-slate-600">
                                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                                  <span>{event.location}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {event.mapsQuery && (
                              <Pill onClick={() => openInMaps(event.mapsQuery!)}>
                                Kort <Navigation className="h-4 w-4" />
                              </Pill>
                            )}
                            {event.link && (
                              <Pill onClick={() => openLink(event.link!)}>
                                {event.linkLabel ?? 'Síða'} <ExternalLink className="h-4 w-4" />
                              </Pill>
                            )}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>
              ))}

              {selectedReturnFlight && (
                <section className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                  <SectionHeading icon={Plane} title="Valið heimflug" />
                  <div className="mt-3 rounded-2xl border border-cyan-200 bg-gradient-to-br from-cyan-50 to-white p-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full bg-cyan-600 px-3 py-1 text-xs font-bold text-white">
                        Valið heimflug
                      </span>
                      <span className="text-sm font-semibold text-cyan-700">{selectedReturnFlight.time}</span>
                    </div>
                    <h3 className="mt-3 text-lg font-bold tracking-tight">
                      {selectedReturnFlight.airline} ({selectedReturnFlight.code})
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">{selectedReturnFlight.route}</p>
                    <p className="mt-1 text-sm text-slate-600">Veldu annað return flug til að breyta þessari línu.</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Pill onClick={() => setSelectedReturnFlight(null)}>Hreinsa val</Pill>
                    </div>
                  </div>
                </section>
              )}
            </div>
          )}

          {activeTab === 'transport' && (
            <div className="mt-4 space-y-4">
              <section className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                <SectionHeading icon={Train} title="Flugvöllur ↔ miðbær" />
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Helsinki-Vantaa (HEL) er tengdur með lestarleiðum P og I. Akstur er innifalinn fyrir hópinn í gegnum tilboðið frá ÚÚ.
                </p>
                <div className="mt-4 grid gap-3">
                  <TransportRow title="Lest (ABC miði)" time="30–40 mín" price="€4.10" />
                  <TransportRow title="Taxi / Bolt" time="25–30 mín" price="€45–55" />
                  <TransportRow title="Akstur hópsins" time="Samkvæmt dagskrá" price="Innifalið" />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Pill onClick={() => openInMaps('Helsinki Airport to Helsinki city centre')}>
                    Route planner
                  </Pill>
                  <Pill onClick={() => openLink('https://www.hsl.fi/en')}>HSL</Pill>
                </div>
              </section>

              <section className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                <SectionHeading icon={MapIcon} title="Áhugavert í nágrenninu" />
                <div className="mt-4 space-y-2">
                  {[
                    { n: 'Allas Sea Pool', d: '5 mín', e: '🏊' },
                    { n: 'Kauppatori (Market Square)', d: '8 mín', e: '🍎' },
                    { n: 'Uspenski Cathedral', d: '3 mín', e: '⛪' },
                    { n: 'Johan & Nyström Coffee', d: '4 mín', e: '☕' },
                    { n: 'Flying Cinema', d: '6 mín', e: '🍿' },
                  ].map((place) => (
                    <button
                      key={place.n}
                      onClick={() => openInMaps(`${place.n} Helsinki`)}
                      className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left transition hover:bg-slate-100"
                    >
                      <div>
                        <div className="font-semibold text-slate-900">
                          <span className="mr-2">{place.e}</span>
                          {place.n}
                        </div>
                        <div className="mt-1 text-xs text-slate-500">Opna í korti</div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Route className="h-4 w-4" />
                        {place.d}
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            </div>
          )}

          {activeTab === 'useful' && (
            <div className="mt-4 space-y-4">
              <section className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                <SectionHeading icon={Info} title="Gott að vita" />
                <div className="mt-4 space-y-2">
                  {quickFacts.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                    >
                      <span className="text-sm text-slate-600">{item.label}</span>
                      <span className="font-semibold text-slate-900">{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
                  <ShieldCheck className="mr-2 inline-block h-4 w-4" />
                  Mundu eftir evrópska sjúkratryggingakortinu.
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Pill onClick={() => openLink('http://en.ilmatieteenlaitos.fi/local-weather')}>Veður</Pill>
                  <Pill onClick={() => openLink('https://www.hsl.fi/en')}>Samgöngur</Pill>
                </div>
              </section>

              <section className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                <SectionHeading icon={Building2} title="Stofnanir" />
                <div className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                  <InfoLine name="Hansel" text="Miðlæg innkaup / Ríkiskaup." />
                  <InfoLine name="Senate" text="Eignaumsýsla ríkisins." />
                  <InfoLine name="DVV" text="Stafrænt Finnland." />
                  <InfoLine name="Valtiovarainministeriö" text="Fjármálaráðuneytið." />
                </div>
              </section>

              <section className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                <SectionHeading icon={Phone} title="Neyð og stuðningur" />
                <div className="mt-4 grid gap-2 text-sm">
                  <button
                    onClick={() => openLink('')}
                    className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left transition hover:bg-slate-100"
                  >
                    <span>Neyðarnúmer</span>
                    <span className="font-semibold text-slate-900">112</span>
                  </button>
                  <button
                    onClick={() => openInMaps('Helsinki tourist information')}
                    className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left transition hover:bg-slate-100"
                  >
                    <span>Ferðaupplýsingar</span>
                    <span className="font-semibold text-slate-900">Opna á korti</span>
                  </button>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'phrases' && (
            <div className="mt-4 space-y-4">
              <section className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                <SectionHeading icon={MessageSquare} title="Gagnlegir frasar" />
                <div className="mt-4 divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200">
                  {phrases.map((phrase) => (
                    <div key={phrase.fi} className="flex items-center justify-between gap-3 bg-white px-4 py-3">
                      <div>
                        <div className="font-semibold text-blue-800">{phrase.fi}</div>
                        <div className="mt-1 text-sm text-slate-500">{phrase.is}</div>
                      </div>
                      <button
                        onClick={async () => {
                          await navigator.clipboard.writeText(`${phrase.fi} — ${phrase.is}`);
                          setToast('Frasi afritaður.');
                        }}
                        className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-200"
                      >
                        Afrita
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}
        </main>
      </div>

      {toast && (
        <div className="fixed inset-x-0 bottom-5 z-50 mx-auto w-fit max-w-[90vw] rounded-full bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-2xl">
          {toast}
        </div>
      )}
    </div>
  );
}

function SectionHeading({ icon: Icon, title }: { icon: IconType; title: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="rounded-2xl bg-slate-900 p-2 text-white">
        <Icon className="h-4 w-4" />
      </div>
      <h2 className="text-lg font-bold tracking-tight text-slate-900">{title}</h2>
    </div>
  );
}

function QuickAction({
  icon: Icon,
  label,
  onClick,
}: {
  icon: IconType;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 rounded-3xl bg-white p-4 text-center shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="rounded-2xl bg-slate-900 p-3 text-white">
        <Icon className="h-5 w-5" />
      </div>
      <span className="text-xs font-semibold leading-4 text-slate-700">{label}</span>
    </button>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
        active ? 'bg-slate-900 text-white shadow-sm' : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100'
      }`}
    >
      {children}
    </button>
  );
}

function Pill({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
    >
      {children}
    </button>
  );
}

function TransportRow({ title, time, price }: { title: string; time: string; price: string }) {
  return (
    <div className="grid grid-cols-3 items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
      <div className="font-semibold text-slate-900">{title}</div>
      <div className="text-center text-slate-600">{time}</div>
      <div className="text-right font-semibold text-slate-900">{price}</div>
    </div>
  );
}

function InfoLine({ name, text }: { name: string; text: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
      <div className="font-semibold text-slate-900">{name}</div>
      <div className="mt-1 text-slate-600">{text}</div>
    </div>
  );
}

function FlightGroup({
  title,
  flights,
  selectable = false,
  selectedFlightCode,
  onSelectFlight,
}: {
  title: string;
  flights: Flight[];
  selectable?: boolean;
  selectedFlightCode?: string | null;
  onSelectFlight?: (flight: Flight) => void;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">{title}</h3>
        {selectable && <span className="text-xs font-medium text-slate-400">Smelltu til að velja</span>}
      </div>
      <div className="space-y-2">
        {flights.map((flight) => {
          const selected = selectedFlightCode === flight.code;
          return (
            <FlightCard
              key={`${title}-${flight.code}`}
              flight={flight}
              selectable={selectable}
              selected={selected}
              onSelect={() => onSelectFlight?.(flight)}
            />
          );
        })}
      </div>
    </div>
  );
}

function FlightCard({
  flight,
  selectable,
  selected,
  onSelect,
}: {
  flight: Flight;
  selectable: boolean;
  selected: boolean;
  onSelect: () => void;
}) {
  const className = `w-full rounded-2xl border p-4 text-left transition ${
    selected
      ? 'border-cyan-400 bg-cyan-50 shadow-sm ring-1 ring-cyan-200'
      : flight.highlight
        ? 'border-blue-300 bg-blue-50'
        : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
  }`;

  const content = (
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{flight.airline}</div>
        <div className="mt-1 flex items-center gap-2">
          <div className="text-base font-bold text-slate-900">{flight.code}</div>
          {selected && <span className="rounded-full bg-cyan-600 px-2 py-0.5 text-[11px] font-bold text-white">Valið</span>}
        </div>
        <div className="mt-1 text-sm text-slate-600">{flight.route}</div>
      </div>
      <div className="flex items-center gap-2">
        <div className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-slate-800 ring-1 ring-slate-200">
          {flight.time}
        </div>
        {selectable && <ChevronRight className="h-4 w-4 text-slate-400" />}
      </div>
    </div>
  );

  if (!selectable) {
    return <div className={className}>{content}</div>;
  }

  return (
    <button type="button" onClick={onSelect} className={className} aria-pressed={selected}>
      {content}
    </button>
  );
}

export default App;
