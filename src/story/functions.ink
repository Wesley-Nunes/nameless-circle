// Mock functions
=== function combat_status() ===
    // IN_PROGRESS || VICTORY || DEFEAT
    ~ return "IN_PROGRESS"
    
=== function set_combat(combat_id) ===
    { combat_id }

=== function get_character_info(team, index, prop) ===
    ~ return 0
=== function get_party_size(team) ===
    ~ return 1

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
  
    -> enemy_display_loop(0) ->
    -_-_-_-
    -> hero_display_loop(0) ->
  
    ->->

=== enemy_display_loop(index) ===
    { index >= get_party_size("enemies"): ->-> }
    
    ~ temp enemy_name = get_character_info("enemies", index, "name")
    ~ temp enemy_hp = get_character_info("enemies", index, "hp")
    
    { enemy_hp > 0:
        Enemy: {enemy_name} (Hp: {enemy_hp})
    }
    
    -> enemy_display_loop(index + 1)
    
=== hero_display_loop(index) ===
    { index >= get_party_size("heroes"): ->-> }
    
    ~ temp hero_name = get_character_info("heroes", index, "name")
    ~ temp hero_hp =  get_character_info("heroes", index, "hp")
    
    Hero: {hero_name} (Hp: {hero_hp})
    
    -> hero_display_loop(index + 1)
    