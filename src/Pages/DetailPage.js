import axios from 'axios'
import { useEffect, useState} from 'react';
import { useNavigate, useParams } from "react-router-dom";

function DetailPage() {
    const { id } = useParams();
    const [inputTitle, setInputTitle] = useState('');
    const [inputContent, setInputContent] = useState('');
    const [likeResponse, setLike] = useState(null);
    const [datas, setDatas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        detailApi();
    }, [id]);


    const detailApi = () =>  {
        axios.get(`https://port-0-java-project-backend-cn1vmr2clp9jhzv3.sel5.cloudtype.app/api/info?id=${id}`)
            .then((data)=>{
                const result = data.data;
                setDatas(result)
            })
    }
    
    const deletePost = () => {
        axios.delete(`https://port-0-java-project-backend-cn1vmr2clp9jhzv3.sel5.cloudtype.app/api/delete?id=${id}`)
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
        axios.post(`https://port-0-java-project-backend-cn1vmr2clp9jhzv3.sel5.cloudtype.app/api/likes`, {
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

    const upDatePost = () => {
        axios.put(`https://port-0-java-project-backend-cn1vmr2clp9jhzv3.sel5.cloudtype.app/api/update?id=${id}`, {
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

    return(
        <>
            <div key={id}>
                <h2>detail Page</h2>
                <div>ID : {id}</div>
                <div>Title : {datas.title}</div>
                <div>Likes : {likeResponse}</div>
                <div>Content : {datas.content}</div>

                <p></p>

                <button onClick={likePost}>좋아요</button>

                <p></p>

                <button onClick={deletePost}>Delete</button>

                <p></p>
                
                <div>
                    <h2>수정하기</h2>

                    <input
                        type="text"
                        placeholder='fixTitle'
                        value={inputTitle}
                        onChange={(e) => setInputTitle(e.target.value)}
                    />

                    <p></p>

                    <input 
                        type="text"
                        placeholder='fixContent'
                        value={inputContent}
                        onChange={(e) => setInputContent(e.target.value)}
                    />

                    <p></p>

                    <button onClick={upDatePost}>수정하기</button>
                </div>
    
            </div>
        </>
    )
}

export default DetailPage;