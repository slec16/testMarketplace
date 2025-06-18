import { useState } from 'react';
import { twMerge } from 'tailwind-merge'
import HideImageIcon from '@mui/icons-material/HideImage';
import Modal from '@mui/material/Modal';
import ModalListAdv from "./ModalListAdv"
import { type IOrders } from '../interfaces';

type OrdersCardProps = {
    data: IOrders;
    key: string
}

const OrdersCard = (props: OrdersCardProps) => {

    const {id, status, createdAt, finishedAt, total, deliveryWay, items} = props.data

    const [openModal, setOpenModal] = useState(false)
    const openOrderModal = () => setOpenModal(true)
    const closeModal = () => setOpenModal(false)

    const dateCreate = (new Date(Date.parse(createdAt))).toUTCString()
    let dateFinish 
    finishedAt ? dateFinish = (new Date(Date.parse(finishedAt))).toUTCString() : dateFinish = "-"
    
    const orderStatus = new Map<number, string>([
        [0, "Создан"],
        [1, "Оплачен"],
        [2, "В пути"],
        [3, "В пункте выдачи"],
        [4, "Доставлен"],
        [5, "Архивировано"],
        [6, "Возврат"],
    ]);


    const dataStyle = "text-m font-medium text-gray-500"



    return(
        <>
            <div
                onClick={openOrderModal}
                className="border border-slate-50 rounded-md flex flex-row p-3 bg-slate-50 hover:bg-slate-200"
            >
                <div className="rounded-lg bg-slate-100 w-96 h-72 flex flex-row justify-between flex-wrap p-2">
                    {items.map((item, index) => {
                        if(index < 3) {   
                            return(
                                <div className='mb-2'>
                                    { item.imageUrl.length == 0 ? 
                                        <div className='flex w-32 h-32 border border-blue-200 rounded-lg items-center justify-center'>
                                            <HideImageIcon 
                                                fontSize='large'
                                                color='primary'
                                            />
                                        </div>
                                        :
                                        <div className="w-32 h-32 rounded-lg overflow-hidden">          
                                            <img src={item.imageUrl} alt="Your Image" className="object-contain" />
                                        </div>
                                    }
                                </div>
                            )
                        } else {
                            return(
                                <div></div>
                            )
                        }
                    })}
                    {items.length >= 4 && 
                        <div className='flex w-32 h-32 border border-blue-200 rounded-lg items-center justify-center'>
                            <p className='text-2xl text-blue-400'>+{items.length - 3}</p>
                        </div>
                    }
                </div>
                <div className="flex flex-col px-3 justify-between w-full">
                    <p className={dataStyle}>Заказ № {id}</p>
                    <p className={dataStyle}>Количество товаров: {items.length}</p>
                    <p className={dataStyle}>Дата создания: { dateCreate }</p>
                    <p className={dataStyle}>Дата доставки: {dateFinish}</p>
                    <p className={dataStyle}>Способ доставки: {deliveryWay}</p>
                    <div className="flex flex-row">
                        <p className={twMerge(dataStyle, "mr-1")}>Статус:</p>
                        <p className={twMerge(dataStyle, "text-sky-400")}>{orderStatus.get(status)}</p>
                    </div>
                    <p className="flex justify-end text-xl font-medium text-gray-500">{total}₽</p>
                </div>
            </div>
            <Modal
                open={openModal}
                onClose={closeModal}
            >
                <ModalListAdv 
                    items={items}
                />
            </Modal>
        </>
        
    )
}

export default OrdersCard

