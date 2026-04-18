export interface Pokemon {
    name: string,
    image: string,
    imageBack: string,
    types: PokemonType[],
    id: number
}

export interface PokemonType {
    name: string,
    url: string
}