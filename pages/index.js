import styles from '../styles/Home.module.css'
import axios from "axios";
import {useEffect, useState} from "react";
import Image from "next/image";

export default function Home() {
    const [url,setUrl] = useState('')
    const [data, setData] = useState([])

    const [edit,setEdit] = useState(false)

    const [initialPrice, setInitialPrice] = useState('')

    function editData(e){
        e.preventDefault()
        setEdit(!edit)
    }
    useEffect(()=>{
        const price = data[0]?.price
        setInitialPrice(price)
    },[data])

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
        { data.length !== 0 ? data.map((type) => {
            return <>
                <h3 > {type.title}</h3>
                Стоимость {
                    edit ?
                    <input value={initialPrice} onChange={(e) =>
                        setInitialPrice(e.target.value)}/> : initialPrice
            }
                <button onClick={editData}> Изменить цену </button>

                <ul className={styles.description}>
                    О квартире:
                    {type.description.map((e,i) => <li key={i}>{e}</li>)}
                </ul>

                <div className={styles.gallery}>
                    {type.images.map((e,i) => <img src={e} alt={''} key={i} />)}
                </div>
                <div> <h4>Расположение:</h4> {type.location} </div>
            </>
        }) : ''}
        О квартире:

        <ul className={styles.description}>
            <li>Способ продажи: альтернативная </li>
            <li>Способ продажи: альтернативная </li>
            <li>Способ продажи: альтернативная </li>
            <li>Способ продажи: альтернативная </li>
            <li>Способ продажи: альтернативная </li>
            <li>Способ продажи: альтернативная </li>
            <li>Способ продажи: альтернативная </li>
            <li>Способ продажи: альтернативная </li>
            <li>Способ продажи: альтернативная </li>
            <li>Способ продажи: альтернативная </li>
            <li>Способ продажи: альтернативная </li>
            <li>Способ продажи: альтернативная </li>
            <li>Способ продажи: альтернативная </li>
            <li>Способ продажи: альтернативная </li>
            <li>Способ продажи: альтернативная </li>
            <li>Способ продажи: альтернативная </li>
        </ul>
    </div>
  )
}
