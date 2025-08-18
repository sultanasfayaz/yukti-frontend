import React from 'react'
//race
import './home.css'
import video from '../../Assets/yuktivideo.mp4'




const Home = () => {
  return (
    <section className='home'>
      <div className="overlay"></div>
      <video src={video} muted autoPlay loop type="video/mp4"></video>

      <div className="homeContent container">
        <div className="textDiv">
          <h1 className="eventTitle">VTU Mysore</h1>
          <h2 className="text1">PRESENTS</h2>

          <h1 className="homeTitle">YUKTI 2K25</h1>
          <h2 className="text1">A REGIONAL LEVEL TECHNO CULTURAL FEST</h2>
          <p className="date">27th & 28th March 2025</p>
         
          <h1 className="eventTitle">Musical night</h1>
          <h1 className="eventTitle">With</h1>
          <h2 className="text1">RAJESH KRISHNAN</h2>
          <h2 className="text1">SHAMITHA MALNAD</h2>

        </div>

        
          
          
        

          
      
      </div>

    </section>
  )
}

export default Home