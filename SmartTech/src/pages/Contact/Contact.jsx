import { MailIcon, PhoneIcon } from "@/icons";

const Contact = () => {
    return (
        // <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
        //     <svg
        //         aria-hidden="true"
        //         className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        //     >
        //         <defs>
        //             <pattern
        //                 x="50%"
        //                 y={-64}
        //                 id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
        //                 width={200}
        //                 height={200}
        //                 patternUnits="userSpaceOnUse"
        //             >
        //                 <path d="M100 200V.5M.5 .5H200" fill="none" />
        //             </pattern>
        //         </defs>
        //         <svg x="50%" y={-64} className="overflow-visible fill-gray-50">
        //             <path
        //                 d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M299.5 800h201v201h-201Z"
        //                 strokeWidth={0}
        //             />
        //         </svg>
        //         <rect
        //             fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
        //             width="100%"
        //             height="100%"
        //             strokeWidth={0}
        //         />
        //     </svg>
        //     <div className="mx-auto max-w-xl lg:max-w-4xl">
        //         <h2 className="text-4xl font-bold tracking-tight text-gray-900">
        //             Let’s talk about your project
        //         </h2>
        //         <p className="mt-2 text-lg leading-8 text-gray-600">
        //             We help companies and individuals build out their brand
        //             guidelines.
        //         </p>
        //         <div className="mt-16 flex flex-col gap-16 sm:gap-y-20 lg:flex-row">
        //             <form action="#" method="POST" className="lg:flex-auto">
        //                 <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        //                     <div>
        //                         <label
        //                             htmlFor="first-name"
        //                             className="block text-sm font-semibold leading-6 text-gray-900"
        //                         >
        //                             First name
        //                         </label>
        //                         <div className="mt-2.5">
        //                             <input
        //                                 id="first-name"
        //                                 name="first-name"
        //                                 type="text"
        //                                 autoComplete="given-name"
        //                                 className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        //                             />
        //                         </div>
        //                     </div>
        //                     <div>
        //                         <label
        //                             htmlFor="last-name"
        //                             className="block text-sm font-semibold leading-6 text-gray-900"
        //                         >
        //                             Last name
        //                         </label>
        //                         <div className="mt-2.5">
        //                             <input
        //                                 id="last-name"
        //                                 name="last-name"
        //                                 type="text"
        //                                 autoComplete="family-name"
        //                                 className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        //                             />
        //                         </div>
        //                     </div>
        //                     <div>
        //                         <label
        //                             htmlFor="budget"
        //                             className="block text-sm font-semibold leading-6 text-gray-900"
        //                         >
        //                             Budget
        //                         </label>
        //                         <div className="mt-2.5">
        //                             <input
        //                                 id="budget"
        //                                 name="budget"
        //                                 type="text"
        //                                 className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        //                             />
        //                         </div>
        //                     </div>
        //                     <div>
        //                         <label
        //                             htmlFor="website"
        //                             className="block text-sm font-semibold leading-6 text-gray-900"
        //                         >
        //                             Website
        //                         </label>
        //                         <div className="mt-2.5">
        //                             <input
        //                                 id="website"
        //                                 name="website"
        //                                 type="url"
        //                                 className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        //                             />
        //                         </div>
        //                     </div>
        //                     <div className="sm:col-span-2">
        //                         <label
        //                             htmlFor="message"
        //                             className="block text-sm font-semibold leading-6 text-gray-900"
        //                         >
        //                             Message
        //                         </label>
        //                         <div className="mt-2.5">
        //                             <textarea
        //                                 id="message"
        //                                 name="message"
        //                                 rows={4}
        //                                 className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        //                                 defaultValue={""}
        //                             />
        //                         </div>
        //                     </div>
        //                 </div>
        //                 <div className="mt-10">
        //                     <button
        //                         type="submit"
        //                         className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        //                     >
        //                         Let’s talk
        //                     </button>
        //                 </div>
        //                 <p className="mt-4 text-sm leading-6 text-gray-500">
        //                     By submitting this form, I agree to the{" "}
        //                     <a
        //                         href="#"
        //                         className="font-semibold text-indigo-600"
        //                     >
        //                         privacy&nbsp;policy
        //                     </a>
        //                     .
        //                 </p>
        //             </form>
        //             <div className="lg:mt-6 lg:w-80 lg:flex-none">
        //                 <img
        //                     alt=""
        //                     src="/img/logos/workcation-logo-indigo-600.svg"
        //                     className="h-12 w-auto"
        //                 />
        //                 <figure className="mt-10">
        //                     <blockquote className="text-lg font-semibold leading-8 text-gray-900">
        //                         <p>
        //                             “Lorem ipsum dolor sit amet consectetur
        //                             adipisicing elit. Nemo expedita voluptas
        //                             culpa sapiente alias molestiae. Numquam
        //                             corrupti in laborum sed rerum et corporis.”
        //                         </p>
        //                     </blockquote>
        //                     <figcaption className="mt-10 flex gap-x-6">
        //                         <img
        //                             alt=""
        //                             src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=96&h=96&q=80"
        //                             className="h-12 w-12 flex-none rounded-full bg-gray-50"
        //                         />
        //                         <div>
        //                             <div className="text-base font-semibold text-gray-900">
        //                                 Brenna Goyette
        //                             </div>
        //                             <div className="text-sm leading-6 text-gray-600">
        //                                 CEO of Workcation
        //                             </div>
        //                         </div>
        //                     </figcaption>
        //                 </figure>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div className="py-8">
            <div className="flex flex-col md:flex-row gap-[30px]">
                <div className="w-full md:max-w-[340px] mt-4 md:mt-0 border border-gray-300 rounded-md">
                    <div className="pt-10 px-9 pb-[51px]">
                        <div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-red-500 rounded-full flex justify-center items-center">
                                    {PhoneIcon}
                                </div>
                                <p className="font-medium">Call To Us</p>
                            </div>
                            <p className="mt-6 mb-4 text-sm">
                                We are available 24/7, 7 days a week.
                            </p>
                            <p className="text-sm">Phone: +8801611112222</p>
                        </div>
                        <div className="h-[1px] bg-black my-8"></div>
                        <div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-red-500 rounded-full flex justify-center items-center">
                                    {MailIcon}
                                </div>
                                <p className="font-medium">Write To Us</p>
                            </div>
                            <div className="flex flex-col gap-4 mt-6">
                                <p className="text-sm">
                                    Fill out our form and we will contact you
                                    within 24 hours.
                                </p>
                                <p className="text-sm">
                                    Emails: customer@exclusive.com
                                </p>
                                <p className="text-sm">
                                    Emails: support@exclusive.com
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-full p-4 border border-gray-300 rounded-md">
                    <form className="mx-8 my-10">
                        <div className="mb-4 flex gap-4">
                            <input
                                type="text"
                                // value={name}
                                // onChange={(event) =>
                                //     setName(event.target.value)
                                // }
                                placeholder="Your Name"
                                className="w-full p-3 pl-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="email"
                                // value={emailOrPhoneNumber}
                                // onChange={(event) =>
                                //     setEmailOrPhoneNumber(event.target.value)
                                // }
                                placeholder="Your Email"
                                className="w-full p-3 pl-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="email"
                                // value={emailOrPhoneNumber}
                                // onChange={(event) =>
                                //     setEmailOrPhoneNumber(event.target.value)
                                // }
                                placeholder="Your Phone"
                                className="w-full p-3 pl-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="mb-4">
                            <textarea
                                // value={message}
                                // onChange={(event) =>
                                //     setMessage(event.target.value)
                                // }
                                placeholder="Your Message"
                                className="w-full p-3 pl-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows={7}
                            />
                        </div>

                        <div className="w-full ">
                            <button
                                type="submit"
                                className="mx-auto px-12 py-4 bg-red-500 text-white font-medium rounded-md hover:bg-red-400"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default Contact;
