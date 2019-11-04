import React, {useState, useEffect} from 'react';
import {Props} from "./MDialog.d";
import {Dialog,} from "@material-ui/core";
import className from 'classnames/bind';
import style from './MDialog.module.scss';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns'
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
} from '@material-ui/pickers';

const cx = className.bind(style);

export default function MDialog(props: Props) {
    const {
        open,
        onClose = () => {},
        selectedValue = {}
    } = props;

    const {tableDate} = selectedValue;

    const [selectedDate, setSelectedDate] = useState(new Date());

    function closeHandler() {
        onClose()
    }

    const handleDateChange = (date: any) => {
        // console.log(date);
        setSelectedDate(date);
    };

    const curTime = new Date(selectedDate);
    const curDate = curTime.getDate();
    const curHour = curTime.getHours();
    console.log(curDate);

    function getColorByTime(){
        if(!tableDate) return '#ccc';
        if(curDate === tableDate &&  curHour < 23 ) {
            return 'green'
        }
        // if(curDate)
    }

    const timeBg = {
        color: [],
    };

    return (
        <Dialog open={open} onClose={closeHandler}>
            <div className={cx('m-dialog')}>
                <div  className={cx('time-wrap')}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardTimePicker
                            margin="normal"
                            id="time-picker"
                            label="Time picker"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </div>
            </div>
        </Dialog>
    )
}
