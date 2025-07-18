import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Clock, Globe, Palette, ChevronDown } from "lucide-react";

// Initialize dayjs plugins
dayjs.extend(utc);
dayjs.extend(timezone);

interface Country {
  name: string;
  timezone: string;
  flag: string;
}

interface Theme {
  id: string;
  name: string;
  gradient: string;
  overlay: string;
}

const themes: Theme[] = [
  {
    id: "golden",
    name: "Golden Mirage",
    gradient: "from-gray-900 via-blue-900 to-slate-700",
    overlay: "from-blue-400/20 via-orange-300/20 to-orange-gray-900/20",
  },
  {
    id: "mint",
    name: "Mint Whirl",
    gradient: "from-teal-400 via-teal-400 to-emerald-200",
    overlay: "from-lime-200/20 via-lime-100/20 to-cyan-100/20",
  },
  {
    id: "solar",
    name: "Solar Drift",
    gradient: "from-yellow-400 via-amber-500 to-fuchsia-600",
    overlay: "from-orange-300/20 via-pink-400/20 to-purple-500/20",
  },
  {
    id: "cyber",
    name: "Cyber Bloom",
    gradient: "from-fuchsia-500 via-violet-600 to-indigo-700",
    overlay: "from-lime-400/20 via-cyan-500/20 to-pink-400/20",
  },
];

const shortcutCountries: Country[] = [
  { name: "United States", timezone: "America/New_York", flag: "us" },
  { name: "United Kingdom", timezone: "Europe/London", flag: "gb" },
  { name: "Japan", timezone: "Asia/Tokyo", flag: "jp" },
  { name: "Australia", timezone: "Australia/Sydney", flag: "au" },
  { name: "Germany", timezone: "Europe/Berlin", flag: "de" },
  { name: "China", timezone: "Asia/Shanghai", flag: "cn" },
];

