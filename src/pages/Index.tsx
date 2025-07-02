
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Clock, Globe } from 'lucide-react';

// Initialize dayjs plugins
dayjs.extend(utc);
dayjs.extend(timezone);

interface Country {
  name: string;
  timezone: string;
  flag: string;
}

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

  const mainCity = { city: 'Kuala Lumpur', country: 'Malaysia', timezone: 'Asia/Kuala_Lumpur', flag: '🇲🇾' };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(dayjs());
      setPulse(true);
      setTimeout(() => setPulse(false), 100);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Clock className="w-6 h-6 text-blue-400" />
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              World Live Clock
            </h1>
          </div>
          <p className="text-blue-200 text-sm">
            Stay connected with time zones around the world
          </p>
        </div>

        {/* Main Clock - Malaysia */}
        <Card className="mb-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-400/30 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-2xl">{mainCity.flag}</span>
              <div>
                <h2 className="text-xl font-bold text-white">
                  {mainCity.city}
                </h2>
                <p className="text-blue-200 text-sm">
                  {mainCity.country}
                </p>
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1 text-3xl md:text-4xl font-mono font-bold text-white">
                <span>{mainTime.hours}</span>
                <span className={`transition-opacity duration-100 ${pulse ? 'opacity-50' : 'opacity-100'}`}>:</span>
                <span>{mainTime.minutes}</span>
                <span className={`transition-opacity duration-100 ${pulse ? 'opacity-50' : 'opacity-100'}`}>:</span>
                <span className={`transition-all duration-100 ${pulse ? 'scale-110 text-blue-400' : 'scale-100'}`}>
                  {mainTime.seconds}
                </span>
              </div>
              <p className="text-blue-200 text-sm">
                {mainTime.date}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Country Selection Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
          <TabsList className="grid w-full grid-cols-2 bg-white/10 backdrop-blur-sm">
            <TabsTrigger value="shortcuts" className="text-white data-[state=active]:bg-blue-500/50">
              Quick Select
            </TabsTrigger>
            <TabsTrigger value="all" className="text-white data-[state=active]:bg-blue-500/50">
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
              <Globe className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Select a Country</h3>
            </div>
            <div className="max-w-md mx-auto">
              <Select onValueChange={(value) => {
                const country = allCountries.find(c => c.name === value);
                if (country) handleCountrySelect(country);
              }}>
                <SelectTrigger className="w-full bg-white/10 border-white/20 text-white backdrop-blur-sm">
                  <SelectValue placeholder="Choose a country..." />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600 max-h-60">
                  {allCountries.map((country) => (
                    <SelectItem 
                      key={country.name} 
                      value={country.name}
                      className="text-white hover:bg-slate-700 focus:bg-slate-700"
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
                  <h3 className="text-xl font-bold text-white">
                    {selectedCountry.name}
                  </h3>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1 text-2xl md:text-3xl font-mono font-bold text-white">
                  <span>{formatTime(selectedCountry.timezone).hours}</span>
                  <span className={`transition-opacity duration-100 ${pulse ? 'opacity-50' : 'opacity-100'}`}>:</span>
                  <span>{formatTime(selectedCountry.timezone).minutes}</span>
                  <span className={`transition-opacity duration-100 ${pulse ? 'opacity-50' : 'opacity-100'}`}>:</span>
                  <span className={`transition-all duration-100 ${pulse ? 'scale-110 text-blue-400' : 'scale-100'}`}>
                    {formatTime(selectedCountry.timezone).seconds}
                  </span>
                </div>
                <p className="text-blue-200 text-sm">
                  {formatTime(selectedCountry.timezone).date}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center">
          <p className="text-blue-300 text-xs">
            Live updates every second • Times are synchronized with your system clock
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorldClock;
