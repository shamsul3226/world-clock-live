
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Clock, Globe, Palette, ChevronDown } from 'lucide-react';

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
    id: 'ocean',
    name: 'Ocean Breeze',
    gradient: 'from-emerald-400 via-cyan-500 to-blue-600',
    overlay: 'from-pink-400/20 via-purple-500/20 to-indigo-500/20'
  },
  {
    id: 'sunset',
    name: 'Sunset Glow',
    gradient: 'from-orange-400 via-pink-500 to-purple-600',
    overlay: 'from-yellow-400/20 via-red-500/20 to-pink-500/20'
  },
  {
    id: 'aurora',
    name: 'Aurora',
    gradient: 'from-green-400 via-teal-500 to-purple-600',
    overlay: 'from-emerald-400/20 via-cyan-500/20 to-purple-500/20'
  },
  {
    id: 'royal',
    name: 'Royal',
    gradient: 'from-purple-500 via-indigo-500 to-blue-700',
    overlay: 'from-violet-400/20 via-blue-500/20 to-indigo-600/20'
  }
];

const shortcutCountries: Country[] = [
  { name: 'United States', timezone: 'America/New_York', flag: '🇺🇸' },
  { name: 'United Kingdom', timezone: 'Europe/London', flag: '🇬🇧' },
  { name: 'Japan', timezone: 'Asia/Tokyo', flag: '🇯🇵' },
  { name: 'Australia', timezone: 'Australia/Sydney', flag: '🇦🇺' },
  { name: 'Germany', timezone: 'Europe/Berlin', flag: '🇩🇪' },
  { name: 'China', timezone: 'Asia/Shanghai', flag: '🇨🇳' },
];

