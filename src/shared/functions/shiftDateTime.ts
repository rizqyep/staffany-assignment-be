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
    const splitTime = time.split(":")
    return parseInt(splitTime[0] + splitTime[1]);
}

export const timeOverlaps = (a:any, b:any)=>{
    const aStartToNumber = timeToNumber(a.start);
    const aEndToNumber = timeToNumber(a.end);
    const bStartToNumber = timeToNumber(b.start);
    const bEndToNumber = timeToNumber(b.end);

    if(aStartToNumber == bStartToNumber && aEndToNumber == bEndToNumber){
        console.log("Overlaps!")
        return true;
    }

    if(aStartToNumber > bStartToNumber){
        if(aEndToNumber <= bEndToNumber){
            return true;
        }
    }
    else if(aStartToNumber < bStartToNumber){
        if(aEndToNumber <= bEndToNumber && aEndToNumber < bStartToNumber){
            return false;
        }else{
            return true;
        }
    }

    return false;
} 