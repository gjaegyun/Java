import axios from 'axios'
import { useEffect, useState} from 'react';
import { useNavigate, useParams } from "react-router-dom";
import './DetailPage.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";


function DetailPage() {
    const { id } = useParams();
    console.log(id);
    const [likeResponse, setLike] = useState(0);
    const [datas, setDatas] = useState([]);
    const [commentData, setCommentData] = useState();
    const [response, setResponse] = useState();
    const [inputName, setInputName] = useState();
    const [inputComment, setInputComment] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        detailApi();
        getComment();
    }, [id]);


    const detailApi = () =>  {
        axios.get(`http://192.168.1.25:8085/api/info?id=${id}`)
            .then((data)=>{
                const result = data.data;
                setDatas(result)
            })
    }
    
    const deletePost = () => {
        axios.delete(`http://192.168.1.25:8085/api/delete?id=${id}`)
        .then(response => {
            console.log('잘 된 데이터 : ', response.data);
            navigate(`/`)
        })
        .catch(error => {
            console.log('에러', error);
        })
        .then(() => {

        });
    }

    const likePost = () => {
        axios.post(`http://192.168.1.25:8085/api/likes`, {
            boardId : id
        })
        .then((response) => {
            setLike(prevLikes => prevLikes + 1);
            console.log(response);
        })
        .catch((error) => {
            console.log('오류 : ', error);
        })
    }

    const getComment = () => {
        axios.get(`http://192.168.1.25:8085/api/get/comment?id=${id}`)
        .then((response) => {
            const commentData = response.data;
            setCommentData(commentData);
        })
        .catch(error => {
            console.log('에러', error);
        })
    }

    const commentPost = () => {

        axios.post(`http://192.168.1.25:8085/api/post/comment?id=${id}`, 
        { 
            authorName : inputName, 
            content : inputComment
        })
        .then((response) => {
            setResponse(response.date);
        })
        .catch((error) => {
            console.log('오류 :', error);
        });
    }

    const update = (id) => {
        navigate(`/update/${id}`);
    }

    const reRoll = (id) => {
        navigate(`/detail/${id}`);
    }

    return(
        <>
            <script src="https://kit.fontawesome.com/f58b282d72.js" crossorigin="anonymous"></script>
            <div className='relative' key={id}>
                <div className='margin'>
                    <div className='width'>
                        <div className='padding'>
                            <div className='widthMargin'>
                                <div className='wordWrap'>
                                    <div className='question'>
                                        <FontAwesomeIcon icon={faCircleUser} className='icon'/>
                                    </div>
                                    <div className='headingTitle'>
                                        <div className='headingContent'>
                                            <div className='title'>{datas.title}</div>
                                        </div>
                                    </div>
                                    <div className='headingText'>
                                        {datas.content}
                                    </div>
                                </div>
                                <div className='marginTop'>
                                    <div className='floatLeft'>
                                        <div className='inline'>
                                        <span className='display' onClick={likePost}>좋아요 : {likeResponse}</span>
                                        <button className='delBtn' onClick={() => update(id)}>수정하기</button>
                                        <button className='delBtn' onClick={deletePost}>삭제하기</button>
                                        
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>

                            <div className='text'>

                                <input
                                    type="text"
                                    placeholder="authorName"
                                    value={inputName}
                                    onChange={(e) => setInputName(e.target.value)}
                                    className='boxPad'
                                />

                                <input
                                    type="text"
                                    placeholder="Content"
                                    value={inputComment}
                                    onChange={(e) => setInputComment(e.target.value)}
                                    className='boxPad'
                                />

                                <button className='boxSize' onClick={() => { commentPost(); window.location.reload(true); }}>댓글달기</button>

                            </div>


                            {commentData && commentData.map((comment, i) => (
                                <div className='commentBox'>
                                    <div className='secondBox'>
                                        <div key={i} className='author'>
                                            <div className='authorName'>
                                                <div className='realAuthor'>작성자 : {comment.author_name}</div>
                                                <div className='realContent'>내용 : {comment.content}</div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                                
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default DetailPage;