import { Semiclone } from "@/icons";
import { useState, useEffect } from "react";

const CountdownTimer = ({ targetDate }) => {
    const calculateTimeLeft = () => {
        const now = new Date();
        const difference = targetDate - now;
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor(
                    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                ),
                minutes: Math.floor(
                    (difference % (1000 * 60 * 60)) / (1000 * 60)
                ),
                seconds: Math.floor((difference % (1000 * 60)) / 1000),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <div className="flex gap-4">
            <div>
                <p className="font-medium text-xs">Days</p>
                <div className="flex items-center gap-4">
                    <p className="font-bold text-3xl">{timeLeft.days}</p>
                    <div>{Semiclone}</div>
                </div>
            </div>
            <div>
                <p className="font-medium text-xs">Hours</p>
                <div className="flex items-center gap-4">
                    <p className="font-bold text-3xl"> {timeLeft.hours}</p>
                    <div>{Semiclone}</div>
                </div>
            </div>
            <div>
                <p className="font-medium text-xs">Minutes</p>
                <div className="flex items-center gap-4">
                    <p className="font-bold text-3xl"> {timeLeft.minutes}</p>
                    <div>{Semiclone}</div>
                </div>
            </div>
            <div>
                <p className="font-medium text-xs">Seconds</p>
                <p className="font-bold text-3xl">{timeLeft.seconds}</p>
            </div>
        </div>
    );
};

export default CountdownTimer;
