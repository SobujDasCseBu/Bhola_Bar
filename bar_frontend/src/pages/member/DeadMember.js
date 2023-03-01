import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import CardHeader from '../../components/CardHeader'
import { fetchAllusers } from "../../apis/user";
import Pagination from './Pagination'

const DeadMember = [
  {
      "nameBn": "বাবু কালী প্রসন্ন মুখার্জী",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবুু রজনী নাথ কর",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু অভয় কুমার চ্যাটার্জী",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু রসিক লাল গুপ্ত",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু কালী প্রসন্ন ব্যানার্জী",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু সূর্য কুমার বসু",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু মাহেন্দ্র রায় চৌধুরী",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু নবীন চন্দ গুপ্ত",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু তারক চন্দ্র দত্ত",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু রাজেন্দ্র কিশোর",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু শ্যামা চরণ মুখোপাধ্যায়",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু রমণী মোহন দাস গুপ্ত",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব মৌ: হাসমত আলী মুন্সী",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু বিনোদ লাল ঠাকুরতা",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু ললিত মোহন",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু সতীশ চন্দ্র দাস",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু কামাক্ষা চরণ সেন",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু শশী ভূষণ বন্দোপাধ্যায়",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু বামা চরণ মুখার্জী",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু ধীরেন্দ্র কুমার বসু",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু জীতেন্দ্র নাথ বন্দোপাধ্যায়",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু দক্ষিণা রঞ্জন ব্যানর্জী",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু কালী দাস ব্যানার্জী",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু ফলোদা কুমার গাঙ্গুলী",
      "memberStatus": "dead"
  },
   {
      "nameBn": "বাবু বসন্ত কুমার গুপ্ত",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু চুনী লাল সেন গুপ্ত",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু উপেন্দ্র ভাওয়াল",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব মৌলভী শামছুল হক (১)",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব মৌলভী শামছুল হক (২)",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব মৌলভী আবদুল বারী",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব মৌলভী আবদুুল হক (১)",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব মৌলভী হাবিব উল্লাহ মিয়া",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব মৌলভী সিরাজুল হক",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব আজিজুল ইসলাম খান(প্রক্তন ম্যাজিস্ট্রেট)",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব আবদুল মালেক মিয়া (১)",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু ধীরেন্দ্র কুুমার বঙ্গোপাধ্যায়",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু শরৎ কুমার দত্ত",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু সুকুমার চ্যাটার্জী",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু অখিল চন্দ্র পাল",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু শরৎ চন্দ্র পাল",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব খান বাহাদুর নুরুজ্জামান",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু প্রমথ নাথ কর",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু ভূপতি নাথ কর",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব মৌলভী হেদায়েত আলী",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু বিরেণ সেন গুপ্ত",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু অমূল্য কুমার ঘটক",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু সুরেন্দ্র কিশোর চক্রবর্তী",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু প্র্রবোধ নাথ কর",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু ক্ষেত্র মোহন দে",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু কুণ্ডু কুমার চক্রবর্তী",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু অমূূল্য কিশোর চক্রবর্তী",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু কৃষ্ণ কুমার দে",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু মােহন বাশী দে",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু অতীন্দ্র নাথ মজুমদার",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু শ্যামা চরণ চক্রবর্তী",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু সতীশ চন্দ্র বিশ্বাস",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু যোগেশ চন্দ্র মুখোপাধ্যায়",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু যোগেন্দ্র কুমার মুখোপাধ্যায়",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু উৎপল কুমার গুপ্ত",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব আকীম উদ্দিন আহম্মেদ",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব সৈয়দ আহমেদ",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু সত্যেন কুমার চ্যাটার্জী",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু ধীরেন্দ্র বিজয় রায় চৌধুরী",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু অক্ষয় চন্দ্র মুখার্জী",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু ভূগবতী চরণ চ্যাটার্জী",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু শচীন্দ্র মোহন ঠাকুরতা",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু শরৎ চন্দ্র দে",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু প্রকাশ চন্দ্র সরকার",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু জ্যোতিশ চন্দ্র দাস গুপ্ত",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু বন বিহারী বন্দোপাধ্যায়",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু পরেন্দ্র নাথ দাস",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু সুধাংশু ভূষণ সেন",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু প্রফূল্ল কুমার চ্যাটার্জী",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব মৌলভী ফজলের রহমান বাদশা মিয়া",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব মৌলভী নজিবুল হক শাহ্",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব মৌলভী মতিয়ার রহমান শাহ্",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব বজলুল করিম চৌধুরী",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু হর প্রসন্ন দাস",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু নলীনি মোহন ব্যানার্জী",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব মৌলভী এ. এফ নুর মোহম্মদ মিয়া",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব মৌলভী আবুল হাসিম মিয়া",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব মৌলভী আজগর আলী মিয়া",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব মৌলভী নাজমুল হক",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু মাখন লাল দত্ত",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু বিমল কৃষ্ণ মজুমদার",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব সাবির আহমেদ সিরাজী",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব রফিক উদ্দিন আহমেদ",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু রবীন্দ্র চক্রবর্তী",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু দক্ষিণা রঞ্জন মজুমদার",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু অনিল চন্দ্র দে",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব জালাল আহমেদ",
      "memberStatus": "dead"
  },
   {
      "nameBn": "জনাব সুলতান আহম্মদ",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব মোঃ মোশারেফ হোসেন",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব দেলোয়ার হোসেন",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব আলহাজ্ব শফিয়ুর রহমান",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব আলহাজ্ব আবুল ফজল আমিনুল একরাম",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব মুজিবুল হক(১)",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব আলহাজ্ব এ. কে. এম শাহজাহান",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব আলহাজ্ব মোঃ মাহাবুবুর রহমান",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব মোঃ রুহুল আমিন (১)",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব আলহাজ্ব এ কে এম নাছির উদ্দিন",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব খােরশেদ আলম",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব রিয়াজ উদ্দিন খাঁন",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু নিরঞ্জন কুমার দে",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব আবদুুল হক (২)",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু মন্টু লাল দে",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব সামছুল হুদা",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব মোঃ মোস্তাফিজুর রহমান (১)",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব দীনেশ চন্দ্র দাস",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব আ.জ.ম মহিবুল্লাহ",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব মোঃ মোস্তাফা কামাল",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব সালেহ মো: ইউসুফ",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব এ. জেড. এম ওবায়দুল্লাহ নাগর",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব মোঃ ক.ম শহিদুল্লাহ কবির",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু বিনোদ বিহারী মজুমদার",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু পরিমল চন্দ্র দাস",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব এ.জেড.এম মফিজুল হক",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু শান্তি রঞ্জন মজুমদার",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব মোঃ রফিকুল হোসেন",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব আঃ রহিম মিয়া",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব আঃ মালেক (২)",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব মোঃ আলাউদ্দিন (১)",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব ওবায়দুর রহমান শাহজাহান",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব মোঃ নেজামল হক",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু প্রশান্ত করঞ্জাই",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু রাধিকা জীবন দেওয়ান",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব আলহাজ্ব এম.ইউ.এম ওবায়েদ উল্লাহ হাওলাদার",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব মোঃ ফিরোজ কিবরিয়া (১)",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু জীবন কৃষ্ণ দাস",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব মোঃ হারুণ অর রশিদ",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব মোঃ ইদ্রিস আলম",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু বিপ্লব চন্দ্র দেবনাথ",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু গনেশ চন্দ্র সাহা",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু রবীন্দ্র নাথ রায়",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব শাহে আলম শিকদার",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব শহিদ সোহেল আহম্মেদ (পরবর্তীকালে সহকারী জজ)",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব মুহাম্মদ মোস্তফা (২)",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "বাবু অপরেশ মিশ্র",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব ড. ফেরদৌস রহমান",
      "memberStatus": "dead",
      "password" : "12345"
  },
   {
      "nameBn": "জনাব মোঃ মনির হাসান চৌধুরী",
      "memberStatus": "dead",
      "password" : "12345"
  }
]

