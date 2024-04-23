
export default function convertMatchGroup(matchGroup: string): MatchGroup {
    return matchGroupMap[matchGroup.toUpperCase()] || {
        "tag": "unknown",
        "name": "未知",
        "description": "未知"
    };
}

export interface MatchGroup {
    image: string;
    tag: string;
    name: string;
    description: string;
}

const matchGroupMap: { [key: string]: MatchGroup } = {
    "CLAN": {
        "image": "https:\/\/wows-gloss-icons.wgcdn.co\/icons\/battle_types\/ClanBattle_6dc3e9dfa28cae753464c4ccaaf8f262fe780ed2b694b0064fa86bfbb698e613.png",
        "tag": "CLAN",
        "name": "军团战",
        "description": "参与来自两个不同军团的两支队伍之间的战斗，同时提升联盟段位。"
    },
    "PVP": {
        "image": "https:\/\/wows-gloss-icons.wgcdn.co\/icons\/battle_types\/RandomBattle_d894566a260274247767e463763e912d6686989e8518906492c07e93b58c0ef9.png",
        "tag": "PVP",
        "name": "标准战斗",
        "description": "参与两支队伍之间的战斗。分房系统会随机选择对手。"
    },
    "BRAWL": {
        "image": "https:\/\/wows-gloss-icons.wgcdn.co\/icons\/battle_types\/BrawlBattle_59841b18e89dcbacc09c00cbaee7bd9a4200e61ebd63e34bdf2410d3104c628c.png",
        "tag": "BRAWL",
        "name": "对决",
        "description": "参与快节奏的战舰遭遇战，双方队伍会根据玩家技能水平进行匹配。"
    },
    "RANKED": {
        "image": "https:\/\/wows-gloss-icons.wgcdn.co\/icons\/battle_types\/RankedBattle_3d9a6cf986dde60a519e878b0ca941f1d1d051840e7f9e83027a84253493f91f.png",
        "tag": "RANKED",
        "name": "排位战",
        "description": "对抗其他玩家，提升排位，推进联盟段位。"
    },
    "PVE": {
        "image": "https:\/\/wows-gloss-icons.wgcdn.co\/icons\/battle_types\/PVEBattle_f91d97a4c0964a4a8f7dbb070f8f449a21c4d36665dc17635239b7cb11b1c15d.png",
        "tag": "PVE",
        "name": "行动",
        "description": "和您的队伍一起完成剧情任务，与其他玩家并肩作战。"
    },
    "PVE_PREMADE": {
        "image": "https:\/\/wows-gloss-icons.wgcdn.co\/icons\/battle_types\/PVEBattle_event_d42173715a8861cc91879806fba4cbe5c4a1a0047b75b297f874ea34b29fe24f.png",
        "tag": "PVE_PREMADE",
        "name": "行动",
        "description": "和您的队伍一起完成剧情任务，与其他玩家并肩作战。"
    },
    "COOPERATIVE": {
        "image": "https:\/\/wows-gloss-icons.wgcdn.co\/icons\/battle_types\/CooperativeBattle_6cf88424226cf0427f6eb026a9c232c51bc29cb86eb89ca7eb3b0e0b73d08fab.png",
        "tag": "COOPERATIVE",
        "name": "联合作战",
        "description": "与其他玩家合作，加入两支队伍之间的战斗。"
    },
    "EVENT": {
        "image": "https:\/\/wows-gloss-icons.wgcdn.co\/icons\/battle_types\/EventBattle_89d294a1ddbb1a92416427fe0143dff8b72d9022c0acbe28a6a2763e750c2b55.png",
        "tag": "EVENT",
        "name": "临时战斗类型",
        "description": "在巨战模式中体验超级战列舰！"
    }
}