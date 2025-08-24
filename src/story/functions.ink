// Mock functions
=== function add_mount(mount_name, character_id, character_team) ===
    {mount_name} - { character_id } - { character_team }
=== function add_to_hero_party(hero_id) ===
    { hero_id }
=== function ai_action() ===
    ai acting
=== function attack(character_id) ===
    attacking { character_id }
=== function end_turn() ===
    ~ return 0
=== function get_action_result(reverse_log_position) ===
    ~ return "Action result"
=== function get_character_info(team, index, prop) ===
    ~ return 1
=== function get_combat_result(combat_id) ===
    ~ return 1
=== function get_combat_round() ===
    ~ return 1
=== function get_combat_status() ===
    // IN_PROGRESS || VICTORY || DEFEAT
    ~ return "VICTORY"
=== function get_mount_info(character_id, prop) ===
    ~ return 1
=== function get_party_size(team) ===
    ~ return 1
=== function is_player_action() ===
    ~ return true
=== function set_combat(combat_id) ===
    { combat_id }

// scenes
=== combat_scene(combat_id) ===
    ~ set_combat(combat_id)
    ⚔️ COMBAT STARTED ⚔️ # style centralized-text
    -> combat_loop() ->
    🏆 COMBAT ENDED 🏆 # style centralized-text
    ->->

=== combat_loop ===
    # event turn start
    🌀 ROUND { get_combat_round() }

    ENEMIES
    -> enemy_loop(0) ->

    PARTY
    -> hero_loop(0) ->
    
    📜 Combat Log
    ~ temp log_size = get_party_size("enemies") + get_party_size("heroes") + 1
    -> combat_log_loop(log_size) ->

    { - is_player_action():
        -> player_action_options ->
      - else:
        { ai_action() }
    }
    
    { end_turn() }
    # event turn end
    
    { get_combat_status() == "IN_PROGRESS":
        -> combat_loop
    }
    ->->

=== enemy_loop(index) ===
    { index >= get_party_size("enemies"): ->-> }
    
    ~ temp enemy_id = get_character_info("enemies", index, "id")
    ~ temp enemy_name = get_character_info("enemies", index, "name")
    ~ temp enemy_hp = get_character_info("enemies", index, "hp")
    
    { enemy_hp > 0:
        ☠️ {enemy_name} HP: {enemy_hp} # style monospace-text
        -> mount_display(enemy_id) ->
    }
    -> enemy_loop(index + 1)

=== hero_loop(index) ===
    { index >= get_party_size("heroes"): ->-> }
    
    ~ temp hero_id = get_character_info("heroes", index, "id")
    ~ temp hero_name = get_character_info("heroes", index, "name")
    ~ temp hero_hp =  get_character_info("heroes", index, "hp")
    
    🛡️ {hero_name} HP: {hero_hp} # style monospace-text
    -> mount_display(hero_id) ->
    
    -> hero_loop(index + 1)

=== mount_display(character_id) ===
    ~ temp mount_hp =  get_mount_info(character_id, "hp")

    { mount_hp > 0:
        └─ 🐴 HP: {mount_hp}  # style monospace-text
    }
    ->->

=== combat_log_loop(index) ===
    { index < 0: ->-> }
    { get_action_result(index) }
    -> combat_log_loop(index - 1)

// Right now, only the attack option is available    
=== player_action_options ===
    Select an enemy to attack
    -> enemy_choice_loop(0)

=== enemy_choice_loop(index) ===
  ~ temp enemy_name = get_character_info("enemies", index, "name")
  ~ temp enemy_hp = get_character_info("enemies", index, "hp")
  ~ temp enemy_id = get_character_info("enemies", index, "id")

  { enemy_hp > 0:
    + [{enemy_name}]
        ~ attack(enemy_id)
        ->->
  }
  { index < get_party_size("enemies") - 1: -> enemy_choice_loop(index + 1)  }

// TBD - Mock version
=== consequence_scene ===
The acrid smell of ozone and blood hangs heavy in the air. Among the fallen, something glints.

You find:
\*   23 Gold Crowns
\*   A minor Healing Potion

+ Continue ->->

