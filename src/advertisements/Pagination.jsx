import React, { useState, useEffect, useContext, useMemo } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


const Pagination = (props) => {

    const [currentPage, setCurrentPage] = useState(0)

    const { count, page, onPageChange, rowsPerPage, onRowsPerPageChange } = props

    let options = [
        5, 10, 15, 25, 50
    ]
    

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const openSort = Boolean(anchorEl);

    const openOptionsMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleCloseSortMenu = () => {
        setAnchorEl(null);
    };

    const prevPage = (event) => {
        setCurrentPage(currentPage-1)
        onPageChange( event, currentPage )
    }

    const nextPage = (event) => {
        setCurrentPage(currentPage+1)
        onPageChange( event, currentPage )
    }

    return (
        <div className="flex flex-row">
            <p>Объявлений на странице</p>
            <button
                onClick={openOptionsMenu}
            >
                {options[selectedIndex]}
            </button>
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
                        onClick={(event) => console.log(index)}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Menu>
            <p>1-8 из {count}</p>
            <button className='border ' onClick={ (e) => prevPage(e) }>prev</button>
            <button className='border ' onClick={ (e) => nextPage(e) }>next</button>
        </div>
    )

}


export default Pagination