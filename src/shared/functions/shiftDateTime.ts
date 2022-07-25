const jsDaysObject = {
    '0' : 'Sun',
    '1' : 'Mon',
    '2' : 'Tue',
    '3' : 'Wed',
    '4' : 'Thu',
    '5' : 'Fri',
    '6' : 'Sat'
}

const staffAnyDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const getWeekStartAndEndDifferences = (date)=>{
    const currentDayIndex = staffAnyDays.indexOf(jsDaysObject[date.getDay().toString()]);
    return {
        startDifference: currentDayIndex - staffAnyDays.indexOf('Mon'),
        endDifference : staffAnyDays.indexOf('Sun') - currentDayIndex
    }
}

const timeToNumber  = (time)=>{
    return parseInt(time.split(":").join(""));
}

export const timeOverlaps = (a:any, b:any)=>{
    const aStartToNumber = timeToNumber(a.startTime);
    const aEndToNumber = timeToNumber(a.endTime);
    const bStartToNumber = timeToNumber(b.startTime);
    const bEndToNumber = timeToNumber(b.endTime);

    if(aStartToNumber < bStartToNumber && aEndToNumber > bEndToNumber){
        return true;
    }

} 