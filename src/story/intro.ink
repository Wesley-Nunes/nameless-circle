INCLUDE functions.ink

EXTERNAL add_mount(mount_name, character_id, character_team)
EXTERNAL add_to_hero_party(hero_id)
EXTERNAL ai_action()
EXTERNAL attack(character_id)
EXTERNAL attempt_skill(skill_id)
EXTERNAL end_skill_scene()
EXTERNAL end_skill_turn()
EXTERNAL end_turn()
EXTERNAL get_action_order()
EXTERNAL get_action_skills_count()
EXTERNAL get_action_result()
EXTERNAL get_attempt_skill_count(skill_result)
EXTERNAL get_character_info(team, index, prop)
EXTERNAL get_combat_result(combat_id)
EXTERNAL get_combat_status()
EXTERNAL get_combat_round()
EXTERNAL get_mount_info(character_id, prop)
EXTERNAL get_party_size(team)
EXTERNAL get_scene_skill_info(index, prop)
EXTERNAL is_player_action()
EXTERNAL last_attempt_skill_result()
EXTERNAL set_combat(combat_id)
EXTERNAL set_skill_scene(skill_scene_id)

VAR player_name = "Celcius"

-> start

=== start ===
“When countless mouths are sated with innocent blood,
The Abyss shall breathe its curse—ash, corruption, void—
To blacken guardian rings of life,
Until Seven Thrones crack and crash from heaven's height.
Then, from the weeping ground,
The Shadowed One shall raise its silent crown,
And claim the shattered world as darkness drowns.”

The hue of the setting sun, nearly swallowed by night, blended with the swamp’s dark greens, staining the stagnant waters. Will-o’-wisps, like fragments of the cursed prophecy, broke free from the murk and began their ghostly dance above the sludge. A biting cold—far beyond twilight—enveloped the group, heavy with the stink of rot, sulfur, and decay.

Lysandra’s eyes blazed, nostrils flared.
“To hell with this prophecy! Protaxios, gather the stealthiest soldiers and scout the nearby swamps. Renpet-Ib, raise magical barriers around the village. We need more troops. I’ll go to the Citadel myself to bargain with some noble.”

As she shouted, you saw her tremble — and felt your own palms sweat.

*   “Commander, Let me join you at the Citadel.”
    -> courtly_intrigue

*   “I can move quietly, Protaxios. Let me scout with you.” 
    -> stealth

*   “The village needs every blade. I stand with Renpet-Ib.”
    -> combat

=== courtly_intrigue ===
// NOTE: Hero party is currently hardcoded 
// (will be user-configurable later)
{ add_to_hero_party("hero_0002") }
{ add_mount("Riding horse", "hero_0001", "heroes") }
{ add_mount("Riding horse", "hero_0002", "heroes") }
The sky deepened to indigo as stars slowly awakened. The southern road — the only path to the Citadel — narrowed, with few places to camp. Ancient trees leaned toward the path as if trying to delay travelers.

Lysandra rode ahead, refusing an escort — only you, her new recruit, followed.
“Protect the village!”
She yelled to the soldiers.
The weight of her choices echoed in your mind. Ahead in the forest, gleaming eyes tracked you.

After hours of travel, Lysandra ordered a halt. She set up a makeshift camp between the road and a cluster of rocks.

You’d barely shared sparse rations when unnatural heat surged — first, just the rustle of dry leaves. Then, sharp, rapid hisses multiplied in the darkness as fiery shapes approached.
“An ambush!”
Lysandra growled.
From the shadows, three blazefen — salamander-men with amber eyes and flaming tongues — attacked. To everyone’s shock, one hurled a spear toward the horses, missing by inches. Lysandra saw their intent.
“Protect the mounts!”

Could word of Lysandra’s movements have leaked? Were there spies in the village? What seemed a random attack now had a clear goal: delay her rush to the Citadel.

~ temp combat_id = "blazefen_ambush_01"
-> combat_scene(combat_id) ->
~ temp combat_result = get_combat_result(combat_id)
{ combat_result:
    - -1: -> defeat_scene -> END
    - 0: -> draw_scene -> END
    - 1: -> steal_horses_quest
    - 2: -> village_quest ->
}

=== steal_horses_quest ===
~ set_skill_scene("steal_horses_01")
“Listen, recruit.”
Lysandra said, wiping battle grime away.
“From now on, it’s all about appearance, status, and deceit.”
She offered you fabric and water to clean yourself. Her gaze fixed on the horizon as if recalling something.
“Should anyone offer you gifts, ask yourself: Why now? Why here? What does this person gain?
Never accept gifts without reading the intent behind the wrapping. Never make deals without weighing every consequence.”
Lysandra watched you calmly. The impulsive soldier gave way to a measured noblewoman, like she was reliving an old lesson. She searched your eyes, reading your intent, and said:
“We can’t enter the next village on foot. Whispers outrun horses. If the Citadel knows us as wanderers, I’ll recruit no soldiers.”
She paused, letting you absorb the gravity.

