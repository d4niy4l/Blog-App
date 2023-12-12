import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import {Card} from '@material-tailwind/react'
export function Pagination(props) {
    const [active, setActive] = React.useState(1);

    const ppItems = 10;
    const startIndex = (active - 1) * ppItems;
    const endIndex = startIndex + ppItems;
    const itemsDisplay = props.arr.slice(startIndex,endIndex);
    const getItemProps = (index) =>
    ({
        variant: active === index ? "filled" : "text",
        color: "gray",
        onClick: () => setActive(index),
        className: "rounded-full",
    });

    const next = () => {
        if (active === Math.ceil()) return;
        setActive(active + 1);
    };

    const prev = () => {
        if (active === 1) return;
        setActive(active - 1);
    };
    const limiter = ()=>{
        const max = [];
        let curr = props.arr.length;;
        console.log(curr);
        let count = 0;
        while(curr > 0){
            max.concat(count++);
            curr -= ppItems;
            console.log(count);
        }
        return(
            max.map((val)=>{
                return <IconButton {...getItemProps(val)}>{val}</IconButton>
             })
        )       
    }
    return (
        <Card>
            
            <div className="flex items-center gap-4">
                <Button
                variant="text"
                className="flex flex-col items-center gap-2 rounded-full"
                onClick={prev}
                disabled={active === 1}
                >
                Previous
                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> 
                </Button>   
                <div className="flex items-center gap-2">
                {limiter()}
                </div>
                <Button
                variant="text"
                className="flex flex-col items-center gap-2 rounded-full"
                onClick={next}
                disabled={active === 5}
                >
                Next
                <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                </Button>
            </div>
        </Card>
    );
}