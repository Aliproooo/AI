import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const calculateTimeLeft = () => {
    const targetDate = new Date("2024-12-31T23:59:59").getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;
    
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNotifyMe = () => {
    if (email && email.includes("@")) {
      console.log("Email captured:", email);
      setMessage("Thank you! We will notify you.");
      setEmail("");
    } else {
      setMessage("Please enter a valid email address.");
    }
  };

  return (
    <div className="container">
      <h1 className="title">WingZai <span>By Alipro</span></h1>
      <h2 className="subtitle">Revolutionizing the Future</h2>
      <p className="description">
        Get ready to experience the next-gen SaaS platform. We are building something game-changing.
      </p>
      <div className="countdown">
        <div className="time-box">
          <span className="time">{timeLeft.days || "0"}</span> Days
        </div>
        <div className="time-box">
          <span className="time">{timeLeft.hours || "0"}</span> Hours
        </div>
        <div className="time-box">
          <span className="time">{timeLeft.minutes || "0"}</span> Mins
        </div>
        <div className="time-box">
          <span className="time">{timeLeft.seconds || "0"}</span> Secs
        </div>
      </div>
      <div className="email-box">
        <input 
          type="email" 
          placeholder="Enter your email" 
          className="email-input" 
          value={email} 
          onChange={handleEmailChange} 
        />
        <button className="notify-button" onClick={handleNotifyMe}>Notify Me</button>
      </div>
      {message && <p className="message">{message}</p>}
    </div>
  );
}