const allCountries: Country[] = [
  { name: 'Afghanistan', timezone: 'Asia/Kabul', flag: '🇦🇫' },
  { name: 'Albania', timezone: 'Europe/Tirane', flag: '🇦🇱' },
  { name: 'Algeria', timezone: 'Africa/Algiers', flag: '🇩🇿' },
  { name: 'Argentina', timezone: 'America/Argentina/Buenos_Aires', flag: '🇦🇷' },
  { name: 'Armenia', timezone: 'Asia/Yerevan', flag: '🇦🇲' },
  { name: 'Australia', timezone: 'Australia/Sydney', flag: '🇦🇺' },
  { name: 'Austria', timezone: 'Europe/Vienna', flag: '🇦🇹' },
  { name: 'Azerbaijan', timezone: 'Asia/Baku', flag: '🇦🇿' },
  { name: 'Bahrain', timezone: 'Asia/Bahrain', flag: '🇧🇭' },
  { name: 'Bangladesh', timezone: 'Asia/Dhaka', flag: '🇧🇩' },
  { name: 'Belarus', timezone: 'Europe/Minsk', flag: '🇧🇾' },
  { name: 'Belgium', timezone: 'Europe/Brussels', flag: '🇧🇪' },
  { name: 'Bolivia', timezone: 'America/La_Paz', flag: '🇧🇴' },
  { name: 'Brazil', timezone: 'America/Sao_Paulo', flag: '🇧🇷' },
  { name: 'Bulgaria', timezone: 'Europe/Sofia', flag: '🇧🇬' },
  { name: 'Cambodia', timezone: 'Asia/Phnom_Penh', flag: '🇰🇭' },
  { name: 'Canada', timezone: 'America/Toronto', flag: '🇨🇦' },
  { name: 'Chile', timezone: 'America/Santiago', flag: '🇨🇱' },
  { name: 'China', timezone: 'Asia/Shanghai', flag: '🇨🇳' },
  { name: 'Colombia', timezone: 'America/Bogota', flag: '🇨🇴' },
  { name: 'Croatia', timezone: 'Europe/Zagreb', flag: '🇭🇷' },
  { name: 'Czech Republic', timezone: 'Europe/Prague', flag: '🇨🇿' },
  { name: 'Denmark', timezone: 'Europe/Copenhagen', flag: '🇩🇰' },
  { name: 'Ecuador', timezone: 'America/Guayaquil', flag: '🇪🇨' },
  { name: 'Egypt', timezone: 'Africa/Cairo', flag: '🇪🇬' },
  { name: 'Estonia', timezone: 'Europe/Tallinn', flag: '🇪🇪' },
  { name: 'Ethiopia', timezone: 'Africa/Addis_Ababa', flag: '🇪🇹' },
  { name: 'Finland', timezone: 'Europe/Helsinki', flag: '🇫🇮' },
  { name: 'France', timezone: 'Europe/Paris', flag: '🇫🇷' },
  { name: 'Georgia', timezone: 'Asia/Tbilisi', flag: '🇬🇪' },
  { name: 'Germany', timezone: 'Europe/Berlin', flag: '🇩🇪' },
  { name: 'Ghana', timezone: 'Africa/Accra', flag: '🇬🇭' },
  { name: 'Greece', timezone: 'Europe/Athens', flag: '🇬🇷' },
  { name: 'Hungary', timezone: 'Europe/Budapest', flag: '🇭🇺' },
  { name: 'Iceland', timezone: 'Atlantic/Reykjavik', flag: '🇮🇸' },
  { name: 'India', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
  { name: 'Indonesia', timezone: 'Asia/Jakarta', flag: '🇮🇩' },
  { name: 'Iran', timezone: 'Asia/Tehran', flag: '🇮🇷' },
  { name: 'Iraq', timezone: 'Asia/Baghdad', flag: '🇮🇶' },
  { name: 'Ireland', timezone: 'Europe/Dublin', flag: '🇮🇪' },
  { name: 'Israel', timezone: 'Asia/Jerusalem', flag: '🇮🇱' },
  { name: 'Italy', timezone: 'Europe/Rome', flag: '🇮🇹' },
  { name: 'Japan', timezone: 'Asia/Tokyo', flag: '🇯🇵' },
  { name: 'Jordan', timezone: 'Asia/Amman', flag: '🇯🇴' },
  { name: 'Kazakhstan', timezone: 'Asia/Almaty', flag: '🇰🇿' },
  { name: 'Kenya', timezone: 'Africa/Nairobi', flag: '🇰🇪' },
  { name: 'Kuwait', timezone: 'Asia/Kuwait', flag: '🇰🇼' },
  { name: 'Latvia', timezone: 'Europe/Riga', flag: '🇱🇻' },
  { name: 'Lebanon', timezone: 'Asia/Beirut', flag: '🇱🇧' },
  { name: 'Lithuania', timezone: 'Europe/Vilnius', flag: '🇱🇹' },
  { name: 'Luxembourg', timezone: 'Europe/Luxembourg', flag: '🇱🇺' },
  { name: 'Mexico', timezone: 'America/Mexico_City', flag: '🇲🇽' },
  { name: 'Morocco', timezone: 'Africa/Casablanca', flag: '🇲🇦' },
  { name: 'Netherlands', timezone: 'Europe/Amsterdam', flag: '🇳🇱' },
  { name: 'New Zealand', timezone: 'Pacific/Auckland', flag: '🇳🇿' },
  { name: 'Nigeria', timezone: 'Africa/Lagos', flag: '🇳🇬' },
  { name: 'Norway', timezone: 'Europe/Oslo', flag: '🇳🇴' },
  { name: 'Oman', timezone: 'Asia/Muscat', flag: '🇴🇲' },
  { name: 'Pakistan', timezone: 'Asia/Karachi', flag: '🇵🇰' },
  { name: 'Peru', timezone: 'America/Lima', flag: '🇵🇪' },
  { name: 'Philippines', timezone: 'Asia/Manila', flag: '🇵🇭' },
  { name: 'Poland', timezone: 'Europe/Warsaw', flag: '🇵🇱' },
  { name: 'Portugal', timezone: 'Europe/Lisbon', flag: '🇵🇹' },
  { name: 'Qatar', timezone: 'Asia/Qatar', flag: '🇶🇦' },
  { name: 'Romania', timezone: 'Europe/Bucharest', flag: '🇷🇴' },
  { name: 'Russia', timezone: 'Europe/Moscow', flag: '🇷🇺' },
  { name: 'Saudi Arabia', timezone: 'Asia/Riyadh', flag: '🇸🇦' },
  { name: 'Serbia', timezone: 'Europe/Belgrade', flag: '🇷🇸' },
  { name: 'Singapore', timezone: 'Asia/Singapore', flag: '🇸🇬' },
  { name: 'Slovakia', timezone: 'Europe/Bratislava', flag: '🇸🇰' },
  { name: 'Slovenia', timezone: 'Europe/Ljubljana', flag: '🇸🇮' },
  { name: 'South Africa', timezone: 'Africa/Johannesburg', flag: '🇿🇦' },
  { name: 'South Korea', timezone: 'Asia/Seoul', flag: '🇰🇷' },
  { name: 'Spain', timezone: 'Europe/Madrid', flag: '🇪🇸' },
  { name: 'Sri Lanka', timezone: 'Asia/Colombo', flag: '🇱🇰' },
  { name: 'Sweden', timezone: 'Europe/Stockholm', flag: '🇸🇪' },
  { name: 'Switzerland', timezone: 'Europe/Zurich', flag: '🇨🇭' },
  { name: 'Taiwan', timezone: 'Asia/Taipei', flag: '🇹🇼' },
  { name: 'Thailand', timezone: 'Asia/Bangkok', flag: '🇹🇭' },
  { name: 'Turkey', timezone: 'Europe/Istanbul', flag: '🇹🇷' },
  { name: 'Ukraine', timezone: 'Europe/Kiev', flag: '🇺🇦' },
  { name: 'United Arab Emirates', timezone: 'Asia/Dubai', flag: '🇦🇪' },
  { name: 'United Kingdom', timezone: 'Europe/London', flag: '🇬🇧' },
  { name: 'United States (NY)', timezone: 'America/New_York', flag: '🇺🇸' },
  { name: 'United States (LA)', timezone: 'America/Los_Angeles', flag: '🇺🇸' },
  { name: 'Uruguay', timezone: 'America/Montevideo', flag: '🇺🇾' },
  { name: 'Venezuela', timezone: 'America/Caracas', flag: '🇻🇪' },
  { name: 'Vietnam', timezone: 'Asia/Ho_Chi_Minh', flag: '🇻🇳' },
];

const WorldClock = () => {
  const [currentTime, setCurrentTime] = useState(dayjs());
  const [pulse, setPulse] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [activeTab, setActiveTab] = useState('shortcuts');
  const [selectedTheme, setSelectedTheme] = useState<string>(() => {
    return localStorage.getItem('world-clock-theme') || 'ocean';
  });

  const mainCity = { city: 'Kuala Lumpur', country: 'Malaysia', timezone: 'Asia/Kuala_Lumpur', flag: '🇲🇾' };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(dayjs());
      setPulse(true);
      setTimeout(() => setPulse(false), 100);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('world-clock-theme', selectedTheme);
  }, [selectedTheme]);

  const formatTime = (timezone: string) => {
    const time = currentTime.tz(timezone);
    return {
      time: time.format('HH:mm:ss'),
      date: time.format('dddd, MMMM D, YYYY'),
      hours: time.format('HH'),
      minutes: time.format('mm'),
      seconds: time.format('ss')
    };
  };

  const mainTime = formatTime(mainCity.timezone);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
  };

  const handleThemeChange = (themeId: string) => {
    setSelectedTheme(themeId);
  };

  const currentTheme = themes.find(theme => theme.id === selectedTheme) || themes[0];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentTheme.gradient} p-4 overflow-hidden relative`}>
      {/* Animated background overlay */}
      <div className={`absolute inset-0 bg-gradient-to-r ${currentTheme.overlay} animate-pulse pointer-events-none`}></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header with Theme Selector */}
        <div className="flex justify-between items-start mb-4">
          <div className="text-center flex-1">
            <div className="flex items-center justify-center gap-3 mb-2">
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
              <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white transition-all duration-200 hover:scale-105">
                <Palette className="w-4 h-4" />
                <span className="text-sm font-medium">{currentTheme.name}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-slate-800/95 backdrop-blur-md border-slate-600 min-w-[180px]" align="end">
              {themes.map((theme) => (
                <DropdownMenuItem
                  key={theme.id}
                  onClick={() => handleThemeChange(theme.id)}
                  className="text-white hover:bg-slate-700/50 focus:bg-slate-700/50 cursor-pointer"
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${theme.gradient} border border-white/20`}></div>
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
        <Card className={`mb-4 bg-gradient-to-r ${currentTheme.gradient} border-transparent backdrop-blur-sm shadow-2xl transform hover:scale-[1.02] transition-all duration-300`}>
          <CardContent className="p-4 text-center relative overflow-hidden">
            {/* Animated gradient overlay for extra vibrancy */}
            <div className={`absolute inset-0 bg-gradient-to-r ${currentTheme.overlay} animate-pulse`}></div>
            
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
                  <span className={`transition-opacity duration-100 ${pulse ? 'opacity-50' : 'opacity-100'}`}>:</span>
                  <span>{mainTime.minutes}</span>
                  <span className={`transition-opacity duration-100 ${pulse ? 'opacity-50' : 'opacity-100'}`}>:</span>
                  <span className={`transition-all duration-100 ${pulse ? 'scale-110 text-yellow-200' : 'scale-100'}`}>
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
            <TabsTrigger value="shortcuts" className="text-white data-[state=active]:bg-white/20">
              Quick Select
            </TabsTrigger>
            <TabsTrigger value="all" className="text-white data-[state=active]:bg-white/20">
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
                    <span className="text-lg">{country.flag}</span>
                    <span className="text-xs font-medium text-center">{country.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="all" className="mt-3">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Globe className="w-5 h-5 text-white drop-shadow" />
              <h3 className="text-lg font-semibold text-white drop-shadow">Select a Country</h3>
            </div>
            <div className="max-w-md mx-auto">
              <Select onValueChange={(value) => {
                const country = allCountries.find(c => c.name === value);
                if (country) handleCountrySelect(country);
              }}>
                <SelectTrigger className="w-full bg-white/10 border-white/20 text-white backdrop-blur-sm">
                  <SelectValue placeholder="Choose a country..." />
                </SelectTrigger>
                <SelectContent className="bg-slate-800/95 backdrop-blur-md border-slate-600 max-h-60">
                  {allCountries.map((country) => (
                    <SelectItem 
                      key={country.name} 
                      value={country.name}
                      className="text-white hover:bg-slate-700/50 focus:bg-slate-700/50"
                    >
                      <div className="flex items-center gap-2">
                        <span>{country.flag}</span>
                        <span>{country.name}</span>
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
                <span className="text-2xl">{selectedCountry.flag}</span>
                <div>
                  <h3 className="text-xl font-bold text-white drop-shadow">
                    {selectedCountry.name}
                  </h3>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1 text-2xl md:text-3xl font-mono font-bold text-white drop-shadow">
                  <span>{formatTime(selectedCountry.timezone).hours}</span>
                  <span className={`transition-opacity duration-100 ${pulse ? 'opacity-50' : 'opacity-100'}`}>:</span>
                  <span>{formatTime(selectedCountry.timezone).minutes}</span>
                  <span className={`transition-opacity duration-100 ${pulse ? 'opacity-50' : 'opacity-100'}`}>:</span>
                  <span className={`transition-all duration-100 ${pulse ? 'scale-110 text-yellow-200' : 'scale-100'}`}>
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
            Live updates every second • Times are synchronized with your system clock
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorldClock;
