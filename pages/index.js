import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from "axios";

export default function Home() {
  async function GetRequest(){
    const response = await axios.get('/api/scrapper')
        .then(res =>
        console.log(res))
        .catch((e) => console.log(e))
    await alert(JSON.stringify(response))
  }
  return (
    <div>
     <button onClick={GetRequest || 'undefined'}>
       Request
     </button>
    </div>
  )
}
