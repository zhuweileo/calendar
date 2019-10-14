import React from "react";
import {Paper, Table, TableBody, TableHead, TableRow, TableCell} from "@material-ui/core";

type WeekDay = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat';

interface TheadItem {
    key: WeekDay,
    title: string,
}

type TrowItem = {
    [key in WeekDay]: any
}
const theadList: TheadItem[] = [
    {key: 'sun', title: '星期天'},
    {key: 'mon', title: '星期一'},
    {key: 'tue', title: '星期二'},
    {key: 'wed', title: '星期三'},
    {key: 'thu', title: '星期四'},
    {key: 'fri', title: '星期五'},
    {key: 'sat', title: '星期六'},
];

const dataSource: TrowItem[] = [
    {sun: '111', mon: '1', tue: '', wed: '', thu: '', fri: '', sat: ''},
    {sun: '111', mon: '1', tue: '', wed: '', thu: '', fri: '', sat: ''},
    {sun: '111', mon: '1', tue: '', wed: '', thu: '', fri: '', sat: ''},
    {sun: '111', mon: '1', tue: '', wed: '', thu: '', fri: '', sat: ''},
    {sun: '111', mon: '1', tue: '', wed: '', thu: '', fri: '', sat: ''},
];

export default function Calendar() {
    return <div>
        <Paper>
            <Table>
                <TableHead>
                    <TableRow>
                        {
                            theadList.map(day => <TableCell>{day}</TableCell>)
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>

                    </TableRow>
                </TableBody>
            </Table>
        </Paper>
    </div>
}
