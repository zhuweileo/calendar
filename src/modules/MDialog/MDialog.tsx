import React, {useState, useEffect} from 'react';
import {Props} from "./MDialog.d";
import {Dialog,} from "@material-ui/core";
import className from 'classnames/bind';
import style from './MDialog.module.scss';

const cx = className.bind(style);

export default function MDialog(props: Props) {
    const {
        open,
        onClose = () => {},
        selectedValue
    } = props;

    function closeHandler(){
        onClose()
    }

    return (
        <Dialog  open={open} onClose={closeHandler}>
            <div className={cx('m-dialog')}>
                我是dialog
            </div>
        </Dialog>
    )
}
