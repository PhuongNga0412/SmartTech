import { CustomerServiceIcon, DeliveryIcon, SecureIcon } from "@/icons";

const services = [
    {
        id: 1,
        icon: DeliveryIcon,
        title: "FREE AND FAST DELIVERY",
        desc: "Free delivery for all orders over $140",
    },
    {
        id: 2,
        icon: CustomerServiceIcon,
        title: "24/7 CUSTOMER SERVICE",
        desc: "Friendly 24/7 customer support",
    },
    {
        id: 3,
        icon: SecureIcon,
        title: "MONEY BACK GUARANTEE",
        desc: "We reurn money within 30 days",
    },
];

const FullServices = () => {
    return (
        <div className="mb-[140px] flex gap-[88px] justify-center">
            {services.map((item) => (
                <div key={item.id} className="flex flex-col items-center">
                    <div>{item.icon}</div>
                    <p className="text-xl font-semibold mt-6 mb-2">
                        {item.title}
                    </p>
                    <p className="text-sm">{item.desc}</p>
                </div>
            ))}
        </div>
    );
};
export default FullServices;
