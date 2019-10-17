import React, {useState} from 'react';
import './App.css';
import Calendar from "./modules/Calendar/Calendar";
import MDialog from "./modules/MDialog/MDialog";
import {Paper} from "@material-ui/core";

const App: React.FC = () => {
    const [open,setOpen] = useState(false);
    function handleClose() {
        setOpen(false);
    }

    function itemInner(item: any) {
        return <div onClick={() => setOpen(true)}>{item}</div>
    }

    return (
        <div className="App">
            <Calendar itemRender={itemInner} ></Calendar>
            <MDialog open={open} onClose={handleClose} selectedValue={''}></MDialog>
        </div>
    );
};

export default App;
