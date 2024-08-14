import FullServices from "@/components/Services/FullServices";
import Category from "@/pages/Home/Category/Category";
import FlashSale from "@/pages/Home/FlashSale/FlashSale";
import Hero from "@/pages/Home/Hero/Hero";
import NewArrival from "@/pages/Home/NewArrival/NewArrival";
import ProductMonth from "@/pages/Home/ProductMonth/ProductMonth";
import PromoBanner from "@/pages/Home/PromoBanner/PromoBanner";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "@/services/ProductService";

const Home = () => {
    const fetchProductAll = async () => {
        const res = await ProductService.getAllProduct();
        console.log("??", res);
        return res;
    };

    const { data: products } = useQuery({
        queryKey: ["products"],
        queryFn: fetchProductAll,
        retry: 3,
        retryDelay: 1000,
    });

    return (
        <div>
            <div>
                <Hero />
                <FlashSale products={products?.data} />
                <Category />
                <ProductMonth products={products?.data} />
                <PromoBanner />
                <NewArrival />
                <FullServices />
            </div>
        </div>
    );
};
export default Home;
