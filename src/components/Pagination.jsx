import React, { useState, useEffect } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Pagination = (props) => {

    const { page, onPageChange, rowsPerPage, onRowsPerPageChange, paginationData } = props
    
    const { items, next, prev } = paginationData

    const [currentPage, setCurrentPage] = useState(1)
    const [anchorEl, setAnchorEl] = useState(null);

    const [selectedIndex, setSelectedIndex] = useState(1);
    const openSort = Boolean(anchorEl);
 
    let options = [ 5, 10, 15, 25, 50 ]

    const [startRange, setStartRange] = useState(0) 
    const [endRange, setEndRange] = useState(0)

    useEffect(() => {
        let start, limit
        page === 1 ? start = 1 : start = ((page-1) * rowsPerPage)+1
        rowsPerPage*page > items ? limit = items : limit = (rowsPerPage*page)
        setStartRange(start)
        setEndRange(limit)
    }, [page, rowsPerPage])

    const openOptionsMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleCloseSortMenu = () => {
        setAnchorEl(null);
    };

    const handleChangeOptions = (index) => {
        setSelectedIndex(index)
        onRowsPerPageChange(options[index])
    }

    const prevPage = (event) => {
        if(currentPage === 1) return
        let tempPage = currentPage-1
        onPageChange( event, tempPage )
        setCurrentPage(tempPage)
    }

    const nextPage = (event) => {
        let tempPage = currentPage+1        
        onPageChange( event, tempPage )
        setCurrentPage(tempPage)
    }


    return (
        <div className="flex flex-row items-center justify-between">
            <div className='flex flex-row items-center '>
                <p className='mr-1'>Строк на странице</p>
                <button
                    className='hover:bg-slate-300 px-3 rounded-full text-sky-400'
                    onClick={openOptionsMenu}
                >
                    {options[selectedIndex]}
                </button>
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
                        onClick={() => handleChangeOptions(index)}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Menu>

            <p>{startRange}-{endRange} из {items}</p>
            <div>    
                <IconButton 
                    onClick={ (e) => prevPage(e) }
                    disabled={prev == null}
                >
                    <ArrowBackIcon color='primary' />
                </IconButton>
                <IconButton 
                    onClick={ (e) => nextPage(e) }
                    disabled={next == null}
                >
                    <ArrowForwardIcon color='primary' />
                </IconButton>
            </div>
        </div>
    )

}


export default Pagination