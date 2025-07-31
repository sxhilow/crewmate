import React from 'react'
import {Button, Header, Pill} from '../../components/'
import HeroImg from "../../assets/HeroImg.svg"
import { Link } from 'react-router-dom'


const LandingPage = () => {
  return (
    <div className='flex flex-col w-full h-screen'>

      <Header />

      <div className='flex max-md:flex-col lg:justify-between items-center w-full h-full max-md:my-8 space-y-5'>

        <div className='px-5 md:pl-12 space-y-5'>
          <Pill text={"For Solo Builders"}/>

          <div>
            <div className='text-mobile-h1 lg:text-desktop-h1 font-bold leading-[45px] lg:leading-[60px] text-dark'>
            <span> Stop Solo Building </span><br />
            <span>Ship Faster Together</span>
          </div>
          <p className='text-desktop-h5 font-medium text-dark'>
            Connect with skilled collaborators who match your energy and vision.
          </p>
          </div>

          <div className='flex justify-start items-center gap-3'>
            
            <Button
            to="/register"
            className="flex justify-center items-center bg-gradient-to-r from-primary-purple to-primary-blue p-[2px] rounded-lg hover:from-primary-blue hover:to-primary-purple transition duration-300"
          >
            <div className="flex justify-center items-center bg-dark w-full h-full px-4 py-2 rounded-lg hover:bg-primary-purple-800 transition duration-300">
              <span className="bg-gradient-to-br from-neutral-5 to-neutral-7 bg-clip-text text-transparent hover:from-neutral-7 hover:to-neutral-5 transition duration-300">
                Get Started
              </span>
            </div>
          </Button>

          <Button
            to="/register"
            className="flex justify-center items-center bg-gradient-to-r from-primary-purple to-primary-blue p-[2px] rounded-lg hover:from-primary-blue hover:to-primary-purple transition duration-300"
          >
            <div className="flex justify-center items-center bg-bg w-full h-full px-4 py-2 rounded-lg transition duration-300">
              <span className="text-primary-purple-800">Browse Projects</span>
            </div>
          </Button>

          </div>

        </div>

        <div className='flex justify-end max-md:pl-5 max-md:mb-5'>
          <img src={HeroImg} alt="Hero Image" className=''/>
        </div>

      </div>
      
    </div>
  )
}

export default LandingPage