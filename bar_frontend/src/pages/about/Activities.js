import React, { useState } from 'react'
import CardHeader from '../../components/CardHeader'

import '../../assets/styles/about-us.css'
import aboutUsImg from '../../assets/images/about-us-body.jpg'
import TwitterIcon from '../../assets/icons/TwitterIcon'
import WhatsappIcon from '../../assets/icons/WhatsappIcon'
import LinkedinIcon from '../../assets/icons/LinkedinIcon'
import FacebookIconF from '../../assets/icons/FacebookIconF'
import MemberSearch from '../../components/Mainbody/MemberSearch'
import VoterSearch from '../../components/Mainbody/VoterSearch'

import '../../assets/styles/activities.css'
import Notice from '../../components/Mainbody/Notice'
import UnderConstruction from '../UnderConstruction'

const _activities = [
  "১. ঢাকা আইনজীবী সমিতি বিজ্ঞ আইনজীবীদের স্বার্থ রক্ষার্থে বেনিভোলেন্ট ফাণ্ডের সুবিধা প্রদান করে থাকে।",
  "২. যদি কোন বিজ্ঞ সদস্য মৃত্যুবরন করেন তাহলে অত্র সমিতি তাৎক্ষনিক ভাবে সেই পরিবারকে নগদে ২০,০০০/- (বিশ হাজার) টাকা প্রদান করা হয়।",
  "৩. বিজ্ঞ আঈনজীবী আঈন পেশায় দক্ষতা অর্জনের লক্ষ্যে আধুনিক লাইব্রেরী সুবিধা প্রদান করা হয়।",
  "৪. ঢাকা আঈনজীবী সমিতি প্রতি বৎসর যথাযোগ্য মর্যাদায় বার্ষিক ইফতার ও দোয়া মাহফিলের আয়োজন করে থাকে।",
  "৫. অত্র সমিতি প্রতি বৎসর ঈদ-ই-মিলাদুন্নবী (সাঃ) উদযাপন করে থাকে।",
  "৬. হিন্দু, বৌদ্ধ ও অন্যান্য ধর্মাবলম্বীদের জন্য পূর্ন-মিলনী আয়োজন করা হয়ে থাকে।",
  "৭. বিজ্ঞ আইনজীবীদের বিভিন্নমূখী অসুবিধার কারনে রিলিফ ফাণ্ডের সুবিধা প্রদা করা হয়।",
  "৮. আইনজীবী দুঃস্থ পরিবার কল্যান তহবিল থেকে বিজ্ঞ আইনজীবীদের পরিবারকে আর্থিক সাহায্য প্রদান করা হয়।",
  "৯. সুস্থধারার আইন চর্চার জন্য বিজ্ঞ আইনজীবী এবং সাধারন জনগনের মধ্যে আইন পেশা সংশ্লিষ্ট বিষয়ে সৃষ্ট সমস্যা সমাধানের লক্ষ্যে অত্র সমিতি অভিযোগ শুনানী ট্রাইব্যুনাল গঠনের মাধ্যমে ন্যায় বিচার প্রতিষ্ঠায় ভূমিকা রাখছে।",
  "১০. আর্ত মানবতার সেবায় ঢাকা আইনজীবী সমিতি যে কোন প্রাকৃতিক দূর্যোগে সাহায্যের হাত প্রসারিত করে বিভিন্ন ধরনের কার্যক্রম গ্রহন করে থাকে।",
  "১১. বিজ্ঞ আদালত অঙ্গনের সার্বিক পরিবেশ বার এবং বেঞ্চের মধ্যে সুসম্পর্ক বজায় রাখা এবং বিজ্ঞ আঈনজীবীদের বিভিন্ন চাওয়া পাওয়া নিয়ে প্রতিনিয়ত বিজ্ঞ বিচারক মণ্ডলীর সাথে আলোচনা করে যে কোন সমস্যার সমাধান করা।",
  "১২. আদালত এবং বিচার ব্যবস্থাকে টাউট মুক্ত করার লক্ষ্যে অত্র সমিতি টাউট উচ্ছেদ সাব কমিটি গঠনের মাধ্যমে বিভিন্ন টাউট-বাটপার এবং দালালদের চিহ্নিত করে পুলিশের হাতে সোপর্দ করে থাকে।",
  "১৩. বিজ্ঞ আইনজীবীদের বেনাভোলেন্ট ফাণ্ড সমৃদ্ধতে সবচেয়ে অগ্রনী ভূমিকা পালন করে থাকে অত্র সমিতির হাজিরা এবং ওকালতনামার বিক্রয়লব্দ টাকা। ফলে কোন ভাবেই যেন হাজিরা এবং ওকালতনামা জাল না হয় সে দিকে লক্ষ রাখার জন্য বিভিন্ন কোর্টে হাজিরা এবং ওকালতনামা সাব-কমিটি গঠন করে কার্যক্রম পরিচালনা করা হয়।",
  "১৪. ঢাকা আইনজীবী সমিতির আয় ব্যায়ের আনুমানিক হিসাব নির্ধারন করে সাধারন সভা আহবান করে বার্ষিক বাজেট মিটিয়ের মধ্যে তাহা উপস্থাপন করা হয়। বিজ্ঞ আইনজীবীদের সম্মিলিত মতামতের প্রেক্ষিতে তাহা সংশোধন পূর্বক অনুমোদন করা হয়।",
  "১৫. ঢাকা আইনজীবী সমিতি বিজ্ঞ সদস্যগনের জন্য বার্ষিক সাংস্কৃতিক প্রতিযোগিতার আয়োজন করে থাকে।",
  "১৬. ঢাকা আইনজীবী সমিতি বিজ্ঞ সদস্যগনের জন্য বার্ষিক অভ্যন্তরিক ক্রীড়া প্রতিযোগিতা আয়োজন করে থাকে।",
  "১৭. অত্র সমিতির হিসাব নিকাশের স্বচ্ছতার অভ্যন্তরিন অডিট কার্যক্রম পরিচালনা করা হয়।",
  "১৮. অত্র সমিতির সার্বিক বিষয়ের স্বচ্ছতা আনয়নের লক্ষ্যে কোম্পানি কর্তৃক অডিট করা হয়।",
  "১৯. অত্র সমিতির উন্নয়ন মূলক কর্মকাণ্ডের জন্য সরকার এবং বার কাউন্সিল সহ বিভিন্ন প্রতিষ্ঠানে অনুদান ,প্রাপ্তির লক্ষ্যে আবেদন সহ প্রয়োজনীয় ব্যবস্থা গ্রহন করা হয়।",
  "২০. অত্র সমিতির মরহুম বিজ্ঞ আইনজীবীদের আত্নার মাগফিরাত কামনা করে শোক সভা করা হয়।",
  "২১. মরহুম বিজ্ঞ সদস্যগনের স্মরণে ফুল কোর্ট ডেথ রেফারেন্স অনুষ্ঠিত হয়।",
  "২২. ঢাকা আইনজীবী সমিতির বিজ্ঞ সদস্যগনের অংশ গ্রহনে বার্ষিক নাট্যানুষ্ঠানের আয়োজন করে থাকে।",
  "২৩. ঢাকা আইনজীবী সমিতি প্রতিটি রাষ্ট্রীয় ও জতীয় অনুষ্ঠান উদযাপন করে থাকে। যেমন-২১ শে ফেব্রুয়ারী, ২৬ শে মার্চ, ১৫ই আগস্ট, ১৪ই ডিসেম্বর, ১৬ই ডিসেম্বর, ১লা বৈশাখ, রবীন্দ্র-নজরুল জন্ম জয়ন্তী, ঈদ-পূনর্মিলনী ইত্যাদি।",
  "২৪. ঢাকা আইনজীবী সমিতির কার্যকরী পরিষদের যাবতীয় হিসাব নিকাশ ও কর্মকাণ্ডের বিবররন সাধারণ সভা আহবানের মাধ্যমে তা বিজ্ঞ সদস্যগনের নিকট উপস্থাপন করা হয়। যাকে বার্ষিক সাধারন সভা বলা হয়।"
]

