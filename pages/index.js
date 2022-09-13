import styles from '../styles/Home.module.css'
import axios from "axios";
import {useRef, useState} from "react";
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
export default function Home() {
    const [url,setUrl] = useState('')
    const [data, setData] = useState([])
    const [hiddenElement,setHiddenElement] = useState(true)
    const mainDiv = useRef()

     const generatePdf = async () =>{
        await setHiddenElement(false)
        const ref = mainDiv.current
        html2canvas(ref, {logging: true,useCORS:true}).then(canvas =>{
            const imgWidth = 600
            const imgHeight = canvas.height * imgWidth /canvas.width
            const imgData = canvas.toDataURL('img/png')
            const pdf = new jsPDF('p',"pt","a4")
            pdf.addImage(imgData,'PNG',0,0, imgWidth, imgHeight)
            pdf.save("newPdf.pdf")
            setTimeout(() => {
                setHiddenElement(true)
            },2500)
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

                <div>
                    <h4>Расположение:</h4>
                    <CustomInput value={type.location}/>
                </div>

                <div>
                    <button className={styles.miniButton} onClick={generatePdf}> Сгенерировать PDF </button>
                </div>

                <div>
                    {
                        hiddenElement ? "" : "Ваш специалист по недвижимости Артем +7 111 9321 72 74"
                    }
                </div>
            </div>

        }) : ''}
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
