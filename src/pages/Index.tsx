
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, Globe } from 'lucide-react';

// Initialize dayjs plugins
dayjs.extend(utc);
dayjs.extend(timezone);

interface Country {
  name: string;
  timezone: string;
  flag: string;
}

const countries: Country[] = [
  { name: 'Afghanistan', timezone: 'Asia/Kabul', flag: '🇦🇫' },
  { name: 'Albania', timezone: 'Europe/Tirane', flag: '🇦🇱' },
  { name: 'Algeria', timezone: 'Africa/Algiers', flag: '🇩🇿' },
  { name: 'Argentina', timezone: 'America/Argentina/Buenos_Aires', flag: '🇦🇷' },
  { name: 'Australia', timezone: 'Australia/Sydney', flag: '🇦🇺' },
  { name: 'Austria', timezone: 'Europe/Vienna', flag: '🇦🇹' },
  { name: 'Bangladesh', timezone: 'Asia/Dhaka', flag: '🇧🇩' },
  { name: 'Belgium', timezone: 'Europe/Brussels', flag: '🇧🇪' },
  { name: 'Brazil', timezone: 'America/Sao_Paulo', flag: '🇧🇷' },
  { name: 'Canada', timezone: 'America/Toronto', flag: '🇨🇦' },
  { name: 'China', timezone: 'Asia/Shanghai', flag: '🇨🇳' },
  { name: 'Egypt', timezone: 'Africa/Cairo', flag: '🇪🇬' },
  { name: 'France', timezone: 'Europe/Paris', flag: '🇫🇷' },
  { name: 'Germany', timezone: 'Europe/Berlin', flag: '🇩🇪' },
  { name: 'India', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
  { name: 'Indonesia', timezone: 'Asia/Jakarta', flag: '🇮🇩' },
  { name: 'Italy', timezone: 'Europe/Rome', flag: '🇮🇹' },
  { name: 'Japan', timezone: 'Asia/Tokyo', flag: '🇯🇵' },
  { name: 'Mexico', timezone: 'America/Mexico_City', flag: '🇲🇽' },
  { name: 'Netherlands', timezone: 'Europe/Amsterdam', flag: '🇳🇱' },
  { name: 'Nigeria', timezone: 'Africa/Lagos', flag: '🇳🇬' },
  { name: 'Pakistan', timezone: 'Asia/Karachi', flag: '🇵🇰' },
  { name: 'Philippines', timezone: 'Asia/Manila', flag: '🇵🇭' },
  { name: 'Russia', timezone: 'Europe/Moscow', flag: '🇷🇺' },
  { name: 'Saudi Arabia', timezone: 'Asia/Riyadh', flag: '🇸🇦' },
  { name: 'Singapore', timezone: 'Asia/Singapore', flag: '🇸🇬' },
  { name: 'South Africa', timezone: 'Africa/Johannesburg', flag: '🇿🇦' },
  { name: 'South Korea', timezone: 'Asia/Seoul', flag: '🇰🇷' },
  { name: 'Spain', timezone: 'Europe/Madrid', flag: '🇪🇸' },
  { name: 'Thailand', timezone: 'Asia/Bangkok', flag: '🇹🇭' },
  { name: 'Turkey', timezone: 'Europe/Istanbul', flag: '🇹🇷' },
  { name: 'United Kingdom', timezone: 'Europe/London', flag: '🇬🇧' },
  { name: 'United States (NY)', timezone: 'America/New_York', flag: '🇺🇸' },
  { name: 'United States (LA)', timezone: 'America/Los_Angeles', flag: '🇺🇸' },
  { name: 'Vietnam', timezone: 'Asia/Ho_Chi_Minh', flag: '🇻🇳' },
];

const WorldClock = () => {
  const [currentTime, setCurrentTime] = useState(dayjs());
  const [pulse, setPulse] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-3">
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
        <Card className="mb-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-400/30 backdrop-blur-sm">
          <CardContent className="p-4 md:p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-2xl md:text-3xl">{mainCity.flag}</span>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white">
                  {mainCity.city}
                </h2>
                <p className="text-blue-200 text-sm">
                  {mainCity.country}
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-1 text-3xl md:text-5xl font-mono font-bold text-white">
                <span>{mainTime.hours}</span>
                <span className={`transition-opacity duration-100 ${pulse ? 'opacity-50' : 'opacity-100'}`}>:</span>
                <span>{mainTime.minutes}</span>
                <span className={`transition-opacity duration-100 ${pulse ? 'opacity-50' : 'opacity-100'}`}>:</span>
                <span className={`transition-all duration-100 ${pulse ? 'scale-110 text-blue-400' : 'scale-100'}`}>
                  {mainTime.seconds}
                </span>
              </div>
              <p className="text-blue-200 text-sm md:text-base">
                {mainTime.date}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Country Selector */}
        <div className="mb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Globe className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Select a Country</h3>
          </div>
          <div className="max-w-md mx-auto">
            <Select onValueChange={(value) => {
              const country = countries.find(c => c.name === value);
              setSelectedCountry(country || null);
            }}>
              <SelectTrigger className="w-full bg-white/10 border-white/20 text-white backdrop-blur-sm">
                <SelectValue placeholder="Choose a country..." />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600 max-h-60">
                {countries.map((country) => (
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
        </div>

        {/* Selected Country Clock */}
        {selectedCountry && (
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-4 md:p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="text-2xl md:text-3xl">{selectedCountry.flag}</span>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white">
                    {selectedCountry.name}
                  </h3>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-1 text-2xl md:text-4xl font-mono font-bold text-white">
                  <span>{formatTime(selectedCountry.timezone).hours}</span>
                  <span className={`transition-opacity duration-100 ${pulse ? 'opacity-50' : 'opacity-100'}`}>:</span>
                  <span>{formatTime(selectedCountry.timezone).minutes}</span>
                  <span className={`transition-opacity duration-100 ${pulse ? 'opacity-50' : 'opacity-100'}`}>:</span>
                  <span className={`transition-all duration-100 ${pulse ? 'scale-110 text-blue-400' : 'scale-100'}`}>
                    {formatTime(selectedCountry.timezone).seconds}
                  </span>
                </div>
                <p className="text-blue-200 text-sm md:text-base">
                  {formatTime(selectedCountry.timezone).date}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center mt-4">
          <p className="text-blue-300 text-xs">
            Live updates every second • Times are synchronized with your system clock
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorldClock;
