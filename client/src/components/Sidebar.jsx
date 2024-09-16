import React from 'react';
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';

function Sidebar ({ isOpen, toggleOpen, setView }) {


const categories = ['Vegetariano', 'Vegano', 'Carne', 'Pesce'];
const types = ['Antipasti', 'Primo', 'Secondo', 'Lievitati', 'Dolci'];


//handler quando si clicca su una categoria
const handleClickCategory = () => {
  toggleOpen();
  setView('category');
};

//handler quando si clicca su un tipo di piatto
const handleClickType = () => {
  toggleOpen();
  setView('type');
};

    return (
    <>
    <Drawer anchor ='left' open={isOpen} onClick={toggleOpen}>
        <h3>Categoria della ricetta</h3>
           <List>
            {categories.map((category)=>(
              <ListItem key={category}>
                <ListItemButton component={Link} to={`/category/${category.toLowerCase()}`} onClick={handleClickCategory}>
                    <ListItemText primary={category}/>
                </ListItemButton>
                </ListItem> 
            ))}
           </List>
           <h3>Tipo di piatto</h3>
           <List>
            {types.map((type)=>(
              <ListItem key={type}>
                <ListItemButton component={Link} to={`/type/${type.toLowerCase()}`} onClick={handleClickType} >
                    <ListItemText primary={type}/>
                </ListItemButton>
                </ListItem> 
            ))}
           </List>
        </Drawer>
    </>
  )}

export default Sidebar;