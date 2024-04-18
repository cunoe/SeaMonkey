export default function convertSecondsToHMSString(totalSeconds: number) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}小时${minutes.toString().padStart(2, '0')}分钟${seconds.toFixed().toString().padStart(2, '0')}秒`;
}