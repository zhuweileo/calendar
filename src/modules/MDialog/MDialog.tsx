import React, {useState, useEffect} from 'react';
import {Props} from "./MDialog.d";
import {Dialog,} from "@material-ui/core";

export default function MDialog(props: Props) {
    const {open,onClose = () => {},selectedValue} = props;

    function closeHandler(){
        onClose()
    }

    return (
        <Dialog open={open} onClose={closeHandler}>
            我是dialog
        </Dialog>
    )
}
