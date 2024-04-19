package main

import (
	"fmt"
	"os"
	"path"
	"sort"
	"sync"
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

	if !checkReplaysFolder(readPath){
	    fmt.Print("-1")
	}

	readPath = path.Join(readPath, "replays", "tempArenaInfo.json")

	file, err := os.ReadFile(readPath)
	if err != nil {
		fmt.Print("")
		return
	}

	fmt.Print(string(file))

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


