import styles from '../styles/Home.module.css'
import axios from "axios";
import {useRef, useState} from "react";
import { jsPDF } from "jspdf";
import MyFont from "../public/YanoneKaffeesatz.ttf"
export default function Home() {

    const [url,setUrl] = useState('')
    const [data, setData] = useState([])

    const mainDiv = useRef()

    const generatePdf = () =>{
        const ref = mainDiv.current
        const doc = new jsPDF("p","pt","a4");
        doc.addFileToVFS("YanoneKaffeesatz.ttf",MyFont)
        doc.addFont("YanoneKaffeesatz.ttf","YanoneKaffeesatz","normal")
        doc.setFont("YanoneKaffeesatz")
        doc.html(ref, {
            callback: function (pdf){
                pdf.save('card.pdf')
            }
        })
    }

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
            // eslint-disable-next-line react/jsx-key
            return <div ref={mainDiv}>
                <h3 > {type.title}</h3>
                <CustomInput value={type.price}/>
                <div>
                 О квартире:
                <ul className={styles.description}>
                    {type.description.map((e,i) => <li key={i}>{e}</li>)}
                </ul>
                </div>
                <div className={styles.gallery}>
                    {type.images.map((e,i) => <img src={e} alt={''} key={i} />)}
                </div>
                <div> <h4>Расположение:</h4> <CustomInput value={type.location}/> </div>
            </div>
        }) : ''}
            <button onClick={generatePdf}> pdf </button>
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
            ? <input value={data1} className={styles.miniInput}
                     onChange={(e) => setData1(e.target.value)}/>
            : data1}
            <button className={styles.miniButton} onClick={editData}>
                Изменить
            </button>
        </div>

    )
}
