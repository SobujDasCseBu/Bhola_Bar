import React from "react";
import CardHeader from "../CardHeader";
export default function VoterSearch() {
    return (
        <div className="voter-search-card common-hover box-border card-box-shadow-inset w-[full] m-[0] ">
            <CardHeader title="Search Voter No" />
            <div className="m-2 overflow-hidden bg-white  ">
                <form className="flex flex-col gap-3">

                    <div className="flex flex-row justify-between">
                        <label
                            htmlFor="memberid"
                            className="inline text-[15px] font-normal text-[#4e4c4c] "
                        >
                            Member Id
                        </label>
                        <input
                            type="number"
                            name="memberid"
                            placeholder="Member Id"
                            className="inline w-[65%] text-[14px] font-normal text-[#4e4c4c]  pl-2 border divide-solid border-[#cecdcd] rounded-[3px]  focus:border-indigo-300 "
                        />
                    </div>

                    <div className="flex justify-center mt-4">
                        <button
                            type="submit"
                            className=" p-[4px_25px] text-[14px] leading-[24px] font-bold tracking-widest text-white  bg-[#F42A41] hover:bg-[#006A4E] border border-transparent shadow-[0_0_15px_rgb(191,229,247)] rounded-[18px] active:bg-[#006A4E] false"
                        >
                            Search
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}