import React from "react";
export default function ContactForm() {
    return (
        <div className="m-2 pl-[20px] overflow-hidden bg-white sm:max-w-md sm:rounded-lg">
            <form className="flex flex-col gap-3 my-2">
                <div className="flex flex-row justify-between">
                    <label
                        htmlFor="name"
                        className="inline text-[15px] font-normal text-[#4e4c4c]"
                    >
                        Name *:
                    </label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="inline w-[65%] text-[15px] font-normal text-[#4e4c4c]  pl-2 border divide-solid border-[#cecdcd] rounded-[3px]  focus:border-indigo-300 "
                    />
                </div>

                <div className="flex flex-row justify-between">
                    <label
                        htmlFor="email"
                        className="inline text-[15px] font-normal text-[#4e4c4c] "
                    >
                        Email *:
                    </label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="inline w-[65%] text-[14px] font-normal text-[#4e4c4c]  pl-2 border divide-solid border-[#cecdcd] rounded-[3px]  focus:border-indigo-300 "
                    />
                </div>
                <div className="flex flex-row justify-between">
                    <label
                        htmlFor="subject"
                        className="inline text-[15px] font-normal text-[#4e4c4c]"
                    >
                        Subject *:
                    </label>
                    <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        className="inline w-[65%] text-[14px] font-normal text-[#4e4c4c]  pl-2 border divide-solid border-[#cecdcd] rounded-[3px]  focus:border-indigo-300 "
                    />
                </div>

                <div className="flex flex-row justify-between">
                    <label
                        htmlFor="message"
                        className="inline text-[15px] font-normal text-[#4e4c4c]"
                    >
                        Message *:
                    </label>
                    <input
                        type="text"
                        name="message"
                        placeholder="Message"
                        className="inline w-[65%] text-[14px] font-normal text-[#4e4c4c]  pl-2 border divide-solid border-[#cecdcd] rounded-[3px]  focus:border-indigo-300 "
                    />
                </div>
                

                <div className="flex  my-2 ml-[50%] ">
                    <button
                        type="submit"
                        className=" p-[4px_25px] text-[16px] leading-[24px] font-normal tracking-widest text-white  bg-[#006A4E] hover:bg-[#C99D45] border border-transparent shadow-[0_0_15px_rgb(191,229,247)] rounded-[1px] active:bg-[#006A4E] false"
                    >
                        Send 
                    </button>
                </div>
            </form>
        </div>
    );
}