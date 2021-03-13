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

export function parseSelectedPokemon(dataOne, dataTwo) {
    return {
        id: dataOne.id,
        name: dataOne.name,
        type: getPokemonType(dataOne.types),
        abilities: getPokemonAbility(dataOne.abilities),
        weight: dataOne.weight,
        height: dataOne.height,
        image: {
            alt: dataOne.name + '-image',
            url: dataOne.sprites["front_default"]
        },
        stats: getStats(dataOne.stats),
        description: getDescription(dataTwo.flavor_text_entries, 'flavor_text'),
        habitat: dataTwo.habitat.name,
        growth_rate: dataTwo.growth_rate.name,
        category: getDescription(dataTwo.genera, 'genus').replace(" Pokémon", ""),
        color: dataTwo.color.name,
        egg_groups: getEggGroup(dataTwo.egg_groups)
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

function getDescription(descriptList, key) {
    let description = ''
    descriptList.forEach(data => {
        if (data.language.name === 'en') {
            description = data[key]
        }
    })
    return description
}

function getEggGroup(eggGroup) {
    return eggGroup.map(function (egg) {
        return egg.name
    })
}

function getStats(stats) {
    let { hp, attack, defense, speed, spAttack, spDefense } = '';
    stats.forEach(stat => {
        switch (stat.stat.name) {
            case 'hp':
                hp = stat['base_stat'];
                break;
            case 'attack':
                attack = stat['base_stat'];
                break;
            case 'defense':
                defense = stat['base_stat'];
                break;
            case 'speed':
                speed = stat['base_stat'];
                break;
            case 'special-attack':
                spAttack = stat['base_stat'];
                break;
            case 'special-defense':
                spDefense = stat['base_stat'];
                break;
            default:
                break;
        }
    })
    return { hp, attack, defense, speed, spAttack, spDefense }
}

export function parseOffset(data) {
    let offset = data.replace("https://pokeapi.co/api/v2/pokemon?offset=", "")
    return offset[0] + offset[1]
}