import React from 'react';

const Marquee = () => {

  return (
    <div className="">
        <div className="">
            <div className="flex items-center justify-center">
                  {/* <div className="marquee_head bg-red-700 text-white font-medium text-xl wow bounceIn px-4">
                      Exclusive:
                </div> */}
                <div className="marquee_list">
                    <marquee className=" justify-center" scrolldelay="100" scrollamount="5">
                        <span className="text-red-700 text-xl font-bold"><a href="http://66.29.130.89:4001/notices/63d147b70bfbc8c31261a39d.pdf">কার্য নির্বাহী পরিষদ নির্বাচন ২০২৩ ভোটারদের তালিকাসমূহ</a><span className="marquee_gap"><i className="fas fa-star"></i></span> <a href="http://66.29.130.89:4001/notices/63d147b70bfbc8c31261a39d.pdf">কার্য নির্বাহী পরিষদ নির্বাচন ২০২৩ ভোটারদের তালিকাসমূহ</a><span className="marquee_gap"><i className="fas fa-star"></i></span><a href="http://66.29.130.89:4001/notices/63d147b70bfbc8c31261a39d.pdf">কার্য নির্বাহী পরিষদ নির্বাচন ২০২৩ ভোটারদের তালিকাসমূহ</a><span className="marquee_gap"><i className="fas fa-star"></i></span><a href="http://66.29.130.89:4001/notices/63d147b70bfbc8c31261a39d.pdf">কার্য নির্বাহী পরিষদ নির্বাচন ২০২৩ ভোটারদের তালিকাসমূহ</a></span>
                    </marquee>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Marquee
