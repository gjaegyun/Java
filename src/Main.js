import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Main () {
    const navigate = useNavigate();
    const [datas, setDatas] = useState([]);

    useEffect(() => {
        getRequest();
    }, []);

    const getRequest = () => {
        const URL = `https://port-0-java-project-5mk12alp7v761c.sel5.cloudtype.app/get`;
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
        <>
            <button onClick={Ask}>질문하러 가기</button>

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
        </>
    );
}

export default Main;