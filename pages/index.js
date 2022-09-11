import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from "axios";

export default function Home() {
  async function GetRequest(){
    await axios.get('/api/scrapper').then(res => console.log(res))
        .catch((e) => console.log(e))
  }
  return (
    <div>
     <button onClick={GetRequest || 'undefined'}>
       Request
     </button>
    </div>
  )
}
