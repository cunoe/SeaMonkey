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

	readPath = path.Join(readPath, "replays", "tempArenaInfo.json")

	file, err := os.ReadFile(readPath)
	if err != nil {
		fmt.Println("")
		return
	}

	//var data Data
	//err = json.Unmarshal(file, &data)
	//if err != nil {
	//	fmt.Println("无法解析文件:", err)
	//	return
	//}

	fmt.Println(string(file))

}

type Data struct {
	MatchGroup              string `json:"matchGroup"`
	GameMode                int    `json:"gameMode"`
	FiltersByShipConfigName struct {
	} `json:"filtersByShipConfigName"`
	ClientVersionFromExe string      `json:"clientVersionFromExe"`
	MapBorder            interface{} `json:"mapBorder"`
	ScenarioUiCategoryId int         `json:"scenarioUiCategoryId"`
	EventType            string      `json:"eventType"`
	MapDisplayName       string      `json:"mapDisplayName"`
	MapId                int         `json:"mapId"`
	ClientVersionFromXml string      `json:"clientVersionFromXml"`
	WeatherParams        struct {
		Field1 []string `json:"0"`
		Field2 []string `json:"1"`
		Field3 []string `json:"2"`
	} `json:"weatherParams"`
	DisabledShipClasses []interface{} `json:"disabledShipClasses"`
	PlayersPerTeam      int           `json:"playersPerTeam"`
	Duration            int           `json:"duration"`
	GameTypeGameParamId int           `json:"gameTypeGameParamId"`
	Name                string        `json:"name"`
	Scenario            string        `json:"scenario"`
	PlayerID            int           `json:"playerID"`
	Vehicles            []struct {
		ShipId   int64  `json:"shipId"`
		Relation int    `json:"relation"`
		Id       int    `json:"id"`
		Name     string `json:"name"`
	} `json:"vehicles"`
	GameType         string `json:"gameType"`
	DateTime         string `json:"dateTime"`
	MapName          string `json:"mapName"`
	PlayerName       string `json:"playerName"`
	ScenarioConfigId int    `json:"scenarioConfigId"`
	TeamsCount       int    `json:"teamsCount"`
	PlayerVehicle    string `json:"playerVehicle"`
	BattleDuration   int    `json:"battleDuration"`
	BattleItemTrees  struct {
	} `json:"battleItemTrees"`
}

func getLatestFile(path string) (string, error) {
	// 打开目录
	dir, err := os.Open(path)
	if err != nil {
		return "", fmt.Errorf("无法打开目录: %v", err)
	}
	defer dir.Close()

	// 读取目录下的所有文件
	files, err := dir.Readdir(-1)
	if err != nil {
		return "", fmt.Errorf("无法读取目录内容: %v", err)
	}

	// 对文件进行按修改时间排序，以获取最新的文件
	sort.Slice(files, func(i, j int) bool {
		return files[i].ModTime().After(files[j].ModTime())
	})

	// 如果没有文件，返回错误
	if len(files) == 0 {
		return "", fmt.Errorf("目录中没有文件")
	}

	// 返回最新的文件名
	return files[0].Name(), nil
}

// 通过slice实现栈
type Item interface{}

type ItemStack struct {
	items []Item
	lock  sync.RWMutex
}

func NewStack() *ItemStack {
	s := &ItemStack{}
	s.items = []Item{}
	return s
}

func (s *ItemStack) Print() {
	fmt.Println(s.items)
}

func (s *ItemStack) Push(t Item) {
	s.lock.Lock()
	s.lock.Unlock()
	s.items = append(s.items, t)
}

func (s *ItemStack) Pop() Item {
	s.lock.Lock()
	defer s.lock.Unlock()
	if len(s.items) == 0 {
		return nil
	}
	item := s.items[len(s.items)-1]
	s.items = s.items[0 : len(s.items)-1]
	return item
}
