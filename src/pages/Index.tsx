
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Card, CardContent } from '@/components/ui/card';
import { Clock } from 'lucide-react';

// Initialize dayjs plugins
dayjs.extend(utc);
dayjs.extend(timezone);

interface CityTime {
  city: string;
  country: string;
  timezone: string;
  flag: string;
  time: string;
  date: string;
}

const WorldClock = () => {
  const [currentTime, setCurrentTime] = useState(dayjs());
  const [pulse, setPulse] = useState(false);

  const cities: Omit<CityTime, 'time' | 'date'>[] = [
    { city: 'Kuala Lumpur', country: 'Malaysia', timezone: 'Asia/Kuala_Lumpur', flag: '🇲🇾' },
    { city: 'Tokyo', country: 'Japan', timezone: 'Asia/Tokyo', flag: '🇯🇵' },
    { city: 'New York', country: 'USA', timezone: 'America/New_York', flag: '🇺🇸' },
    { city: 'London', country: 'UK', timezone: 'Europe/London', flag: '🇬🇧' },
    { city: 'Sydney', country: 'Australia', timezone: 'Australia/Sydney', flag: '🇦🇺' },
  ];

  const mainCity = cities[0]; // Kuala Lumpur as main clock
  const otherCities = cities.slice(1);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Clock className="w-8 h-8 text-blue-400" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              World Live Clock
            </h1>
          </div>
          <p className="text-blue-200 text-lg">
            Stay connected with time zones around the world
          </p>
        </div>

        {/* Main Clock - Kuala Lumpur */}
        <Card className="mb-8 md:mb-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-400/30 backdrop-blur-sm">
          <CardContent className="p-6 md:p-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-4xl md:text-5xl">{mainCity.flag}</span>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  {mainCity.city}
                </h2>
                <p className="text-blue-200 text-sm md:text-base">
                  {mainCity.country}
                </p>
              </div>
            </div>
            
            <div className="space-y-2 md:space-y-4">
              <div className="flex items-center justify-center gap-2 text-5xl md:text-7xl font-mono font-bold text-white">
                <span>{mainTime.hours}</span>
                <span className={`transition-opacity duration-100 ${pulse ? 'opacity-50' : 'opacity-100'}`}>:</span>
                <span>{mainTime.minutes}</span>
                <span className={`transition-opacity duration-100 ${pulse ? 'opacity-50' : 'opacity-100'}`}>:</span>
                <span className={`transition-all duration-100 ${pulse ? 'scale-110 text-blue-400' : 'scale-100'}`}>
                  {mainTime.seconds}
                </span>
              </div>
              <p className="text-blue-200 text-lg md:text-xl">
                {mainTime.date}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* World Clocks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {otherCities.map((city, index) => {
            const cityTime = formatTime(city.timezone);
            return (
              <Card 
                key={city.timezone}
                className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25"
              >
                <CardContent className="p-4 md:p-6 text-center">
                  <div className="mb-3 md:mb-4">
                    <div className="text-3xl md:text-4xl mb-2">
                      {city.flag}
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                      {city.city}
                    </h3>
                    <p className="text-blue-200 text-sm">
                      {city.country}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-1 text-2xl md:text-3xl font-mono font-bold text-white">
                      <span>{cityTime.hours}</span>
                      <span className={`transition-opacity duration-100 ${pulse ? 'opacity-50' : 'opacity-100'}`}>:</span>
                      <span>{cityTime.minutes}</span>
                      <span className={`transition-opacity duration-100 ${pulse ? 'opacity-50' : 'opacity-100'}`}>:</span>
                      <span className={`transition-all duration-100 ${pulse ? 'scale-110 text-blue-400' : 'scale-100'}`}>
                        {cityTime.seconds}
                      </span>
                    </div>
                    <p className="text-blue-200 text-xs md:text-sm">
                      {cityTime.date}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 md:mt-12">
          <p className="text-blue-300 text-sm">
            Live updates every second • Times are synchronized with your system clock
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorldClock;
