import { useState, useEffect } from 'react'
import Pagination from '../components/Pagination'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import OrdersList from './OrdersList'
import type { IOrders, IPaginationData } from '../interfaces';
import ApiService from '../services/api-service';
import { useAbortController } from '../hooks/useAbortController';
import { useQueryParams } from '../hooks/useQueryParams';

const Orders = () => {

    const { queryParams, setQueryParams, getParam } = useQueryParams();

    const [orders, setOrders] = useState<IOrders[]>([])
    const { createAbortController } = useAbortController()
    const controller = createAbortController()
    // const [rowsPerPage, setRowsPerPage] = useState(10);
    // const [page, setPage] = useState(1);

    const page = getParam('page') || '1';
    const perPage = getParam('perPage') || '10';
    const priceSorted = getParam('priceSorted') || '0'
    const statusSorted = getParam('statusSorted') || '7'

    useEffect(() => {
        if (!queryParams.toString()) {
            setQueryParams({ page, perPage });
        }
    }, []);

    const [paginationData, setPaginationData] = useState<IPaginationData>({
        first: null,
        items: null,
        last: null,
        next: null,
        pages: null,
        prev: null
    })



    const handleChangePage = (newPage: number) => {
        setQueryParams({ page: String(newPage) });
        // setPage(newPage);
    };

    const handleChangeRowsPerPage = (rowsPerPage: number) => {
        setQueryParams({ perPage: String(rowsPerPage), page: String(1) })
        // setRowsPerPage(rowsPerPage)
    };


    let priceSort = [
        "По убыванию",
        "По возрастанию",
    ]

    const [anchorElPrice, setAnchorElPrice] = useState<HTMLButtonElement | null>(null);
    // const [selectedPriceSort, setSelectedPriceSort] = useState(0)
    const openPrice = Boolean(anchorElPrice)

    const openPriceMenu = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setAnchorElPrice(event.currentTarget)
    }

    const handleClosePriceMenu = () => {
        setAnchorElPrice(null)
    }

    
    const handleMenuPriceClick = (status: number) => {
        // setSelectedPriceSort(index);
        setQueryParams({ priceSorted: String(status) })
        setAnchorElPrice(null);
    }

    const orderStatus = [
        "Создано",
        "Оплачено",
        "В пути",
        "В пункте выдачи",
        "Доставлено",
        "Архивиравано",
        "Возврат",
        "Все"
    ]

    const [anchorElStatus, setAnchorElStatus] = useState<HTMLButtonElement | null>(null);
    // const [selectedStatus, setSelectedStatus] = useState(7);
    const openStatus = Boolean(anchorElStatus);
    const openSortMenu = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setAnchorElStatus(event.currentTarget)
    }

    const handleCloseSortMenu = () => {
        setAnchorElStatus(null)
    }

    
    const handleMenuStatusClick = (status: number) => {
        console.log(status)
        // setSelectedStatus(index);
        setQueryParams({ statusSorted: String(status) });
        setAnchorElStatus(null);
    }

//http://localhost:3000/orders?_page=1&_per_page=5&_sort=-total&status=0
    const fetchFunc = async () => {
        const response = await ApiService.getOrders(Number(page), Number(perPage), Number(priceSorted), Number(statusSorted), controller.signal) 
        console.log(response)
        setOrders(response.data)
        const pagination = {
            first: response.first,
            items: response.items,
            last: response.last,
            next: response.next,
            pages: response.pages,
            prev: response.prev
        }
        setPaginationData(pagination)
    }

    useEffect(() => {
        fetchFunc()
    }, [statusSorted, priceSorted, page, perPage])




    return (
        <div className='flex-1 flex flex-col overflow-hidden px-20 pb-5'>
            <div className="h-15 bg-slate-200 rounded-lg mb-5 flex flex-row items-center px-3">
                <p className='mr-1'>Статус:</p>
                <button 
                    className='underline mr-3 text-sky-400'
                    onClick={openSortMenu}
                >{orderStatus[Number(statusSorted)]}</button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorElStatus}
                    open={openStatus}
                    onClose={handleCloseSortMenu}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    {orderStatus.map((option, index) => (
                        <MenuItem
                            key={option}
                            selected={index === Number(statusSorted)}
                            onClick={() => handleMenuStatusClick(index)}
                        >
                            {option}
                        </MenuItem>
                    ))}
                </Menu>
                <p className='mr-1 '>Цена:</p>
                <button
                    className='underline text-sky-400'
                    onClick={openPriceMenu}
                >
                    {priceSort[Number(priceSorted)]}
                </button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorElPrice}
                    open={openPrice}
                    onClose={handleClosePriceMenu}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    {priceSort.map((option, index) => (
                        <MenuItem
                            key={option}
                            selected={index === Number(priceSorted)}
                            onClick={() => handleMenuPriceClick(index)}
                        >
                            {option}
                        </MenuItem>
                    ))}
                </Menu>
                <div className="ml-auto mr-0 w-1/3">
                    <Pagination
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        page={Number(page)}
                        rowsPerPage={Number(perPage)}
                        paginationData={paginationData}
                    />
                </div>
            </div>
            {orders.length !== 0 &&
                <div className='flex flex-1 overflow-y-auto justify-center bg-slate-50 rounded-xl'>
                    <OrdersList 
                        orders={orders}
                    />                
                </div>
            }
        </div>
    )
}

export default Orders

