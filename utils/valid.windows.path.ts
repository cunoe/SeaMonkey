export default function isValidWindowsPath(path: string): boolean {
    // Windows绝对路径的正则表达式
    const windowsPathRegex = /^([a-zA-Z]:\\)?(((?![<>:"/\\|?*]).)+((?<![ .])\\)?)*$/;

    // 使用正则表达式进行匹配
    return windowsPathRegex.test(path);
}