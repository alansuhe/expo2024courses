import {
  ActivityIndicator,
  Button, Image, ImageBackground, Modal,
  Pressable, StyleSheet, Text, View
} from 'react-native';

// import { Text, View } from '@/components/Themed';

import { FlashList } from "@shopify/flash-list";
import { useEffect, useState } from 'react';
import { getBingWallPapers } from '@/api';
import { Tabs } from 'expo-router';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { sizes, useStyle } from '@/style';
const { l, s, m } = sizes

import WallpaperModal from '@/components/WallpaperModal';

export default function TabTwoScreen() {

  const { colors, text, layout } = useStyle()

  const [wallpapers, setWallpapers] = useState([])
  const [selectedWallpaperIndex, setSelectedWallpaperIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)

  async function handleGetWallpapers(n: number) {
    setLoading(true)
    const ws = await getBingWallPapers({ n: 10 })
    setLoading(false)
    // console.log(ws)
    setWallpapers(ws);
  }

  function handleTapItem(wallpaperIndex: number) {
    setSelectedWallpaperIndex(wallpaperIndex)
    setModalVisible(true)
  }

  useEffect(() => {
    handleGetWallpapers(10)
  }, [])

  return (
    <>
      <Tabs.Screen
        // name="index"
        options={{
          // title: 'Today',
          // tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            loading ? <ActivityIndicator />
              :
              <Pressable onPress={() => handleGetWallpapers(10)}>
                {({ pressed }) => (
                  <FontAwesome
                    name="refresh"
                    size={l}
                    color={colors.sub}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
          ),
        }}
      />

      <View style={layout.container}>

        <View style={{ flex: 1, height: '100%', width: '100%', padding: s }}>

          <FlashList
            estimatedItemSize={5}
            data={wallpapers}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }: { item: Object, index: number }) => {
              // console.log(item)
              return (
                <Pressable
                  onPress={() => handleTapItem(index)}
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    margin: s,
                    // gap: 8, 
                    backgroundColor: colors.mid,
                    borderRadius: m,
                    overflow: 'hidden'
                  }}>
                  <Image source={{ uri: `https://bing.com${item.url}` }}
                    style={{ height: 100, width: 100 }} />
                  <View style={{ flex: 1, padding: s }}>
                    <Text numberOfLines={3} style={text.titleText} >
                      {item.title}
                    </Text>
                    <Text numberOfLines={3} style={text.plainText}>
                      {item.copyright}
                    </Text>
                  </View>
                </Pressable>
              )
            }} />
        </View>

      </View>

      {
        wallpapers.length > 0 &&
        <WallpaperModal wallpaper={wallpapers[selectedWallpaperIndex]} visible={modalVisible} onClose={() => setModalVisible(false)} />
      }

    </>

  );
}
