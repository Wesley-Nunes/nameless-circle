var storyContent = {
    inkVersion: 21,
    root: [
        ['\n', { '->': 'start' }, ['done', { '#f': 5, '#n': 'g-0' }], null],
        'done',
        {
            start: [
                [
                    '^“When countless mouths are sated with innocent blood,',
                    '\n',
                    '^The Abyss shall breathe its curse—ash, corruption, void—',
                    '\n',
                    '^To blacken guardian rings of life,',
                    '\n',
                    "^Until Seven Thrones crack and crash from heaven's height.",
                    '\n',
                    '^Then, from the weeping ground,',
                    '\n',
                    '^The Shadowed One shall raise its silent crown,',
                    '\n',
                    '^And claim the shattered world as darkness drowns.”',
                    '\n',
                    '^The hue of the setting sun, nearly swallowed by night, blended with the swamp’s dark greens, staining the stagnant waters. Will-o’-wisps, like fragments of the cursed prophecy, broke free from the murk and began their ghostly dance above the sludge. A biting cold—far beyond twilight—enveloped the group, heavy with the stink of rot, sulfur, and decay.',
                    '\n',
                    '^Lysandra’s eyes blazed, nostrils flared.',
                    '\n',
                    '^“To hell with this prophecy! Protaxios, gather the stealthiest soldiers and scout the nearby swamps. Renpet-Ib, raise magical barriers around the village. We need more troops. I’ll go to the Citadel myself to bargain with some noble.”',
                    '\n',
                    '^As she shouted, you saw her tremble — and felt your own palms sweat.',
                    '\n',
                    [
                        'ev',
                        { '^->': 'start.0.22.$r1' },
                        { 'temp=': '$r' },
                        'str',
                        { '->': '.^.s' },
                        [{ '#n': '$r1' }],
                        '/str',
                        '/ev',
                        { '*': '.^.^.c-0', flg: 18 },
                        {
                            s: [
                                '^“Commander, Let me join you at the Citadel.”',
                                { '->': '$r', var: true },
                                null
                            ]
                        }
                    ],
                    [
                        'ev',
                        { '^->': 'start.0.23.$r1' },
                        { 'temp=': '$r' },
                        'str',
                        { '->': '.^.s' },
                        [{ '#n': '$r1' }],
                        '/str',
                        '/ev',
                        { '*': '.^.^.c-1', flg: 18 },
                        {
                            s: [
                                '^“I can move quietly, Protaxios. Let me scout with you.” ',
                                { '->': '$r', var: true },
                                null
                            ]
                        }
                    ],
                    [
                        'ev',
                        { '^->': 'start.0.24.$r1' },
                        { 'temp=': '$r' },
                        'str',
                        { '->': '.^.s' },
                        [{ '#n': '$r1' }],
                        '/str',
                        '/ev',
                        { '*': '.^.^.c-2', flg: 18 },
                        {
                            s: [
                                '^“The village needs every blade. I stand with Renpet-Ib.”',
                                { '->': '$r', var: true },
                                null
                            ]
                        }
                    ],
                    {
                        'c-0': [
                            'ev',
                            { '^->': 'start.0.c-0.$r2' },
                            '/ev',
                            { 'temp=': '$r' },
                            { '->': '.^.^.22.s' },
                            [{ '#n': '$r2' }],
                            '\n',
                            { '->': 'courtly_intrigue' },
                            { '#f': 5 }
                        ],
                        'c-1': [
                            'ev',
                            { '^->': 'start.0.c-1.$r2' },
                            '/ev',
                            { 'temp=': '$r' },
                            { '->': '.^.^.23.s' },
                            [{ '#n': '$r2' }],
                            '\n',
                            { '->': 'stealth' },
                            { '#f': 5 }
                        ],
                        'c-2': [
                            'ev',
                            { '^->': 'start.0.c-2.$r2' },
                            '/ev',
                            { 'temp=': '$r' },
                            { '->': '.^.^.24.s' },
                            [{ '#n': '$r2' }],
                            '\n',
                            { '->': 'combat' },
                            { '#f': 5 }
                        ]
                    }
                ],
                { '#f': 1 }
            ],
            courtly_intrigue: [
                'ev',
                'str',
                '^hero_0002',
                '/str',
                { 'x()': 'add_to_hero_party', exArgs: 1 },
                'out',
                '/ev',
                '\n',
                'ev',
                'str',
                '^Riding horse',
                '/str',
                'str',
                '^hero_0001',
                '/str',
                'str',
                '^heroes',
                '/str',
                { 'x()': 'add_mount', exArgs: 3 },
                'out',
                '/ev',
                '\n',
                'ev',
                'str',
                '^Riding horse',
                '/str',
                'str',
                '^hero_0002',
                '/str',
                'str',
                '^heroes',
                '/str',
                { 'x()': 'add_mount', exArgs: 3 },
                'out',
                '/ev',
                '\n',
                '^The sky deepened to indigo as stars slowly awakened. The southern road — the only path to the Citadel — narrowed, with few places to camp. Ancient trees leaned toward the path as if trying to delay travelers.',
                '\n',
                '^Lysandra rode ahead, refusing an escort — only you, her new recruit, followed.',
                '\n',
                '^“Protect the village!”',
                '\n',
                '^She yelled to the soldiers.',
                '\n',
                '^The weight of her choices echoed in your mind. Ahead in the forest, gleaming eyes tracked you.',
                '\n',
                '^After hours of travel, Lysandra ordered a halt. She set up a makeshift camp between the road and a cluster of rocks.',
                '\n',
                '^You’d barely shared sparse rations when unnatural heat surged — first, just the rustle of dry leaves. Then, sharp, rapid hisses multiplied in the darkness as fiery shapes approached.',
                '\n',
                '^“An ambush!”',
                '\n',
                '^Lysandra growled.',
                '\n',
                '^From the shadows, three blazefen — salamander-men with amber eyes and flaming tongues — attacked. To everyone’s shock, one hurled a spear toward the horses, missing by inches. Lysandra saw their intent.',
                '\n',
                '^“Protect the mounts!”',
                '\n',
                '^Could word of Lysandra’s movements have leaked? Were there spies in the village? What seemed a random attack now had a clear goal: delay her rush to the Citadel.',
                '\n',
                'ev',
                'str',
                '^blazefen_ambush_01',
                '/str',
                '/ev',
                { 'temp=': 'combat_id' },
                'ev',
                { 'VAR?': 'combat_id' },
                '/ev',
                { '->t->': 'combat_scene' },
                'ev',
                { 'VAR?': 'combat_id' },
                { 'x()': 'get_combat_result', exArgs: 1 },
                '/ev',
                { 'temp=': 'combat_result' },
                '\n',
                'ev',
                { 'VAR?': 'combat_result' },
                '/ev',
                [
                    'du',
                    'ev',
                    -1,
                    '==',
                    '/ev',
                    { '->': '.^.b', c: true },
                    {
                        b: [
                            'pop',
                            '\n',
                            { '->t->': 'defeat_scene' },
                            'end',
                            { '->': '.^.^.^.84' },
                            null
                        ]
                    }
                ],
                [
                    'du',
                    'ev',
                    0,
                    '==',
                    '/ev',
                    { '->': '.^.b', c: true },
                    {
                        b: [
                            'pop',
                            '\n',
                            { '->t->': 'draw_scene' },
                            'end',
                            { '->': '.^.^.^.84' },
                            null
                        ]
                    }
                ],
                [
                    'du',
                    'ev',
                    1,
                    '==',
                    '/ev',
                    { '->': '.^.b', c: true },
                    {
                        b: [
                            'pop',
                            '\n',
                            { '->': 'steal_horses_quest' },
                            { '->': '.^.^.^.84' },
                            null
                        ]
                    }
                ],
                [
                    'du',
                    'ev',
                    2,
                    '==',
                    '/ev',
                    { '->': '.^.b', c: true },
                    {
                        b: [
                            'pop',
                            '\n',
                            { '->t->': 'village_quest' },
                            { '->': '.^.^.^.84' },
                            null
                        ]
                    }
                ],
                'pop',
                'nop',
                '\n',
                { '#f': 1 }
            ],
            steal_horses_quest: [
                [
                    'ev',
                    'str',
                    '^steal_horses_01',
                    '/str',
                    { 'x()': 'set_skill_scene', exArgs: 1 },
                    'pop',
                    '/ev',
                    '\n',
                    '^“Listen, recruit.”',
                    '\n',
                    '^Lysandra said, wiping battle grime away.',
                    '\n',
                    '^“From now on, it’s all about appearance, status, and deceit.”',
                    '\n',
                    '^She offered you fabric and water to clean yourself. Her gaze fixed on the horizon as if recalling something.',
                    '\n',
                    '^“Should anyone offer you gifts, ask yourself: Why now? Why here? What does this person gain?',
                    '\n',
                    '^Never accept gifts without reading the intent behind the wrapping. Never make deals without weighing every consequence.”',
                    '\n',
                    '^Lysandra watched you calmly. The impulsive soldier gave way to a measured noblewoman, like she was reliving an old lesson. She searched your eyes, reading your intent, and said:',
                    '\n',
                    '^“We can’t enter the next village on foot. Whispers outrun horses. If the Citadel knows us as wanderers, I’ll recruit no soldiers.”',
                    '\n',
                    '^She paused, letting you absorb the gravity.',
                    '\n',
                    '^“Simplest way: under night’s cover, we steal horses from an outlying villager.”',
                    '\n',
                    [
                        'ev',
                        { '^->': 'steal_horses_quest.0.28.$r1' },
                        { 'temp=': '$r' },
                        'str',
                        { '->': '.^.s' },
                        [{ '#n': '$r1' }],
                        '/str',
                        '/ev',
                        { '*': '.^.^.c-0', flg: 18 },
                        {
                            s: [
                                '^Agree — but avoid her gaze',
                                { '->': '$r', var: true },
                                null
                            ]
                        }
                    ],
                    [
                        'ev',
                        { '^->': 'steal_horses_quest.0.29.$r1' },
                        { 'temp=': '$r' },
                        'str',
                        { '->': '.^.s' },
                        [{ '#n': '$r1' }],
                        '/str',
                        '/ev',
                        { '*': '.^.^.c-1', flg: 18 },
                        {
                            s: [
                                '^"There\'s another way, Commander..."',
                                { '->': '$r', var: true },
                                null
                            ]
                        }
                    ],
                    {
                        'c-0': [
                            'ev',
                            { '^->': 'steal_horses_quest.0.c-0.$r2' },
                            '/ev',
                            { 'temp=': '$r' },
                            { '->': '.^.^.28.s' },
                            [{ '#n': '$r2' }],
                            '\n',
                            '^“You agreed too fast, recruit.”',
                            '\n',
                            '^Her eyes narrowed, measuring your soul.',
                            '\n',
                            '^“Remember: even I could be your inquisitor tomorrow. But today… Today we need horses.”',
                            '\n',
                            { '->': '.^.^.g-0' },
                            { '#f': 5 }
                        ],
                        'c-1': [
                            'ev',
                            { '^->': 'steal_horses_quest.0.c-1.$r2' },
                            '/ev',
                            { 'temp=': '$r' },
                            { '->': '.^.^.29.s' },
                            [{ '#n': '$r2' }],
                            '\n',
                            '^TBD 2',
                            '\n',
                            { '->': '.^.^.g-0' },
                            { '#f': 5 }
                        ],
                        'g-0': [
                            '^She took a deep breath: “For now, it’s a necessary evil.”',
                            '\n',
                            '^You walked on, both in silence. The only sounds piercing the night came from crickets and the occasional nocturnal creature.',
                            '\n',
                            '^After a brief time walking, Lysandra found a trail, discernible only by a path of grass slightly lower than its surroundings.',
                            '\n',
                            '^The light struggled to penetrate the forest. Only when the shy moon occasionally broke the imprisoning clouds did it offer a few more details of the terrain ahead. The dense woods suggested that whoever lived here — if anyone lived here — led a reclusive life.',
                            '\n',
                            '^“Circle around this path and look for any shelter before we near it.” Lysandra whispered.',
                            '\n',
                            { '->': '.^.^.^.skill_scene' },
                            { '#f': 5 }
                        ]
                    }
                ],
                {
                    skill_scene: [
                        'ev',
                        0,
                        '/ev',
                        { '->t->': 'available_skills_loop' },
                        'ev',
                        { 'x()': 'last_attempt_skill_result' },
                        '/ev',
                        { 'temp=': 'skill_result' },
                        '\n',
                        'ev',
                        { 'VAR?': 'skill_result' },
                        'out',
                        '/ev',
                        '\n',
                        'ev',
                        'str',
                        '^SUCCESS',
                        '/str',
                        { 'x()': 'get_attempt_skill_count', exArgs: 1 },
                        '/ev',
                        { 'temp=': 'success_count' },
                        '\n',
                        'ev',
                        'str',
                        '^FAIL',
                        '/str',
                        { 'x()': 'get_attempt_skill_count', exArgs: 1 },
                        '/ev',
                        { 'temp=': 'fail_count' },
                        '\n',
                        'ev',
                        { 'VAR?': 'skill_result' },
                        'str',
                        '^SUCCESS',
                        '/str',
                        '==',
                        '/ev',
                        [
                            { '->': '.^.b', c: true },
                            {
                                b: [
                                    '\n',
                                    'ev',
                                    { 'VAR?': 'success_count' },
                                    '/ev',
                                    { '->': '.^.^.^.^.success' },
                                    { '->': '.^.^.^.39' },
                                    null
                                ]
                            }
                        ],
                        [
                            { '->': '.^.b' },
                            {
                                b: [
                                    '\n',
                                    'ev',
                                    { 'VAR?': 'fail_count' },
                                    '/ev',
                                    { '->': '.^.^.^.^.fail' },
                                    { '->': '.^.^.^.39' },
                                    null
                                ]
                            }
                        ],
                        'nop',
                        '\n',
                        { '#f': 1 }
                    ],
                    success: [
                        { 'temp=': 'index' },
                        'ev',
                        { 'VAR?': 'index' },
                        '/ev',
                        [
                            'du',
                            'ev',
                            1,
                            '==',
                            '/ev',
                            { '->': '.^.b', c: true },
                            {
                                b: [
                                    'pop',
                                    '\n',
                                    '^A small habitation stood out in a neglected yard. Judging by its size, a few people lived there. Behind it sat an improvised stable. A small, slumbering bulldog lay in the yard.',
                                    '\n',
                                    'ev',
                                    { 'x()': 'end_skill_turn' },
                                    'out',
                                    '/ev',
                                    '\n',
                                    { '->': '.^.^.^.^.skill_scene' },
                                    { '->': '.^.^.^.8' },
                                    null
                                ]
                            }
                        ],
                        [
                            'du',
                            'ev',
                            2,
                            '==',
                            '/ev',
                            { '->': '.^.b', c: true },
                            {
                                b: [
                                    'pop',
                                    '\n',
                                    '^Inside the stable you found a brown mare and an imposing black stallion, both well-kept, a vivid opposition to the decrepit surroundings.',
                                    '\n',
                                    'ev',
                                    { 'x()': 'end_skill_turn' },
                                    'out',
                                    '/ev',
                                    '\n',
                                    { '->': '.^.^.^.^.skill_scene' },
                                    { '->': '.^.^.^.8' },
                                    null
                                ]
                            }
                        ],
                        [
                            'du',
                            'ev',
                            3,
                            '==',
                            '/ev',
                            { '->': '.^.b', c: true },
                            {
                                b: [
                                    'pop',
                                    '\n',
                                    '^You set out for the next village, both drained from little sleep. No conversation passed between you until the first rays of sun.',
                                    '\n',
                                    'ev',
                                    { 'x()': 'end_skill_scene' },
                                    'out',
                                    '/ev',
                                    '\n',
                                    { '->': 'village_quest' },
                                    { '->': '.^.^.^.8' },
                                    null
                                ]
                            }
                        ],
                        [
                            { '->': '.^.b' },
                            {
                                b: [
                                    'pop',
                                    '\n',
                                    { '->': '.^.^.^.^.skill_scene' },
                                    { '->': '.^.^.^.8' },
                                    null
                                ]
                            }
                        ],
                        'nop',
                        '\n',
                        { '#f': 1 }
                    ],
                    fail: [
                        { 'temp=': 'index' },
                        'ev',
                        { 'VAR?': 'index' },
                        '/ev',
                        [
                            'du',
                            'ev',
                            1,
                            '==',
                            '/ev',
                            { '->': '.^.b', c: true },
                            {
                                b: [
                                    'pop',
                                    '\n',
                                    '^Fail message 1',
                                    '\n',
                                    'ev',
                                    { 'x()': 'end_skill_turn' },
                                    'out',
                                    '/ev',
                                    '\n',
                                    { '->': '.^.^.^.^.skill_scene' },
                                    { '->': '.^.^.^.8' },
                                    null
                                ]
                            }
                        ],
                        [
                            'du',
                            'ev',
                            2,
                            '==',
                            '/ev',
                            { '->': '.^.b', c: true },
                            {
                                b: [
                                    'pop',
                                    '\n',
                                    '^Fail message 2',
                                    '\n',
                                    'ev',
                                    { 'x()': 'end_skill_turn' },
                                    'out',
                                    '/ev',
                                    '\n',
                                    { '->': '.^.^.^.^.skill_scene' },
                                    { '->': '.^.^.^.8' },
                                    null
                                ]
                            }
                        ],
                        [
                            'du',
                            'ev',
                            3,
                            '==',
                            '/ev',
                            { '->': '.^.b', c: true },
                            {
                                b: [
                                    'pop',
                                    '\n',
                                    '^Fail message 3',
                                    '\n',
                                    'ev',
                                    { 'x()': 'end_skill_scene' },
                                    'out',
                                    '/ev',
                                    '\n',
                                    { '->': 'steal_horses_quest_fail' },
                                    { '->': '.^.^.^.8' },
                                    null
                                ]
                            }
                        ],
                        [
                            { '->': '.^.b' },
                            {
                                b: [
                                    'pop',
                                    '\n',
                                    { '->': '.^.^.^.^.skill_scene' },
                                    { '->': '.^.^.^.8' },
                                    null
                                ]
                            }
                        ],
                        'nop',
                        '\n',
                        { '#f': 1 }
                    ],
                    '#f': 1
                }
            ],
            steal_horses_quest_fail: [
                '^steal_horses_quest_fail TBD',
                '\n',
                'end',
                { '#f': 1 }
            ],
            village_quest: [
                [
                    '^Riding by your side, nose in the air and gaze austere, Lysandra said:',
                    '\n',
                    '^“From now on, address me as Lady Hawkridge — my true name. You will be ',
                    'ev',
                    { 'VAR?': 'player_name' },
                    'out',
                    '/ev',
                    '^ Highcrag, my squire. The Highcrags are loyal, valorous vassals of House Hawkridge. Tonight, I’ll brief you further.”',
                    '\n',
                    '^With this new perspective, you approached the next village. Dawn’s mist surrendered to the rising sun, revealing the village of Threshold. The road to the Citadel, once narrow, now widened into well-kept pavement. Even at this early hour, it was already busy: a carter with bales of hay trotted heavily southwards.',
                    '\n',
                    '^Dominating the village center stood a large square and the prominent ‘Threshold Inn’. Despite the low sun, it buzzed with morning activity.',
                    '\n',
                    '^Lysandra dismounted, handing her horse to a stablehand like he was her lifelong servant. You mimicked her. She whispered:',
                    '\n',
                    '^“See, squire? People in the square whisper, eyeing the guard post nervously. Wait — hear the commotion inside the inn? Even behind closed doors. Now look there.”',
                    '\n',
                    '^She subtly gestured opposite your entry point.',
                    '\n',
                    '^“Stones in the sacred circle are cracking. This village breathes fear. Locals dread a local power more than night creatures. The wards were sabotaged. Everyone knows. They pretend not to. Today, you learn to read the unspoken.”',
                    '\n',
                    [
                        'ev',
                        { '^->': 'village_quest.0.21.$r1' },
                        { 'temp=': '$r' },
                        'str',
                        { '->': '.^.s' },
                        [{ '#n': '$r1' }],
                        '/str',
                        '/ev',
                        { '*': '.^.^.c-0', flg: 18 },
                        {
                            s: [
                                '^Talk to people in the square',
                                { '->': '$r', var: true },
                                null
                            ]
                        }
                    ],
                    [
                        'ev',
                        { '^->': 'village_quest.0.22.$r1' },
                        { 'temp=': '$r' },
                        'str',
                        { '->': '.^.s' },
                        [{ '#n': '$r1' }],
                        '/str',
                        '/ev',
                        { '*': '.^.^.c-1', flg: 18 },
                        {
                            s: [
                                '^Stop the inn brawl',
                                { '->': '$r', var: true },
                                null
                            ]
                        }
                    ],
                    [
                        'ev',
                        { '^->': 'village_quest.0.23.$r1' },
                        { 'temp=': '$r' },
                        'str',
                        { '->': '.^.s' },
                        [{ '#n': '$r1' }],
                        '/str',
                        '/ev',
                        { '*': '.^.^.c-2', flg: 18 },
                        {
                            s: [
                                '^Inspect the guard post ',
                                { '->': '$r', var: true },
                                null
                            ]
                        }
                    ],
                    {
                        'c-0': [
                            'ev',
                            { '^->': 'village_quest.0.c-0.$r2' },
                            '/ev',
                            { 'temp=': '$r' },
                            { '->': '.^.^.21.s' },
                            [{ '#n': '$r2' }],
                            '\n',
                            { '->': '.^.^.g-0' },
                            { '#f': 5 }
                        ],
                        'c-1': [
                            'ev',
                            { '^->': 'village_quest.0.c-1.$r2' },
                            '/ev',
                            { 'temp=': '$r' },
                            { '->': '.^.^.22.s' },
                            [{ '#n': '$r2' }],
                            '\n',
                            { '->': '.^.^.g-0' },
                            { '#f': 5 }
                        ],
                        'c-2': [
                            'ev',
                            { '^->': 'village_quest.0.c-2.$r2' },
                            '/ev',
                            { 'temp=': '$r' },
                            { '->': '.^.^.23.s' },
                            [{ '#n': '$r2' }],
                            '\n',
                            { '->': '.^.^.g-0' },
                            { '#f': 5 }
                        ],
                        'g-0': [
                            '^While you investigated, the innkeeper stormed out shouting:',
                            '\n',
                            '^“They stole my grain! Damned guards can’t do their jobs!”',
                            '\n',
                            '^Lysandra whispered:',
                            '\n',
                            '^“Now comes the true test: how do we use this?”',
                            '\n',
                            [
                                'ev',
                                { '^->': 'village_quest.0.g-0.8.$r1' },
                                { 'temp=': '$r' },
                                'str',
                                { '->': '.^.s' },
                                [{ '#n': '$r1' }],
                                '/str',
                                '/ev',
                                { '*': '.^.^.c-3', flg: 18 },
                                {
                                    s: [
                                        '^Publicly support the innkeeper',
                                        { '->': '$r', var: true },
                                        null
                                    ]
                                }
                            ],
                            [
                                'ev',
                                { '^->': 'village_quest.0.g-0.9.$r1' },
                                { 'temp=': '$r' },
                                'str',
                                { '->': '.^.s' },
                                [{ '#n': '$r1' }],
                                '/str',
                                '/ev',
                                { '*': '.^.^.c-4', flg: 18 },
                                {
                                    s: [
                                        '^Defend the guards with logic',
                                        { '->': '$r', var: true },
                                        null
                                    ]
                                }
                            ],
                            [
                                'ev',
                                { '^->': 'village_quest.0.g-0.10.$r1' },
                                { 'temp=': '$r' },
                                'str',
                                { '->': '.^.s' },
                                [{ '#n': '$r1' }],
                                '/str',
                                '/ev',
                                { '*': '.^.^.c-5', flg: 18 },
                                {
                                    s: [
                                        '^Blame the Hidden Cultists',
                                        { '->': '$r', var: true },
                                        null
                                    ]
                                }
                            ],
                            {
                                'c-3': [
                                    'ev',
                                    { '^->': 'village_quest.0.g-0.c-3.$r2' },
                                    '/ev',
                                    { 'temp=': '$r' },
                                    { '->': '.^.^.8.s' },
                                    [{ '#n': '$r2' }],
                                    '\n',
                                    { '->': '.^.^.^.g-1' },
                                    { '#f': 5 }
                                ],
                                'c-4': [
                                    'ev',
                                    { '^->': 'village_quest.0.g-0.c-4.$r2' },
                                    '/ev',
                                    { 'temp=': '$r' },
                                    { '->': '.^.^.9.s' },
                                    [{ '#n': '$r2' }],
                                    '\n',
                                    { '->': '.^.^.^.g-1' },
                                    { '#f': 5 }
                                ],
                                'c-5': [
                                    'ev',
                                    { '^->': 'village_quest.0.g-0.c-5.$r2' },
                                    '/ev',
                                    { 'temp=': '$r' },
                                    { '->': '.^.^.10.s' },
                                    [{ '#n': '$r2' }],
                                    '\n',
                                    { '->': '.^.^.^.g-1' },
                                    { '#f': 5 }
                                ],
                                '#f': 5
                            }
                        ],
                        'g-1': [
                            '^“See how a small chaos (‘stolen grain’) hides a greater scheme (‘shattering the stones’)?”',
                            '\n',
                            '^She pointed at the fissure, now visible in twilight.',
                            '\n',
                            '^“The innkeeper’s a puppet. The true villains are in the Citadel, using commoners as pawns.”',
                            '\n',
                            'end',
                            { '#f': 5 }
                        ]
                    }
                ],
                { '#f': 1 }
            ],
            stealth: ['^stealth TBD', '\n', 'end', { '#f': 1 }],
            combat: ['^combat TBD', '\n', 'end', { '#f': 1 }],
            defeat_scene: [
                '^Your vision blurs as you collapse to the ground. The clatter of your falling weapon echoes in your ears before darkness consumes you.',
                '\n',
                'end',
                { '#f': 1 }
            ],
            draw_scene: [
                '^Panting heavily, you lock eyes with your opponent across the bloodied ground. Both of you stand trembling, weapons lowered in unspoken agreement - neither can land a decisive blow.',
                '\n',
                'ev',
                'void',
                '/ev',
                '->->',
                { '#f': 1 }
            ],
            add_mount: [
                { 'temp=': 'character_team' },
                { 'temp=': 'character_id' },
                { 'temp=': 'mount_name' },
                'ev',
                { 'VAR?': 'mount_name' },
                'out',
                '/ev',
                '^ - ',
                'ev',
                { 'VAR?': 'character_id' },
                'out',
                '/ev',
                '^ - ',
                'ev',
                { 'VAR?': 'character_team' },
                'out',
                '/ev',
                '\n',
                { '#f': 1 }
            ],
            add_to_hero_party: [
                { 'temp=': 'hero_id' },
                'ev',
                { 'VAR?': 'hero_id' },
                'out',
                '/ev',
                '\n',
                { '#f': 1 }
            ],
            ai_action: ['^ai acting', '\n', { '#f': 1 }],
            attack: [
                { 'temp=': 'character_id' },
                '^attacking ',
                'ev',
                { 'VAR?': 'character_id' },
                'out',
                '/ev',
                '\n',
                { '#f': 1 }
            ],
            attempt_skill: [
                { 'temp=': 'skill_id' },
                '^attempt skill ',
                'ev',
                { 'VAR?': 'skill_id' },
                'out',
                '/ev',
                '\n',
                { '#f': 1 }
            ],
            end_skill_scene: ['^end skill scene', '\n', { '#f': 1 }],
            end_skill_turn: ['^end skill turn', '\n', { '#f': 1 }],
            end_turn: ['ev', 0, '/ev', '~ret', { '#f': 1 }],
            get_action_order: [
                'ev',
                'str',
                '^[x] Hero 1 / Enemy 1',
                '/str',
                '/ev',
                '~ret',
                { '#f': 1 }
            ],
            get_action_skills_count: ['ev', 3, '/ev', '~ret', { '#f': 1 }],
            get_action_result: [
                'ev',
                'str',
                '^Action result',
                '/str',
                '/ev',
                '~ret',
                { '#f': 1 }
            ],
            get_attempt_skill_count: [
                { 'temp=': 'skill_result' },
                'ev',
                1,
                '/ev',
                '~ret',
                { '#f': 1 }
            ],
            get_character_info: [
                { 'temp=': 'prop' },
                { 'temp=': 'index' },
                { 'temp=': 'team' },
                'ev',
                1,
                '/ev',
                '~ret',
                { '#f': 1 }
            ],
            get_combat_result: [
                { 'temp=': 'combat_id' },
                'ev',
                1,
                '/ev',
                '~ret',
                { '#f': 1 }
            ],
            get_combat_round: ['ev', 1, '/ev', '~ret', { '#f': 1 }],
            get_combat_status: [
                'ev',
                'str',
                '^VICTORY',
                '/str',
                '/ev',
                '~ret',
                { '#f': 1 }
            ],
            get_mount_info: [
                { 'temp=': 'prop' },
                { 'temp=': 'index' },
                { 'temp=': 'team' },
                'ev',
                1,
                '/ev',
                '~ret',
                { '#f': 1 }
            ],
            get_party_size: [
                { 'temp=': 'team' },
                'ev',
                1,
                '/ev',
                '~ret',
                { '#f': 1 }
            ],
            get_scene_skill_info: [
                { 'temp=': 'prop' },
                { 'temp=': 'index' },
                'ev',
                1,
                '/ev',
                '~ret',
                { '#f': 1 }
            ],
            has_mounts: [
                { 'temp=': 'team' },
                'ev',
                false,
                '/ev',
                '~ret',
                { '#f': 1 }
            ],
            is_player_action: ['ev', true, '/ev', '~ret', { '#f': 1 }],
            last_attempt_skill_result: [
                'ev',
                'str',
                '^SUCCESS',
                '/str',
                '/ev',
                '~ret',
                { '#f': 1 }
            ],
            set_combat: [
                { 'temp=': 'combat_id' },
                'ev',
                { 'VAR?': 'combat_id' },
                'out',
                '/ev',
                '\n',
                { '#f': 1 }
            ],
            set_skill_scene: [
                { 'temp=': 'skill_scene_id' },
                'ev',
                { 'VAR?': 'skill_scene_id' },
                'out',
                '/ev',
                '\n',
                { '#f': 1 }
            ],
            combat_scene: [
                { 'temp=': 'combat_id' },
                'ev',
                { 'VAR?': 'combat_id' },
                { 'x()': 'set_combat', exArgs: 1 },
                'pop',
                '/ev',
                '\n',
                '^⚔️🛡️ COMBAT STARTED 🛡️⚔️',
                '#',
                '^text-align: center',
                '/#',
                '\n',
                { '->t->': 'combat_loop' },
                'ev',
                'void',
                '/ev',
                '->->',
                { '#f': 1 }
            ],
            combat_loop: [
                '^⚔️🛡️ COMBAT ROUND ',
                'ev',
                { 'x()': 'get_combat_round' },
                'out',
                '/ev',
                '^ 🛡️⚔️',
                '\n',
                'ev',
                0,
                '/ev',
                { '->t->': 'enemy_loop' },
                'ev',
                'str',
                '^enemies',
                '/str',
                { 'x()': 'has_mounts', exArgs: 1 },
                '/ev',
                [
                    { '->': '.^.b', c: true },
                    {
                        b: [
                            '\n',
                            '^Enemy mounts:',
                            '\n',
                            'ev',
                            0,
                            'str',
                            '^enemies',
                            '/str',
                            '/ev',
                            { '->t->': 'mount_loop' },
                            { '->': '.^.^.^.18' },
                            null
                        ]
                    }
                ],
                'nop',
                '\n',
                'ev',
                0,
                '/ev',
                { '->t->': 'hero_loop' },
                'ev',
                'str',
                '^heroes',
                '/str',
                { 'x()': 'has_mounts', exArgs: 1 },
                '/ev',
                [
                    { '->': '.^.b', c: true },
                    {
                        b: [
                            '\n',
                            '^Hero mounts:',
                            '\n',
                            'ev',
                            0,
                            'str',
                            '^heroes',
                            '/str',
                            '/ev',
                            { '->t->': 'mount_loop' },
                            { '->': '.^.^.^.31' },
                            null
                        ]
                    }
                ],
                'nop',
                '\n',
                'ev',
                { 'x()': 'get_action_order' },
                'out',
                '/ev',
                '\n',
                'ev',
                { 'x()': 'is_player_action' },
                '_',
                '/ev',
                [
                    { '->': '.^.b', c: true },
                    {
                        b: [
                            '\n',
                            { '->t->': 'player_action_options' },
                            { '->': '.^.^.^.44' },
                            null
                        ]
                    }
                ],
                [
                    { '->': '.^.b' },
                    {
                        b: [
                            '\n',
                            'ev',
                            { 'x()': 'ai_action' },
                            'out',
                            '/ev',
                            '\n',
                            { '->': '.^.^.^.44' },
                            null
                        ]
                    }
                ],
                'nop',
                '\n',
                'ev',
                { 'x()': 'get_action_result' },
                'out',
                '/ev',
                '\n',
                'ev',
                { 'x()': 'end_turn' },
                'out',
                '/ev',
                '\n',
                'ev',
                { 'x()': 'get_combat_status' },
                'str',
                '^IN_PROGRESS',
                '/str',
                '==',
                '/ev',
                [
                    { '->': '.^.b', c: true },
                    {
                        b: [
                            '\n',
                            '^Next turn!',
                            '\n',
                            { '->': '.^.^.^' },
                            { '->': '.^.^.^.64' },
                            null
                        ]
                    }
                ],
                'nop',
                '\n',
                'ev',
                'void',
                '/ev',
                '->->',
                { '#f': 1 }
            ],
            enemy_loop: [
                { 'temp=': 'index' },
                'ev',
                { 'VAR?': 'index' },
                'str',
                '^enemies',
                '/str',
                { 'x()': 'get_party_size', exArgs: 1 },
                '>=',
                '/ev',
                [
                    { '->': '.^.b', c: true },
                    {
                        b: [
                            '^ ',
                            'ev',
                            'void',
                            '/ev',
                            '->->',
                            { '->': '.^.^.^.10' },
                            null
                        ]
                    }
                ],
                'nop',
                '\n',
                'ev',
                'str',
                '^enemies',
                '/str',
                { 'VAR?': 'index' },
                'str',
                '^name',
                '/str',
                { 'x()': 'get_character_info', exArgs: 3 },
                '/ev',
                { 'temp=': 'enemy_name' },
                '\n',
                'ev',
                'str',
                '^enemies',
                '/str',
                { 'VAR?': 'index' },
                'str',
                '^hp',
                '/str',
                { 'x()': 'get_character_info', exArgs: 3 },
                '/ev',
                { 'temp=': 'enemy_hp' },
                '\n',
                'ev',
                { 'VAR?': 'enemy_hp' },
                0,
                '>',
                '/ev',
                [
                    { '->': '.^.b', c: true },
                    {
                        b: [
                            '\n',
                            '^Enemy: ',
                            'ev',
                            { 'VAR?': 'enemy_name' },
                            'out',
                            '/ev',
                            '^ (Hp: ',
                            'ev',
                            { 'VAR?': 'enemy_hp' },
                            'out',
                            '/ev',
                            '^)',
                            '\n',
                            { '->': '.^.^.^.42' },
                            null
                        ]
                    }
                ],
                'nop',
                '\n',
                'ev',
                { 'VAR?': 'index' },
                1,
                '+',
                '/ev',
                { '->': '.^' },
                { '#f': 1 }
            ],
            hero_loop: [
                { 'temp=': 'index' },
                'ev',
                { 'VAR?': 'index' },
                'str',
                '^heroes',
                '/str',
                { 'x()': 'get_party_size', exArgs: 1 },
                '>=',
                '/ev',
                [
                    { '->': '.^.b', c: true },
                    {
                        b: [
                            '^ ',
                            'ev',
                            'void',
                            '/ev',
                            '->->',
                            { '->': '.^.^.^.10' },
                            null
                        ]
                    }
                ],
                'nop',
                '\n',
                'ev',
                'str',
                '^heroes',
                '/str',
                { 'VAR?': 'index' },
                'str',
                '^name',
                '/str',
                { 'x()': 'get_character_info', exArgs: 3 },
                '/ev',
                { 'temp=': 'hero_name' },
                '\n',
                'ev',
                'str',
                '^heroes',
                '/str',
                { 'VAR?': 'index' },
                'str',
                '^hp',
                '/str',
                { 'x()': 'get_character_info', exArgs: 3 },
                '/ev',
                { 'temp=': 'hero_hp' },
                '\n',
                '^Hero: ',
                'ev',
                { 'VAR?': 'hero_name' },
                'out',
                '/ev',
                '^ (Hp: ',
                'ev',
                { 'VAR?': 'hero_hp' },
                'out',
                '/ev',
                '^)',
                '\n',
                'ev',
                { 'VAR?': 'index' },
                1,
                '+',
                '/ev',
                { '->': '.^' },
                { '#f': 1 }
            ],
            player_action_options: [
                '^Select an enemy to attack',
                '\n',
                'ev',
                0,
                '/ev',
                { '->': 'enemy_choice_loop' },
                { '#f': 1 }
            ],
            enemy_choice_loop: [
                { 'temp=': 'index' },
                'ev',
                'str',
                '^enemies',
                '/str',
                { 'VAR?': 'index' },
                'str',
                '^name',
                '/str',
                { 'x()': 'get_character_info', exArgs: 3 },
                '/ev',
                { 'temp=': 'enemy_name' },
                '\n',
                'ev',
                'str',
                '^enemies',
                '/str',
                { 'VAR?': 'index' },
                'str',
                '^hp',
                '/str',
                { 'x()': 'get_character_info', exArgs: 3 },
                '/ev',
                { 'temp=': 'enemy_hp' },
                '\n',
                'ev',
                'str',
                '^enemies',
                '/str',
                { 'VAR?': 'index' },
                'str',
                '^id',
                '/str',
                { 'x()': 'get_character_info', exArgs: 3 },
                '/ev',
                { 'temp=': 'enemy_id' },
                '\n',
                'ev',
                { 'VAR?': 'enemy_hp' },
                0,
                '>',
                '/ev',
                [
                    { '->': '.^.b', c: true },
                    {
                        b: [
                            '\n',
                            'ev',
                            'str',
                            'ev',
                            { 'VAR?': 'enemy_name' },
                            'out',
                            '/ev',
                            '/str',
                            '/ev',
                            { '*': '.^.c-0', flg: 4 },
                            { '->': '.^.^.^.43' },
                            {
                                'c-0': [
                                    '\n',
                                    'ev',
                                    { 'VAR?': 'enemy_id' },
                                    { 'x()': 'attack', exArgs: 1 },
                                    'pop',
                                    '/ev',
                                    '\n',
                                    'ev',
                                    'void',
                                    '/ev',
                                    '->->',
                                    { '#f': 5 }
                                ]
                            }
                        ]
                    }
                ],
                'nop',
                '\n',
                'ev',
                { 'VAR?': 'index' },
                'str',
                '^enemies',
                '/str',
                { 'x()': 'get_party_size', exArgs: 1 },
                1,
                '-',
                '<',
                '/ev',
                [
                    { '->': '.^.b', c: true },
                    {
                        b: [
                            '^ ',
                            'ev',
                            { 'VAR?': 'index' },
                            1,
                            '+',
                            '/ev',
                            { '->': '.^.^.^' },
                            { '->': '.^.^.^.56' },
                            null
                        ]
                    }
                ],
                'nop',
                '\n',
                { '#f': 1 }
            ],
            mount_loop: [
                { 'temp=': 'team' },
                { 'temp=': 'index' },
                'ev',
                { 'VAR?': 'index' },
                { 'VAR?': 'team' },
                { 'x()': 'get_party_size', exArgs: 1 },
                '>=',
                '/ev',
                [
                    { '->': '.^.b', c: true },
                    {
                        b: [
                            '^ ',
                            'ev',
                            'void',
                            '/ev',
                            '->->',
                            { '->': '.^.^.^.9' },
                            null
                        ]
                    }
                ],
                'nop',
                '\n',
                'ev',
                { 'VAR?': 'team' },
                { 'VAR?': 'index' },
                'str',
                '^name',
                '/str',
                { 'x()': 'get_mount_info', exArgs: 3 },
                '/ev',
                { 'temp=': 'mount_name' },
                '\n',
                'ev',
                { 'VAR?': 'team' },
                { 'VAR?': 'index' },
                'str',
                '^hp',
                '/str',
                { 'x()': 'get_mount_info', exArgs: 3 },
                '/ev',
                { 'temp=': 'mount_hp' },
                '\n',
                'ev',
                { 'VAR?': 'mount_hp' },
                0,
                '>',
                '/ev',
                [
                    { '->': '.^.b', c: true },
                    {
                        b: [
                            '\n',
                            'ev',
                            { 'VAR?': 'mount_name' },
                            'out',
                            '/ev',
                            '^ (Hp: ',
                            'ev',
                            { 'VAR?': 'mount_hp' },
                            'out',
                            '/ev',
                            '^)',
                            '\n',
                            { '->': '.^.^.^.37' },
                            null
                        ]
                    }
                ],
                'nop',
                '\n',
                'ev',
                { 'VAR?': 'index' },
                1,
                '+',
                { 'VAR?': 'team' },
                '/ev',
                { '->': '.^' },
                { '#f': 1 }
            ],
            available_skills_loop: [
                { 'temp=': 'index' },
                'ev',
                { 'VAR?': 'index' },
                'str',
                '^name',
                '/str',
                { 'x()': 'get_scene_skill_info', exArgs: 2 },
                '/ev',
                { 'temp=': 'skill_name' },
                '\n',
                'ev',
                { 'VAR?': 'index' },
                'str',
                '^id',
                '/str',
                { 'x()': 'get_scene_skill_info', exArgs: 2 },
                '/ev',
                { 'temp=': 'skill_id' },
                '\n',
                'ev',
                { 'VAR?': 'skill_name' },
                '/ev',
                [
                    { '->': '.^.b', c: true },
                    {
                        b: [
                            '\n',
                            'ev',
                            'str',
                            'ev',
                            { 'VAR?': 'skill_name' },
                            'out',
                            '/ev',
                            '/str',
                            '/ev',
                            { '*': '.^.c-0', flg: 4 },
                            { '->': '.^.^.^.23' },
                            {
                                'c-0': [
                                    '\n',
                                    'ev',
                                    { 'VAR?': 'skill_id' },
                                    { 'x()': 'attempt_skill', exArgs: 1 },
                                    'pop',
                                    '/ev',
                                    '\n',
                                    'ev',
                                    { 'x()': 'get_action_result' },
                                    'out',
                                    '/ev',
                                    '\n',
                                    'ev',
                                    'void',
                                    '/ev',
                                    '->->',
                                    { '#f': 5 }
                                ]
                            }
                        ]
                    }
                ],
                'nop',
                '\n',
                'ev',
                { 'VAR?': 'index' },
                { 'x()': 'get_action_skills_count' },
                1,
                '-',
                '<',
                '/ev',
                [
                    { '->': '.^.b', c: true },
                    {
                        b: [
                            '^ ',
                            'ev',
                            { 'VAR?': 'index' },
                            1,
                            '+',
                            '/ev',
                            { '->': '.^.^.^' },
                            { '->': '.^.^.^.33' },
                            null
                        ]
                    }
                ],
                'nop',
                '\n',
                { '#f': 1 }
            ],
            'global decl': [
                'ev',
                'str',
                '^Celcius',
                '/str',
                { 'VAR=': 'player_name' },
                '/ev',
                'end',
                null
            ],
            '#f': 1
        }
    ],
    listDefs: {}
}
export default storyContent

