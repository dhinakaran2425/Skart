import React from 'react'
import { assets } from '../assets/asserts'
"use client";
import { TypewriterEffect } from "../components/ui/typeeffect";
import { Link } from 'react-router-dom';

const MainBanner = () => {
  const words = [
    {
      text: "Fresh"
    },
    {
      text: "ingredients ",
    },
    {
      text: "for ",
    },
    {
      text: "every",
    },
    {
      text: "meal.",
    },
    {
      text: "Taste",
    },
    {
      text: "the",
    },
    {
      text: "quality",
    },
    {
      text: "in",
    },
    {
      text: "every",
    },
    {
      text: "bite",
    },

    {
      text: "- SKART",
      className: "text-red-500 dark:text-red-500",
    },
  ];
  return (
    <div className='flex'>
      <img src={assets.mainbannerland}alt='banner' className='w-full hidden md:block'/>
      <img src={assets.mainbannermobile}alt='banner' className='w-full md:hidden'/>
      <div className='absolute inset-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
      <TypewriterEffect words={words} />
      
      <div className='flex items-center mt-6 py-10 px-10 font-medium md:px-30'>
        <Link to={"/products"} className='group flex items-center gap-2 px-7 md:px-9 py-3 bg-violet-500 hover:bg-violet-600 transition text-white rounded  cursor-pointer '>
        Shop Now
        <img className='md:hidden transition group-focus:translate-x-1 w-10 ' src={assets.arrow} alt='arrow'/></Link>
      
      <div>
        <Link to={"/products"} className='group hidden md:flex items-center gap-2 px-7 md:px-9 py-3 cursor-pointer  '>
        Explore Deals
        <img className='transition group-hover:translate-x-1 w-7' src={assets.arrow} alt='arrow'/></Link>
      </div>
    </div></div></div>
  )
}

export default MainBanner