“Simplest way: under night’s cover, we steal horses from an outlying villager.”
    *   Agree — but avoid her gaze
        “You agreed too fast, recruit.”
        Her eyes narrowed, measuring your soul.
        “Remember: even I could be your inquisitor tomorrow. But today… Today we need horses.”
    *   "There's another way, Commander..."
        TBD 2
- She took a deep breath: “For now, it’s a necessary evil.”

You walked on, both in silence. The only sounds piercing the night came from crickets and the occasional nocturnal creature.
After a brief time walking, Lysandra found a trail, discernible only by a path of grass slightly lower than its surroundings.
The light struggled to penetrate the forest. Only when the shy moon occasionally broke the imprisoning clouds did it offer a few more details of the terrain ahead. The dense woods suggested that whoever lived here — if anyone lived here — led a reclusive life.

“Circle around this path and look for any shelter before we near it.” Lysandra whispered.
-> skill_scene

= skill_scene
-> available_skills_loop(0) ->
    ~ temp skill_result = last_attempt_skill_result()
    { skill_result }

~ temp success_count = get_attempt_skill_count("SUCCESS")
~ temp fail_count = get_attempt_skill_count("FAIL")
{ skill_result == "SUCCESS":
    -> success(success_count)
  - else:
    -> fail(fail_count)
}

= success(index) 
    { index:
    - 1: A small habitation stood out in a neglected yard. Judging by its size, a few people lived there. Behind it sat an improvised stable. A small, slumbering bulldog lay in the yard.
        { end_skill_turn() }
        -> skill_scene
    - 2: Inside the stable you found a brown mare and an imposing black stallion, both well-kept, a vivid opposition to the decrepit surroundings.
        { end_skill_turn() }
        -> skill_scene
    - 3: You set out for the next village, both drained from little sleep. No conversation passed between you until the first rays of sun.
        { end_skill_scene() }
        -> village_quest
    - else:
        -> skill_scene
    }
    
= fail(index)
    { index:
    - 1: Fail message 1
        { end_skill_turn() }
        -> skill_scene
    - 2: Fail message 2
        { end_skill_turn() }
        -> skill_scene
    - 3: Fail message 3 
        { end_skill_scene() }
        -> steal_horses_quest_fail
    - else:
        -> skill_scene
    }

=== steal_horses_quest_fail ===
steal_horses_quest_fail TBD
-> END

=== village_quest ===
Riding by your side, nose in the air and gaze austere, Lysandra said:
“From now on, address me as Lady Hawkridge — my true name. You will be {player_name} Highcrag, my squire. The Highcrags are loyal, valorous vassals of House Hawkridge. Tonight, I’ll brief you further.”

With this new perspective, you approached the next village. Dawn’s mist surrendered to the rising sun, revealing the village of Threshold. The road to the Citadel, once narrow, now widened into well-kept pavement. Even at this early hour, it was already busy: a carter with bales of hay trotted heavily southwards.

Dominating the village center stood a large square and the prominent ‘Threshold Inn’. Despite the low sun, it buzzed with morning activity.

Lysandra dismounted, handing her horse to a stablehand like he was her lifelong servant. You mimicked her. She whispered:
“See, squire? People in the square whisper, eyeing the guard post nervously. Wait — hear the commotion inside the inn? Even behind closed doors. Now look there.”
She subtly gestured opposite your entry point.
“Stones in the sacred circle are cracking. This village breathes fear. Locals dread a local power more than night creatures. The wards were sabotaged. Everyone knows. They pretend not to. Today, you learn to read the unspoken.”
// TODO: Social scenes TBD
    * Talk to people in the square
        
    * Stop the inn brawl
        
    * Inspect the guard post 
  
- While you investigated, the innkeeper stormed out shouting:
“They stole my grain! Damned guards can’t do their jobs!”
Lysandra whispered:
“Now comes the true test: how do we use this?”
// TODO: Web of choices TBD
    * Publicly support the innkeeper
        
    * Defend the guards with logic
        
    * Blame the Hidden Cultists

- “See how a small chaos (‘stolen grain’) hides a greater scheme (‘shattering the stones’)?”
She pointed at the fissure, now visible in twilight.
“The innkeeper’s a puppet. The true villains are in the Citadel, using commoners as pawns.”

-> END

=== stealth ===
stealth TBD
-> END

=== combat ===
combat TBD
-> END

=== defeat_scene ===
Your vision blurs as you collapse to the ground. The clatter of your falling weapon echoes in your ears before darkness consumes you.  
-> END

=== draw_scene ===
Panting heavily, you lock eyes with your opponent across the bloodied ground. Both of you stand trembling, weapons lowered in unspoken agreement - neither can land a decisive blow.  
->->