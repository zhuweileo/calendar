import React, {useState} from 'react';
import './App.css';
import Calendar from "./modules/Calendar/Calendar";
import MDialog from "./modules/MDialog/MDialog";
import CalendarItem from "./modules/Calendar/CalendarItem"

const App: React.FC = () => {
    const [open,setOpen] = useState(false);
    const [curItem, setCurItem] = useState(undefined);

    const sleepData = [
        {
            date: 1,
            sleepTime: 1572948282902,
        },
    ];

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

        const sleep = sleepData.filter(s => s.date === item.date);

        const data = {
            ...item,
            sleepTime: sleep[0]? sleep[0].sleepTime : null
        };


        return <CalendarItem data={data} onClick={onItemClick(data)}/>
    }

    return (
        <div className="App">
            <Calendar itemRender={itemInner}/>
            {open ? <MDialog open={open} onClose={handleClose} selectedValue={curItem}/> : null}
        </div>
    );
};

export default App;
