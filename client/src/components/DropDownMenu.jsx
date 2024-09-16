import { FormControl, InputLabel , Select, MenuItem} from '@mui/material';
import React, {useState} from 'react';


function DropDownMenu({ label, name, options,  onChange }) {

 return (
    <FormControl fullWidth required>
        <InputLabel id="menu">Scegli {label}</InputLabel>
        <Select label={label} id="menu" name={name} onChange={onChange} required>
            {options.map((option) => 
            <MenuItem value={option}>
                {option}
            </MenuItem>)}
        </Select>
    </FormControl>
    )
}

export default DropDownMenu;