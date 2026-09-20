import React, { useState, useEffect, useMemo } from 'react';
import { 
  Home, Clock3, Search, Compass, Sparkles, Music2, CreditCard, 
  MapPin, HeartPulse, X, Activity, ShoppingBag, Plane,
  Calendar, Dumbbell, Film, Tag, ArrowUpRight
} from 'lucide-react';

const MOMENTS_DATA_RAW = [
  {
    "id": "moment-1",
    "title": "A Health-Focused Trace",
    "date": "16 Aug 2022",
    "start": "2022-08-16T06:51:46",
    "end": "2022-08-16T07:09:19",
    "source": "Spotify + Transactions",
    "connection": { "rule": "Activities within 30 minutes", "maxMinutes": 30 },
    "category": "fitness_and_medical",
    "transaction": { "count": 1, "amount": 4568.05, "time": "07:05 AM" },
    "music": { "recordCount": 11 },
    "tracks": [
      { "track": "R U Mine?", "artist": "Arctic Monkeys", "time": "06:51 AM" },
      { "track": "R U Mine?", "artist": "Arctic Monkeys", "time": "06:54 AM" },
      { "track": "Just What I Needed", "artist": "The Cars", "time": "06:58 AM" },
      { "track": "12:51", "artist": "The Strokes", "time": "07:00 AM" }
    ],
    "tags": [
      { "text": "Music (11 records)", "type": "music" },
      { "text": "Fitness & Medical (1)", "type": "transaction" }
    ]
  },
  {
    "id": "moment-2",
    "title": "A Listening & Entertainment Trace",
    "date": "08 Oct 2023",
    "start": "2023-10-08T16:15:00",
    "end": "2023-10-08T16:45:33",
    "source": "Spotify + Transactions",
    "connection": { "rule": "Activities within 30 minutes", "maxMinutes": 30 },
    "category": "entertainment",
    "transaction": { "count": 1, "amount": 7184.18, "time": "04:16 PM" },
    "music": { "recordCount": 12 },
    "tracks": [
      { "track": "Yes Sir, No Sir - 2019 Remaster", "artist": "The Kinks", "time": "04:15 PM" },
      { "track": "People", "artist": "AWOLNATION", "time": "04:17 PM" },
      { "track": "Act Naturally - Remastered 2009", "artist": "The Beatles", "time": "04:17 PM" },
      { "track": "Con Te Partirò", "artist": "Andrea Bocelli", "time": "04:21 PM" }
    ],
    "tags": [
      { "text": "Music (12 records)", "type": "music" },
      { "text": "Entertainment (1)", "type": "transaction" }
    ]
  },
  {
    "id": "moment-3",
    "title": "A Late-Night Entertainment Trace",
    "date": "24 Mar 2024",
    "start": "2024-03-24T21:10:46",
    "end": "2024-03-24T22:02:42",
    "source": "Spotify + Transactions",
    "connection": { "rule": "Activities within 30 minutes", "maxMinutes": 30 },
    "category": "entertainment",
    "transaction": { "count": 1, "amount": 3777.43, "time": "09:39 PM" },
    "music": { "recordCount": 12 },
    "tracks": [
      { "track": "Perfect", "artist": "Ed Sheeran", "time": "09:10 PM" },
      { "track": "If Not for You (2014 Remaster)", "artist": "George Harrison", "time": "09:14 PM" },
      { "track": "Everything's Not Lost", "artist": "Coldplay", "time": "09:21 PM" },
      { "track": "Not In That Way", "artist": "Sam Smith", "time": "09:24 PM" }
    ],
    "tags": [
      { "text": "Music (12 records)", "type": "music" },
      { "text": "Entertainment (1)", "type": "transaction" }
    ]
  },
  {
    "id": "moment-4",
    "title": "A Shopping & Listening Trace",
    "date": "20 Jun 2022",
    "start": "2022-06-20T04:44:51",
    "end": "2022-06-20T04:48:00",
    "source": "Spotify + Transactions",
    "connection": { "rule": "Activities within 30 minutes", "maxMinutes": 30 },
    "category": "online_shopping",
    "transaction": { "count": 1, "amount": 6261.72, "time": "04:48 AM" },
    "music": { "recordCount": 10 },
    "tracks": [
      { "track": "We Don't Deserve Love", "artist": "Arcade Fire", "time": "04:44 AM" },
      { "track": "We Don't Deserve Love", "artist": "Arcade Fire", "time": "04:45 AM" },
      { "track": "Leave Your Lover", "artist": "Sam Smith", "time": "04:45 AM" },
      { "track": "Hurt", "artist": "Johnny Cash", "time": "04:45 AM" }
    ],
    "tags": [
      { "text": "Music (10 records)", "type": "music" },
      { "text": "Online Shopping (1)", "type": "transaction" }
    ]
  },
  {
    "id": "moment-5",
    "title": "A Morning Entertainment Trace",
    "date": "02 Feb 2023",
    "start": "2023-02-02T04:50:48",
    "end": "2023-02-02T05:32:20",
    "source": "Spotify + Transactions",
    "connection": { "rule": "Activities within 30 minutes", "maxMinutes": 30 },
    "category": "entertainment",
    "transaction": { "count": 1, "amount": 488.77, "time": "05:05 AM" },
    "music": { "recordCount": 12 },
    "tracks": [
      { "track": "Colombina - Remastered", "artist": "Jaime Roos", "time": "04:50 AM" },
      { "track": "Put Your Life on It", "artist": "Kasabian", "time": "04:55 AM" },
      { "track": "Whistle For The Choir", "artist": "The Fratellis", "time": "04:59 AM" },
      { "track": "Mila Song", "artist": "Lacashora", "time": "05:04 AM" }
    ],
    "tags": [
      { "text": "Music (12 records)", "type": "music" },
      { "text": "Entertainment (1)", "type": "transaction" }
    ]
  },
  {
    "id": "moment-6",
    "title": "A Midnight Health Trace",
    "date": "03 Mar 2023",
    "start": "2023-03-02T23:52:00",
    "end": "2023-03-03T00:36:24",
    "source": "Spotify + Transactions",
    "connection": { "rule": "Activities within 30 minutes", "maxMinutes": 30 },
    "category": "fitness_and_medical",
    "transaction": { "count": 1, "amount": 9008.4, "time": "12:07 AM" },
    "music": { "recordCount": 12 },
    "tracks": [
      { "track": "Miss Atomic Bomb", "artist": "The Killers", "time": "11:52 PM" },
      { "track": "Flesh And Bone", "artist": "The Killers", "time": "11:56 PM" },
      { "track": "Imploding The Mirage", "artist": "The Killers", "time": "12:00 AM" },
      { "track": "Quiet Town - Abridged", "artist": "The Killers", "time": "12:04 AM" }
    ],
    "tags": [
      { "text": "Music (12 records)", "type": "music" },
      { "text": "Fitness & Medical (1)", "type": "transaction" }
    ]
  },
  {
    "id": "moment-7",
    "title": "A Travel & Listening Trace",
    "date": "24 Nov 2023",
    "start": "2023-11-24T04:28:57",
    "end": "2023-11-24T05:21:11",
    "source": "Spotify + Transactions",
    "connection": { "rule": "Activities within 30 minutes", "maxMinutes": 30 },
    "category": "travel",
    "transaction": { "count": 1, "amount": null, "time": "04:55 AM" },
    "music": { "recordCount": 12 },
    "tracks": [
      { "track": "Natural High - Single Version", "artist": "Bloodstone", "time": "04:28 AM" },
      { "track": "Should I Take You Home", "artist": "Bobby Oroza", "time": "04:32 AM" },
      { "track": "Cumbia Sobre el Mar", "artist": "Quantic", "time": "04:39 AM" },
      { "track": "クール・ヘッド", "artist": "ゼロ戦", "time": "04:44 AM" }
    ],
    "tags": [
      { "text": "Music (12 records)", "type": "music" },
      { "text": "Travel (1)", "type": "transaction" }
    ]
  },
  {
    "id": "moment-8",
    "title": "A Midnight Health Trace",
    "date": "16 Aug 2023",
    "start": "2023-08-15T23:59:03",
    "end": "2023-08-16T00:26:49",
    "source": "Spotify + Transactions",
    "connection": { "rule": "Activities within 30 minutes", "maxMinutes": 30 },
    "category": "fitness_and_medical",
    "transaction": { "count": 1, "amount": 440.36, "time": "12:03 AM" },
    "music": { "recordCount": 11 },
    "tracks": [
      { "track": "For Eddy", "artist": "Aliotta Haynes Jeremiah", "time": "11:59 PM" },
      { "track": "El Derroche - Crónica De Fiesta Pt.1", "artist": "Caloncho", "time": "12:01 AM" },
      { "track": "Home", "artist": "Daughtry", "time": "12:01 AM" },
      { "track": "La Flor de la Canela (with Joaquín Sabina)", "artist": "Maria Dolores Pradera", "time": "12:02 AM" }
    ],
    "tags": [
      { "text": "Music (11 records)", "type": "music" },
      { "text": "Fitness & Medical (1)", "type": "transaction" }
    ]
  }
];

