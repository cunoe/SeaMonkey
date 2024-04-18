// "dateTime": "18.04.2024 21:55:07"
export default function parseDateTime(dateTimeString: string) {
    const [datePart, timePart] = dateTimeString.split(' ');
    const [day, month, year] = datePart.split('.').map(Number);
    const [hours, minutes, seconds] = timePart.split(':').map(Number);
    return new Date(year, month - 1, day, hours, minutes, seconds);
}