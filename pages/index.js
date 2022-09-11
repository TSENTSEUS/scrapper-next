import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from "axios";
import {useEffect, useState} from "react";

export default function Home() {
    const [url,setUrl] = useState('')
    const [data, setData] = useState(null)
    async function postRequest(e){
      e.preventDefault()
      const response = await axios.post('/api/scrapper', {url})
        await console.log(response)
  }


  return (
    <div style={{textAlign:'center'}}>
        <h1> Авито парсер </h1>
        <form>
            <input className={styles.input}
                   placeholder={'Вставьте ссылку'} value={url} onChange={(e) => {
                setUrl(e.target.value)
            }}/>
     <button type="submit"
             className={styles.button}
             onClick={postRequest || 'undefined'}>
       Request
     </button>
        </form>
       <p>{ data }</p>
    </div>
  )
}
