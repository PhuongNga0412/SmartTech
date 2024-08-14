import { useEffect, useState } from "react";

export const useDebounce = (value, delay) => {
    const [valueDebounces, setValueDebounce] = useState("");

    useEffect(() => {
        const handle = setTimeout(() => {
            setValueDebounce(value);
        }, [delay]);
        return () => {
            clearTimeout(handle);
        };
    }, [value]);

    return valueDebounces;
};
