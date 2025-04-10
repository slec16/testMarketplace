import {
  Link,
  matchPath,
  useLocation,
  useParams 
} from 'react-router';
import React, { useState, useEffect, useContext } from 'react';
import HideImageIcon from '@mui/icons-material/HideImage';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import VisibilityIcon from '@mui/icons-material/Visibility';


/*
    При переходе с роута объявы обранто в список сохранять в локал сторадже
    параметры поиска


*/

const AdvertisementPage = () => {

    const [product, setProduct] = useState({})

    let { id } = useParams();
    useEffect( () => {
        fetch(`http://localhost:3000/advertisements/${id}`).then(res => {
          return res.json()
        }).then(result => {
            console.log(result)
            setProduct(result)
        })
      },[])


    return (
        <div 
            className="rounded-md flex flex-row p-3 "
        >
            { !product.imageUrl ? 
                <div className='flex w-48 h-32 border border-blue-200 rounded-lg items-center justify-center'>
                    <HideImageIcon 
                        fontSize='large'
                        color='primary'
                    />
                </div>
                :
                <div className="w-48 h-32 rounded-lg overflow-hidden">          
                    <img src={product.imageUrl} alt="Your Image" className="object-contain" />
                </div>
            }
            <div className="flex flex-col px-3 justify-between w-full">
                <div>
                    <h1
                        className="text-2xl font-bold mb-2"
                    >{ product.name }</h1>
                    <p>{ product.description  }</p>
                </div>
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row">
                        <div className="mr-5 flex items-center">
                            <VisibilityIcon className='mr-1' />
                            { product.views }
                        </div>
                        <div className="flex items-center">
                            <ThumbUpIcon className='mr-1' />
                            { product.likes }
                        </div>
                    </div>
                    <h3 className="text-xl font-medium text-gray-500">{ product.price }₽</h3>
                </div>
            </div>
        </div>
    )
}

export default AdvertisementPage