import React, {useState, useEffect} from "react";
import {Paper, Table, TableBody, TableHead, TableRow, TableCell, Select} from "@material-ui/core";
import {SelectOption, TheadItem, TrowItem, Props} from "./Calendar.d";

const now = new Date();

function makeYearList(): SelectOption[] {
    const curYear = now.getFullYear();
    const originYear = curYear - 20;
    const yearRange = 41;
    const yearList: SelectOption[] = [];
    for (let i = 0; i < yearRange; i++) {
        const val = String(originYear + i);
        yearList.push({value: val, name: val})
    }
    return yearList
}

function makeMonthList(): SelectOption[] {
    const monthList: SelectOption[] = [];
    for (let i = 0; i < 12; i++) {
        monthList.push({value: String(i), name: String(i + 1)})
    }
    return monthList;
}

function getDateByYearMon(year: string, month: string) {
    const dateList = [];
    const date = new Date();
    date.setFullYear(Number(year));
    date.setMonth(Number(month));
    let firstDay: number = NaN;
    let lastDay: number = NaN;
    for (let i = 1; i < 32; i++) {
        let unix = date.setDate(i);
        if (i === 1) firstDay = unix;
        if (date.getMonth() !== Number(month)) {
            date.setMonth(Number(month));
            lastDay = date.setDate(i-1);
            break;
        }
        if(i === 31) lastDay = unix;
        dateList.push(i)
    }
    // 补全前面的日期
    const first = new Date(firstDay);
    const upArr = [];
    if(first.getDay() !== 1) first.setDate(0);
    upArr.unshift(first.getDate());
    while (first.getDay() !== 1) {
        first.setDate(first.getDate() - 1);
        upArr.unshift(first.getDate());
    }
    // 补全后面的日期
    const last = new Date(lastDay);
    const downArr = [];
    if(last.getDay() !== 0) last.setDate(last.getDate() + 1);
    downArr.push(last.getDate());
    while (last.getDay() !== 0) {
        last.setDate(last.getDate() + 1);
        downArr.push(last.getDate());
    }

    return [...upArr,...dateList,...downArr];
}
function makeDateSource(dates: number[]) {
    let res:TrowItem[] = [];
    const resLen = parseInt(`${dates.length / 7}`);
    for(let i=0; i< resLen; i++) {
        res.push({
            mon: dates[i*7],
            tue: dates[i*7 + 1],
            wed: dates[i*7 + 2],
            thu: dates[i*7 + 3],
            fri: dates[i*7 + 4],
            sat: dates[i*7 + 5],
            sun: dates[i*7 + 6],
        })
    }
    return res
}

const yearList = makeYearList();
const monthList = makeMonthList();

export default function Calendar(props: Props) {
    const {itemRender} = props

    const [curYear, setCurYear] = useState(String(now.getFullYear()));
    const [curMon, setCurMon] = useState(String(now.getMonth()));
    // setXXX类函数是泛型函数，需要用<>约定特殊类型
    const [dataSource,setDataSource] = useState<TrowItem[]>([]);

    const theadList: TheadItem[] = [
        {key: 'mon', title: '星期一', render: itemRender},
        {key: 'tue', title: '星期二'},
        {key: 'wed', title: '星期三'},
        {key: 'thu', title: '星期四'},
        {key: 'fri', title: '星期五'},
        {key: 'sat', title: '星期六'},
        {key: 'sun', title: '星期天'},
    ];

    const handleYearChange = () => (event: any) => {
        setCurYear(event.target.value)
    };
    const handleMonChange = () => (event: any) => {
        setCurMon(event.target.value)
    };
    useEffect(function () {
        const dates = getDateByYearMon(curYear,curMon);
        const data:TrowItem[] = makeDateSource(dates);
        setDataSource(data)
    },[curYear,curMon]);

    return <div>
        <Paper>
            <div>
                <Select
                    native
                    value={curYear}
                    onChange={handleYearChange()}
                >
                    {
                        yearList.map((year, index) => <option key={year.value} value={year.value}>{year.name}</option>)
                    }
                </Select>年
                <Select
                    native
                    value={curMon}
                    onChange={handleMonChange()}
                >
                    {
                        monthList.map((month, index) => <option key={month.value}
                                                                value={month.value}>{month.name}</option>)
                    }
                </Select>月
            </div>
            <Table>
                <TableHead>
                    <TableRow>
                        {
                            theadList.map(day => <TableCell key={day.key}>{day.title}</TableCell>)
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        dataSource.map((row, rowIndex) => {
                            return <TableRow key={rowIndex}>
                                {
                                    theadList.map((day,colIndex) => <TableCell key={day.key}>
                                        {
                                            day.render? day.render(row[day.key],row,rowIndex,colIndex) : row[day.key]
                                        }
                                    </TableCell>)
                                }
                            </TableRow>
                        })
                    }
                </TableBody>
            </Table>
        </Paper>
    </div>
}
