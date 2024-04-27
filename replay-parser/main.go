package main

import (
	"fmt"
	"os"
	"path"
	"regexp"
)

func main() {
	// 获取命令行参数
	args := os.Args

	readPath := ""

	// 遍历命令行参数，查找参数为 -p 并打印其值
	for i := 1; i < len(args); i++ {
		if args[i] == "-p" && i+1 < len(args) {
			readPath = args[i+1]
			break
		}
	}

	if !checkReplaysFolder(readPath) {
		fmt.Print("-2")
		return
	}

	file, err := os.ReadFile(path.Join(readPath, "replays", "tempArenaInfo.json"))
	if err != nil {
		fmt.Print("-1")
		return
	}
	fmt.Print(string(file))

	fmt.Print("------split------")

	file, err = os.ReadFile(path.Join(readPath, "profile", "clientrunner.log"))
	if err != nil {
		fmt.Print("-1")
		return
	}

	re := regexp.MustCompile(`Selected realm:\s*(\S+)`)
	match := re.FindAllStringSubmatch(string(file), -1)
	if len(match) > 0 {
		fmt.Print(match[len(match)-1][1])
	} else {
		fmt.Print("-1")
		return
	}
}

// 检查目录下是否存在Replays文件夹
func checkReplaysFolder(path string) bool {
	files, err := os.ReadDir(path)
	if err != nil {
		return false
	}
	for _, file := range files {
		if file.IsDir() && file.Name() == "replays" {
			return true
		}
	}
	return false
}
