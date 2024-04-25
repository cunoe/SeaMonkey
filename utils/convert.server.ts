
export default function convertServerToLocale(server: string, lang: string): string {
    switch (lang) {
        case 'zh-CN':
            return convertServerToChinese(server)
        case 'en-US':
            return convertServerToEnglish(server)
        default:
            return convertServerToEnglish(server)
    }
}

function convertServerToChinese(server: string): string {
    switch (server) {
        case 'asia':
            return '亚服'
        case 'eu':
            return '欧服'
        case 'na':
            return '美服'
        default:
            return '未知'
    }
}

function convertServerToEnglish(server: string): string {
    switch (server) {
        case 'asia':
            return 'Asia'
        case 'eu':
            return 'EU'
        case 'na':
            return 'NA'
        default:
            return 'Unknown'
    }
}