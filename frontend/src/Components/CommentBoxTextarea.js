import {Button} from "@material-tailwind/react";
import { useState,useRef } from "react";
import {jwtDecode} from 'jwt-decode'
import { useCookies } from 'react-cookie';
export function CommentBoxTextarea(props) {
  const [comments, setComments] = useState('');
  const [newComment, setNewComment] = useState();
  const textbox = useRef(null);
  const [cookie] = useCookies();
  const change = (event)=>{
    const {value} = event.target;
    setNewComment(value);
    console.log(newComment);
  }
  const postComment = async()=>{
    try{ 
      const jwt= jwtDecode(cookie.jwt);
      console.log('res');
      const res = await fetch('http://localhost:5000/comment',{
          method: 'POST',
          headers:{
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            body: newComment,
            id: props.id,
            author_id: jwt.id
          })
        })
        const result = await res.json();

      console.log(result);
      if(result.status){
        textbox.current.value = "";
      }
      else{
        console.log('error');
      }
    }
    catch(err){

    }
}
  return (
    <div className="matchColor relative px-10 w-full">
    <textarea ref={textbox} onChange = {change} placeholder="Your Comment" maxLength={100} minLength={10} className="rounded-lg outline-none border-yellow-300 focus:scale-105 transition-all  w-full text-yellow-200 matchColor active:border-red-600"/>
      <div className="flex w-full justify-between py-1.5">
        <div className="flex gap-2">
          <Button size="sm" className="rounded-md text-yellow-300 hover:text-red-600 transition-all" onClick={postComment}>
            Post Comment
          </Button>
        </div>
      </div>
    </div>
  );
}