import React, { useEffect, useState } from 'react'
import CardItem from './CardItem'
import MemberSearch from './MemberSearch'
import VoterSearch from './VoterSearch'
import PresidentSpeech from './PresidentSpeech'
import SecratarySpeech from './SecratarySpeech'
import CardHeader from '../CardHeader'
import Notice from './Notice'
import { Link } from 'react-router-dom'
import News from './News'
import { fetchActiveCommittee } from '../../apis/committee'

import { InfinitySpin } from 'react-loader-spinner'
import Spinner from '../Spinner'

const Mainbody = () => {
  const [committeeData, setCommitteeData] = useState({})

  const [isLoadding, setIsLoadding] = useState(false)

  useEffect(() => {
    initFetch()
  }, [])

  const initFetch = async () => {
    setIsLoadding(true)
    const _committeeData = await fetchActiveCommittee('2023')
    setCommitteeData(_committeeData?.[0] || {})
    setIsLoadding(false)
  }
  useEffect(() => {
    console.log('mainbody committeeData: ', committeeData)
  }, [committeeData])

  return (
    <div className="lg:flex lg:flex-row lg:justify-between p-5 gap-1 sm:p-10 text-white md:flex-col">
      {isLoadding ? (
        <Spinner />
      ) : (
        <>
          <div className="lg:flex-col lg:w-[24%] lg:gap-y-2 md:w-[100%] ">
            {/* Member search section */}

            <div className=" common-hover box-border card-box-shadow-inset  rounded-[3px] mb-[30px] md:w-full">
              <div className="common-hover">
                <CardHeader classNm={'text-18'} title={'Member Search'} />
              </div>
              <div>
                <MemberSearch />
              </div>
            </div>

            {/* Voter search section */}
            <div className="p-[0px] mt-[20px] m-[0] mb-[20px]">
              <VoterSearch />
            </div>

            {/* Notice  section */}

            <Notice />

            {/*Event news section */}

            {/* <Event /> */}

            {/* News section */}

            <div className="mt-[20px] ">
              <News />
            </div>

            {/* sections */}

            {/* 
        <div>
            <div className='bg-[#006A4E] w-[100%] pb-0 mb-[25px] rounded-[3px]  '>
              <h2 className=' text-[18px] text-[#111] p-[8px] text-center shadow-[0_0px_5px_rgba(194, 198, 200)] font-bold rounded-[5px] animate-[memberGlow_1s_infinite_ease_in_out_alternate] animate-[memberGlow_5s_ease-in-out_alternate]'>New Member Registration</h2>
            </div>

            <div className=' w-[100%] pb-0 mb-[25px] rounded-[3px] shadow-[0_0px_5px_red] '>
              <h2 className=' text-[18px] text-[#111] p-[8px] text-center shadow-[0_0px_5px_rgba(194, 198, 200)] font-bold '>EC 2021-22</h2>
            </div>

            <div className=' w-[100%] pb-0 mb-[25px] rounded-[3px] shadow-[0_0px_5px_olive] '>
              <h2 className=' text-[18px] text-[#111] p-[8px] text-center shadow-[0_0px_5px_rgba(194, 198, 200)] font-bold '>Discipline Committee #1</h2>
            </div>

            <div className=' w-[100%] pb-0 mb-[25px] rounded-[3px] shadow-[0_0px_5px_green] '>
              <h2 className=' text-[18px] text-[#111] p-[8px] text-center shadow-[0_0px_5px_rgba(194, 198, 200)] font-bold '>Discipline Committee #2</h2>
            </div>
            <div className=' w-[100%] pb-0 mb-[25px] rounded-[3px] shadow-[0_0px_5px_yellow] '>
              <h2 className=' text-[18px] text-[#111] p-[8px] text-center shadow-[0_0px_5px_rgba(194, 198, 200)] font-bold '>Discipline Committee #3</h2>
            </div>
            <div className=' w-[100%] pb-0 mb-[25px] rounded-[3px] shadow-[0_0px_5px_purple] '>
              <h2 className=' text-[18px] text-[#111] p-[8px] text-center shadow-[0_0px_5px_rgba(194, 198, 200)] font-bold '>Discipline Committee #4</h2>
            </div>
            <div className=' w-[100%] pb-0 mb-[25px] rounded-[3px] shadow-[0_0px_5px_teal] '>
              <h2 className=' text-[18px] text-[#111] p-[8px] text-center shadow-[0_0px_5px_rgba(194, 198, 200)] font-bold '>Discipline Committee #5</h2>
            </div> 
        </div> */}
          </div>

          {/* Middle column start */}

          {/* Executive committee section  */}

          <div className="common-hover lg:w-[48%] md:[90%]">
            <div className="common-hover">
              <CardHeader title={'Executive Committee 2022-23'} />
            </div>

            {committeeData._id && (
              <div className="flex flex-col justify-center items-center md:ml-[0] lg:flex-col lg:justify-center  	">
                <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row justify-center items-center  xl:ml-0 md:justify-center md:gap-10 ">
                  <Link
                    to={`/user-details?id=${committeeData.presidentData?.[0]._id}`}
                  >
                    <CardItem
                      committeeItem={committeeData?.presidentData?.[0]}
                      designation="President"
                    />
                  </Link>

                  <Link
                    to={`/user-details?id=${committeeData.generalSecretaryData?.[0]._id}`}
                  >
                    <CardItem
                      committeeItem={committeeData?.generalSecretaryData?.[0]}
                      designation={'General Secratery'}
                    />
                  </Link>
                </div>

                <div className="flex flex-col md:flex-row md:justify-center lg:flex-col xl:flex-row justify-center items-center  xl:ml-0 md:gap-10 ">
                  <Link
                    to={`/user-details?id=${committeeData.vicePresident01Data?.[0]._id}`}
                  >
                    <CardItem
                      committeeItem={committeeData?.vicePresident01Data?.[0]}
                      designation={'Vice-President'}
                    />
                  </Link>

                  <Link
                    to={`/user-details?id=${committeeData.vicePresident02Data?.[0]._id}`}
                  >
                    <CardItem
                      committeeItem={committeeData?.vicePresident02Data?.[0]}
                      designation={'Vice-President'}
                    />
                  </Link>
                </div>

                <div className="flex flex-col md:flex-row md:justify-center lg:flex-col xl:flex-row justify-center items-center xl:ml-0 md:gap-10 ">
                  <Link
                    to={`/user-details?id=${committeeData.jointSecretary01Data?.[0]._id}`}
                  >
                    <CardItem
                      committeeItem={committeeData?.jointSecretary01Data?.[0]}
                      designation={'Joint-Secratery'}
                    />
                  </Link>

                  <Link
                    to={`/user-details?id=${committeeData.jointSecretary02IdData?.[0]._id}`}
                  >
                    <CardItem
                      committeeItem={committeeData?.jointSecretary02IdData?.[0]}
                      designation={'Joint-Secratery'}
                    />
                  </Link>
                </div>

                <div className="flex flex-col md:flex-row md:justify-center lg:flex-col xl:flex-row justify-center items-center  xl:ml-0 md:gap-10 ">
                  <Link
                    to={`/user-details?id=${committeeData.financeSecretaryData?.[0]._id}`}
                  >
                    <CardItem
                      committeeItem={committeeData?.financeSecretaryData?.[0]}
                      designation={'Finance Secretary'}
                    />
                  </Link>

                  <Link
                    to={`/user-details?id=${committeeData.librarySecretary01Data?.[0]._id}`}
                  >
                    <CardItem
                      committeeItem={committeeData?.librarySecretary01Data?.[0]}
                      designation={'Library Secretary'}
                    />
                  </Link>
                </div>

                <div className="flex flex-col md:flex-row md:justify-center lg:flex-col xl:flex-row justify-center items-center  xl:ml-0 md:gap-10 ">
                  <Link
                    to={`/user-details?id=${committeeData.librarySecretary02Data?.[0]._id}`}
                  >
                    <CardItem
                      committeeItem={committeeData?.librarySecretary02Data?.[0]}
                      designation={'Library Secretary'}
                    />
                  </Link>

                  <Link
                    to={`/user-details?id=${committeeData.religionSecretaryData?.[0]._id}`}
                  >
                    <CardItem
                      committeeItem={committeeData?.religionSecretaryData?.[0]}
                      designation={'RSC Secretary'}
                    />
                  </Link>
                </div>

                <div className="flex flex-col  md:flex-row md:justify-center lg:flex-col xl:flex-row justify-center items-center  xl:ml-0 md:gap-10 ">
                  <Link
                    to={`/user-details?id=${committeeData.member01Data?.[0]._id}`}
                  >
                    <CardItem
                      committeeItem={committeeData?.member01Data?.[0]}
                      designation={'Member'}
                    />
                  </Link>

                  <Link
                    to={`/user-details?id=${committeeData.member02Data?.[0]._id}`}
                  >
                    <CardItem
                      committeeItem={committeeData?.member02Data?.[0]}
                      designation={'Member'}
                    />
                  </Link>
                </div>
                <div className=" flex flex-col md:flex-row md:justify-center lg:flex-col xl:flex-row justify-center items-center  xl:ml-0 md:gap-4">
                  <Link
                    to={`/user-details?id=${committeeData.member03Data?.[0]._id}`}
                  >
                    <CardItem
                      committeeItem={committeeData?.member03Data?.[0]}
                      designation={'Member'}
                    />
                  </Link>
                </div>

                <div></div>
              </div>
            )}
          </div>

          {/* Middle column end */}

          {/* Right column start */}

          <div className="lg:w-[24%] md:[90%]">
            {/* president speech section */}
            <div className="common-hover animate-fade-in-up">
              <div className="common-hover">
                <CardHeader title={'President Speech'} />
              </div>

              <PresidentSpeech
                committeeItem={committeeData?.presidentData?.[0]}
                designation="President"
              />
            </div>

            <div className="common-hover lg:mb-[30px]">
              <div className="common-hover">
                <CardHeader title={'General Secretary Speech'} />
              </div>

              <SecratarySpeech
                committeeItem={committeeData?.generalSecretaryData?.[0]}
                designation="General Secretary"
              />
            </div>

            {/* <div className="common-hover card-box-shadow-inset mb-[30px]">
          <div className="common-hover">
            <CardHeader classNm={"text-18"} title={"Finace Department"} />
          </div>
          <div className="flax flax-col text-black border-box ">
            <div className=" p-[4px]">
              <a>
                {" "}
                <img
                  className="rounded"
                  src={financeImage}
                  alt="Events Image"
                />
              </a>
            </div>
          </div>
        </div> */}

            {/* <div className="common-hover card-box-shadow-inset mb-[30px]">
          <div className="common-hover text-[18px] ">
            <CardHeader classNm={"text-18"} title={"Library Department"} />
          </div>
          <div className="flax flax-col text-black border-box ">
            <div className=" p-2 ">
              <a>
                {" "}
                <img
                  className="rounded"
                  src={libraryImage}
                  alt="Events Image"
                />
              </a>
            </div>
          </div>
        </div> */}
            {/* 
        <div className="common-hover card-box-shadow-inset mb-[30px] ">
          <div className="common-hover text-[18px] ">
            <CardHeader classNm={"text-18"} title={"Cultural Department"} />
          </div>

          <div className="flax flax-col text-black border-box ">
            <div className=" p-2">
              <a>
                {" "}
                <img
                  className="rounded"
                  src={culturalImage}
                  alt="Events Image"
                />
              </a>
            </div>
          </div>
        </div> */}
            {/* 
        <div className="common-hover card-box-shadow-inset mb-[30px] ">
          <div className="common-hover text-[18px] ">
            <CardHeader classNm={"text-18"} title={"Sports Department"} />
          </div>
          <div className="flax flax-col text-black border-box ">
            <div className=" p-1">
              <a>
                {" "}
                <img className="rounded" src={sportsImage} alt="Events Image" />
              </a>
            </div>
          </div>
        </div> */}

            {/* importants links section */}
            {/* <div className='common-hover card-box-shadow-inset mb-[30px] '>
          <div className='common-hover text-[18px] '>
            <CardHeader classNm={'text-18'} title={'Important Link'} />
          </div>
          <div className='flex flex-col text-black border-box p-[5px]'>
            <div className='flex flex-row content-between bg-[#dfe8e8] mb-[4px] rounded-[5px] text-center'>
              <div className='w-[10%] text-[#337ab7] '>
                <i className="fa fa-download"></i>
              </div>
              <div className='text-[14px] text-[#337ab7] leading-[24px]'>
                <a>Car Rent Application Form</a>
              </div>
            </div>
            <div className='flex flex-row content-between bg-[#dfe8e8] mb-[4px] rounded-[5px] text-center'>
              <div className='w-[10%] text-[#337ab7] '>
                <i className="fa fa-download"></i>
              </div>
              <div className='text-[14px] text-[#337ab7] leading-[24px]'>
                <a>ID Card Form</a>
              </div>
            </div>
            <div className='flex flex-row content-between bg-[#dfe8e8] mb-[4px] rounded-[5px] text-center'>
              <div className='w-[10%] text-[#337ab7] '>
                <i className="fa fa-download"></i>
              </div>
              <div className='text-[14px] text-[#337ab7] leading-[24px]'>
                <a>Member Application Form</a>
              </div>
            </div>
            <div className='flex flex-row content-between bg-[#dfe8e8] mb-[4px] rounded-[5px] text-center'>
              <div className='w-[10%] text-[#337ab7] '>
                <i className="fa fa-download"></i>
              </div>
              <div className='text-[14px] text-[#337ab7] leading-[24px]'>
                <a>Membership Form</a>
              </div>
            </div>
            <div className='flex flex-row content-between bg-[#dfe8e8] mb-[4px] rounded-[5px] text-center'>
              <div className='w-[10%] text-[#337ab7] '>
                <i className="fa fa-download"></i>
              </div>
              <div className='text-[14px] text-[#337ab7] leading-[24px]'>
                <a>Member Search</a>
              </div>
            </div>

          </div>
        </div> */}

            {/* <div className='common-hover card-box-shadow-inset mb-[30px'>
          <div className='common-hover text-[18px] '>
            <CardHeader classNm={'text-18'} title={'Important Forms Download'} />
          </div>
          <div className='flax flax-col text-black border-box '>

            <div className='flex flex-col text-black border-box p-[5px]'>
              <div className='flex flex-row content-between bg-[#dfe8e8] mb-[4px] rounded-[5px] text-center'>

                <div className='text-[14px] text-[#337ab7] leading-[24px]  '>
                  <a className='pl-[8px] '>Bangladesh BAR Council</a>
                </div>
              </div>
              <div className='flex flex-row content-between bg-[#dfe8e8] mb-[4px] rounded-[5px] text-center'>

                <div className='text-[14px] text-[#337ab7] leading-[24px]'>
                  <a className='pl-[8px]' >Supreme Court of Bangladesh</a>
                </div>
              </div>
              <div className='flex flex-row content-between bg-[#dfe8e8] mb-[4px] rounded-[5px] text-center'>

                <div className='text-[14px] text-[#337ab7] leading-[24px]'>
                  <a className='pl-[8px]' >Law and Justice Division</a>
                </div>
              </div>
              <div className='flex flex-row content-between bg-[#dfe8e8] mb-[4px] rounded-[5px] text-center'>

                <div className='text-[14px] text-[#337ab7] leading-[24px]'>
                  <a className='pl-[8px]' >Laws of Bangladesh</a>
                </div>
              </div>
              <div className='flex flex-row content-between bg-[#dfe8e8] mb-[4px] rounded-[5px] text-center'>

                <div className='text-[14px] text-[#337ab7] leading-[24px]'>
                  <a className='pl-[8px]' >Bangladesh National Portal</a>
                </div>
              </div>

            </div>
          </div>
        </div> */}
          </div>
        </>
      )}
      {/* Right column end */}
    </div>
  )
}

export default Mainbody