const allCountries: Country[] = [
  { name: "Afghanistan", timezone: "Asia/Kabul", flag: "af" },
  { name: "Albania", timezone: "Europe/Tirane", flag: "al" },
  { name: "Algeria", timezone: "Africa/Algiers", flag: "dz" },
  { name: "Argentina", timezone: "America/Argentina/Buenos_Aires", flag: "ar" },
  { name: "Armenia", timezone: "Asia/Yerevan", flag: "am" },
  { name: "Australia", timezone: "Australia/Sydney", flag: "au" },
  { name: "Austria", timezone: "Europe/Vienna", flag: "at" },
  { name: "Azerbaijan", timezone: "Asia/Baku", flag: "az" },
  { name: "Bahrain", timezone: "Asia/Bahrain", flag: "bh" },
  { name: "Bangladesh", timezone: "Asia/Dhaka", flag: "bd" },
  { name: "Belarus", timezone: "Europe/Minsk", flag: "by" },
  { name: "Belgium", timezone: "Europe/Brussels", flag: "be" },
  { name: "Bolivia", timezone: "America/La_Paz", flag: "bo" },
  { name: "Brazil", timezone: "America/Sao_Paulo", flag: "br" },
  { name: "Bulgaria", timezone: "Europe/Sofia", flag: "bg" },
  { name: "Cambodia", timezone: "Asia/Phnom_Penh", flag: "kh" },
  { name: "Canada", timezone: "America/Toronto", flag: "ca" },
  { name: "Chile", timezone: "America/Santiago", flag: "cl" },
  { name: "China", timezone: "Asia/Shanghai", flag: "cn" },
  { name: "Colombia", timezone: "America/Bogota", flag: "co" },
  { name: "Croatia", timezone: "Europe/Zagreb", flag: "hr" },
  { name: "Czech Republic", timezone: "Europe/Prague", flag: "cz" },
  { name: "Denmark", timezone: "Europe/Copenhagen", flag: "dk" },
  { name: "Ecuador", timezone: "America/Guayaquil", flag: "ec" },
  { name: "Egypt", timezone: "Africa/Cairo", flag: "eg" },
  { name: "Estonia", timezone: "Europe/Tallinn", flag: "ee" },
  { name: "Ethiopia", timezone: "Africa/Addis_Ababa", flag: "et" },
  { name: "Finland", timezone: "Europe/Helsinki", flag: "fi" },
  { name: "France", timezone: "Europe/Paris", flag: "fr" },
  { name: "Georgia", timezone: "Asia/Tbilisi", flag: "ge" },
  { name: "Germany", timezone: "Europe/Berlin", flag: "de" },
  { name: "Ghana", timezone: "Africa/Accra", flag: "gh" },
  { name: "Greece", timezone: "Europe/Athens", flag: "gr" },
  { name: "Hungary", timezone: "Europe/Budapest", flag: "hu" },
  { name: "Iceland", timezone: "Atlantic/Reykjavik", flag: "is" },
  { name: "India", timezone: "Asia/Kolkata", flag: "in" },
  { name: "Indonesia", timezone: "Asia/Jakarta", flag: "id" },
  { name: "Iran", timezone: "Asia/Tehran", flag: "ir" },
  { name: "Iraq", timezone: "Asia/Baghdad", flag: "iq" },
  { name: "Ireland", timezone: "Europe/Dublin", flag: "ie" },
  { name: "Italy", timezone: "Europe/Rome", flag: "it" },
  { name: "Japan", timezone: "Asia/Tokyo", flag: "jp" },
  { name: "Jordan", timezone: "Asia/Amman", flag: "jo" },
  { name: "Kazakhstan", timezone: "Asia/Almaty", flag: "kz" },
  { name: "Kenya", timezone: "Africa/Nairobi", flag: "ke" },
  { name: "Kuwait", timezone: "Asia/Kuwait", flag: "kw" },
  { name: "Latvia", timezone: "Europe/Riga", flag: "lv" },
  { name: "Lebanon", timezone: "Asia/Beirut", flag: "lb" },
  { name: "Lithuania", timezone: "Europe/Vilnius", flag: "lt" },
  { name: "Luxembourg", timezone: "Europe/Luxembourg", flag: "lu" },
  { name: "Malaysia", timezone: "Asia/Kuala_Lumpur", flag: "my" },
  { name: "Mexico", timezone: "America/Mexico_City", flag: "mx" },
  { name: "Morocco", timezone: "Africa/Casablanca", flag: "ma" },
  { name: "Netherlands", timezone: "Europe/Amsterdam", flag: "nl" },
  { name: "New Zealand", timezone: "Pacific/Auckland", flag: "nz" },
  { name: "Nigeria", timezone: "Africa/Lagos", flag: "ng" },
  { name: "Norway", timezone: "Europe/Oslo", flag: "no" },
  { name: "Oman", timezone: "Asia/Muscat", flag: "om" },
  { name: "Pakistan", timezone: "Asia/Karachi", flag: "pk" },
  { name: "Palestine", timezone: "Asia/Gaza", flag: "ps" },
  { name: "Peru", timezone: "America/Lima", flag: "pe" },
  { name: "Philippines", timezone: "Asia/Manila", flag: "ph" },
  { name: "Poland", timezone: "Europe/Warsaw", flag: "pl" },
  { name: "Portugal", timezone: "Europe/Lisbon", flag: "pt" },
  { name: "Qatar", timezone: "Asia/Qatar", flag: "qa" },
  { name: "Romania", timezone: "Europe/Bucharest", flag: "ro" },
  { name: "Russia", timezone: "Europe/Moscow", flag: "ru" },
  { name: "Saudi Arabia", timezone: "Asia/Riyadh", flag: "sa" },
  { name: "Serbia", timezone: "Europe/Belgrade", flag: "rs" },
  { name: "Singapore", timezone: "Asia/Singapore", flag: "sg" },
  { name: "Slovakia", timezone: "Europe/Bratislava", flag: "sk" },
  { name: "Slovenia", timezone: "Europe/Ljubljana", flag: "si" },
  { name: "South Africa", timezone: "Africa/Johannesburg", flag: "za" },
  { name: "South Korea", timezone: "Asia/Seoul", flag: "kr" },
  { name: "Spain", timezone: "Europe/Madrid", flag: "es" },
  { name: "Sri Lanka", timezone: "Asia/Colombo", flag: "lk" },
  { name: "Sweden", timezone: "Europe/Stockholm", flag: "se" },
  { name: "Switzerland", timezone: "Europe/Zurich", flag: "ch" },
  { name: "Taiwan", timezone: "Asia/Taipei", flag: "tw" },
  { name: "Thailand", timezone: "Asia/Bangkok", flag: "th" },
  { name: "Turkey", timezone: "Europe/Istanbul", flag: "tr" },
  { name: "Ukraine", timezone: "Europe/Kiev", flag: "ua" },
  { name: "United Arab Emirates", timezone: "Asia/Dubai", flag: "ae" },
  { name: "United Kingdom", timezone: "Europe/London", flag: "gb" },
  { name: "United States (NY)", timezone: "America/New_York", flag: "us" },
  { name: "United States (LA)", timezone: "America/Los_Angeles", flag: "us" },
  { name: "Uruguay", timezone: "America/Montevideo", flag: "uy" },
  { name: "Venezuela", timezone: "America/Caracas", flag: "ve" },
  { name: "Vietnam", timezone: "Asia/Ho_Chi_Minh", flag: "vn" },
];

