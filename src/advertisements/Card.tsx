import {
  Link,
} from 'react-router';
import HideImageIcon from '@mui/icons-material/HideImage';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { type IAdvertisement } from '../interfaces';

type CardProps = {
    data: IAdvertisement;
    key: string
}

const Card = (props: CardProps) => {

    const {id, description, imageUrl, likes, name, price, views} = props.data

    const collapseText = (text: string) => {
        if ( text ) {
            let expText = ''
            if ( text.length > 300 ) {
                expText = text.slice(0, 300) + "..."
                return expText
            }
            return text
        }
        return null
    }


    return(
        <Link to={`/advertisements/${id}`} >
            <div
                className="first:mt-3 last:mb-3 border border-slate-50 w-100 h-110 rounded-2xl bg-slate-200 hover:bg-slate-300 py-2 px-3"
            >
                <div className='h-full flex flex-col justify-between '>
                    <div>
                        { imageUrl.length == 0 ? 
                            <div className='flex w-48 h-32 border border-blue-200 rounded-lg items-center justify-center'>
                                <HideImageIcon 
                                    fontSize='large'
                                    color='primary'
                                />
                            </div>
                            :
                            <div className="w-48 h-32 rounded-lg overflow-hidden justify-center">          
                                <img src={imageUrl} alt="Your Image" className="object-cover" onError={() => console.log("alt image ", name)}/>
                            </div>
                        }
                        {/* name + desc */}
                        <h1
                            className="text-2xl text-slate-700 font-bold mb-2"
                        >{ name }</h1>
                        <p>{ collapseText( description ) }</p>
                    </div>
                    <div>
                        {/* likes + price */}
                        <div className="flex flex-row justify-between">
                            <div className="flex flex-row">
                                <div className="mr-5 flex items-center">
                                    <VisibilityIcon color="info" className='mr-1 opacity-50' />
                                    { views }
                                </div>
                                <div className="flex items-center">
                                    <FavoriteIcon color="info" className='mr-1 opacity-50' />
                                    { likes }
                                </div>
                            </div>
                            <h3 className="text-xl font-medium text-gray-500">{ price }₽</h3>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Card