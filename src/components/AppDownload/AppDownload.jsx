import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'
import { toast, ToastContainer } from 'react-toastify'

const AppDownload = () => {
  const download = () => toast( "Downloading..." )
  return (
    <div className='app-download' id='app-download'>
      <div className="mobile-left">
        <p>For Better Experience Download <br /><span>Tomato.</span> App</p>
        <button onClick={download}>Download</button>
        <ToastContainer
          position="top-right"
          hideProgressBar={true}
          autoClose={2000}
          closeOnClick={true}
          closeButton={false}
          limit={1}
          className='toasti'
        />
      </div>
      <img src={assets.mobile_ver} alt="" />
    </div>
  )
}

export default AppDownload
