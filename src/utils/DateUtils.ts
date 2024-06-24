export const formatDateToYYYYMMDD = (date: Date): number => {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // January is 0!
    const day = date.getDate().toString().padStart(2, '0');
    return Number.parseInt(`${year}${month}${day}`);
};

export const sliceSecondFromTime = (time: string): string => {
    return time.slice(0, 5);
}

const onlyHour = (time: string): string => {
    return time.slice(0, 2);
}

export const generateTimeKey = (date: Date, time: string): number => {
    console.log(onlyHour(time));
    
    return Number.parseInt(`${formatDateToYYYYMMDD(date)}${onlyHour(time)}`);
}