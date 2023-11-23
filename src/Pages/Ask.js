import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './Ask.css';

function Ask () {
    const [response, setResponse] = useState();
    const [inputTitle, setInputTitle] = useState();
    const [inputContent, setInputContent] = useState();
    const navigate = useNavigate();

    const sendPost = () => {
        const URL = `https://port-0-java-project-backend-cn1vmr2clp9jhzv3.sel5.cloudtype.app/api/post`;
        axios.post(URL, { title: inputTitle, content: inputContent
        })
        .then((response) => {
            setResponse(response.data);
            console.log(setResponse);
            navigate(`/`);
        })
        .catch((error) => {
            console.log('오류 :', error);
        });
    }

    const pageBack = () => {
        navigate(`/`);
    }
    return(
        <div className="textAlign">
            <div className="jungRyul">
                <div className="form">
                    <div className="formBox">
                        <div className="inputBefore">
                            <div className="padding">
                                <div>
                                    <div className="Title">
                                        <input 
                                            type="text" 
                                            placeholder="Title"
                                            value={inputTitle}
                                            onChange={(e) => setInputTitle(e.target.value)}
                                            className="inputTitle"
                                        />
                                    </div>
                                    <div className="Title">
                                        <input 
                                            type="text" 
                                            placeholder="Content"
                                            value={inputContent}
                                            onChange={(e) => setInputContent(e.target.value)}
                                            className="inputTitle"
                                        />
                                    </div>
                                </div>

                                <div className="margin">
                                    <button className="greenBtn" onClick={sendPost}>전송하기</button>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                <div className="margin">
                    <button className="greenBtn" onClick={pageBack}>돌아가기</button>
                </div>

                </div>
            </div>

            

        </div>
    );
}

export default Ask;