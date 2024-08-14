export const Loading = ({ children, isLoading, delay = 200 }) => {
    return (
        <div
            className={`relative ${
                isLoading ? "opacity-50 pointer-events-none" : ""
            }`}
        >
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
                </div>
            )}
            {children}
        </div>
    );
};