const CATEGORY_CONFIG = {
  All: { label: 'All', icon: Sparkles, color: 'from-cyan-500 to-blue-500' },
  Fitness: { label: 'Fitness & Health', icon: Dumbbell, color: 'from-rose-500 to-red-500' },
  Entertainment: { label: 'Entertainment', icon: Film, color: 'from-purple-500 to-indigo-500' },
  Shopping: { label: 'Online Shopping', icon: ShoppingBag, color: 'from-amber-500 to-yellow-500' },
  Travel: { label: 'Travel', icon: Plane, color: 'from-emerald-500 to-teal-500' }
};

const CATEGORY_IMAGES = {
  Fitness: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
  Entertainment: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
  Shopping: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
  Travel: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80"
};

const normalizeCategory = (cat) => {
  if (!cat) return 'Entertainment';
  const lower = cat.toLowerCase();
  if (lower.includes('fitness') || lower.includes('health') || lower.includes('medical')) return 'Fitness';
  if (lower.includes('entertainment') || lower.includes('music')) return 'Entertainment';
  if (lower.includes('shopping') || lower.includes('store')) return 'Shopping';
  if (lower.includes('travel')) return 'Travel';
  return 'Entertainment';
};

export default function App() {
  const [activeTab, setActiveTab] = useState('Explore');
  const [momentsData, setMomentsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  useEffect(() => {
    setMomentsData(MOMENTS_DATA_RAW);
  }, []);

  const formattedMoments = useMemo(() => {
    return momentsData.map((item, index) => {
      const canonicalCat = normalizeCategory(item.category);
      const categoryInfo = CATEGORY_CONFIG[canonicalCat] || CATEGORY_CONFIG.Entertainment;

      const formattedAmount = item.transaction && item.transaction.amount 
        ? `₹${item.transaction.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}` 
        : 'Logged';

      const topTrack = item.tracks && item.tracks.length > 0 ? item.tracks[0] : null;
      const merchant = topTrack ? `${topTrack.artist}` : item.source;
      const title = topTrack ? `Listening: ${topTrack.track}` : item.title;

      return {
        id: item.id || `moment-${index}`,
        merchant: merchant,
        title: item.title,
        topTrackTitle: topTrack ? topTrack.track : 'Various Tracks',
        category: canonicalCat,
        categoryInfo: categoryInfo,
        amount: formattedAmount,
        date: item.date,
        time: item.transaction ? item.transaction.time : '',
        city: "Trace Activity",
        image: CATEGORY_IMAGES[canonicalCat] || CATEGORY_IMAGES.Entertainment,
        tags: item.tags ? item.tags.map(t => t.text) : [],
        rawTracks: item.tracks || []
      };
    });
  }, [momentsData]);

  const filteredMoments = useMemo(() => {
    return formattedMoments.filter(moment => {
      const matchesCategory = selectedCategory === 'All' || moment.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        moment.merchant.toLowerCase().includes(query) ||
        moment.title.toLowerCase().includes(query) ||
        moment.topTrackTitle.toLowerCase().includes(query) ||
        moment.tags.some(tag => tag.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [formattedMoments, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#0a0d14] text-slate-100 flex font-sans overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[160px] pointer-events-none" />

      {/* Main Content View */}
      <main className="flex-1 ml-16 p-4 sm:p-6 md:p-8 max-w-7xl mx-auto min-h-screen">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-2 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>Personal Life Stream</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Moments & Traces
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Cross-referenced logs connecting Spotify music listening traces with financial transactions.
            </p>
          </div>
        </header>

        <section className="space-y-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search tracks, artists, or transaction categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/80 border border-slate-800 focus:border-cyan-500/80 rounded-xl pl-10 pr-10 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {Object.entries(CATEGORY_CONFIG).map(([key, config]) => {
              const Icon = config.icon;
              const isActive = selectedCategory === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`group relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? 'text-white shadow-lg shadow-cyan-500/20 border border-cyan-400/40 bg-slate-800'
                      : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 relative z-10 ${isActive ? 'text-cyan-300' : 'text-slate-400'}`} />
                  <span className="relative z-10">{config.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Moments Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMoments.map((moment) => {
            const CategoryIcon = moment.categoryInfo.icon;
            return (
              <div
                key={moment.id}
                onClick={() => setSelectedReceipt(moment)}
                className="group relative rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden flex flex-col justify-between cursor-pointer backdrop-blur-md"
              >
                <div className="relative h-44 w-full overflow-hidden bg-slate-950">
                  <img src={moment.image} alt={moment.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-700/60 backdrop-blur-md text-xs font-semibold text-slate-200">
                    <CategoryIcon className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{moment.categoryInfo.label}</span>
                  </div>

                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/40 backdrop-blur-md text-xs font-bold text-emerald-400">
                    {moment.amount}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-xs font-medium text-cyan-300 uppercase tracking-wider mb-0.5">{moment.merchant}</p>
                    <h3 className="text-base font-bold text-white line-clamp-1">{moment.title}</h3>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        {moment.date}
                      </span>
                      {moment.time && (
                        <span className="flex items-center gap-1.5 text-slate-400 font-mono">
                          <Clock3 className="w-3 h-3 text-slate-500" />
                          {moment.time}
                        </span>
                      )}
                    </div>

                    {moment.rawTracks.length > 0 && (
                      <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60 space-y-1">
                        <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold flex items-center gap-1">
                          <Music2 className="w-3 h-3 text-cyan-400" /> Top Track Listening
                        </p>
                        <p className="text-xs font-semibold text-slate-200 truncate">{moment.rawTracks[0].track}</p>
                        <p className="text-[11px] text-slate-400 truncate">{moment.rawTracks[0].artist}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/60">
                    {moment.tags.map((tag, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-800/60 border border-slate-700/40 text-[10px] font-medium text-slate-300">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {selectedReceipt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-6 relative shadow-2xl">
              <button 
                onClick={() => setSelectedReceipt(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800/50"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-2">
                  <selectedReceipt.categoryInfo.icon className="w-3.5 h-3.5" />
                  <span>{selectedReceipt.categoryInfo.label}</span>
                </div>
                <h2 className="text-xl font-bold text-white">{selectedReceipt.title}</h2>
                <p className="text-xs text-slate-400 mt-0.5">{selectedReceipt.date} • Transaction Amount: <span className="text-emerald-400 font-bold">{selectedReceipt.amount}</span></p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Music2 className="w-4 h-4 text-cyan-400" /> Correlated Spotify Tracks
                </h4>
                <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                  {selectedReceipt.rawTracks.map((t, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs">
                      <div>
                        <p className="font-semibold text-slate-200">{t.track}</p>
                        <p className="text-[11px] text-slate-400">{t.artist}</p>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                        {t.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800">
                {selectedReceipt.tags.map((tag, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/50 text-xs text-slate-300">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}