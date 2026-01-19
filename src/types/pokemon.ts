export interface NamedAPIResource {
    name: string;
    url: string;
}

export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: NamedAPIResource[];
}

export interface PokemonType {
    slot: number;
    type: NamedAPIResource;
}

export interface PokemonStat {
    base_stat: number;
    effort: number;
    stat: NamedAPIResource;
}

export interface PokemonAbility {
    is_hidden: boolean;
    slot: number;
    ability: NamedAPIResource;
}

export interface PokemonMove {
    move: NamedAPIResource;
}

export interface PokemonSprites {
    front_default: string;
    other: {
        'official-artwork': {
            front_default: string;
        };
        home: {
            front_default: string;
        };
    };
}

export interface Pokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    types: PokemonType[];
    stats: PokemonStat[];
    abilities: PokemonAbility[];
    moves: PokemonMove[];
    sprites: PokemonSprites;
}

export interface EvolutionDetail {
    item: NamedAPIResource | null;
    trigger: NamedAPIResource;
    gender: number | null;
    held_item: NamedAPIResource | null;
    known_move: NamedAPIResource | null;
    known_move_type: NamedAPIResource | null;
    location: NamedAPIResource | null;
    min_level: number | null;
    min_happiness: number | null;
    min_beauty: number | null;
    min_affection: number | null;
    needs_overworld_rain: boolean;
    party_species: NamedAPIResource | null;
    party_type: NamedAPIResource | null;
    relative_physical_stats: number | null;
    time_of_day: string;
    trade_species: NamedAPIResource | null;
    turn_upside_down: boolean;
}

export interface ChainLink {
    is_baby: boolean;
    species: NamedAPIResource;
    evolution_details: EvolutionDetail[];
    evolves_to: ChainLink[];
}

export interface EvolutionChain {
    id: number;
    baby_trigger_item: NamedAPIResource | null;
    chain: ChainLink;
}

export interface PokemonSpecies {
    id: number;
    name: string;
    order: number;
    gender_rate: number;
    capture_rate: number;
    base_happiness: number;
    is_baby: boolean;
    is_legendary: boolean;
    is_mythical: boolean;
    hatch_counter: number;
    has_gender_differences: boolean;
    forms_switchable: boolean;
    growth_rate: NamedAPIResource;
    pokedex_numbers: { entry_number: number; pokedex: NamedAPIResource }[];
    egg_groups: NamedAPIResource[];
    color: NamedAPIResource;
    shape: NamedAPIResource;
    evolves_from_species: NamedAPIResource | null;
    evolution_chain: { url: string };
    habitat: NamedAPIResource | null;
    generation: NamedAPIResource;
    names: { name: string; language: NamedAPIResource }[];
    flavor_text_entries: { flavor_text: string; language: NamedAPIResource; version: NamedAPIResource }[];
    genera: { genus: string; language: NamedAPIResource }[];
    varieties: { is_default: boolean; pokemon: NamedAPIResource }[];
}
