import { useState, useEffect } from "react";

const CountdownTimer = ({ unbondingTime }) => {
  const targetTimeUTC = new Date(unbondingTime);

  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = targetTimeUTC - now;

    if (difference <= 0) {
      return { expired: true };
    }

    return {
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      expired: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    if (timeLeft.expired) return;

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <div>
      {timeLeft.expired ? (
        <h2>Time Expired</h2>
      ) : (
        <h2>
          {timeLeft.minutes}m : {timeLeft.seconds}s
        </h2>
      )}
    </div>
  );
};

export default CountdownTimer;
