import {useState} from "react";
import styles from "../styles/Home.module.css";

const CustomInput = ({value, hidden}) => {
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
            {
                hidden ? <button className={styles.miniButton} onClick={editData}>
                    Изменить
                </button> : <div></div>
            }
        </div>

    )
}
export default CustomInput;