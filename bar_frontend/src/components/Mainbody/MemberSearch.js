import React, { useState, useEffect } from "react";

import { useNavigate  } from "react-router-dom"

export default function MemberSearch() {

    
    const [name, setName] = useState('')
    const [memberId, setMemberId] = useState('')
    const [phone, setPhone] = useState('')
    const [blood, setBlood] = useState('')

    const navigate = useNavigate()

    


    const changeName = (event) => {
        setName(event.target.value);
        console.log('change name')
    };
    const changeMemberId = (event) => {
        setMemberId(event.target.value);
    };
    const changePhone = (event) => {
        setPhone(event.target.value);
    };
    

    const handleSubmit = (event) => {

        event.preventDefault()
        console.log('On submit button ')
        navigate(`/search-member-list?id=${memberId}&phone=${phone}&name=${name}&bloodGroup=${blood}`)
        // navigate("/search-member-list")
          
    }


    return (
        <div className="m-2 overflow-hidden bg-white sm:max-w-md sm:rounded-lg">
            <form method="post" onSubmit={handleSubmit} className="flex flex-col gap-3 my-2">
                <div className="flex flex-row justify-between">
                    <label
                        htmlFor="name"
                        className="inline text-[15px] font-normal text-[#4e4c4c]"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={changeName}
                        className="inline w-[65%] text-[14px] font-normal text-[#4e4c4c]  pl-2 border divide-solid border-[#cecdcd] rounded-[3px]  focus:border-indigo-300 "
                        placeholder="Name"
                    />
                </div>

                <div className="flex flex-row justify-between">
                    <label
                        htmlFor="memberId"
                        className="inline text-[15px] font-normal text-[#4e4c4c] "
                    >
                        Member Id
                    </label>
                    <input
                        type="text"
                        value={memberId}
                        onChange={changeMemberId}
                        className="inline w-[65%] text-[14px] font-normal text-[#4e4c4c]  pl-2 border divide-solid border-[#cecdcd] rounded-[3px]  focus:border-indigo-300 "
                        placeholder="Member Id"
                    />
                </div>

                <div className="flex flex-row justify-between">
                    <label
                        htmlFor="phone"
                        className="inline text-[15px] font-normal text-[#4e4c4c]"
                    >
                        Phone
                    </label>
                    <input
                        type="number"
                        value={phone}
                        onChange={changePhone}
                        className="inline w-[65%] text-[14px] font-normal text-[#4e4c4c]  pl-2 border divide-solid border-[#cecdcd] rounded-[3px]  focus:border-indigo-300 "
                        placeholder="Phone"

                    />
                </div>

                <div className="flex flex-row justify-between">
                    <label
                        htmlFor="bloodgroup"
                        className="inline text-[15px] font-normal text-[#4e4c4c]"
                    >
                        Blood Group
                    </label>
                    <select onChange={(e)=>setBlood(e.target.value)} className="block w-[65%] text-[14px] font-normal text-[#4e4c4c]  pl-2 border divide-solid border-[#cecdcd] rounded-[3px]  focus:border-indigo-300 " id="grid-state">
                        <option>Select blood group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option  value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                    </select>
                </div>



                <div className="flex justify-center my-3">
                    <button
                        type="submit"
                        className=" p-[4px_25px] text-[14px] leading-[24px] font-bold tracking-widest text-white  bg-[#F42A41] hover:bg-[#006A4E] border border-transparent shadow-[0_0_15px_rgb(191,229,247)] rounded-[18px] active:bg-[#006A4E] false"
                    >
                        Search
                    </button>
                </div>
            </form>
        </div>
    );
}