import React, {useEffect, useState, useRef} from 'react';
import {Props} from "./MDialog.d";
import {Checkbox, Dialog, FormControlLabel} from "@material-ui/core";
import className from 'classnames/bind';
import style from './MDialog.module.scss';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns'
import {KeyboardTimePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';

const cx = className.bind(style);

export default function MDialog(props: Props) {
    const {
        open,
        onClose = () => {
        },
        selectedValue = {}
    } = props;

    const {sleepTime, tableDate} = selectedValue;

    const [selectedDate, setSelectedDate] = useState(sleepTime || new Date());
    const [isNextDay, setIsNextDay] = useState(false);
    const [color, setColor] = useState('#ccc');
    const isFirstRef = useRef(true);

    useEffect(function () {
        if(isFirstRef.current && !sleepTime) {
            isFirstRef.current = false;
            return
        }

        function getColorByTime() {
            const curTime = new Date(selectedDate);
            const curHour = curTime.getHours();
            const curMinute = curTime.getMinutes();

            if (!isNextDay && curHour < 23) return 'green';
            if (!isNextDay && curHour === 23 && curMinute > 0) return 'yellow';
            return 'red';
        }

        const color = getColorByTime();
        setColor(color);

    }, [ selectedDate, isNextDay, sleepTime]);

    function closeHandler() {
        onClose()
    }

    function handleDateChange(date: any) {
        setSelectedDate(date);
    }

    function onCheckChange(e: any) {
        setIsNextDay(e.target.checked)
    }

    const timeStyle = {
        border: `1px solid ${color}`,
    };

    return (
        <Dialog open={open} onClose={closeHandler}>
            <div className={cx('m-dialog')}>
                <div className={cx('time-wrap')} style={timeStyle}>
                    <MuiPickersUtilsProvider  utils={DateFnsUtils}>
                        <KeyboardTimePicker
                            className={cx('time-picker')}
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
                    <FormControlLabel control={
                        <Checkbox checked={isNextDay} onChange={onCheckChange}/>
                    } label={'第二天'}/>
                </div>
            </div>
        </Dialog>
    )
}
