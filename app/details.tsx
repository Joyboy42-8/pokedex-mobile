import Loader from "@/components/Loader";
import { colorsByType } from "@/utils/data";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Details() {
    const [pokemon, setPokemon] = useState<any>(null)
    const [description, setDescription] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const { name } = useLocalSearchParams()

    const fetchPokemon = async (name: any) => {
        try {
            setLoading(true)
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            const data = await response.json()

            const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
            const speciesData = await speciesRes.json()
        
            const entry = speciesData.flavor_text_entries.find(
              (e: any) => e.language.name === "en"
            )
        
            const cleanText = entry?.flavor_text
              ?.replace(/\f/g, " ")
              .replace(/\n/g, " ")

            setPokemon(data)
            setDescription(cleanText)
            setLoading(false)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchPokemon(name)
    }, [name])

    console.log(pokemon)

    if (loading) return <Loader />

    return (
        <ScrollView contentContainerStyle={{ gap: 16, padding: 16, }}>
            <View style={styles.header}>
                <Text style={styles.text}>{name}</Text>
                <Text style={styles.id}>{pokemon?.id}</Text>
            </View>
            <View style={[styles.card, {
                // @ts-ignore
                backgroundColor: pokemon?.types
                    ? colorsByType[pokemon.types[0].type.name] + "50"
                    : "#ccc"
            }
            ]}
            >
                <Image
                    source={{ uri: pokemon?.sprites?.other?.["official-artwork"]?.front_default }}
                    style={styles.image}
                    resizeMode='contain'
                />
            </View>
            <View style={styles.descContainer}>
                <Text style={styles.descTitle}>Description</Text>
                <Text style={styles.desc}>{description}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    header: {
        gap: 2,
        alignItems: "center"
    },
    text: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 28,
        textTransform: "capitalize",
        color: "#373662"
    },
    id: {
        fontSize: 18
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: "cover"
    },
    card: {
        paddingVertical: 80,
        borderRadius: 20,
        alignItems: "center"
    },
    descContainer: {
        gap: 3
    },
    descTitle: {
        fontWeight: "bold",
        fontSize: 18
    },
    desc: {
        color: "#373662"
    },
})