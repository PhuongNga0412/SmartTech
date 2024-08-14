export function UserForm({ openModal, onCloseModal }) {
    return (
        <div className="fixed z-10 w-full h-full top-0 left-0 flex flex-col justify-center items-center bg-black-40">
            <form
                // onSubmit={handleSubmit}
                className="container bg-white w-full max-w-lg mx-auto rounded-lg shadow p-6 relative "
            >
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="relative w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-first-name"
                        >
                            UserName
                        </label>
                        <input
                            className=" appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-first-name"
                            type="text"
                            placeholder="User Name"
                        />
                        {/* <p className="italic text-red-500 text-xs absolute -bottom-5">
                            {message.firstName}
                        </p> */}
                    </div>
                    <div className="relative w-full md:w-1/2 px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-last-name"
                        >
                            phone number
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-last-name"
                            type="phone"
                            placeholder="Phone Number"
                        />
                        {/* <p className="italic text-red-500 text-xs absolute -bottom-5">
                            {message.lastName}
                        </p> */}
                    </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="relative w-full px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            email
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-password"
                            type="email"
                            placeholder="Please enter email"
                        />
                        {/* <p className="italic text-red-500 text-xs absolute -bottom-5">
                            {message.address}
                        </p> */}
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="relative w-full px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            Address
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-password"
                            type="text"
                            placeholder="Please enter address"
                        />
                        {/* <p className="italic text-red-500 text-xs absolute -bottom-5">
                            {message.address}
                        </p> */}
                    </div>
                </div>

                <div>
                    <div>
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="user_avatar"
                        >
                            avatar
                        </label>
                        <input
                            className="block w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-4 rounded border border-gray-300 file:border-0 file:text-sm file:font-semibold file:bg-gray-700 file:text-white hover:file:bg-gray-100 hover:file:text-gray-700"
                            aria-describedby="user_avatar_help"
                            id="user_avatar"
                            type="file"
                        />
                    </div>
                </div>

                <div className="flex justify-center gap-3">
                    <button
                        onClick={onCloseModal}
                        className="block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 my-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        type="button"
                    >
                        Cancel
                    </button>
                    <button
                        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 my-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        type="submit"
                    >
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
}
