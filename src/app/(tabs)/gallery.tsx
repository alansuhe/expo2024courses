import {
  ActivityIndicator,
  // FlatList,
  // Image,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
  useWindowDimensions
} from 'react-native';

// import { Text, View } from '@/components/Themed';

import { FlashList } from "@shopify/flash-list";
import { useEffect, useState } from 'react';
import { getBingWallPapers } from '@/api';
import { Tabs, useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { sizes, useStyle } from '@/style';
const { l, s, m } = sizes

// import WallpaperModal from '@/components/WallpaperModal';
import { useWallpapers } from '@/store';
import { Image } from 'expo-image';
// import { useSettings } from '@/store';

export default function TabTwoScreen() {

  // const { isDark } = useSettings()
  const router = useRouter()

  const { colors, text, layout } = useStyle()
  const { width: screenWidth } = useWindowDimensions()

  const { wallpapers, updateWallpapers } = useWallpapers()

  // const [wallpapers, setWallpapers] = useState([])
  // const [selectedWallpaperIndex, setSelectedWallpaperIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  // const [modalVisible, setModalVisible] = useState(false)
  const [galleryLayout, setGalleryLayout] = useState('list')

  async function handleGetWallpapers(idx: number, n: number) {
    setLoading(true)
    if (idx === 0) {
      const ws = await getBingWallPapers({ idx, n })
      updateWallpapers(ws);
      setLoading(false)
      return
    }
    if (idx > 0) {
      if (wallpapers.length > 8) {
        setLoading(false)
        return
      }
      const ws = await getBingWallPapers({ idx, n })
      const newArray = wallpapers.concat(ws)
      updateWallpapers(newArray)
    }
    setLoading(false)
    // console.log(ws)
  }

  function handleTapItem(wallpaperIndex: number) {
    // setSelectedWallpaperIndex(wallpaperIndex)
    // setModalVisible(true)
    router.push({ pathname: '/wallPaper', params: { initialIndex: wallpaperIndex } })
  }

  const toggleGalleryLayout = () => {
    setGalleryLayout(prev => prev === 'list' ? 'grid' : 'list')
  }

  // useEffect(() => {
  //   console.log('[gallery] - useEffect')
  //   handleGetWallpapers(0, 8)
  // }, [])

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
              <Pressable onPress={toggleGalleryLayout}>
                {({ pressed }) => (
                  <FontAwesome
                    name={galleryLayout === 'list' ? 'th' : "list-ul"}
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

          {/* <Text style={text.plainText}>{wallpapers.length}</Text> */}
          {
            galleryLayout === 'list' ?
              <FlashList
                extraData={colors}
                // refreshing={loading}
                // onRefresh={() => handleGetWallpapers(10)}
                onEndReached={() => {
                  // console.log('load more.')
                  handleGetWallpapers(9, 8)
                }
                }
                onEndReachedThreshold={0.1}
                ListFooterComponentStyle={{ height: 96 }}
                ListFooterComponent={
                  <Text style={text.subText}>{wallpapers.length > 8 ? '你已经走到底了' : '...'}</Text>
                }
                refreshControl={
                  <RefreshControl tintColor={colors.sub}
                    refreshing={loading}
                    onRefresh={() => handleGetWallpapers(0, 8)} />}
                estimatedItemSize={5}
                data={wallpapers}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }: { item: any, index: number }) => {
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
                      <Image
                        placeholder={require('@assets/images/icon.png')}
                        placeholderContentFit='contain'
                        source={{ uri: `https://bing.com${item.url}` }}
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
              :
              <ScrollView contentContainerStyle={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                {
                  wallpapers.map((img, index) =>
                    <Pressable
                      key={index}
                      onPress={() => handleTapItem(index)}>
                      <Image
                        placeholder={require('@assets/images/icon.png')}
                        placeholderContentFit='contain'
                        source={{ uri: `https://bing.com${img.url}` }}
                        style={{ height: 100, width: (screenWidth - s * 2) / 3 }} />
                    </Pressable>
                  )
                }
              </ScrollView>
          }

        </View>

      </View>

      {/* {
        wallpapers.length > 0 &&
        <WallpaperModal wallpaper={wallpapers[selectedWallpaperIndex]} visible={modalVisible} onClose={() => setModalVisible(false)} />
      } */}

    </>

  );
}
