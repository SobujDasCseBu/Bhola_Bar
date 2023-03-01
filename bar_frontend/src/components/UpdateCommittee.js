import React, { CSSProperties, useEffect, useState, useCallback } from "react";
import CardHeader from "./CardHeader";
import Select from "react-select";
import { fetchAllusers } from "../apis/user";
import CreatableSelect from "react-select/creatable";
import { toastConfigColoured } from "../utils/helper";
import { toast } from "react-toastify";
import { fetchCommitteeById, updateCommittee, updateCommitteeById } from "../apis/committee";
import { useNavigate, useParams } from "react-router-dom";
const UpdateCommittee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentCommittee, setCurrentCommittee] = useState({});
  const [showModal, setShowModal] = React.useState(false);
  const [allUser, setAllUser] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [actingYear, setActingYear] = useState("");
  const [president, setPresident] = useState({});
  const [presidentSpeach, setPresidentSpeach] = useState("");

  const [generalSecretary, setGenneralSecretary] = useState({});
  const [generalSecretarySpeach, setGenneralSecretarySpeach] = useState("");

  const [vicePresident1, setVicePresident1] = useState({});

  const [vicePresident2, setVicePresident2] = useState({});

  const [joinSecretary1, setJoinSecretary1] = useState({});

  const [joinSecretary2, setJoinSecretary2] = useState({});

  const [finance, setFinance] = useState({});

  const [religion, setReligion] = useState({});

  const [library1, setLibrary1] = useState({});
  const [library2, setLibrary2] = useState({});

  const [member1, setMember1] = useState({});

  const [member2, setMember2] = useState({});

  const [member3, setMember3] = useState({});

  // Fecth all user data
  const fetchAllUserdata = async () => {
    const _users = await fetchAllusers();
    setAllUser(_users);
    //   console.log("Fetch All User data data from sml", _users)
  };
  const convertOption = allUser.map((user) => ({
    value: user._id,
    label: user.phoneEn+' - '+user.nameEn,
  }));
    const fetchCurrentCommittee = async () => {
      const { committee } = await fetchCommitteeById(id);
      setCurrentCommittee(committee);
      // console.log("Current committtee in fetch function",id, currentCommittee);
    };
  useEffect(() => {

    // if (id) {
    fetchCurrentCommittee();
    // console.log("inside useEffect CurrentCommittee",id, currentCommittee);
   
    fetchAllUserdata();
    const _user = JSON.parse(localStorage.getItem("profile")) || {};
    setCurrentUser(_user);

  },[id]);

  const updateStateData=()=>{
        if(currentCommittee._id){
          setPresidentSpeach(currentCommittee.presidentSpeech);
          setGenneralSecretarySpeach(currentCommittee.generalSecretarySpeech)
          setActingYear(currentCommittee.actingYear)
    setPresident({
      value: currentCommittee.members[0]._id,
      label: currentCommittee.members[0].phoneEn+" - "+currentCommittee.members[0].nameEn,
    });
    setGenneralSecretary({
      value: currentCommittee.members[1]._id,
      label: currentCommittee.members[1].phoneEn+" - "+currentCommittee.members[1].nameEn,
    });
    setVicePresident1({
      value: currentCommittee.members[2]._id,
      label: currentCommittee.members[2].phoneEn+" - "+currentCommittee.members[2].nameEn,
    });
    setVicePresident2({
      value: currentCommittee.members[3]._id,
      label: currentCommittee.members[3].phoneEn+" - "+currentCommittee.members[3].nameEn,
    });
    setJoinSecretary1({
      value: currentCommittee.members[4]._id,
      label: currentCommittee.members[4].phoneEn+" - "+currentCommittee.members[4].nameEn,
    });
    setJoinSecretary2({
      value: currentCommittee.members[5]._id,
      label: currentCommittee.members[5].phoneEn+" - "+currentCommittee.members[5].nameEn,
    });
    setFinance({
      value: currentCommittee.members[6]._id,
      label: currentCommittee.members[6].phoneEn+" - "+currentCommittee.members[6].nameEn,
    });
    setReligion({
      value: currentCommittee.members[7]._id,
      label: currentCommittee.members[7].phoneEn+" - "+currentCommittee.members[7].nameEn,
    });
    setLibrary1({
      value: currentCommittee.members[8]._id,
      label: currentCommittee.members[8].phoneEn+" - "+currentCommittee.members[8].nameEn,
    });
    setLibrary2({
      value: currentCommittee.members[9]._id,
      label: currentCommittee.members[9].phoneEn+" - "+currentCommittee.members[9].nameEn,
    });
    setMember1({
      value: currentCommittee.members[10]._id,
      label: currentCommittee.members[10].phoneEn+" - "+currentCommittee.members[10].nameEn,
    });
    setMember2({
      value: currentCommittee.members[11]._id,
      label: currentCommittee.members[11].phoneEn+" - "+currentCommittee.members[11].nameEn,
    });
    setMember3({
      value: currentCommittee.members[12]._id,
      label: currentCommittee.members[12].phoneEn+" - "+currentCommittee.members[12].nameEn,
    });

    }

  }
  console.log("current Committee outside",id, currentCommittee.presidentSpeech,currentCommittee);
  useEffect(() => {
   updateStateData();
    
  }, [currentCommittee]);
  const handleUpdateCommittee = (e) => {
    e.preventDefault();
    if (
      actingYear === "" ||
      actingYear === "undefine" ||
      generalSecretary === "" ||
      generalSecretarySpeach === "" ||
      president === "" ||
      presidentSpeach === "" ||
      vicePresident1 === "" ||
      vicePresident2 === "" ||
      joinSecretary1 === "" ||
      joinSecretary2 === "" ||
      finance === "" ||
      religion === "" ||
      library1 === "" ||
      library2 === "" ||
      member1 === "" ||
      member2 === "" ||
      member3 === ""
    ) {
      toast.warn("Fill Up All Input Fields !", toastConfigColoured);
    } else {
      console.log("modal show active");
      setShowModal(true);
    }
  };

  const handleModal = async (e) => {
    console.log("handle modal Accept");
    e.preventDefault();
    // setAceptModal(true)
    setShowModal(false);
    const data = {
      actingYear: actingYear,
      presidentId: president.value,
      presidentSpeech: presidentSpeach,
      generalSecretaryId: generalSecretary.value,
      generalSecretarySpeech: generalSecretarySpeach,
      vicePresident01Id: vicePresident1.value,
      vicePresident02Id: vicePresident2.value,
      jointSecretary01Id: joinSecretary1.value,
      jointSecretary02Id: joinSecretary2.value,
      financeSecretaryId: finance.value,
      religionSecretaryId: religion.value,
      librarySecretary01Id: library1.value,
      librarySecretary02Id: library2.value,
      member01Id: member1.value,
      member02Id: member2.value,
      member03Id: member3.value,
      adminId: currentUser._id,
      isActive: true,
    };
    const updateData = await updateCommitteeById(id,data);
    if (updateData.success) {
    } else {
      toast.warn(updateData.error.msg, toastConfigColoured);
    }
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-xl font-semibold">
                    Do you want to Update committee ?
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                {/* <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    Do you want to Add new committee ?
                  </p>
                </div> */}
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleModal}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      <div className=" common-hover flex flex-col box-border  w-full  mt-[30px] mb-[60px] ">
        <div className="common-hover w-[80%] ml-[10%]  box-border ">
          <CardHeader classNm={"text-18"} title={"Member Search"} />
        </div>

        <div className="flex flex-col w-[80%] ml-[10%] gap-2 ">
          <label
            htmlFor=""
            className="inline text-[16px] leading-[24px] font-normal text-[#000000]"
          >
            Acting Year *
          </label>
          <input
            type="number"
            min="2000"
            value={actingYear}
            onChange={(e) => setActingYear(e.target.value)}
            // value={1}
            // onChange={1}
            className="inline w-[100%] text-[16px] font-normal text-[#4e4c4c]  p-[5px_8px] border divide-solid border-[#cecdcd] rounded-[3px]  focus:border-indigo-300 "
            placeholder="Acting Year"
          />
        </div>
        <div className="flex flex-col w-[80%] ml-[10%] gap-2 ">
          <label
            htmlFor=""
            className="inline text-[16px] leading-[24px] font-normal text-[#000000]"
          >
            President Phone Number *
          </label>
          <Select
            // value={{value:currentCommittee[0]._id,label:currentCommittee[0].phoneEn}}
            value={president}
            options={convertOption}
            isSearchable={true}
            onChange={(e) => setPresident(e)}
            // placeholder="Phone Number ! "
          />
        </div>
        <div className="flex flex-col w-[80%] ml-[10%] gap-2 mb-[20px] ">
          <label
            htmlFor=""
            className="inline text-[16px] leading-[24px] font-normal text-[#000000]"
          >
            President Speech *
          </label>
          <input
            type="text"
            value={presidentSpeach}
            onChange={(e) => setPresidentSpeach(e.target.value)}
            // onChange={1}
            className="inline w-[100%] text-[16px] h-[60px] font-normal text-[#4e4c4c]  p-[5px_8px] border divide-solid border-[#cecdcd] rounded-[3px]  focus:border-indigo-300 "
            placeholder="President Speech"
          />
        </div>

        <div className="flex flex-col w-[80%] ml-[10%] gap-2 ">
          <label
            htmlFor=""
            className="inline text-[16px] leading-[24px] font-normal text-[#000000]"
          >
            General Secretary Phone Number *
          </label>
          {/* <input
                        type="number"
                        // value={1}
                        // onChange={1}
                        className="inline w-[100%] text-[16px] font-normal text-[#4e4c4c]  p-[5px_8px] border divide-solid border-[#cecdcd] rounded-[3px]  focus:border-indigo-300 "
                        placeholder="General Secretary Phone Number"

                    /> */}

          <Select
            value={generalSecretary}
            options={convertOption}
            onChange={(e) => setGenneralSecretary(e)}
          />
        </div>
        <div className="flex flex-col w-[80%] ml-[10%] gap-2 mb-[20px] ">
          <label
            htmlFor=""
            className="inline text-[16px] leading-[24px] font-normal text-[#000000]"
          >
            General Secretary Speech *
          </label>
          <input
            type="text"
            value={generalSecretarySpeach}
            onChange={(e) => setGenneralSecretarySpeach(e.target.value)}
            // onChange={1}
            className="inline w-[100%] text-[16px] h-[60px] font-normal text-[#4e4c4c]  p-[5px_8px] border divide-solid border-[#cecdcd] rounded-[3px]  focus:border-indigo-300 "
            placeholder="General Secretary Speech"
          />
        </div>
        <div className="flex flex-col mb-[30px] w-[80%] ml-[10%] gap-2 ">
          <label
            htmlFor=""
            className="inline text-[16px] leading-[24px] font-normal text-[#000000]"
          >
            Vice President 01 Phone Number *
          </label>
          {/* <input
                        type="number"
                        // value={1}
                        // onChange={1}
                        className="inline w-[100%] text-[16px] font-normal text-[#4e4c4c]  p-[5px_8px] border divide-solid border-[#cecdcd] rounded-[3px]  focus:border-indigo-300 "
                        placeholder="Vice President 01 Phone Number"

                    /> */}

          <Select
            value={vicePresident1}
            options={convertOption}
            isSearchable={true}
            onChange={(e) => setVicePresident1(e)}
            placeholder="Phone Number "
          />
        </div>
        <div className="flex flex-col mb-[30px] w-[80%] ml-[10%] gap-2 ">
          <label
            htmlFor=""
            className="inline text-[16px] leading-[24px] font-normal text-[#000000]"
          >
            Vice President 02 Phone Number *
          </label>
          {/* <input
                        type="number"
                        // value={1}
                        // onChange={1}
                        className="inline w-[100%] text-[16px] font-normal text-[#4e4c4c]  p-[5px_8px] border divide-solid border-[#cecdcd] rounded-[3px]  focus:border-indigo-300 "
                        placeholder="Vice President 02 Phone Number"

                    /> */}

          <Select
            value={vicePresident2}
            options={convertOption}
            isSearchable={true}
            onChange={(e) => setVicePresident2(e)}
            placeholder="Phone Number "
          />
        </div>
        <div className="flex flex-col mb-[30px] w-[80%] ml-[10%] gap-2 ">
          <label
            htmlFor=""
            className="inline text-[16px] leading-[24px] font-normal text-[#000000]"
          >
            Join Secretary 01 Phone Number *
          </label>
          {/* <input
                        type="number"
                        // value={1}
                        // onChange={1}
                        className="inline w-[100%] text-[16px] font-normal text-[#4e4c4c]  p-[5px_8px] border divide-solid border-[#cecdcd] rounded-[3px]  focus:border-indigo-300 "
                        placeholder="Join Secretary 01 Phone Number"

                    /> */}

          <Select
            value={joinSecretary1}
            options={convertOption}
            isSearchable={true}
            onChange={(e) => setJoinSecretary1(e)}
            placeholder="Phone Number "
          />
        </div>
        <div className="flex flex-col mb-[30px] w-[80%] ml-[10%] gap-2 ">
          <label
            htmlFor=""
            className="inline text-[16px] leading-[24px] font-normal text-[#000000]"
          >
            Join Secretary 02 Phone Number *
          </label>
          {/* <input
                        type="number"
                        // value={1}
                        // onChange={1}
                        className="inline w-[100%] text-[16px] font-normal text-[#4e4c4c]  p-[5px_8px] border divide-solid border-[#cecdcd] rounded-[3px]  focus:border-indigo-300 "
                        placeholder="Join Secretary 02 Phone Number"


                    /> */}

          <Select
            value={joinSecretary2}
            options={convertOption}
            isSearchable={true}
            onChange={(e) => setJoinSecretary2(e)}
            placeholder="Phone Number "
          />
        </div>
        <div className="flex flex-col mb-[30px] w-[80%] ml-[10%] gap-2 ">
          <label
            htmlFor=""
            className="inline text-[16px] leading-[24px] font-normal text-[#000000]"
          >
            Finance Secretary Phone Number *
          </label>
          {/* <input
                        type="number"
                        // value={1}
                        // onChange={1}
                        className="inline w-[100%] text-[16px] font-normal text-[#4e4c4c]  p-[5px_8px] border divide-solid border-[#cecdcd] rounded-[3px]  focus:border-indigo-300 "
                        placeholder="Finance Secretary Phone Number"

                    /> */}

          <Select
            value={finance}
            options={convertOption}
            isSearchable={true}
            onChange={(e) => setFinance(e)}
            placeholder="Phone Number "
          />
        </div>
        <div className="flex flex-col mb-[30px] w-[80%] ml-[10%] gap-2 ">
          <label
            htmlFor=""
            className="inline text-[16px] leading-[24px] font-normal text-[#000000]"
          >
            Religion,Sports and Cultural Secretary Phone Number *
          </label>
          {/* <input
                        type="number"
                        // value={1}
                        // onChange={1}
                        className="inline w-[100%] text-[16px] font-normal text-[#4e4c4c]  p-[5px_8px] border divide-solid border-[#cecdcd] rounded-[3px]  focus:border-indigo-300 "
                        placeholder="Religion,Sports and Cultural Secretary Phone Number"

                    /> */}

          <Select
            value={religion}
            options={convertOption}
            isSearchable={true}
            onChange={(e) => setReligion(e)}
            placeholder="Phone Number "
          />
        </div>
        <div className="flex flex-col mb-[30px] w-[80%] ml-[10%] gap-2 ">
          <label
            htmlFor=""
            className="inline text-[16px] leading-[24px] font-normal text-[#000000]"
          >
            Library Secretary 01 Phone Number *
          </label>
          {/* <input
                        type="number"
                        // value={1}
                        // onChange={1}
                        className="inline w-[100%] text-[16px] font-normal text-[#4e4c4c]  p-[5px_8px] border divide-solid border-[#cecdcd] rounded-[3px]  focus:border-indigo-300 "
                        placeholder="Library Secretary 01 Phone Number"

                    /> */}

          <Select
          value={library1}
            options={convertOption}
            isSearchable={true}
            onChange={(e) => setLibrary1(e)}
            placeholder="Phone Number "
          />
        </div>
        <div className="flex flex-col mb-[30px] w-[80%] ml-[10%] gap-2 ">
          <label
            htmlFor=""
            className="inline text-[16px] leading-[24px] font-normal text-[#000000]"
          >
            Library Secretary 02 Phone Number *
          </label>
          {/* <input
                        type="number"
                        // value={1}
                        // onChange={1}
                        className="inline w-[100%] text-[16px] font-normal text-[#4e4c4c]  p-[5px_8px] border divide-solid border-[#cecdcd] rounded-[3px]  focus:border-indigo-300 "
                        placeholder="Library Secretary 02 Phone Number"

                    /> */}

          <Select
            value={library2}
            options={convertOption}
            isSearchable={true}
            onChange={(e) => setLibrary2(e)}
            placeholder="Phone Number "
          />
        </div>
        <div className="flex flex-col mb-[30px] w-[80%] ml-[10%] gap-2 ">
          <label
            htmlFor=""
            className="inline text-[16px] leading-[24px] font-normal text-[#000000]"
          >
            Member 01 Phone Number *
          </label>
          {/* <input
                        type="number"
                        // value={1}
                        // onChange={1}
                        className="inline w-[100%] text-[16px] font-normal text-[#4e4c4c]  p-[5px_8px] border divide-solid border-[#cecdcd] rounded-[3px]  focus:border-indigo-300 "
                        placeholder="Member 01 Phone Number"

                    /> */}

          <Select
            value={member1}
            options={convertOption}
            isSearchable={true}
            onChange={(e) => setMember1(e)}
            placeholder="Phone Number "
          />
        </div>
        <div className="flex flex-col mb-[30px] w-[80%] ml-[10%] gap-2 ">
          <label
            htmlFor=""
            className="inline text-[16px] leading-[24px] font-normal text-[#000000]"
          >
            Member 02 Phone Number *
          </label>
          {/* <input
                        type="number"
                        // value={1}
                        // onChange={1}
                        className="inline w-[100%] text-[16px] font-normal text-[#4e4c4c]  p-[5px_8px] border divide-solid border-[#cecdcd] rounded-[3px]  focus:border-indigo-300 "
                        placeholder="Member 02 Phone Number"

                    /> */}

          <Select
            value={member2}
            options={convertOption}
            isSearchable={true}
            onChange={(e) => setMember2(e)}
            placeholder="Phone Number "
          />
        </div>
        <div className="flex flex-col mb-[30px] w-[80%] ml-[10%] gap-2 ">
          <label
            htmlFor=""
            className="inline text-[16px] leading-[24px] font-normal text-[#000000]"
          >
            Member 03 Phone Number *
          </label>
          {/* <input
                        type="number"
                        // value={1}
                        // onChange={1}
                        className="inline w-[100%] text-[16px] font-normal text-[#4e4c4c]  p-[5px_8px] border divide-solid border-[#cecdcd] rounded-[3px]  focus:border-indigo-300 "
                        placeholder="VMember 03 Phone Number"

                    /> */}

          <Select
            value={member3}
            options={convertOption}
            isSearchable={true}
            onChange={(e) => setMember3(e)}
            placeholder="Phone Number "
          />
        </div>
        <div className="savebutton flex items-center justify-center">
          <button
            onClick={handleUpdateCommittee}
            type="submit"
            class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-[#006a4e] rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-green-900 hover:bg-green-800"
          >
            Update Committee
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdateCommittee;
