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

    const {isCurMonth, date, sleepTime} = data;

    const isNextDay = new Date(sleepTime).getDay() !== date;

    const color = getColorByTime(sleepTime, isNextDay);
    const dotStyle: React.CSSProperties = {
        background: color,
    }

    const itemClass = cx('calendar-item',{
        'calendar-item-disabled': !isCurMonth
    });

    function click() {
        if(!isCurMonth) return
        onClick();
    }
    return (
        <div className={itemClass} onClick={click}>
            {date} <span className={cx('dot')} style={dotStyle}></span>
        </div>
    )
}
