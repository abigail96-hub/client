

import React from 'react'
import video from '../../fotos/App Countries Landing (1).mp4';
import style from '../LandingPage/LandingPage.module.css'
import { Link } from "react-router-dom";


export default function LandingPage(){
  return (

    <div className={style.main}>
      <div className={style.over}></div>
      <video className={style.video} src={video} autoPlay loop muted />
      <div className={style.texto}>
        <h1 className={style.h1}>Bievenido</h1>
        <p className={style.p}>Disfruta el viaje</p>

        <Link to="/home" className={style.neon}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>

          Iniciar
        </Link>




      </div>
    </div>

  )
}
