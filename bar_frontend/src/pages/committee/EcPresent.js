import React, { useState, useEffect } from 'react'
import CardItem from '../../components/Mainbody/CardItem'
import CardHeader from '../../components/CardHeader'
import { InfinitySpin } from  'react-loader-spinner'
import { fetchActiveCommittee } from "../../apis/committee"
import { Link } from 'react-router-dom'
import Spinner from '../../components/Spinner'
import MemberSearch from '../../components/Mainbody/MemberSearch'
import Notice from '../../components/Mainbody/Notice'
import VoterSearch from '../../components/Mainbody/VoterSearch'
import News from '../../components/Mainbody/News'


const EcPresentCo = () => {

  const [committeeData, setCommitteeData] = useState({})
  const [isLoadding, setIsLoadding] = useState(false)
  useEffect(() => {
    initFetch()
  }, [])

  const initFetch = async () => {
    setIsLoadding(true)
    const _committeeData = await fetchActiveCommittee("2023")
    setCommitteeData(_committeeData?.[0] || {})
    setIsLoadding(false)
  }
  useEffect(() => {
    console.log('mainbody committeeData: ', committeeData)
  }, [committeeData])


  return (

    <div className='flex flex-col  p-10 lg:flex-row justify-center gap-8 w-[100%] '>
      {
        isLoadding ? (
          <Spinner />
        ) : (
          <>
            <div className='common-hover  w-[100%] lg:m-0  lg:w-[24%]'>
              <div className='common-hover'>
                <CardHeader title={'Our Committee'} />
              </div>
              <div className='card-box-shadow-inset  box-border p-[10px]'>

                <Link to='/ec-2022-2023'>
                  <div className='bg-[#006A4E] w-[100%] pb-0 mb-[25px] mt-[5px] p-0  '>
                    <h2 className=' text-[20px] text-[#fff] p-[6px_2px] ml-[10px]   rounded-[5px] '> EC 2022-2023</h2>
                  </div>
                </Link>

                <Link to='/sub-committee'>
                  <div className='bg-[#F42A41] w-[100%] pb-0 mb-[25px] mt-[-10px] p-0  '>
                    <h2 className=' text-[20px] text-[#fff] p-[6px_2px] ml-[10px]   rounded-[5px] '>Sub Committee</h2>
                  </div>
                </Link>

                <Link to='/ex-executive-committee'>
                  <div className='bg-[#F42A41] w-[100%] pb-0 mb-[25px] mt-[-10px] p-0  '>
                    <h2 className=' text-[20px] text-[#fff] p-[6px_2px] ml-[10px]   rounded-[5px] '> Ex Committee</h2>
                  </div>
                </Link>


              </div>

            </div>

            <div className='common-hover  lg:m-0 w-[100%] lg:w-[60%] md:[90%]'>
              <div className='common-hover'>
                <CardHeader title={'Executive Committee 2022-23'} />
              </div>

              {committeeData._id && (
                <div className="flex flex-col ml-[60px] sm:ml-[150px] md:ml-[0] lg:flex-col lg:justify-center  	">
                  <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row lg:ml-[25%] xl:ml-0 md:justify-center md:gap-10 ">
                    <Link to={`/user-details?id=${committeeData.presidentData?.[0]._id}`}>
                      <CardItem
                        committeeItem={committeeData?.presidentData?.[0]}
                        designation="President"
                      />
                    </Link>

                    <Link to={`/user-details?id=${committeeData.generalSecretaryData?.[0]._id}`}>
                      <CardItem
                        committeeItem={committeeData?.generalSecretaryData?.[0]}
                        designation={"General Secratery"}
                      />
                    </Link>
                  </div>

                  <div className="flex flex-col md:flex-row md:justify-center lg:flex-col xl:flex-row lg:ml-[25%] xl:ml-0 md:gap-10 ">
                    <Link to={`/user-details?id=${committeeData.vicePresident01Data?.[0]._id}`}>
                      <CardItem
                        committeeItem={committeeData?.vicePresident01Data?.[0]}
                        designation={"Vice-President"}

                      />
                    </Link>

                    <Link to={`/user-details?id=${committeeData.vicePresident02Data?.[0]._id}`}>
                      <CardItem
                        committeeItem={committeeData?.vicePresident02Data?.[0]}
                        designation={"Vice-President"}

                      />
                    </Link>
                  </div>

                  <div className="flex flex-col md:flex-row md:justify-center lg:flex-col xl:flex-row lg:ml-[25%] xl:ml-0 md:gap-10 ">
                    <Link to={`/user-details?id=${committeeData.jointSecretary01Data?.[0]._id}`}>
                      <CardItem
                        committeeItem={committeeData?.jointSecretary01Data?.[0]}
                        designation={"Joint-Secratery"}

                      />
                    </Link>

                    <Link to={`/user-details?id=${committeeData.jointSecretary02IdData?.[0]._id}`}>
                      <CardItem
                        committeeItem={committeeData?.jointSecretary02IdData?.[0]}
                        designation={"Joint-Secratery"}

                      />
                    </Link>
                  </div>

                  <div className="flex flex-col md:flex-row md:justify-center lg:flex-col xl:flex-row lg:ml-[25%] xl:ml-0 md:gap-10 ">
                    <Link to={`/user-details?id=${committeeData.financeSecretaryData?.[0]._id}`}>
                      <CardItem
                        committeeItem={committeeData?.financeSecretaryData?.[0]}
                        designation={"Finance Secretary"}

                      />
                    </Link>

                    <Link to={`/user-details?id=${committeeData.librarySecretary01Data?.[0]._id}`}>
                      <CardItem
                        committeeItem={committeeData?.librarySecretary01Data?.[0]}
                        designation={"Library Secretary"}

                      />
                    </Link>
                  </div>

                  <div className="flex flex-col md:flex-row md:justify-center lg:flex-col xl:flex-row lg:ml-[25%] xl:ml-0 md:gap-10 ">
                    <Link to={`/user-details?id=${committeeData.librarySecretary02Data?.[0]._id}`}>
                      <CardItem
                        committeeItem={committeeData?.librarySecretary02Data?.[0]}
                        designation={"Library Secretary"}

                      />
                    </Link>

                    <Link to={`/user-details?id=${committeeData.religionSecretaryData?.[0]._id}`}>
                      <CardItem
                        committeeItem={committeeData?.religionSecretaryData?.[0]}
                        designation={"RSC Secretary"}

                      />
                    </Link>
                  </div>

                  <div className="flex flex-col  md:flex-row md:justify-center lg:flex-col xl:flex-row lg:ml-[25%] xl:ml-0 md:gap-10 ">
                    <Link to={`/user-details?id=${committeeData.member01Data?.[0]._id}`}>
                      <CardItem
                        committeeItem={committeeData?.member01Data?.[0]}
                        designation={"Member"}

                      />
                    </Link>

                    <Link to={`/user-details?id=${committeeData.member02Data?.[0]._id}`}>
                      <CardItem
                        committeeItem={committeeData?.member02Data?.[0]}
                        designation={"Member"}

                      />
                    </Link>
                  </div>
                  <div className=" flex flex-col md:flex-row md:justify-center lg:flex-col xl:flex-row lg:ml-[25%] xl:ml-0 md:gap-4">
                    <Link to={`/user-details?id=${committeeData.member03Data?.[0]._id}`}>
                      <CardItem
                        committeeItem={committeeData?.member03Data?.[0]}
                        designation={"Member"}

                      />
                    </Link>
                  </div>



                </div>
              )}
            </div>

            <div className=' w-[100%] lg:w-[27%] flex flex-col '>
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

              <div className='mt-[20px] '>
                   <News />
              </div>

              {/*Event news section */}

            </div>

          </>
        )}
    </div>
  )

}

export default EcPresentCo