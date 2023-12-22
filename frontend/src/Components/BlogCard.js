import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
export default function BlogCard(props) {
    const navigate = useNavigate();
    const click = (event)=>{
        navigate(`/Blogs?title=${encodeURIComponent(props.title)}`);
    }
return (
    <Card className="p-2 lg:w-800 md:w-600 sm:w-300 hover:scale-105 transition-all hover:overflow-hidden">
    <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
        {props.title}
        </Typography>
        <Typography>
        {props.body.slice(0,200) + "..."}
        </Typography>
    </CardBody>
    <CardFooter className="pt-0">
        <a href="#" className="inline-block">
        <Button size="sm" ripple className="flex items-center gap-2" onClick={click}>
            CLICK TO READ
        </Button>
        </a>
    </CardFooter>
    </Card>
);
}