const WorldClock = () => {
  const [currentTime, setCurrentTime] = useState(dayjs());
  const [pulse, setPulse] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [activeTab, setActiveTab] = useState("shortcuts");
  const [selectedTheme, setSelectedTheme] = useState<string>(() => {
    return localStorage.getItem("world-clock-theme") || "ocean";
  });

  const mainCity = {
    city: "Kuala Lumpur",
    country: "Malaysia",
    timezone: "Asia/Kuala_Lumpur",
    flag: <img alt="Malaysia Flag" src={`https://flagcdn.com/24x18/my.png`} />,
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(dayjs());
      setPulse(true);
      setTimeout(() => setPulse(false), 100);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem("world-clock-theme", selectedTheme);
  }, [selectedTheme]);

  const formatTime = (timezone: string) => {
    const time = currentTime.tz(timezone);
    return {
      time: time.format("HH:mm:ss"),
      date: time.format("dddd, MMMM D, YYYY"),
      hours: time.format("HH"),
      minutes: time.format("mm"),
      seconds: time.format("ss"),
    };
  };

  const mainTime = formatTime(mainCity.timezone);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
  };

  const handleThemeChange = (themeId: string) => {
    setSelectedTheme(themeId);
  };

  const [searchQuery, setSearchQuery] = useState("");
  const filteredCountries = allCountries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentTheme =
    themes.find((theme) => theme.id === selectedTheme) || themes[0];

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${currentTheme.gradient} p-4 overflow-hidden relative`}
    >
      {/* Animated background overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${currentTheme.overlay} animate-pulse pointer-events-none`}
      ></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header with Theme Selector */}
        <div className="flex justify-between items-start mb-4">
          <div className="text-center flex-1  my-10">
            <div className="flex items-center mb-5 justify-center gap-3">
              <Clock className="w-6 h-6 text-white drop-shadow-lg" />
              <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                World Live Clock
              </h1>
            </div>
            <p className="text-white/90 text-sm drop-shadow">
              Stay connected with time zones around the world
            </p>
          </div>

          {/* Theme Selector Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex fixed top-2 right-2 items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white transition-all duration-200 hover:scale-105">
                <Palette className="w-4 h-4" />
                <span className="text-sm font-medium">{currentTheme.name}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="bg-slate-800/95 backdrop-blur-md border-slate-600 min-w-[180px]"
              align="end"
            >
              {themes.map((theme) => (
                <DropdownMenuItem
                  key={theme.id}
                  onClick={() => handleThemeChange(theme.id)}
                  className="text-white hover:bg-slate-700/50 focus:bg-slate-700/50 cursor-pointer"
                >
                  <div className="flex items-center gap-3 w-full">
                    <div
                      className={`w-4 h-4 rounded-full bg-gradient-to-r ${theme.gradient} border border-white/20`}
                    ></div>
                    <span className="flex-1">{theme.name}</span>
                    {selectedTheme === theme.id && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Main Clock - Malaysia with dynamic theme */}
        <Card
          className={`mb-4 bg-gradient-to-r ${currentTheme.gradient} border-transparent backdrop-blur-sm shadow-2xl transform hover:scale-[1.02] transition-all duration-300`}
        >
          <CardContent className="p-4 text-center relative overflow-hidden">
            {/* Animated gradient overlay for extra vibrancy */}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${currentTheme.overlay} animate-pulse`}
            ></div>

            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-2xl drop-shadow-lg">{mainCity.flag}</span>
                <div>
                  <h2 className="text-xl font-bold text-white drop-shadow-lg">
                    {mainCity.city}
                  </h2>
                  <p className="text-white/90 text-sm drop-shadow">
                    {mainCity.country}
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1 text-3xl md:text-4xl font-mono font-bold text-white drop-shadow-lg">
                  <span>{mainTime.hours}</span>
                  <span
                    className={`transition-opacity duration-100 ${
                      pulse ? "opacity-50" : "opacity-100"
                    }`}
                  >
                    :
                  </span>
                  <span>{mainTime.minutes}</span>
                  <span
                    className={`transition-opacity duration-100 ${
                      pulse ? "opacity-50" : "opacity-100"
                    }`}
                  >
                    :
                  </span>
                  <span
                    className={`transition-all duration-100 ${
                      pulse ? "scale-110 text-yellow-200" : "scale-100"
                    }`}
                  >
                    {mainTime.seconds}
                  </span>
                </div>
                <p className="text-white/90 text-sm drop-shadow">
                  {mainTime.date}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Country Selection Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
          <TabsList className="grid w-full grid-cols-2 bg-white/10 backdrop-blur-sm">
            <TabsTrigger
              value="shortcuts"
              className="text-white data-[state=active]:bg-white/20"
            >
              Quick Select
            </TabsTrigger>
            <TabsTrigger
              value="all"
              className="text-white data-[state=active]:bg-white/20"
            >
              All Countries
            </TabsTrigger>
          </TabsList>

          <TabsContent value="shortcuts" className="mt-3">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
              {shortcutCountries.map((country) => (
                <button
                  key={country.name}
                  onClick={() => handleCountrySelect(country)}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg p-2 text-white transition-all duration-200 hover:scale-105 backdrop-blur-sm"
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-lg">
                      <img
                        src={`https://flagcdn.com/24x18/${country.flag}.png`}
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                        alt={`${country.name} Flag`}
                        className="w-5 h-3 mr-2"
                      />
                    </span>
                    <span className="text-xs font-medium text-center">
                      {country.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="all" className="mt-3">
      <div className="flex items-center justify-center gap-2 mb-3">
        <Globe className="w-5 h-5 text-white drop-shadow" />
        <h3 className="text-lg font-semibold text-white drop-shadow">
          Select a Country
        </h3>
      </div>

      <div className="max-w-md mx-auto">
        <Select
          onValueChange={(value) => {
            const country = allCountries.find((c) => c.name === value);
            if (country) handleCountrySelect(country);
          }}
        >
          <SelectTrigger className="w-full bg-white/10 border-white/20 text-white backdrop-blur-sm">
            <SelectValue placeholder="Choose a country..." />
          </SelectTrigger>

          <SelectContent className="bg-slate-800/95 backdrop-blur-md border-slate-600 max-h-60 overflow-y-auto">
            {/* 🔍 Search Input */}
            <div className="px-3 py-2 sticky top-0 bg-slate-800/95 z-10">
              <input
                type="text"
                placeholder="Search..."
                className="input input-sm w-full bg-white/10 text-white placeholder-white/70"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* 🌍 Filtered Country List */}
            {filteredCountries.map((country) => (
              <SelectItem
                key={country.name}
                value={country.name}
                className="text-white hover:bg-slate-700/50 focus:bg-slate-700/50"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={`https://flagcdn.com/24x18/${country.flag}.png`}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                    alt={`${country.name} Flag`}
                    className="w-5 h-3 mr-2"
                  />
                  <span className="text-sm font-medium">{country.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </TabsContent>

        </Tabs>

        {/* Selected Country Clock */}
        {selectedCountry && (
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm mb-4">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <img
                  src={`https://flagcdn.com/24x18/${selectedCountry.flag}.png`}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                  alt={`${selectedCountry.name} Flag`}
                  className="w-5 h-3 mr-2"
                />

                <div>
                  <h3 className="text-xl font-bold text-white drop-shadow">
                    {selectedCountry.name}
                  </h3>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1 text-2xl md:text-3xl font-mono font-bold text-white drop-shadow">
                  <span>{formatTime(selectedCountry.timezone).hours}</span>
                  <span
                    className={`transition-opacity duration-100 ${
                      pulse ? "opacity-50" : "opacity-100"
                    }`}
                  >
                    :
                  </span>
                  <span>{formatTime(selectedCountry.timezone).minutes}</span>
                  <span
                    className={`transition-opacity duration-100 ${
                      pulse ? "opacity-50" : "opacity-100"
                    }`}
                  >
                    :
                  </span>
                  <span
                    className={`transition-all duration-100 ${
                      pulse ? "scale-110 text-yellow-200" : "scale-100"
                    }`}
                  >
                    {formatTime(selectedCountry.timezone).seconds}
                  </span>
                </div>
                <p className="text-white/90 text-sm drop-shadow">
                  {formatTime(selectedCountry.timezone).date}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center">
          <p className="text-white/80 text-xs drop-shadow">
            Live updates every second • Times are synchronized with your system
            clock
          </p>
          <p className="text-white/60 text-xs mt-2 fixed bottom-4 left-0 right-0 w-full">
            Made with ❤️ by {"Shamsul-Ariff"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorldClock;
