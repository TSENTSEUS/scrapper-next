import styles from '../styles/Home.module.css'
import axios from "axios";
import {useEffect, useRef, useState} from "react";
import {jsPDF} from "jspdf";
import html2canvas from 'html2canvas';
import CustomInput from "../components/CustomInput";

export default function Home() {

    const [url,setUrl] = useState('')
    const [hiddenElement,setHiddenElement] = useState(true)
    const mainDiv = useRef()

    const [data, setData] = useState([])
    const [imageData, setImageData] = useState('')

    useEffect(()=>{
        const initial = data[0]?.initialData
        if(initial){
            const result = urlEncode(initial)
            setImageData(result)
        }
    }, [data])


    const urlEncode = (imageData) => {
        if(!imageData){
            return <></>
        }
        const initialData = decodeURIComponent(imageData)
        const pattern = /\"(.*)\";/gm
        const finalData = initialData.match(pattern)
        const dataToParse = finalData[0].substring(1, finalData[0].length - 2)
        const parsedData = JSON.parse(dataToParse)
        const findByKey = (object, fn) => {
            for(const key in object){
                if(fn(key)) return object[key]
            }
            return null
        }
        const bxItemView = findByKey(parsedData, key => key.startsWith('@avito/bx-item-view'))
        const imageList = bxItemView['buyerItem']['item']['imageUrls']
        return imageList.map((img, i) => ({
            url:img['1280x960'],
            id:i
            }))
        // return imageList.map((img,i) => <img key={i} src={img['1280x960']} alt={''}/>)
    }

     const generatePdf = async () =>{
        await setHiddenElement(false)
        const ref = mainDiv.current
        html2canvas(ref, {logging: true,useCORS:true}).then(canvas =>{

            const imgData = canvas.toDataURL('image/png');
            const w = document.getElementById("mainDiv").offsetWidth
            const h = document.getElementById("mainDiv").offsetHeight
            const pdf = new jsPDF("p","px",[w,h]);
            pdf.addImage(imgData, 'PNG', 0, 0, w, h);
            pdf.save("newPdf.pdf")
            setTimeout(() => {
                setHiddenElement(true)
            },1000)
        })
    }

    function deleteImg(id){
        const result = imageData.filter(img => img.id !== id)
        setImageData(result)
    }

    async function postRequest(e){
        e.preventDefault()
        const response = await axios({
            method:"post",
            url:'/api/scrapper',
            data:{
                url,
            },
            headers:{
              "Allow-Control-Allow-Origin":"https://scrapper-next.herokuapp.com",
              "Allow-Control-Allow-Methods":"PUT,GET,HEAD,POST,DELETE,OPTIONS"
            },
        },)
        setData(response.data)
        console.log('Data List: ', response)
    }

  return (
    <div style={{textAlign:'center'}}>
        <h1> ?????????? ???????????? </h1>
        <form>
            <input className={styles.input}
                   placeholder={'???????????????? ????????????'} value={url} onChange={(e) => {
                setUrl(e.target.value)
            }}/>
     <button type="submit"
             className={styles.button}
             onClick={postRequest || 'undefined'}>
       ????????????
     </button>
        </form>
        { data.length !== 0 && imageData ? data.map((type, key) => {
            return <div key={key}
                        ref={mainDiv}
                        id={"mainDiv"}
                        className={styles.wrapper}>
                <h3 > {type.title}</h3>
                <CustomInput value={type.price} hidden={hiddenElement}/>
                <div>
                 ?? ????????????????:
                <ul className={styles.description}>
                    {type.description.map((e,i) => <li key={i}>{e}</li>)}
                </ul>
                </div>

                        {imageData.map((img, i) =>
                            <div key={i} className={styles.imageContainer}>
                                <img  src={img.url} alt={''} style={{width:'100%'}}/>
                                <button className={styles.deleteBtn} onClick={() => deleteImg(img.id)}> ?????????????? </button>
                            </div>
                            )
                        }

                <div>
                    <h4>????????????????????????:</h4>
                    <CustomInput value={type.location} hidden={hiddenElement}/>
                </div>

                <div>
                    { hiddenElement ?
                        <button className={styles.miniButton} onClick={generatePdf}> ?????????????????????????? PDF </button>
                    : "" }
                </div>

                <div className={styles.contact}>
                    {
                        hiddenElement ? "" : "?????? ???????????????????? ???? ???????????????????????? ???????????? ?????????? +7 911 975 75 24"
                    }
                </div>
            </div>

        }) : ''}
    </div>

  )
}

