build-windows:
	go build -o src-tauri/binaries/replay-parser-x86_64-pc-windows-msvc.exe replay-parser/main.go
	pnpm tauri build

dev-windows:
	go build -o src-tauri/binaries/replay-parser-x86_64-pc-windows-msvc.exe replay-parser/main.go
	pnpm tauri dev