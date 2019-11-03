import React, {useState, useEffect} from "react";
import classBind from 'classnames/bind';
import style from './Calendar.module.scss';

const cx = classBind.bind(style);

export default function CalendarItem(props: any){
    const {
        data,
        onClick,
    } = props;
    const itemClass = cx('calendar-item',{
        'calendar-item-disabled': !data.isCurMonth
    });

    function click() {
        if(!data.isCurMonth) return
        onClick();
    }
    return <div className={itemClass} onClick={click}>{data.date}</div>
}
