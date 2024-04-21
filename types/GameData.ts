export interface WeatherParams {
    [index: number]: string[];
}

export interface Vehicle {
    shipId: number;
    relation: number;
    id: number;
    name: string;
}

export interface GameData {
    matchGroup: string;
    gameMode: number;
    filtersByShipConfigName: any; // 根据你的需求进行定义
    clientVersionFromExe: string;
    mapBorder: any; // 根据你的需求进行定义
    scenarioUiCategoryId: number;
    eventType: string;
    mapDisplayName: string;
    mapId: number;
    clientVersionFromXml: string;
    weatherParams: WeatherParams;
    disabledShipClasses: any[]; // 根据你的需求进行定义
    playersPerTeam: number;
    duration: number;
    gameTypeGameParamId: number;
    name: string;
    scenario: string;
    playerID: number;
    vehicles: Vehicle[];
    gameType: string;
    dateTime: string;
    mapName: string;
    playerName: string;
    scenarioConfigId: number;
    teamsCount: number;
    playerVehicle: string;
    battleDuration: number;
    battleItemTrees: any; // 根据你的需求进行定义
}
