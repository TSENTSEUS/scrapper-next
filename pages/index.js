import styles from '../styles/Home.module.css'
import axios from "axios";
import {useEffect, useState} from "react";
import Image from "next/image";

export default function Home() {
    const [url,setUrl] = useState('')
    const [data, setData] = useState([])

    async function postRequest(e){
        e.preventDefault()
        const response = await axios.post('/api/scrapper', {url})
        setData(response.data)
        console.log('Data List: ', response.data)
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
       Запрос
     </button>
        </form>
        { data.length !== 0 ? data.map((el,i) => {
            return <>
                <h3 key={i}> {el}</h3>
                <Image src={el.images} alt={''}/>
            </>
        }) : ''}
    </div>
  )
}
