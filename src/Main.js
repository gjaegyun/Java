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
        const URL = `http://192.168.1.25:8085/api/get`;
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
        <div>
            <div className="center">
                <script src="https://kit.fontawesome.com/f58b282d72.js" crossorigin="anonymous"></script>
                <div className="greenBox">
                    <button onClick={Ask} className="green">
                        <span className="wantPad">질문하러 가기</span>
                        <FontAwesomeIcon icon={faPen} />
                    </button>
                </div>

                <div className="contentBox">
                    {datas.map((data) =>
                        <div key={data.id} className="inContent" onClick={() => goDetail(data.id)}>
                            <div className="overFlow">
                                <div className="tagName">
                                    <span className="titleContent">제목 : {data.title}</span>
                                    <p className="like">좋아요 : {data.likes}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Main;