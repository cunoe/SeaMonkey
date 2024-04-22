import type {Vehicle} from "~/types/GameData";

export default function sortVehicles(arr: Vehicle[]): Vehicle[] {
    let UndefinedShip: Vehicle[] = arr.filter(vehicle => !vehicle.shipInfo);
    let AirCarrier = arr.filter(vehicle => vehicle.shipInfo && vehicle.shipInfo.type === "AirCarrier").sort((a, b) => {return b.shipInfo.tier - a.shipInfo.tier;});
    let Battleship = arr.filter(vehicle => vehicle.shipInfo && vehicle.shipInfo.type === "Battleship").sort((a, b) => {return b.shipInfo.tier - a.shipInfo.tier;});
    let Cruiser = arr.filter(vehicle => vehicle.shipInfo && vehicle.shipInfo.type === "Cruiser").sort((a, b) => {return b.shipInfo.tier - a.shipInfo.tier;});
    let Destroyer = arr.filter(vehicle => vehicle.shipInfo && vehicle.shipInfo.type === "Destroyer").sort((a, b) => {return b.shipInfo.tier - a.shipInfo.tier;});
    let Submarine = arr.filter(vehicle => vehicle.shipInfo && vehicle.shipInfo.type === "Submarine").sort((a, b) => {return b.shipInfo.tier - a.shipInfo.tier;});
    return [...AirCarrier, ...Battleship, ...Cruiser, ...Destroyer, ...Submarine, ...UndefinedShip]
}
