import { colorsByType } from '@/utils/data'
import { Link } from 'expo-router'
import { View, Text, Image, StyleSheet } from 'react-native'

export default function PokemonCard({ item }: { item: any }) {
    return (
        <Link key={item.name} href={{ pathname: "/details", params: { name: item.name } }}
            style={{
                flex: 1,
                marginVertical: 10,
            }}
        >
            <View style={[styles.card, {
                        // @ts-ignore
                        backgroundColor: colorsByType[item.types[0].type.name] + 50,
                    }
                ]}
            >
                <Image source={{ uri: item.image }} style={styles.image} resizeMode='contain' />
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.type}>{item.id}</Text>
            </View>
        </Link>
    )
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    width: "100%",
    borderRadius: 20,
    alignItems: "center"
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