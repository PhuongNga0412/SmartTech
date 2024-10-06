export const isJsonString = (data) => {
    try {
        JSON.parse(data);
    } catch (error) {
        return false;
    }
    return true;
};

export const renderOptions = (arr) => {
    let result = [];
    if (arr) {
        result = arr?.map((opt) => {
            return {
                value: opt,
                label: opt,
            };
        });
    }
    result.push({
        label: "Add type",
        value: "add_type",
    });
    return result;
};

export const convertPrice = (price) => {
    try {
        const result = price?.toLocaleString().replaceAll(",", ".");
        return `${result} VND`;
    } catch (error) {
        return null;
    }
};
