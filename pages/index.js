import styles from '../styles/Home.module.css'
import axios from "axios";
import {useRef, useState} from "react";
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import CustomInput from "../components/CustomInput";

export default function Home() {

    const [url,setUrl] = useState('')
    const [data, setData] = useState([])
    const [hiddenElement,setHiddenElement] = useState(true)
    const mainDiv = useRef()
    const urlEncode = () => {
        const initialData = decodeURIComponent(data['initialData'])
        const pattern = /\"(.*)\";/gm
        const finalData = initialData.match(pattern)
        const dataToParse = finalData[0].substring(1, finalData[0].length - 2)
        const parsedData = JSON.parse(dataToParse)
        const imageList = parsedData['@avito/bx-item-view:1.480.2']['buyerItem']['item']['imageUrls']
        imageList.map((img) => console.log(img['1280x960']))
    }

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
            },1000)
        })
    }

    async function postRequest(e){
        e.preventDefault()
        const response = await axios.post('/api/scrapper', {url},{
            headers:{
                "Access-Control-Allow-Origin": "*"
            }
        })
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
            return <div ref={mainDiv} className={styles.wrapper}>
                <h3 > {type.title}</h3>
                <CustomInput value={type.price} hidden={hiddenElement}/>
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
                    <CustomInput value={type.location} hidden={hiddenElement}/>
                </div>

                <div>
                    { hiddenElement ?
                        <button className={styles.miniButton} onClick={generatePdf}> Сгенерировать PDF </button>
                    : "" }
                </div>

                <div className={styles.contact}>
                    {
                        hiddenElement ? "" : "Ваш специалист по недвижимости Петров Артем +7 911 975 75 24"
                    }
                </div>
            </div>

        }) : ''}
        <button onClick={urlEncode}>Decode</button>
    </div>

  )
}

