import { useEffect, useState } from "react";

const PromoBanner = () => {
    const targetDate = new Date("2024-10-06T23:59:59");
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
        // <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <div className="relative w-full min-h-screen p-8 mb-[71px] bg-black text-white rounded-lg flex  items-center justify-center">
            <div className="w-1/2">
                <div className="text-green-500 text-base font-semibold">
                    Categories
                </div>
                <h1 className="mt-4 text-5xl font-semibold">
                    Enhance Your Music Experience
                </h1>
                <div className="mt-8 flex space-x-4">
                    <div className="text-center bg-white text-black w-[62px] h-[62px] rounded-full flex flex-col items-center justify-center">
                        <div className="text-base font-semibold">
                            {timeLeft.days}
                        </div>
                        <div className="text-xs">Days</div>
                    </div>
                    <div className="text-center bg-white text-black w-[62px] h-[62px] rounded-full flex flex-col items-center justify-center">
                        <div className="text-base font-semibold">
                            {timeLeft.hours}
                        </div>
                        <div className="text-xs">Hours</div>
                    </div>
                    <div className="text-center bg-white text-black w-[62px] h-[62px] rounded-full flex flex-col items-center justify-center">
                        <div className="text-base font-semibold">
                            {timeLeft.minutes}
                        </div>
                        <div className="text-xs">Minutes</div>
                    </div>
                    <div className="text-center bg-white text-black w-[62px] h-[62px] rounded-full flex flex-col items-center justify-center">
                        <div className="text-base font-semibold">
                            {timeLeft.seconds}
                        </div>
                        <div className="text-xs">Seconds</div>
                    </div>
                </div>
                <button className="mt-8 px-12 py-4 bg-green-500 text-white font-base rounded">
                    Buy Now!
                </button>
            </div>
            <div className="w-1/2 flex justify-center items-center">
                <img
                    src="https://anhduyenaudio.vn/files/files/161/loa-jbl-boombox-1.png"
                    alt="JBL Speaker"
                    className="w-full h-auto"
                />
            </div>
        </div>
        // </div>
    );
};
export default PromoBanner;
