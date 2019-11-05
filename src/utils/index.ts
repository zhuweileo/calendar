export function getColorByTime(sleepTime: any,isNextDay: boolean) {
    const curTime = new Date(sleepTime);
    const curHour = curTime.getHours();
    const curMinute = curTime.getMinutes();

    if (!isNextDay && curHour < 23) return 'green';
    if (!isNextDay && curHour === 23 && curMinute >= 0) return 'yellow';
    return 'red';
}
