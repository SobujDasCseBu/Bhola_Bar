import React from 'react'
import CardHeader from '../../components/CardHeader'
import ContactForm from './ContactForm'
import LocationIcon from '../../assets/icons/LocationIcon'
import MobileIcon from '../../assets/icons/MobileIcon'
import EmailIcon from '../../assets/icons/EmailIcon'
import { BsGlobe2 } from "react-icons/bs";
const Contact = () => {
  return (
    <div className=' flex flex-col  h-[1020px]  w-full lg:h-[700px] mb-[30px]  '>

        <div className='flex flex-col lg:flex-row justify-center gap-8  w-full  box-border mb-[40px] '>
              <div className=' w-[80%] ml-[10%] lg:ml-0 lg:w-[30%]  pt-[40px] '>
                
                  <div className=" common-hover box-border  ">
                       <CardHeader title='Address'/>

                      <div className=' flex flex-col text-[14px] gap-6  text-[#333] m-[0] p-[20px] pl-[20px] w-full h-[220px] shadow-[0_10px_10px_rgb(204,204,204)] bg-gray-300 '>
                        <div className='flex flex-row  gap-2 m-[0]'>
                          
                          <p className='font-bold '> <LocationIcon />  </p>
                          <p>ঠিকানাঃ</p> 
                          
                          <p >Bhola , Bhola Sador</p>
                        </div>

                        <div className='flex flex-row  gap-2 '>
                          
                          <p className='font-bold '> <MobileIcon/></p>
                          <p> মোবাইলঃ  01712 154134</p> 
                          
                        </div>

                        <div className='flex flex-row  gap-2 m-0 pb-0'>
                          
                          <p className='font- '> <EmailIcon /> </p>
                          <p> ই-মেইল: bholabarassociaton2k23@gmail.com</p> 
                          
                        </div>

                        <div className='flex flex-row  gap-2 m-0 pt-0'>
                          <BsGlobe2 />
                          <p>ওয়েব: www.bholabarassociaton.com</p> 
                          
                        </div>
    
                      </div>
                  </div>

              </div>

               <div className="   common-hover box-border ml-[10%] lg:ml-0 w-[80%] lg:w-[45%]  h-auto lg:h-[100px] pt-[40px] ">
                <CardHeader title='Contact Form'/>
                 <div className='w-full h-auto  border  divide-solid  border-gray-100 shadow-[0_10px_10px_rgb(204,204,204)]'>
                    <ContactForm />
                 </div>
               </div>

           </div>

           {/* Map section */}
           <div className='common-hover h-[400px]  mt-[40px] ml-[10%] p-0   w-[80%] lg:w-[81%] lg:ml-[10%]'>
            <div className=" common-hover box-border  ">
                 <CardHeader title='Google Map'/>

              <div className='card-box-shadow-inset h-[250px]'>

              <iframe 

                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14724.596863379744!2d90.63360293539407!3d22.68548851835358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3754d44be3791f4b%3A0xdf8a000125a851b9!2sBhola!5e0!3m2!1sen!2sbd!4v1673627609974!5m2!1sen!2sbd" 
                  width="100%" 
                  height="250" 
                  style={{ border: "0" }}
                  allowfullscreen="" 
                  loading="lazy" 
                  title='Bhola Bar Association'
                  referrerpolicy="no-referrer-when-downgrade">

              </iframe>

              </div>

            </div>

            </div>

            
        </div>

  )
}

export default Contact