
// export default function Pagination({totalpages, currentPage, setCurrentPage}) {


//     return (
//         <section className="pt-12 ml-[50px] w-full flex flex-row    ">
//             <button className="text-black-700 px-5 ">Previous</button>
//             <div className="flex flex-row cursor-pointer lg:px-0 flex gap-2 justify-end overflow-x-scroll ">

//                {Array.from({length:totalpages}).map((item,index) => (         

//                         <div className={` ${currentPage=== index+1?'bg-blue-600':'bg-blue-300'} text-white px-4 py-1 rounded-full`}
//                           onClick={()=>setCurrentPage(index+1)}
//                         >
//                         {index +1}

//                         </div>

//                 ))}

//             </div>
//             <button className="text-black-700 ">Next</button>
//         </section>
//     );
// }




import React from "react";

export default function Pagination({
  mambersPerPage,
  totalMembers,
  paginateFront,
  paginateBack,
  currentPage,
}) {


  return (
    <div className='py-2  '>
      <div>
        <p className='text-[15px] '>
          Showing
          <span className='font-medium pl-1 pr-1 font-bold'>{currentPage * mambersPerPage - 9}</span>
          to
          <span className='pl-1 pr-1 font-bold'> {currentPage * mambersPerPage} </span>
          of
          <span className='pl-1 pr-1 font-bold'> {totalMembers} </span>
          members
        </p>
      </div>
      <nav className='block mb-1 mt-2'></nav>
      <div className="">

        <a
          onClick={() => {
            paginateBack();
          }}
          href='#'

        >
          <button className={`mr-[8px]  bg-[#006A4E] hover:bg-[#C99D45] text-white font-normal py-1 px-3 `} >Previous</button>
        </a>

        <a
          onClick={() => {
            paginateFront();
          }}
          href='#'

        >
          <button className="bg-[#006A4E] hover:bg-[#C99D45] text-white font-normal py-1 px-3 " >Next</button>
        </a>

      </div>
    </div>
  );
}