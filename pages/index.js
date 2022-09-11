import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from "axios";

export default function Home() {
  async function GetRequest(){
    const response = await axios.get('/api/scrapper')
    console.log(response.data)

  }
  return (
    <div>
     <button onClick={GetRequest || 'undefined'}>
       Request
     </button>
    </div>
  )
}
