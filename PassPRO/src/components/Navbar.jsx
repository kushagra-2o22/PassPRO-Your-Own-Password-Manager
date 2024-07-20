import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white'>
        <div className="mycontainer flex justify-between items-center px-4 h-14 py-5">
        <div className="logo font-bold text-2xl">
            <span className='text-green-500'>&lt;</span>
            <span>Pass</span>
            <span className="text-green-500">PRO/&gt;</span>

            </div>
      {/* <ul>
        <li className='flex gap-4'>
            <a className='hover:font-bold' href="#">Home</a>
            <a className='hover:font-bold' href="#">About</a>
            <a className='hover:font-bold' href="#">Contact</a>
        </li>
      </ul> */}
      {/* <button className='text-wrap bg-green-700 my-5 rounded-full flex justify-between items-center'>
            <img className='invert w-10 p-1 ' src="/icons/github.svg" alt="github logo" />
            <span className='font-bold px-2'>GitHub</span>
        </button> */}
        <a href="https://github.com/kushagra-2o22" target="_blank" rel="noopener noreferrer" className='text-wrap bg-green-700 my-5 rounded-full flex justify-between items-center'>
  <img className='invert w-10 p-1 ' src="/icons/github.svg" alt="GitHub logo" />
  <span className='font-bold px-2'>GitHub</span>
</a>

        </div>
    </nav>
  )

    
}

export default Navbar
