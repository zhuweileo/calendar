export type WeekDay = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat';

export interface TheadItem {
    key: WeekDay,
    title: string,
}
export interface SelectOption {
    value: string,
    name: string,
}
export type TrowItem = {
    [key in WeekDay]: any
}