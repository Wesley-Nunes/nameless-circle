INCLUDE functions.ink

EXTERNAL add_mount(mount_name, character_id, character_team)
EXTERNAL add_to_hero_party(hero_id)
EXTERNAL ai_action()
EXTERNAL attack(character_id)
EXTERNAL end_turn()
EXTERNAL get_action_order()
EXTERNAL get_action_result(reverse_log_position)
EXTERNAL get_character_info(team, index, prop)
EXTERNAL get_combat_result(combat_id)
EXTERNAL get_combat_status()
EXTERNAL get_combat_round()
EXTERNAL get_mount_info(character_id, prop)
EXTERNAL get_party_size(team)
EXTERNAL is_player_action()
EXTERNAL set_combat(combat_id)

VAR player_name = "Celcius"

-> start

=== start ===
“When countless mouths are sated with innocent blood,
The Abyss shall breathe its curse — ash, corruption, void —
To blacken guardian rings of life,
Until Seven Thrones crack and crash from heaven's height.
Then, from the weeping ground,
The Shadowed One shall raise its silent crown,
And claim the shattered world as darkness drowns.”

The hue of the setting sun, nearly swallowed by night, blended with the swamp’s dark greens, staining the stagnant waters. Will-o’-wisps, like fragments of the cursed prophecy, broke free from the murk and began their ghostly dance above the sludge. A biting cold — far beyond twilight — enveloped the group, heavy with the stink of rot, sulfur, and decay.

Lysandra’s eyes blazed, nostrils flared.
“To hell with this prophecy! Protaxios, gather the stealthiest soldiers and scout the nearby swamps. Renpet-Ib, raise magical barriers around the village. We need more troops. I’ll go to the Citadel myself to bargain with some noble.”

As she shouted, you saw her tremble — and felt your own palms sweat.

*   “Commander, Let me join you at the Citadel.”
    -> courtly_intrigue

*   “I can move quietly, Protaxios. Let me scout with you.” # prop isDisabled
    -> END

*   “The village needs every blade. I stand with Renpet-Ib.” # prop isDisabled
    -> END

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
From the shadows, four blazefen — salamander-men with amber eyes and flaming tongues — attacked. To everyone’s shock, one hurled a spear toward the horses, missing by inches. Lysandra saw their intent.
“Protect the mounts!”

Could word of Lysandra’s movements have leaked? Were there spies in the village? What seemed a random attack now had a clear goal: delay her rush to the Citadel.

~ temp combat_id = "blazefen_ambush_01"
-> combat_scene(combat_id) ->
~ temp combat_result = get_combat_result(combat_id)
{ combat_result:
    - -1: -> defeat_scene -> END
    - 0: -> draw_scene -> END
    - 1: -> consequence_scene -> END
    - 2: -> consequence_scene -> END
}

=== defeat_scene ===
Your vision blurs as you collapse to the ground. The clatter of your falling weapon echoes in your ears before darkness consumes you.  
-> END

=== draw_scene ===
Panting heavily, you lock eyes with your opponent across the bloodied ground. Both of you stand trembling, weapons lowered in unspoken agreement - neither can land a decisive blow.  
->->