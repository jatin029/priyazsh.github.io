"use client";

import { useEffect, useState } from "react";

export default function AgeCalculator() {
  const [age, setAge] = useState<string>("");

  useEffect(() => {
    const dob = new Date("2004-05-28");

    const updateAge = () => {
      const now = new Date();
      const msPerDay = 1000 * 60 * 60 * 24;
      const diffDays = (now.getTime() - dob.getTime()) / msPerDay;
      const years = diffDays / 365.2425;
      setAge(years.toFixed(9));
    };

    updateAge(); 
    const interval = setInterval(updateAge, 1); 

    return () => clearInterval(interval);
  }, []);

  return (
      <span className="font-mono text-white">{age}</span>
  );
}
