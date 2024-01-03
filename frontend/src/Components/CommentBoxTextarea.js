import {Button} from "@material-tailwind/react";
import { useState } from "react";
export function CommentBoxTextarea(props) {
  const [comments, setComments] = useState('');
  const [newComment, setNewComment] = useState('');
  const change = (event)=>{
    const {value} = event.target;
    setNewComment(value);
    console.log(newComment);
  }
  const postComment = ()=>{
    try{
        fetch('http://localhost:5000/comment',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: {}
        })
    }
    catch(err){

    }
}
  return (
    <div className="matchColor relative px-10 w-full">
    <textarea onChange = {change} placeholder="Your Comment" maxLength={100} minLength={10} className="rounded-lg outline-none border-none focus:scale-105 transition-all  w-full text-yellow-200 matchColor"/>
      <div className="flex w-full justify-between py-1.5">
        <div className="flex gap-2">
          <Button size="sm" className="rounded-md">
            Post Comment
          </Button>
        </div>
      </div>
    </div>
  );
}