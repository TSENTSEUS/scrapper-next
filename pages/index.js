import styles from '../styles/Home.module.css'
import axios from "axios";
import {useEffect, useState} from "react";
import Image from "next/image";

export default function Home() {
    const [url,setUrl] = useState('')
    const [data, setData] = useState([])

    const [edit,setEdit] = useState(false)

    const [initialPrice, setInitialPrice] = useState('')

    const statement = initialPrice !== ''
    function editData(e){
        e.preventDefault()
        setEdit(!edit)
    }

    async function postRequest(e){
        e.preventDefault()
        const response = await axios.post('/api/scrapper', {url})
        setData(response.data)
        console.log('Data List: ', response.data)
    }
    useEffect(() => {
        data.map((e) => {
            setInitialPrice(e.price)
        })
        console.log(initialPrice)
    })


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
                <h3 key={i}> {el.title}</h3>
                Стоимость <p>{el.price}</p>
                {el.images.map((e,i) => <img src={e} alt={''} key={i} />)}
                {el.description.map((e,i) => <p key={i}>{e}</p>)}
            </>
        }) :
            <div>
                { edit ? <input value={initialPrice} onChange={(e) =>
                    setInitialPrice(e.target.value)}/> : statement ? initialPrice : '' }
                {
                    statement ? <button onClick={editData}> Изменить цену </button> : ''
                }
            </div>

        }
    </div>
  )
}
