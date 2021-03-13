export function parsePokemonList(pokemonList) {
    return {
        id: pokemonList.id,
        name: pokemonList.name,
        type: getPokemonType(pokemonList.types),
        abilities: getPokemonAbility(pokemonList.abilities),
        weight: pokemonList.weight,
        height: pokemonList.height,
        image: {
            alt: pokemonList.name + '-image',
            url: pokemonList.sprites["front_default"]
        },
    }
}

function getPokemonType(pokemonType) {
    return pokemonType.map(function (type) {
        return type.type.name
    })
}

function getPokemonAbility(pokemonAbility) {
    let filteredAbilities = []
    pokemonAbility.forEach((value) => {
        if (!value.is_hidden) {
            filteredAbilities.push(value.ability.name)
        }
    })
    return filteredAbilities
}

