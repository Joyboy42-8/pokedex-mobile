import { Stack, useLocalSearchParams } from "expo-router";

// SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const params = useLocalSearchParams()
  
  return (
    <Stack
      screenOptions={{
        header: () => "Hello"
      }}
    >
      <Stack.Screen name="index" options={{ 
          title: "Home" 
        }} 
      />
      <Stack.Screen name="details" options={{ 
          title: params?.name as string, 
          headerBackButtonDisplayMode: "minimal",
          presentation: "formSheet", //modal
          sheetAllowedDetents: [0.3, 0.9],
          sheetGrabberVisible: true,
          sheetCornerRadius: 30,
          headerShown: false
        }} 
      />
    </Stack>
  )
}