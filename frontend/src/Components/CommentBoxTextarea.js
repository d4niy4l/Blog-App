import {Button} from "@material-tailwind/react";
import { useState } from "react";
export function CommentBoxTextarea(props) {
  const [comments, setComment] = useState('');
  const change = (event)=>{
    const {value} = event.target;
    setComment(value);
  }
  const post = (event) => {
      event.preventDefault();
      
  }
  return (
    <div className="relative px-10 w-full">
    <textarea onChange = {change} placeholder="Your Comment" maxLength={100} minLength={10} className="rounded-lg outline-none border-none focus:scale-105 transition-all  w-full text-white" style={{background: 'rgb(52, 61, 61)'}}/>
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