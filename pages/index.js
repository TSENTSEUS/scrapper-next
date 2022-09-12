import styles from '../styles/Home.module.css'
import axios from "axios";
import {useEffect, useState} from "react";
import Image from "next/image";

export default function Home() {
    const [url,setUrl] = useState('')
    const [data, setData] = useState([])

    const [initialPrice, setInitialPrice] = useState('')
    const [flatLocation, setFlatLocation] = useState('')

    const [data2,setData2] = useState('Bebrikiva 32')



    useEffect(()=>{
        const price = data[0]?.price
        const location = data[0]?.location
        setFlatLocation(location)
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
                <CustomInput value={initialPrice}/>
                <div>
                 О квартире:
                <ul className={styles.description}>
                    {type.description.map((e,i) => <li key={i}>{e}</li>)}
                </ul>
                </div>
                <div className={styles.gallery}>
                    {type.images.map((e,i) => <img src={e} alt={''} key={i} />)}
                </div>
                <div> <h4>Расположение:</h4> <CustomInput value={flatLocation}/> </div>
            </>
        }) : ''}

        <div>
            <CustomInput value={'bebra'}/>
            <CustomInput value={'bebra'}/>
        </div>
    </div>
  )
}

const CustomInput = ({value}) => {
    function editData(e){
        e.preventDefault()
        setEdit(!edit)
    }
    const [edit,setEdit] = useState(false)
    const [data1, setData1] = useState(String(value))
    return (
        <div>
            {edit
            ? <input value={data1} onChange={(e) => setData1(e.target.value)}/>
            : data1}
            <button onClick={editData}>
                edit
            </button>
        </div>
    )
}
