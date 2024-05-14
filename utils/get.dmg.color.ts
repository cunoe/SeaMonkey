import {RatingColor} from "~/types/Constant";

export default function getDMGColor(dmg: number, shipType: string): string {

    if (dmg === 0){return RatingColor['None']}

    try {
        if (shipType === 'Destroyer' || shipType === 'Submarine') {
            if (!dmg || dmg < 33000) {
                return RatingColor['Bad'];
            } else if (dmg < 40000) {
                return RatingColor['Good'];
            } else if (dmg < 55000) {
                return RatingColor['Great'];
            } else if (dmg < 64000) {
                return RatingColor['Unicum'];
            } else {
                return RatingColor['SuperUnicum'];
            }
        } else if (shipType === 'Cruiser') {
            if (!dmg || dmg < 47000) {
                return RatingColor['Bad'];
            } else if (dmg < 55000) {
                return RatingColor['Good'];
            } else if (dmg < 83000) {
                return RatingColor['Great'];
            } else if (dmg < 95000) {
                return RatingColor['Unicum'];
            } else {
                return RatingColor['SuperUnicum'];
            }
        } else if (shipType === 'AirCarrier') {
            if (!dmg || dmg < 60000) {
                return RatingColor['Bad'];
            } else if (dmg < 71000) {
                return RatingColor['Good'];
            } else if (dmg < 84000) {
                return RatingColor['Great'];
            } else if (dmg < 113000) {
                return RatingColor['Unicum'];
            } else {
                return RatingColor['SuperUnicum'];
            }
        } else if (shipType === 'Battleship') {
            if (!dmg || dmg < 64000) {
                return RatingColor['Bad'];
            } else if (dmg < 72000) {
                return RatingColor['Good'];
            } else if (dmg < 97000) {
                return RatingColor['Great'];
            } else if (dmg < 108000) {
                return RatingColor['Unicum'];
            } else {
                return RatingColor['SuperUnicum'];
            }
        } else {
            if (!dmg || dmg < 64000) {
                return RatingColor['Bad'];
            } else if (dmg < 72000) {
                return RatingColor['Good'];
            } else if (dmg < 97000) {
                return RatingColor['Great'];
            } else if (dmg < 108000) {
                return RatingColor['Unicum'];
            } else {
                return RatingColor['SuperUnicum'];
            }
        }
    } catch (error) {
        console.error(error);
    }

    return RatingColor['None'];
}
