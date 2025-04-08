import {
  Link,
  matchPath,
  useLocation,
} from 'react-router';
import HideImageIcon from '@mui/icons-material/HideImage';

const Card = (props) => {

    const {id, createdAt, description, imageUrl, likes, name, price, views} = props.data

    const expandText = (text) => {
        if ( text ) {
            let expText = ''
            if ( text.length > 50 ) {
                expText = text.slice(0, 50) + "..."
                return expText
            }
            return text
        }
        return null
    }


    return(
        <Link to={`/advertisements/${id}`} >
        <div 
            className="border border-slate-50 rounded-md flex flex-row p-3 bg-slate-50 hover:bg-slate-200"
        >
                { imageUrl.length == 0 ? 
                    <div className='flex w-48 h-32 border border-blue-200 rounded-lg items-center justify-center'>
                        <HideImageIcon 
                            fontSize='large'
                            color='primary'
                        />
                    </div>
                    :
                    <div className="w-48 h-32 rounded-lg overflow-hidden">          
                        <img src={imageUrl} alt="Your Image" className="object-contain" />
                    </div>
                }
    
                <div className="flex flex-col px-3 justify-between w-full">
                <div>
                    <h1
                        className="text-2xl font-bold mb-2"
                    >{ name }</h1>
                    <p>{ expandText( description ) }</p>
                </div>
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row">
                        <p className="mr-3">👁 { views }</p>
                        <p className="">🖒 { likes }</p>
                    </div>
                    <h3 className="text-xl font-medium text-gray-500">{ price }₽</h3>
                </div>
            </div>
        </div>
        </Link>
    )
}

export default Card