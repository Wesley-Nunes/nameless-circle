// Mock functions
=== function attack(character_id) ===
    attacking { character_id }
=== function combat_status() ===
    // IN_PROGRESS || VICTORY || DEFEAT
    ~ return "IN_PROGRESS"
=== function is_player_action() ===
    ~ return true
=== function get_character_info(team, index, prop) ===
    ~ return 1
=== function get_party_size(team) ===
    ~ return 1
=== function get_action_order() ===
    ~ return "[x] Hero 1 / Enemy 1"
=== function set_combat(combat_id) ===
    { combat_id }

// Local functions
=== combat_scene(combat_id) ===
    ~ set_combat(combat_id)
    -> combat_loop() ->
    ->->
    
=== combat_loop ===
    { combat_status() == "VICTORY":
        You won the battle! ->->
    }
    { combat_status() == "DEFEAT":
        You were defeated... -> END
    }
  
    -> enemy_loop(0) ->
    
    -> hero_loop(0) ->
    '
    { get_action_order() }
    
    { - is_player_action():
        -> player_action_options ->
      - else:
        // -> ai_action ->
        ai is acting
    }
    // Action restult
    // End turn
    // initiaitve the next turn
    TBD next turn
    ->->

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
    Select an enemy to attacked
    -> enemy_choice_loop(0)
    
=== enemy_choice_loop(index) ===
  ~ temp enemy_name = get_character_info("enemies", index, "name")
  ~ temp enemy_hp = get_character_info("enemies", index, "hp")
  ~ temp enemy_id = get_character_info("enemies", index, "id")

  { enemy_hp > 0:
    * [{enemy_name}]
        ~ attack(enemy_id)
        ->->
  }
  { index < get_party_size("enemies") - 1: -> enemy_choice_loop(index + 1)  }
  
  
    