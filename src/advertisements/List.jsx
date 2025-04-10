import Card from "./Card"

const List = (props) => {

    console.log(props)

    const listItems = props.listOfAdvertisements.map(item => 
        <Card 
            key = {item.id}
            data = {item}
        />
    )



    
    return(
        <div className="flex flex-col gap-y-2 h-full ">
            {listItems}
        </div>
    )
}

export default List