import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


function Ask () {
    const [response, setResponse] = useState();
    const [inputTitle, setInputTitle] = useState();
    const [inputContent, setInputContent] = useState();
    const navigate = useNavigate();

    const sendPost = () => {
        const URL = `https://port-0-java-project-5mk12alp7v761c.sel5.cloudtype.app/post`;
        axios.post(URL, { title: inputTitle, content: inputContent
        })
        .then((response) => {
            setResponse(response);
            console.log(setResponse);
            navigate(`/ask`);
        })
        .catch((error) => {
            console.log('오류 :', error);
        });
    }

    const pageBack = () => {
        navigate(`/`);
    }
    return(
        <div>
            <input 
                type="text" 
                placeholder="Title"
                value={inputTitle}
                onChange={(e) => setInputTitle(e.target.value)}
            />

            <p></p>

            <input 
                type="text" 
                placeholder="Content"
                value={inputContent}
                onChange={(e) => setInputContent(e.target.value)}
            />

            <p></p>

            <button onClick={sendPost}>전송하기</button>

            <button onClick={pageBack}>돌아가기</button>
        </div>
    );
}

export default Ask;