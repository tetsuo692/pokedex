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
