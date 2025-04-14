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
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

/*

    При переходе с роута объявы обранто в список сохранять в локал сторадже
    параметры поиска

*/

const AdvertisementPage = () => {

    const [product, setProduct] = useState({})
    const [isDeleted, setIsDeleted] = useState(false)

    let { id } = useParams();
    useEffect( () => {
        fetch(`http://localhost:3000/advertisements/${id}`).then(res => {
          return res.json()
        }).then(result => {
            console.log(result)
            setProduct(result)
        })
    },[])

    const editAdvertisement = () => {
        //вызвать существующую модалку с пропсом что это редактированик
        console.log("modal")
        //обновить страницу
    }

    const deleteAdvertisement = () => {
        //вызвать удаление => если успешно заменить верстку с надписью "объявление удалено"
        console.log("delete")
        fetch(`http://localhost:3000/advertisements/${id}`, {
            method: 'delete'
        }).then(res => {
            return res.json()
        }).then(result => {
              console.log(result)
              if(result) {
                //сменить верстку
                console.log("change layout")
                setIsDeleted(true)
              }
            //   setProduct(result)
        })
    }

    return (
        <>
            {isDeleted && 
                <p className="items-center text-2xl text-red-400">Объявление удалено</p>
            }
            <div 
                className={`rounded-md flex flex-row p-3 ${isDeleted ? "opacity-50" : "" }`}
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
                        <div className="flex flex-row justify-between">
                            <h1
                                className="text-2xl text-slate-700 font-bold mb-2"
                            >{ product.name }</h1>
                            <div>
                                <IconButton disabled={isDeleted} onClick={editAdvertisement} color="primary">
                                    <EditIcon />
                                </IconButton>
                                <IconButton disabled={isDeleted} onClick={deleteAdvertisement} color="error">
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        </div>
                        <p>{ product.description }</p>
                    </div>
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-row">
                            <div className="mr-5 flex items-center">
                                <VisibilityIcon color="info" className='mr-1 opacity-50' />
                                { product.views }
                            </div>
                            <div className="flex items-center">
                                <ThumbUpIcon color="info" className='mr-1 opacity-50' />
                                { product.likes }
                            </div>
                        </div>
                        <h3 className="text-xl font-medium text-gray-500">{ product.price }₽</h3>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdvertisementPage