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
=== function get_initiative() ===
    ~ return "[x] Hero 1 / Enemy 1"

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
    { get_initiative() }
  
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
    
    
