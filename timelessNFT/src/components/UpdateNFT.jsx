import React, { use, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { setGlobalState, useGlobalState } from "../store";
const imgHero =
  "https://images.cointelegraph.com/images/1434_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjEtMDYvNGE4NmNmOWQtODM2Mi00YmVhLThiMzctZDEyODAxNjUxZTE1LmpwZWc=.jpg";
const UpdateNFT = () => {
    const[modal]=useGlobalState('updateModal')
    
    
    const[price,setPrice]=useState('')

    const handleSubmit=(e)=>{
        e.preventDefault()
        if(!price){
            return;
        }
        console.log('UPDATED...')
        closeModal()
    }
    const closeModal=()=>{
        setGlobalState('updateModal','scale-0')
        resetForm()
    }
    const resetForm=()=>{
        
        setPrice('')
    }
  return (
    
    <div className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 tranform transition-transform duration-300 ${modal}`}>
      <div className="bg-[#151c25] shadow-xl shadow-[#c32970] rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <form onSubmit={handleSubmit} className="flex flex-col ">
          <div className="flex justify-between items-center  text-gray-400">
            <p className="font-semibold ">Candy NFT</p>
            <button
              type="button"
              className="border-0 bg-transparent focus:outline-none"
              onClick={closeModal}
            >
              <FaTimes />
            </button>
          </div>
          <div className="flex justify-center items-center rounded-xl mt-5">
            <div className="shrink-0 rounded-xl overflow-hidden h-20 w-20">
              <img
                src={imgHero}
                className="h-full w-full object-cover cursor-pointer"
                alt="NFT"
              />
            </div>
          </div>
          

          
          <div className="flex justify-between items-center bg-gray-800 rounded-xl mt-5">
            <input
              type="text"
              required
              className="block w-full text-sm text-slate-500 focus:ouline-none cursor-pointer focus:ring-0  bg-transparent border-0"
              placeholder="Price (ETH)"
              min={0.01}
              step={0.01}
              name="price"
              onChange={(e)=> setPrice(e.target.value)}
              value={price}
            />
          </div>
          
          
          <button className="flex justify-center items-center w-full mt-5 p-2 shadow-lg shadow-black text-white bg-[#e32970] hover:bg-[#bd255f] rounded-full  ">Update Price</button>
           
        
        </form>
      </div>
    </div>
  );
};

export default UpdateNFT;
