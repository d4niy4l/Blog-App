export default function CommentCard(props){
    return(
        <div className="flex flex-col gap-5 matchColor rounded-lg p-3">
            <div className="flex justify-start p-1">
                <h1 className="text-2xl text-yellow-300">{props.author} commented: </h1>
            </div>
            <div className="flex border-t-2 border-black justify-start p-1 text-left">
                <p className="text-lg text-yellow-300 px-2">{props.body}</p>
            </div>
        </div>
    )
}