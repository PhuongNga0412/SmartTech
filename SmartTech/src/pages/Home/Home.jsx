import FullServices from "@/components/Services/FullServices";
import Category from "@/pages/Home/Category/Category";
import FlashSale from "@/pages/Home/FlashSale/FlashSale";
import Hero from "@/pages/Home/Hero/Hero";
import NewArrival from "@/pages/Home/NewArrival/NewArrival";
import ProductMonth from "@/pages/Home/ProductMonth/ProductMonth";
import PromoBanner from "@/pages/Home/PromoBanner/PromoBanner";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "@/services/ProductService";
import { useEffect, useState } from "react";

const Home = () => {
    const [typeProduct, setTypeProduct] = useState();
    const fetchProductAll = async () => {
        const res = await ProductService.getAllProduct();
        return res;
    };

    const { isLoading, data: products } = useQuery({
        queryKey: ["products"],
        queryFn: fetchProductAll,
        retry: 3,
        retryDelay: 1000,
    });

    const fetchAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct();
        if (res?.status === "OK") {
            setTypeProduct(res?.data);
        }
    };

    useEffect(() => {
        fetchAllTypeProduct();
    }, []);

    return (
        <div>
            <div>
                <Hero typeProduct={typeProduct} />
                <FlashSale isLoading={isLoading} products={products?.data} />
                <Category typeProduct={typeProduct} />
                <ProductMonth isLoading={isLoading} products={products?.data} />
                <PromoBanner />
                <NewArrival />
                <FullServices />
            </div>
        </div>
    );
};
export default Home;
