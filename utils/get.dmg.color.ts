export default function getDMGColor(dmg: number, shipType: string): string {
    const color_data: {[key: string]: string} = {
        'Bad': '#FE0E00',
        'Good': '#318000',
        'Great': '#02C9B3',
        'Unicum': '#D042F3',
        'Super Unicum': '#A00DC5'
    };

    if (dmg === 0){return '#828282'}

    try {
        if (shipType === 'Destroyer' || shipType === 'Submarine') {
            if (!dmg || dmg < 33000) {
                return color_data['Bad'];
            } else if (dmg < 40000) {
                return color_data['Good'];
            } else if (dmg < 55000) {
                return color_data['Great'];
            } else if (dmg < 64000) {
                return color_data['Unicum'];
            } else {
                return color_data['Super Unicum'];
            }
        } else if (shipType === 'Cruiser') {
            if (!dmg || dmg < 47000) {
                return color_data['Bad'];
            } else if (dmg < 55000) {
                return color_data['Good'];
            } else if (dmg < 83000) {
                return color_data['Great'];
            } else if (dmg < 95000) {
                return color_data['Unicum'];
            } else {
                return color_data['Super Unicum'];
            }
        } else if (shipType === 'AirCarrier') {
            if (!dmg || dmg < 60000) {
                return color_data['Bad'];
            } else if (dmg < 71000) {
                return color_data['Good'];
            } else if (dmg < 84000) {
                return color_data['Great'];
            } else if (dmg < 113000) {
                return color_data['Unicum'];
            } else {
                return color_data['Super Unicum'];
            }
        } else if (shipType === 'Battleship') {
            if (!dmg || dmg < 64000) {
                return color_data['Bad'];
            } else if (dmg < 72000) {
                return color_data['Good'];
            } else if (dmg < 97000) {
                return color_data['Great'];
            } else if (dmg < 108000) {
                return color_data['Unicum'];
            } else {
                return color_data['Super Unicum'];
            }
        } else {
            if (!dmg || dmg < 64000) {
                return color_data['Bad'];
            } else if (dmg < 72000) {
                return color_data['Good'];
            } else if (dmg < 97000) {
                return color_data['Great'];
            } else if (dmg < 108000) {
                return color_data['Unicum'];
            } else {
                return color_data['Super Unicum'];
            }
        }
    } catch (error) {
        console.error(error);
    }

    return "#828282";
}
