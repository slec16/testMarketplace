import  { useState, useEffect } from 'react';
import List from "./List"
import { Input } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import InputAdornment from '@mui/material/InputAdornment';
import useInput from '../hooks/useInput';
import CreateAdvertisement from './modalCreateAdvertisement'
import Tooltip from '@mui/material/Tooltip';
import SortIcon from '@mui/icons-material/Sort';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Pagination from '../components/Pagination';
import { type IAdvertisement } from '../interfaces';
import { type IPaginationData } from '../interfaces';
import ApiService from '../services/api-service';

const Advertisements = () => {

    const [adv, setAdv] = useState<IAdvertisement[]>([])
    const [filtered, setFiltered] = useState<IAdvertisement[]>([])
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [paginationData, setPaginationData] = useState<IPaginationData>({
        first: null,
        items: null,
        last: null,
        next: null,
        pages: null,
        prev: null
    })

    const searchInput = useInput()

    const [open, setOpen] = useState(false);
    const openModal = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        fetchFunc()
    }

    const [openSnackBar, setOpenSnackBar] = useState(false)

    const handleCloseSnackBar = () => {
        setOpenSnackBar(false)
    }

    const handleSnackBarOpen = (state: boolean) => {
        setOpenSnackBar(state)
    }

    const options = [
        '',
        'price',
        'likes',
        'views'
    ]

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const openSort = Boolean(anchorEl);
    const openSortMenu = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (index: number) => {
        setSelectedIndex(index);
        setAnchorEl(null);
    };

    const handleCloseSortMenu = () => {
        setAnchorEl(null);
    };

    const fetchFunc = async () => {
        const response = await ApiService.getAdvertisements(page, rowsPerPage, options[selectedIndex])
        setAdv(response.data)
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
    }, [page, rowsPerPage, selectedIndex])


    //search
    useEffect(() => {
        if (adv.length > 0) {
            let searched = adv.filter(el => el.name.toLowerCase().includes(searchInput.value))
            setFiltered(searched)
        }
    }, [searchInput.value.length, adv])

    const handleChangePage = (newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (rowsPerPage: number) => {
        setRowsPerPage(rowsPerPage)
        setPage(1)
    };


    return (
        <div>
            <div className='bg-slate-200 rounded-lg mb-5 grid grid-cols-3 justify-items-stretch gap-0'>
                <div className='flex items-center ml-3 justify-between'>
                    <Input
                        {...searchInput}
                        className="w-full"
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        }
                    />
                    <Tooltip title="Сортировать">
                        <IconButton onClick={ (event) => openSortMenu(event) }>
                            <SortIcon color='primary' fontSize='large' />
                        </IconButton>
                    </Tooltip>
                </div>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={openSort}
                    onClose={handleCloseSortMenu}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    {options.map((option, index) => (
                        <MenuItem
                            key={option}
                            selected={index === selectedIndex}
                            onClick={() => handleMenuItemClick( index )}
                        >
                            {option.length === 0 ? "-" : option}
                        </MenuItem>
                    ))}
                </Menu>
                <div className="grid grid-cols-3 content-center">
                    {options[selectedIndex] !== '-' ?
                        <p className="justify-self-start flex items-center text-slate-600">
                            {options[selectedIndex]}
                        </p> :
                        <div></div>
                    }
                    <div className="justify-self-center ">
                        <Tooltip title="Новое объявление">
                            <IconButton onClick={openModal}>
                                <AddCircleOutlineIcon color='primary' fontSize='large'/>
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div></div>
                </div>
                {/* TODO: Закрывать после создания*/}
                <Modal
                    open={open}
                    onClose={handleClose}
                >
                    <CreateAdvertisement 
                        openSnackBar={handleSnackBarOpen}
                    />
                </Modal>

                <Pagination
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    paginationData={paginationData}
                />
    
            </div>
            {adv.length !== 0 && 
                <List
                    arrayOfAdvertisements={adv}
                    arrayOfFiltered={filtered}
                />
            }
            <Snackbar
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    open={openSnackBar}
                    onClose={handleCloseSnackBar}
                    autoHideDuration={3000}
                >
                <Alert
                    onClose={handleCloseSnackBar}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Объявление создано
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Advertisements;