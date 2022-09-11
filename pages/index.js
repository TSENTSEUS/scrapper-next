import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from "axios";
import {useState} from "react";

export default function Home() {
    const [url,setUrl] = useState('')
  async function postRequest(e){
      e.preventDefault()
      await axios.post('/api/scrapper', {
        url
    }).then(response => console.log('res',response))
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
    </div>
  )
}
