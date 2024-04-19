export default function convertMatchGroup(group: string): string {
    return matchGroupMap[group] ?? "未知";
}

const matchGroupMap: { [key: string]: string } = {
    'event': '活动',
    'pvp': '随机战斗',
    'cooperative': '联合作战',
}