const Activities = () => {
  const [pageStatus, setPageStatus] = useState('construction')

  return (
    <>
      {pageStatus === 'construction' ? (
        <UnderConstruction />
      ) : (
        <div className='container-9-3 about-us-container'>
          <div className="custom-card common-hover">
            <CardHeader title='About' />
            <div className="custom-card-body">
              <div className="about-middle-img">
                <img src={aboutUsImg} alt="Group of Bhola Bar Association" />
              </div>
              <div className="about-middle-desc activities-desc">
                <p className="text-desc text-desc-header">
                  ঐতিহ্যবাহী এশিয়া মহাদেশের সর্ব-বৃহৎ আইনজীবী সমিতি ঢাকা আইনজীবী সমিতির কার্যক্রম অত্যান্ত ব্যপক এবং বিস্তৃত। দেশে আইনের শাসন, মানবাধিকার প্রতিষ্ঠা এবং রাষ্ট্রীয় অধিকার আদায়ের লক্ষ্যে এই সমিতি অগ্রনী ভূমিকা পালন করে থাকে। উল্লেখিত কার্যাবলী ছাড়াও ঢাকা আঈনজীবী সমিতি দৈনন্দিন বহুবিধ কার্যক্রম সম্পন্ন করে থাকে। সেই সকল কার্যক্রমের কিছু বিবরন নিম্নে দেওয়া হইলঃ
                </p>
                {_activities.map((_it) => (
                  <p className="text-desc">{_it}</p>
                ))}
              </div>
              <div className="bottom-social-share">
                <h3>Share</h3>
                <div className="share-icons">
                  <a href="#" className='icon-facebook'>
                    <FacebookIconF />
                  </a>
                  <a href="#" className='icon-twitter'>
                    <TwitterIcon />
                  </a>
                  <a href="#" className='icon-whatsapp'>
                    <WhatsappIcon />
                  </a>
                  <a href="#" className='icon-linkedin'>
                    <LinkedinIcon />
                  </a>
                </div>
              </div>
            </div>

          </div>
          <div className="custom-column">
            <div className="custom-card common-hover card-box-shadow-inset">
              <CardHeader title='Member Search' />
              <MemberSearch />
            </div>

            <VoterSearch />
            <Notice />
          </div>
        </div>
      )} </>
  )
}

export default Activities