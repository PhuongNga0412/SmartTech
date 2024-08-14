const InputForm = (props) => {
    // { label, name, type = "text", ...rest }
    const { label, name, type = "text", ...rests } = props;
    const handleOnchangeInput = (e) => {
        props.onChange(e.target.value);
    };

    return (
        <div className="relative z-0 w-full mb-8">
            <input
                {...rests}
                id={name}
                type={type}
                placeholder=" "
                onChange={handleOnchangeInput}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
            />
            <label
                htmlFor={name}
                className="absolute duration-300 top-3 origin-0 text-gray-500"
            >
                {label}
            </label>
        </div>
    );
};
export default InputForm;
