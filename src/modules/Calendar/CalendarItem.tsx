import React, {useState, useEffect} from "react";
import classBind from 'classnames/bind';
import style from './Calendar.module.scss';
import {Badge} from "@material-ui/core";
import {getColorByTime} from "../../utils";
const cx = classBind.bind(style);

export default function CalendarItem(props: any){
    const {
        data,
        onClick,
    } = props;
    const [showDate, setShowDate] = useState(true);

    const {isCurMonth, date, sleepTime} = data;
    const _sleepTime = new Date(sleepTime);
    const isNextDay = new Date(sleepTime).getDate() !== date;
    const needHandle = sleepTime && isCurMonth;

    // 样式
    const color = getColorByTime(sleepTime, isNextDay);
    const dotStyle: React.CSSProperties = {
        background: color,
    };

    const itemClass = cx('calendar-item',{
        'calendar-item-disabled': !isCurMonth
    });
    const dateStyle = {
        display: showDate ? 'inline' : 'none',
    };
    const sleepStyle = {
        display: showDate ? 'none' : 'inline',
    };

    // ui
    const dot = needHandle ? <span className={cx('dot')} style={dotStyle}/>:null;

    // handle
    function click() {
        if(!isCurMonth) return;
        onClick();
    }

    function onMouseEnter() {
        if (!needHandle) return;
        setShowDate(false);
    }

    function onMouseLeave() {
        if (!needHandle) return;
        setShowDate(true);
    }


    return (
        <div className={itemClass} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={click}>
            <span style={dateStyle} className={cx('date-num')}>{date}{dot}</span>
            <span style={sleepStyle}>{_sleepTime.getHours()}:{_sleepTime.getMinutes()}</span>
        </div>
    )
}
