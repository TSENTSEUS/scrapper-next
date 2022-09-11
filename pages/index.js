import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from "axios";
import {useState} from "react";

export default function Home() {
  async function GetRequest(){
    await axios.get('/api/scrapper')

  }
  return (
    <div>
     <button onClick={GetRequest || 'undefined'}>
       Request
     </button>
    </div>
  )
}
