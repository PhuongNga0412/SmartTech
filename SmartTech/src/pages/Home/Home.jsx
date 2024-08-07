import FullServices from "@/components/Services/FullServices";
import Category from "@/pages/Home/Category/Category";
import FlashSale from "@/pages/Home/FlashSale/FlashSale";
import Hero from "@/pages/Home/Hero/Hero";
import NewArrival from "@/pages/Home/NewArrival/NewArrival";
import ProductMonth from "@/pages/Home/ProductMonth/ProductMonth";
import PromoBanner from "@/pages/Home/PromoBanner/PromoBanner";

const Home = () => {
    return (
        <div>
            <div>
                <Hero />
                <FlashSale />
                <Category />
                <ProductMonth />
                <PromoBanner />
                <NewArrival />
                <FullServices />
            </div>
        </div>
    );
};
export default Home;
