import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { Feather } from "@expo/vector-icons"
import { Pokemon } from "@/utils/types";
import Loader from "@/components/Loader";
import PokemonCard from "@/components/PokemonCard";
import Empty from "@/components/Empty";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Index() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]) 
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")
  const filteredPokemons = pokemons.filter((pokemon) => {
    return (
      pokemon.name.toLowerCase().includes(search.toLowerCase()) ||
      pokemon.id.toString().includes(search)
    )
  })

  useEffect(() => {
    fetchPokemons()
  }, [])

  const fetchPokemons = async () => {
    try {
      setLoading(true)
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=30")
      const data = await response.json()

      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const res = await fetch(pokemon.url)
          const details = await res.json()

          return {
            name: pokemon.name,
            image: details.sprites.other["official-artwork"].front_default ||
            details.sprites.front_default,
            imageBack: details.sprites.back_default,
            types: details.types,
            id: details.id
          }
        })
      )

      setPokemons(pokemonDetails)
      setLoading(false)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  if(loading) return <Loader />

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pokédex</Text>
        <Text style={styles.text}>
          Search a pokemon by name or using its National Pokédex number.
        </Text>
        <View style={styles.inputContainer}>
          <Feather name="search" size={20} color={"#373662"} style={styles.searchIcon} />
          <TextInput
            placeholder="Name or Number"
            placeholderTextColor="#C1C7CE"
            style={styles.input}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>
      <FlatList
        data={filteredPokemons}
        ListEmptyComponent={<Empty />}
        keyExtractor={(pokemon) => pokemon.name}
        renderItem={({ item }) => <PokemonCard item={item} />}
      />
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  container: {
    padding: 12,
    alignItems: "center",
    backgroundColor: "#F3FCFB",
    marginBottom: 20,
  },
  header: {
    padding: 5,
    gap: 3,
    marginBottom: 10,
  },
  title: {
    color: "#373662",
    fontSize: 32,
    fontWeight: "bold",
    fontFamily: "JetBrains"
  },
  title2: {
    color: "#373662",
    fontSize: 32,
    fontWeight: "bold",
  },
  text: {
    color: "#373662",
  },
  inputContainer: {
    position: "relative",
  },
  input: {
    backgroundColor: "#EBF3F5",
    color: "#373662",
    paddingVertical: 8,
    paddingLeft: 35,
    borderRadius: 10,
    marginTop: 20,
    borderWidth: 0
  },
  searchIcon: {
    position: "absolute",
    top: 25,
    left: 10,
    zIndex: 10
  },
  card: {
    padding: 5,
    borderRadius: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center"
  },
  type: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "gray"
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "cover"
  }
})