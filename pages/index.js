import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from "axios";
import {useState} from "react";

export default function Home() {
    const [url,setUrl] = useState('')
  async function GetRequest(e){
      e.preventDefault()
      await axios.post('/api/scrapper', {
        url
    })
    await axios.get('/api/scrapper')

  }

  return (
    <div>
        <form>
            <input value={url} onChange={(e) => {
                setUrl(e.target.value)
            }}/>
     <button type="submit"
             onClick={GetRequest || 'undefined'}>
       Request
     </button>
        </form>
    </div>
  )
}
