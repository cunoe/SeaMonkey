import type {ShipInfo} from "~/utils/convert.shipid";

export default function convertMapId(id: number): MapInfo {
    return mapIdMap[id] || {
        "description": "未知",
        "battle_arena_id": 0,
        "name": "未知"
    }
}

export interface MapInfo {
    description: string;
    icon: string;
    battle_arena_id: number;
    name: string;
}

const mapIdMap: {[key: string]: MapInfo} = {
    "0": {
        "description": "阿特拉斯海的某处。",
        "icon": "https://wows-gloss-icons.wgcdn.co/icons/spaces/00_CO_ocean_minimap_combined_c43b52287a823e8da760cc3e3bd7f42b4d577f37a150190a1f69378d9f1aa6d4.png",
        "battle_arena_id": 0,
        "name": "无尽之海"
    },
    "1": {
        "description": "这是座拥有一座活火山以及于大洋地区极为重要的战略机场阳光乐园。",
        "icon": "https://wows-gloss-icons.wgcdn.co/icons/spaces/01_solomon_islands_minimap_combined_d7636568a88be634edb81dd715047fd536856e47f0e91ae31bc1d379a40aea04.png",
        "battle_arena_id": 1,
        "name": "狂鲨怒湾"
    },
    "2": {
        "description": "位于鄂霍次克海的岛屿。",
        "icon": "https://wows-gloss-icons.wgcdn.co/icons/spaces/04_Archipelago_minimap_combined_88c5115c085344c4dd6fc0ad1328602b9f3e979e27d130b71fdd8f7f058f6dc8.png",
        "battle_arena_id": 2,
        "name": "深渊之锁"
    },
    "3": {
        "description": "高山岛屿于地图中心环绕而形成了「安全的避风港」。",
        "icon": "https://wows-gloss-icons.wgcdn.co/icons/spaces/05_Ring_minimap_combined_9b091589b005770886d48eaf3b790db36d7f6e296021cee93b75cc63f010c682.png",
        "battle_arena_id": 3,
        "name": "连环之岛"
    },
    "4": {
        "description": "两块陆地之间的海峡，围绕着大大小小的岛屿。",
        "icon": "https://wows-gloss-icons.wgcdn.co/icons/spaces/08_NE_passage_minimap_combined_ea68a8af81614adf4ac2d79e7bc6e0b06e059294bac9009e053b0a086086a9e4.png",
        "battle_arena_id": 4,
        "name": "风暴眼"
    },
    "5": {
        "description": "一座大岛及一连串小岛将地图分成两个部分。",
        "icon": "https://wows-gloss-icons.wgcdn.co/icons/spaces/10_NE_big_race_minimap_combined_e163008b1c4bdae55455ac62d7553402cae05ed662d62282aa842022aea767ba.png",
        "battle_arena_id": 5,
        "name": "狩猎峡湾"
    },
    "6": {
        "description": "位于作战行动地区的新曙光。",
        "icon": "https://wows-gloss-icons.wgcdn.co/icons/spaces/13_OC_new_dawn_minimap_combined_ea2857b176ad2ed0e42de6fc201f569e86858a21649217548684058be28ba685.png",
        "battle_arena_id": 6,
        "name": "乱礁靶场"
    },
    "7": {
        "description": "阿特拉斯海沿岸地区。",
        "icon": "https://wows-gloss-icons.wgcdn.co/icons/spaces/14_Atlantic_minimap_combined_40cf25b98e8cfabdc1a8636a8d7ef9320b851f13eaf4ad07a191327cdf9444aa.png",
        "battle_arena_id": 7,
        "name": "阿特拉斯海"
    },
    "8": {
        "description": "寒冷的北方水域。困难且艰苦的战斗。",
        "icon": "https://wows-gloss-icons.wgcdn.co/icons/spaces/15_NE_north_minimap_combined_78bc89c1ed5d52653512eccf5c80cb0a0b6de376db3446a27d98cfc7e870d97e.png",
        "battle_arena_id": 8,
        "name": "刺刀峡湾"
    },
    "9": {
        "description": "美拉尼西亚某处的热带水域。",
        "icon": "https://wows-gloss-icons.wgcdn.co/icons/spaces/16_OC_bees_to_honey_minimap_combined_fcb4baf2103051ab60dca0da2cb21e82433716fe6d5b97484f0254bc7ee30678.png",
        "battle_arena_id": 9,
        "name": "怒海新星"
    },
    "10": {
        "description": "隐藏在水面下的陆地无底裂缝。",
        "icon": "https://wows-gloss-icons.wgcdn.co/icons/spaces/17_NA_fault_line_minimap_combined_109743603d1004538d7f05082330786b929ea2c05eae9343b03537b4785381b8.png",
        "battle_arena_id": 10,
        "name": "海神之击"
    },
    "11": {
        "description": "捕鲸人和猎人的家。冰川漂浮着冰山并有着严峻的气候。",
        "icon": "https://wows-gloss-icons.wgcdn.co/icons/spaces/18_NE_ice_islands_minimap_combined_360fe1169cf1dd3a20fc6836a82379b98f0d3e814fc3ffa3f7e1768a81a7b416.png",
        "battle_arena_id": 11,
        "name": "冰海追击"
    },
    "12": {
        "description": "适合用来航行及破坏的港口...",
        "icon": "https://wows-gloss-icons.wgcdn.co/icons/spaces/19_OC_prey_minimap_combined_ca7bc3d15abc8a8adfe86d5d19371da3ad03116d14ed038c38e40bf581a3a84c.png",
        "battle_arena_id": 12,
        "name": "克拉肯之口"
    },
    "13": {
        "description": "两块像兄弟姊妹般的大岛共享着这张地图。",
        "icon": "https://wows-gloss-icons.wgcdn.co/icons/spaces/20_NE_two_brothers_minimap_combined_695bb0826b0322dc1509bf0f1be958a797df0ea5b57ce744ec425114eaaad222.png",
        "battle_arena_id": 13,
        "name": "双峰海峡"
    },
    "14": {
        "description": "拉丁美洲的南方水域：特定的地区、复杂的设置。",
        "icon": "https://wows-gloss-icons.wgcdn.co/icons/spaces/22_tierra_del_fuego_minimap_combined_790458760fe4d46e321f4d71845d538689e67ec2e54831b78e81718144aee46d.png",
        "battle_arena_id": 14,
        "name": "火海炼狱"
    },
    "15": {
        "description": "与大岛相结合的极狭窄海峡。",
        "icon": "https://wows-gloss-icons.wgcdn.co/icons/spaces/23_Shards_minimap_combined_926d3d6e5e670a00581a3c5f594fd07cfdab06faf8d838150819bc9696d1b3d5.png",
        "battle_arena_id": 15,
        "name": "破碎之地"
    },
    "16": {
        "description": "结合了大量有利因素的大海。",
        "icon": "https://wows-gloss-icons.wgcdn.co/icons/spaces/25_sea_hope_minimap_combined_e8af2d6f5e0e9c81b13267fef3420d97ffff6cfdcfb7367af44ca2fadfe9b066.png",
        "battle_arena_id": 16,
        "name": "命运之海"
    },
    "17": {
        "description": "红色海洋。",
        "icon": "https://wows-gloss-icons.wgcdn.co/icons/spaces/28_naval_mission_minimap_combined_a2540c8907471273e763da86f0839c053c926b51139865e16edc56694e82c28c.png",
        "battle_arena_id": 17,
        "name": "沙漠之泪"
    },
    "18": {
        "description": "被新世界的冰冷所环绕的诺贝尔营。",
        "icon": "https://wows-gloss-icons.wgcdn.co/icons/spaces/33_new_tierra_minimap_combined_89c842b146ce14226b0a8973914d6413095b1a2804b1bc1e7f94669b2cff73ed.png",
        "battle_arena_id": 18,
        "name": "铁血冰原"
    },
    "19": {
        "description": "老一辈人最爱的愉快绿色岛屿。",
        "icon": "https://wows-gloss-icons.wgcdn.co/icons/spaces/34_OC_islands_minimap_combined_9610b1ad86bf875a5d340f138d3b6c7d9dbbb7a7cbea1d96de0c07000d5642c7.png",
        "battle_arena_id": 19,
        "name": "深渊之锁"
    },
    "20": {
        "description": "战斗将在北极光的照耀下更加升华。",
        "icon": "https://wows-gloss-icons.wgcdn.co/icons/spaces/35_NE_north_winter_minimap_combined_a755fd70f0e813fd03c6223f0abaecd3b306a3d3a035093c264a068912ec9d55.png",
        "battle_arena_id": 20,
        "name": "北极之光"
    },
    "21": {
        "description": "一座山脉位于海峡的中央。",
        "icon": "https://wows-gloss-icons.wgcdn.co/icons/spaces/37_Ridge_minimap_combined_1523f149121379f132a23e7ca5a0b7dcd70d66ad61082c9b8821b5df640d976b.png",
        "battle_arena_id": 21,
        "name": "山脉锁链"
    },
    "22": {
        "description": "靠近某处岛屿。",
        "icon": "https://wows-gloss-icons.wgcdn.co/icons/spaces/38_Canada_minimap_combined_dbe31e983056c46d774ebb11b374b4706ee9b45324a0916ff088a997d51b843b.png",
        "battle_arena_id": 22,
        "name": "碎钻群岛"
    },
    "23": {
        "description": "激战地区。",
        "icon": "https://wows-gloss-icons.wgcdn.co/icons/spaces/40_Okinawa_minimap_combined_60ba7f5c34eef7ebade01f7b3cb2c5ed7f2983799da925680ea5640aeccd668d.png",
        "battle_arena_id": 23,
        "name": "巨舰之殇"
    },
    "24": {
        "description": "有海神正在等待着祂的猎物的狡诈水域。",
        "icon": "https://wows-gloss-icons.wgcdn.co/icons/spaces/41_Conquest_minimap_combined_e09348d0de40c32517cd6baaf7fadf510f86687c22d5674880a47987daf13cd1.png",
        "battle_arena_id": 24,
        "name": "三叉戟"
    },
    "25": {
        "description": "海峡的海上边界。",
        "icon": "https://wows-gloss-icons.wgcdn.co/icons/spaces/42_Neighbors_minimap_combined_b338989da30208c2477c4a9c0c5478f3d83e68460b99be8468b1c41adecddfe5.png",
        "battle_arena_id": 25,
        "name": "隔海相望"
    },
    "26": {
        "description": "英雄自有其出路。",
        "icon": "https://wows-gloss-icons.wgcdn.co/icons/spaces/44_Path_warrior_minimap_combined_e96bd223d6df81e284c7382b143bfd1c7a4818f0810d15619886fb262b0a3fc6.png",
        "battle_arena_id": 26,
        "name": "勇士之路"
    },
    "27": {
        "description": "岛屿位于环形之中。狡诈的操舵方式有助于取得优势。",
        "icon": "https://wows-gloss-icons.wgcdn.co/icons/spaces/45_Zigzag_minimap_combined_b9c0c341cf7c8337ab37278ea54fd0f443ff9f2ab6c624d3a6537d184467f12c.png",
        "battle_arena_id": 27,
        "name": "群岛之环"
    },
    "28": {
        "description": "流入汹涌大海的河流入海口。",
        "icon": "https://wows-gloss-icons.wgcdn.co/icons/spaces/46_Estuary_minimap_combined_12cc64d2c7996a826ce85ecf6c6891801fccdff7c07cd50029aa431c073cd664.png",
        "battle_arena_id": 28,
        "name": "河口之争"
    },
    "29": {
        "description": "岛屿间围绕着被各种航线组合。靠近某国的主要水域。",
        "icon": "https://wows-gloss-icons.wgcdn.co/icons/spaces/47_Sleeping_Giant_minimap_combined_bc0d37f314ffb1a484fbeed4906394cb06a204c3cbee3ca58d8e048a85b3988b.png",
        "battle_arena_id": 29,
        "name": "沉睡的巨人"
    },
    "30": {
        "description": "环境：苏格兰巨岩、紧张的游戏风格。",
        "icon": "https://wows-gloss-icons.wgcdn.co/icons/spaces/50_Gold_harbor_minimap_combined_90901089bb3a5e7f7181baf01a53db2718f2007e6f76d269fccacc3ec649f647.png",
        "battle_arena_id": 30,
        "name": "多崖之港"
    },
    "31": {
        "description": "圣托里尼",
        "icon": "https://wows-gloss-icons.wgcdn.co/icons/spaces/51_Greece_minimap_combined_055b450a553c1a1c364ab6eed8927058b886e07d7514a16d813b6468a78116d8.png",
        "battle_arena_id": 31,
        "name": "希腊"
    },
    "32": {
        "description": "碰撞区。",
        "icon": "https://wows-gloss-icons.wgcdn.co/icons/spaces/52_Britain_minimap_combined_1ef6faa67ce4370a6cc7c06a476bca537582d4526b3a6569e1edab20fdc9d68a.png",
        "battle_arena_id": 32,
        "name": "阿尔法碰撞区"
    },
    "33": {
        "description": "靠近大型岛屿和陆地的北方群岛。",
        "icon": "https://wows-gloss-icons.wgcdn.co/icons/spaces/53_Shoreside_minimap_combined_70b69a1f0ea40e0768a6aea55e9d9eb885dd847863d07b09a280a9918496cc15.png",
        "battle_arena_id": 33,
        "name": "北方水域"
    },
    "34": {
        "description": "世界尽头",
        "icon": "https://wows-gloss-icons.wgcdn.co/icons/spaces/54_Faroe_minimap_combined_4e20b2651699647a1c8bde27ff47283e2804d0fe7f850c1678b4e190f70b6280.png",
        "battle_arena_id": 34,
        "name": "世界尽头"
    },
    "35": {
        "description": "绿意群岛",
        "icon": "https://wows-gloss-icons.wgcdn.co/icons/spaces/55_Seychelles_minimap_combined_b1b77e44536df51446dca46db3078b8d2bf2136390fc3827b0b6a80c85020c5a.png",
        "battle_arena_id": 35,
        "name": "绿意群岛"
    },
    "36": {
        "description": "还击",
        "icon": "https://wows-gloss-icons.wgcdn.co/icons/spaces/r01_military_navigation_minimap_combined_2a1fe18c40d4fc97e4f00ac599bd3f9ecf7de5ad4addc6c9b4e3f718db9c395d.png",
        "battle_arena_id": 36,
        "name": "还击"
    },
    "37": {
        "description": "对海军基地的侵略性攻击。",
        "icon": "https://wows-gloss-icons.wgcdn.co/icons/spaces/s01_NavalBase_minimap_combined_611c432bb29bf077a536968b942ceedf4cd193452afa0307607246a1f78c7260.png",
        "battle_arena_id": 37,
        "name": "杀人鲸"
    },
    "38": {
        "description": "保卫自己并存活下去！",
        "icon": "https://wows-gloss-icons.wgcdn.co/icons/spaces/s02_Naval_Defense_minimap_combined_57447f42250923d7309cec586dbde45ac12121a4e1cac1cb79abe04387042e12.png",
        "battle_arena_id": 38,
        "name": "“纽波特”海军基地"
    },
    "39": {
        "description": "横跨美拉尼西亚水域",
        "icon": "https://wows-gloss-icons.wgcdn.co/icons/spaces/s03_Labyrinth_minimap_combined_354e9759969db9ddf12f992ecde6b85a6a113e560bd54d75d153d5c171816c53.png",
        "battle_arena_id": 39,
        "name": "迷宫"
    },
    "40": {
        "description": "发电机计划",
        "icon": "https://wows-gloss-icons.wgcdn.co/icons/spaces/s05_Dunkirk_minimap_combined_e51fb9d27aa16932fa12aa8c16b7ffd9425a96bf72acbd9dbfcaf4f2ca59eb05.png",
        "battle_arena_id": 40,
        "name": "敦刻尔克"
    },
    "41": {
        "description": "环礁",
        "icon": "https://wows-gloss-icons.wgcdn.co/icons/spaces/s06_Atoll_minimap_combined_d49e4a33af87cd4295b37eae47049ba51ce84a5fe76b860fc4a62f36fd4bf832.png",
        "battle_arena_id": 41,
        "name": "鲁昂环礁"
    },
    "42": {
        "description": "那莱",
        "icon": "https://wows-gloss-icons.wgcdn.co/icons/spaces/s07_Advance_minimap_combined_f571004c82ca5f8d07510bed65a41a3a0dcc0781c3e862cbe31cea06ccd2036c.png",
        "battle_arena_id": 42,
        "name": "巽他群岛"
    },
    "43": {
        "description": "赫尔墨斯",
        "icon": "https://wows-gloss-icons.wgcdn.co/icons/spaces/s09_LePVE_minimap_combined_342aeec1249a6a71729de631045a93ca89a66843ddabbddad665b93c14205369.png",
        "battle_arena_id": 43,
        "name": "赫尔墨斯"
    },
    "44": {
        "description": "绽放",
        "icon": "https://wows-gloss-icons.wgcdn.co/icons/spaces/s10_USS_CL_minimap_combined_8ade328c9498790d8fbeee93a43a25580dd660e4da97546e1ed2150155ce3b02.png",
        "battle_arena_id": 44,
        "name": "奥古斯塔皇后湾"
    },
    "45": {
        "description": "被水淹没的巨大城市废墟。",
        "icon": "https://wows-gloss-icons.wgcdn.co/icons/spaces/e08_PostApocalypse_minimap_combined_ad0148faa34f2f11086e0fcc0bf427c0cdb70088280693d0f7116b5576a9eddb.png",
        "battle_arena_id": 45,
        "name": "被淹没的城市"
    },
    "46": {
        "description": "拯救特兰西瓦尼亚",
        "icon": "https://wows-gloss-icons.wgcdn.co/icons/spaces/50_VanHellsing_minimap_combined_f40abbe254981302078bb74c938db195f0f926af83a5f558dc5b8311458cd0aa.png",
        "battle_arena_id": 46,
        "name": "拯救特兰西瓦尼亚"
    },
    "47": {
        "description": "巨龙湾",
        "icon": "https://wows-gloss-icons.wgcdn.co/icons/spaces/e02_Halloween_2017_minimap_combined_9ecc640b077513115214bedfa36ceaaead5838660ab04f063420bf3813e46339.png",
        "battle_arena_id": 47,
        "name": "巨龙湾"
    },
    "51": {
        "description": "多角之域",
        "icon": "https://wows-gloss-icons.wgcdn.co/icons/spaces/e11_FreshGameplay_2021_minimap_combined_9758db1a9efb8f46fce407f046ee5fca47a9b8efdca2d25f5ca11332b9965f56.png",
        "battle_arena_id": 51,
        "name": "多角之域"
    },
    "52": {
        "description": "热水浴缸",
        "icon": "https://wows-gloss-icons.wgcdn.co/icons/spaces/e01_Jacuzzi_minimap_combined_663edbe12e6983085399544125568c56b8e6716d7189c94cf4b8411958c182cb.png",
        "battle_arena_id": 52,
        "name": "热水浴缸"
    },
    "53": {
        "description": "皮纳塔狩猎",
        "icon": "https://wows-gloss-icons.wgcdn.co/icons/spaces/e12_April_2024_bees_to_honey_minimap_combined_475789cfbabdbdc8106349ab73c431be218bdb40d17b8b71d70ff92e7064f742.png",
        "battle_arena_id": 53,
        "name": "多彩群岛"
    }
}