import {SupportedServerList} from "~/types/Constant";

export default function checkServerValidity(server: string): boolean {
    return SupportedServerList.includes(server);
}