const DeadMembers = () => {
    var count = 1;
   

  // Change page
    const paginateFront = () => {
      if(currentPage * 7 < totalmembers)
      {
        setCurrentPage(currentPage + 1);
      }
    }
    
    const paginateBack = () =>{
      if(currentPage>1){
        setCurrentPage(currentPage - 1);
      }
    }

    const [totalmembers, setTotalMembers] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [currentMembers, setCurrentMembers] = useState([])
    const [membersPerPage] = useState(10);
   
      useEffect(() =>{
        setTotalMembers(140 )
        setCurrentPage(1)

    },[])

    useEffect(() =>{
      setCurrentMembers( DeadMember.filter((user , index)=>{
            
            let indexes = Array.from({length:10}).map((item,index2) =>( 10*(currentPage -1)+index2) )
            return indexes.includes(index)
        }))


    },[currentPage, DeadMember])

    const getContent =() =>{


      if (2 > 0) {
          return currentMembers.map((_item, _in) => (
                
               <>
                    <tr>
                       <td className="p-2 text-center">{(currentPage-1)*7+count++}</td>
                        <td className="p-2 text-center">
                            {_item.nameBn}
                        </td>
    

                    </tr>

                </>
              ))
        }
    }
    

  return (
    <div className=' flex flex-col   pt-[20px] lg:justify-center w-[100%]  gap-4'>
      <h2 className="text-center">ভোলা আইনজীবী সমিতির শ্রদ্ধেয় বিজ্ঞ সদস্য যাঁদের আমরা হারিয়েছি</h2>
      <div className=" common-hover w-[90%] lg:m-[0_20%] m-[0_5%] lg:w-[60%]">
        <CardHeader title='Dead Member List' />
        <div>
        <table className="w-[100%] table-design">
            <thead >
              <tr className='text-[14px] text-[#444] leading-[20px] w-full'>
                <th className="p-2">#</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              { getContent()}
            </tbody>
        </table>
            <Pagination
            mambersPerPage={membersPerPage}
            totalMembers={totalmembers}
            paginateBack={paginateBack}
            paginateFront={paginateFront}
            currentPage={currentPage}
          />
        
        </div>

    </div>
    </div>
  )
}

export default DeadMembers