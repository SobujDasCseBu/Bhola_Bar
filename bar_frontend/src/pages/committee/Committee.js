import React, { useEffect, useState } from "react";
import { GrView, GrAddCircle } from "react-icons/gr";
import { FaUsers } from "react-icons/fa";
import CardHeader from "../../components/CardHeader";
import { useNavigate } from "react-router-dom";
import { fetchCommitteeList, deleteCommittee } from "../../apis/committee";

const Committee = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [showModal1, setShowModal1] = React.useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [updateId, setUpdateId] = useState("");
  const [showExistingCommitte, setShowExistingCommitte] = useState(false);
  const [committeeList, setCommitteeList] = useState([]);
  const navigate = useNavigate();
  const handleAddCommitte = () => {
    navigate("/dashboard/add-new-committee");
  };

  useEffect(() => {
    const fetchCommitteList = async () => {
      const data = await fetchCommitteeList();
      // console.log("xxxx",data)
      setCommitteeList(data);
    };
    fetchCommitteList();
    console.log("CommitteeList", committeeList);
  }, [deleteId]);
  const tableData = committeeList.map((committee, index) => (
    <tr key={index}>
      <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
        {committee.actingYear}
      </td>
      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
        {committee?.presidentData?.[0].nameEn}
      </td>
      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
        {committee?.generalSecretaryData?.[0].nameEn}
      </td>

      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
        {committee.isActive ? "True" : "False"}
      </td>
      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
        {/* <a className="text-green-500 hover:text-green-700" href="#">
          Update
        </a> */}
        <button
          onClick={() => {
            setShowModal1(true);
            setUpdateId(committee?._id);
          }}
          className="btn-add-news bg-[#006A4E] hover:bg-[#C99D45] text-white font-normal py-2 px-4  "
        >
          Update
        </button>
      </td>
      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
        <button
          onClick={() => {
            setDeleteId(committee?._id);
            setShowModal(true);
          }}
          className="btn-add-news bg-[#006A4E] hover:bg-[#C99D45] text-[red] font-normal py-2 px-4  "
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  const deleteCommitteeId = () => {
    deleteCommittee(deleteId);
    setShowModal(false);
    console.log("DeletedId", deleteId);
  };
  const updateCommitteeId = () => {
    navigate("/dashboard/updateCommittee/" + updateId);
  };

  return (
    <div className="dashboard-container">
      {showModal ? (
        <>
          <div className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className=" relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className=" border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-xl font-semibold">
                    Do you want to Delete this committee ?
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
                    onClick={deleteCommitteeId}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="  opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {showModal1 ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-xl font-semibold">
                    Do you want to Update this committee ?
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
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal1(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={updateCommitteeId}
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

      {/* //Main body  */}
      <div className=" common-hover flex flex-col gap-10 m-[40px] min-h-[50vh]">
        <CardHeader title="Validate Committee" />
        <div className="flex flex-col items-center gap-6 justify-center sm:flex-row  ">
          <div
            onClick={handleAddCommitte}
            className="dashboard-item w-full sm:h-[130px] sm:w-[130px] flex flex-col bg-[#006a4e] border-solid border-[1px] border-gray-400 rounded-[12px]"
          >
            <div className="flex flex-col ">
              <div className="flex items-center justify-center  mb-1 pt-[20px]">
                <GrAddCircle size="60px" color="white" />
              </div>
              <p className="text-[12px] bg-[#C99D45] text-center font-bold mx-2 rounded mb-2 ">
                Add new Committee
              </p>
            </div>
          </div>
          <div
            onClick={() => setShowExistingCommitte(true)}
            className="dashboard-item w-full sm:h-[130px] sm:w-[130px] flex flex-col bg-[#006a4e] border-solid border-[1px] border-gray-400 rounded-[12px]"
          >
            <div className="flex flex-col ">
              <div className="flex items-center justify-center  mb-1 pt-[20px]">
                <FaUsers size="60px" color="white" />
              </div>
              <p className="text-[12px] bg-[#C99D45] text-center font-bold mx-2 rounded mb-2 ">
                View Previous Committe List
              </p>
            </div>
          </div>
          {/* <div className="dashboard-item w-full sm:h-[130px] sm:w-[130px] flex flex-col bg-[#006a4e] border-solid border-[1px] border-gray-400 rounded-[12px]">
            <div className="flex flex-col ">
              <div className="flex items-center justify-center  mb-1 pt-[20px]">
                <GrView size="60px" color="white" />
              </div>
              <p className="text-[12px] bg-[#C99D45] text-center font-bold mx-2 rounded mb-2 ">
              Edit Existing Committee
              </p>
            </div>
          </div> */}
        </div>
      </div>
      {showExistingCommitte ? (
        <div className="speech">
          <div className="common-hover flex flex-col gap-10 m-[40px]">
            <CardHeader title="All committe list Here !" />
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-sm font-bold text-left  uppercase "
                  >
                    Year
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-sm font-bold text-left  uppercase "
                  >
                    President
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-sm font-bold text-left  uppercase "
                  >
                    generalSecretary
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-sm  font-bold  text-left uppercase "
                  >
                    Active Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-sm font-bold text-right  uppercase "
                  >
                    Update
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-sm font-bold text-right  uppercase "
                  >
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>{tableData}</tbody>
            </table>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Committee;
