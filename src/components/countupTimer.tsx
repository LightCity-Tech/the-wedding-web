import React, { useState, useEffect } from "react";

interface ElapsedTimeProps {
  targetDate: string; // or Date if you're passing a Date object
}

interface TimeElapsed {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

const CountupTimer: React.FC<ElapsedTimeProps> = ({ targetDate }) => {
  const calculateTimeElapsed = (): TimeElapsed => {
    const difference = +new Date() - +new Date(targetDate); // The difference is now in the past
    let timeElapsed: TimeElapsed = {};

    if (difference > 0) {
      timeElapsed = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeElapsed;
  };

  const [timeElapsed, setTimeElapsed] = useState<TimeElapsed>(calculateTimeElapsed());
  const [prevTimeElapsed, setPrevTimeElapsed] = useState<TimeElapsed>(timeElapsed);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeElapsed = calculateTimeElapsed();
      setPrevTimeElapsed(timeElapsed); // Store the previous value for animation
      setTimeElapsed(newTimeElapsed);
    }, 1000);

    return () => clearInterval(timer); // Clean up the interval on component unmount
  }, [timeElapsed, targetDate]);

  return (
    <div className="flex gap-4 text-center text-3xl font-medium">
      {Object.keys(timeElapsed).map((interval) => (
        <div key={interval} className="relative">
          {/* Previous value sliding out */}
          <div
            className={`absolute inset-0 text-tochi-brown transition-transform duration-500 ease-in-out ${
              prevTimeElapsed[interval as keyof TimeElapsed] !== timeElapsed[interval as keyof TimeElapsed]
                ? ""
                : "opacity-0"
            }`}
          >
            {prevTimeElapsed[interval as keyof TimeElapsed]}
          </div>

          {/* Current value sliding in */}
          <div
            className={`relative z-10 text-tochi-brown transition-transform duration-500 ease-in-out ${
              prevTimeElapsed[interval as keyof TimeElapsed] !== timeElapsed[interval as keyof TimeElapsed]
                ? "opacity-0"
                : ""
            }`}
          >
            {timeElapsed[interval as keyof TimeElapsed]}
          </div>

          {/* Label */}
          <p className="text-sm text-tochi-brown">{interval}</p>
        </div>
      ))}
    </div>
  );
};

export { CountupTimer };
