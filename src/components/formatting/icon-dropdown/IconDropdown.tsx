// IconDropdown.tsx
import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import { Button, Menu, MenuItem, ListItemIcon, Typography, Box } from '@mui/material';
import { IoMdAddCircle } from "react-icons/io";

// Type assertion to define FaIcons as having keys of string type
const iconList = Object.keys(FaIcons).slice(0, 30);

export default function IconDropdown() {
    const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelect = (iconKey: string) => {
        setSelectedIcon(iconKey);
        handleClose();
    };

    return (
        <div className='flex'>
            <button
                onClick={handleClick}
                className='w-[30px] flex justify-center items-center'
            >
                {selectedIcon ? React.createElement(FaIcons[selectedIcon as keyof typeof FaIcons]) : <IoMdAddCircle size={18} />}
            </button>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                sx={{ maxHeight: 300 }}
            >
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)', // 4 icons per row
                        gap: 2,
                        padding: 2,
                    }}
                >
                    {iconList.map((iconKey) => {
                        const IconComponent = FaIcons[iconKey as keyof typeof FaIcons];
                        return (
                            <Box
                                key={iconKey}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    padding: 1,
                                    '&:hover': {
                                        backgroundColor: '#f0f0f0',
                                        borderRadius: 1,
                                    },
                                }}
                                onClick={() => handleSelect(iconKey)}
                            >
                                <IconComponent size={24} />
                            </Box>
                        );
                    })}
                </Box>

            </Menu>
        </div>
    );
}
