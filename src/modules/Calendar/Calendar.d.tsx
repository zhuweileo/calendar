export type WeekDay = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat';

export interface TheadItem {
    key: WeekDay,
    title: string,
    render?: (item:any,row: any,rowIndex: number, colIndex: number) => any,
}
export interface SelectOption {
    value: string,
    name: string,
}
export type TrowItem = {
    [key in WeekDay]: any
}

export interface Props  {
    itemRender: (item?: any, row?: any, rowIndex?: number, colIndex?: number) => React.ReactNode
}
