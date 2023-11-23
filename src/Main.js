import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Main.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";


function Main () {
    const navigate = useNavigate();
    const [datas, setDatas] = useState([]);

    useEffect(() => {
        getRequest();
    }, []);

    const getRequest = () => {
        const URL = `https://port-0-java-project-backend-cn1vmr2clp9jhzv3.sel5.cloudtype.app/api/get`;
        axios.get(URL)
        .then((data) => {
            const getResult = data.data;
            const finalResult = getResult.sort((a, b) => b.id - a.id);
            setDatas(finalResult);
            console.log(setDatas);  
        })
        .catch((error) => {
            console.log('get오류 : ', error);
        })
    }
    
    const goDetail = (id) => {
        navigate(`/detail/${id}`);
    }

    const Ask = () => {
        navigate(`/ask`);
    }

    return(
        <div className="center">
            <script src="https://kit.fontawesome.com/f58b282d72.js" crossorigin="anonymous"></script>
            <div className="greenBox">
                <button onClick={Ask} className="green">
                    <span className="wantPad">질문하러 가기</span>
                    <FontAwesomeIcon icon={faPen} />
                </button>
            </div>


            <p></p>

            {datas.map((data) =>
                <div key={data.id} style={{ textAlign: 'center' }}>
                    <div>
                        <button onClick={() => goDetail(data.id)}>
                            <div>제목 : {data.title}</div>
                            <div>좋아요 : {data.likes}</div>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Main;