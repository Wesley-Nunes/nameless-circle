// Mock functions
=== function add_mount(mount_name, character_id, character_team) ===
    {mount_name} - { character_id } - { character_team }
=== function add_to_hero_party(hero_id) ===
    { hero_id }
=== function ai_action() ===
    ai acting
=== function attack(character_id) ===
    attacking { character_id }
=== function attempt_skill(skill_id) ===
    attempt skill { skill_id }
=== function end_skill_scene() ===
    end skill scene
=== function end_skill_turn() ===
    end skill turn
=== function end_turn() ===
    ~ return 0
=== function get_action_order() ===
    ~ return "[x] Hero 1 / Enemy 1"
=== function get_action_skills_count() ===
    ~ return 3
=== function get_action_result() ===
    ~ return "Action result"
=== function get_attempt_skill_count(skill_result) ===
    ~ return 1
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
=== function get_scene_skill_info(index, prop) ===
    ~ return 1
=== function is_player_action() ===
    ~ return true
=== function last_attempt_skill_result() ===
    ~ return "SUCCESS"
=== function set_combat(combat_id) ===
    { combat_id }
=== function set_skill_scene(skill_scene_id) ===
    { skill_scene_id }

// scenes
=== combat_scene(combat_id) ===
    ~ set_combat(combat_id)
    ⚔️ COMBAT STARTED ⚔️ # style centralized-text
    -> combat_loop() ->
    🏆 COMBAT ENDED 🏆 # style centralized-text
    ->->

// add 'combat' to the variables/fn
=== combat_loop ===
    # event turn start
    🌀 ROUND { get_combat_round() }

    ENEMIES
    -> enemy_loop(0) ->

    PARTY
    -> hero_loop(0) ->
    
    { get_action_order() } # style action-order
    
    { - is_player_action():
        -> player_action_options ->
      - else:
        // ONLY LOOP THE UI OF combat_loop WHEN is_player_action
        { ai_action() }
    }
    
    // get_action_result should be a loop,
    // and render the last 5(or another good quant)
    // action results
    { get_action_result() }
    
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
        ☠️ {enemy_name} Hp: {enemy_hp} # style monospace-text
        -> mount_display(enemy_id) ->
    }
    -> enemy_loop(index + 1)

=== hero_loop(index) ===
    { index >= get_party_size("heroes"): ->-> }
    
    ~ temp hero_id = get_character_info("heroes", index, "id")
    ~ temp hero_name = get_character_info("heroes", index, "name")
    ~ temp hero_hp =  get_character_info("heroes", index, "hp")
    
    🛡️ {hero_name} Hp: {hero_hp} # style monospace-text
    -> mount_display(hero_id) ->
    
    -> hero_loop(index + 1)

=== mount_display(character_id) ===
    ~ temp mount_name = get_mount_info(character_id, "name")
    ~ temp mount_hp =  get_mount_info(character_id, "hp")

    { mount_hp > 0:
          └─ 🐴 {mount_name} Hp: {mount_hp}  # style monospace-text
    }
    ->->

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

=== available_skills_loop(index) ===
    ~ temp skill_name = get_scene_skill_info(index, "name")
    ~ temp skill_id = get_scene_skill_info(index, "id")

    { skill_name: 
        + [{skill_name}]
            ~ attempt_skill(skill_id)
            { get_action_result() }
            ->-> 
    }

    { index < get_action_skills_count() - 1: -> available_skills_loop(index + 1) }
