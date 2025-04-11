import Card from "./Card"

const List = (props) => {

    console.log(props)

    const filterFn = (el) => {
        if(el == undefined){
            return false
        } else {
            return true
        }
    }

    const conjunctionList = () => {
        if( props.listOfSorted.length !== 0 ) { 

            let mainList = props.listOfSorted.map(el => {
                if(props.listOfFiltered.includes(el)) return el
            })
                    
            let test = mainList.filter(filterFn)
            
            console.log(test)
            
            return test

        } else {
            
            let mainList = props.listOfFiltered
            
            console.log(mainList)
            
            return mainList
        }        
        
    }

    const listItems = conjunctionList().map(item => 
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