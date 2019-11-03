import React, {useState} from 'react';
import './App.css';
import Calendar from "./modules/Calendar/Calendar";
import MDialog from "./modules/MDialog/MDialog";
import {Paper} from "@material-ui/core";
import CalendarItem from "./modules/Calendar/CalendarItem"

const App: React.FC = () => {
    const [open,setOpen] = useState(false);
    const [curItem, setCurItem] = useState(null);

    function handleClose() {
        setOpen(false);
    }

    function onItemClick(item: any) {
        return () => {
            setOpen(true);
            setCurItem(item);
        }
    }

    function itemInner(item: any) {
        return <CalendarItem data={item} onClick={onItemClick(item)}/>
    }

    return (
        <div className="App">
            <Calendar itemRender={itemInner}/>
            <MDialog open={open} onClose={handleClose} selectedValue={curItem}/>
        </div>
    );
};

export default App;
