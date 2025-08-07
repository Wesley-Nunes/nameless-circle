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
=== function is_player_action() ===
    ~ return true
=== function get_action_order() ===
    ~ return "[x] Hero 1 / Enemy 1"
=== function get_action_result() ===
    ~ return "Action result"
=== function get_character_info(team, index, prop) ===
    ~ return 1
=== function get_combat_status() ===
    // IN_PROGRESS || VICTORY || DEFEAT
    ~ return "IN_PROGRESS"
=== function get_mount_info(team, index, prop) ===
    ~ return 1
=== function get_party_size(team) ===
    ~ return 1
=== function has_mounts(team) ===
    ~ return false
=== function set_combat(combat_id) ===
    { combat_id }

// Local functions
=== combat_scene(combat_id) ===
    ~ set_combat(combat_id)
    -> combat_loop() ->
    ->->
    
=== combat_loop ===
    >>>
    -> enemy_loop(0) ->
    { has_mounts("enemies"):
        Enemy mounts:
        -> mount_loop(0, "enemies") ->
    }
    -> hero_loop(0) ->
    { has_mounts("heroes"):
        Hero mounts:
        -> mount_loop(0, "heroes") ->
    }
    
    { get_action_order() }
    
    { - is_player_action():
        -> player_action_options ->
      - else:
        { ai_action() }
        
    }
    
    { get_action_result() }
    { end_turn() }
    
    { get_combat_status() == "IN_PROGRESS":
        <<<<
        Next turn! 
        -> combat_loop
    }
    { get_combat_status() == "VICTORY":
        You won the battle! ->->
    }
    { get_combat_status() == "DEFEAT":
        You were defeated... -> END
    }
    
    

=== enemy_loop(index) ===
    { index >= get_party_size("enemies"): ->-> }
    
    ~ temp enemy_name = get_character_info("enemies", index, "name")
    ~ temp enemy_hp = get_character_info("enemies", index, "hp")
    
    { enemy_hp > 0:
        Enemy: {enemy_name} (Hp: {enemy_hp})
    }
    -> enemy_loop(index + 1)
    
=== hero_loop(index) ===
    { index >= get_party_size("heroes"): ->-> }
    
    ~ temp hero_name = get_character_info("heroes", index, "name")
    ~ temp hero_hp =  get_character_info("heroes", index, "hp")
    
    Hero: {hero_name} (Hp: {hero_hp})
    
    -> hero_loop(index + 1)

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
  
=== mount_loop(index, team) ===
    { index >= get_party_size(team): ->-> }
    
    ~ temp mount_name = get_mount_info(team, index, "name")
    ~ temp mount_hp =  get_mount_info(team, index, "hp")

    { mount_hp > 0:
        - {mount_name} (Hp: {mount_hp})
    }    
    -> mount_loop(index + 1, team)

    