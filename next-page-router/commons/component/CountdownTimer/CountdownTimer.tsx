import dayjs from 'dayjs';
import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: dayjs.Dayjs;
  onEnd: () => void;
}

const CountdownTimer = ({ targetDate, onEnd }: CountdownTimerProps) => {
  const calculateTimeLeft = () => {
    const now = dayjs();
    const difference = dayjs(targetDate).diff(now);
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<any>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
      if (Object.keys(timeLeft).length === 0) {
        onEnd();
      }
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="flex justify-center items-center font-medium h-full text-3xl m-auto">
      <span className="text-white">
        {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
      </span>
    </div>
  );
};

export default CountdownTimer;
