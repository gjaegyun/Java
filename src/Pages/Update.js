import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState} from 'react';
import './Update.css'

function Update () {
    const { id } = useParams();
    const [inputTitle, setInputTitle] = useState('');
    const [inputContent, setInputContent] = useState('');
    const navigate = useNavigate();

    const upDatePost = () => {        
        axios.put(`http://192.168.1.25:8085/api/update?id=${id}`, {
            boardId : id,
            title : inputTitle,
            content : inputContent
        })
        .then((response) => {
            console.log(response);
            navigate(`/`);
        })
        .catch((error) => {
            console.log('오류 : ', error);
        })
    }

    const pageBack = () => {
        navigate(`/`);
    }

    return(
        <div className="textAlign" key={id}>
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
                                    <button className="greenBtn" onClick={upDatePost}>수정하기</button>
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
    )
}

export default Update;