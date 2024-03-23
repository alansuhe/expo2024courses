import { ActivityIndicator, Button, Image, ImageBackground, StyleSheet, View, Text, Pressable, useWindowDimensions, Dimensions } from 'react-native';

import { Link, Tabs, useRouter } from 'expo-router';

import { getBingWallPapers } from '@/api';
import { useEffect, useState } from 'react';
// import Slider from '@react-native-community/slider';
import { BlurView } from 'expo-blur';
import { sizes, useStyle } from '@/style';
import WallpaperModal from '@/components/WallpaperModal';

const { s, m, l } = sizes

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

export default function TabOneScreen() {

  const router = useRouter()

  const { text } = useStyle()

  // const [wallPaperImage, setWallPaperImage] = useState<string | undefined>()
  const [wallPapers, setWallPapers] = useState([])

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)

  const selectWallPaper: any = wallPapers[selectedIndex]
  const showImageUrl = wallPapers.length > 0 ? `https://bing.com${selectWallPaper.url}` : undefined

  const handleGetBingWallPaper = async () => {
    setLoading(true)
    const arr = await getBingWallPapers({ n: 3 })
    setLoading(false)
    setWallPapers(arr)
  }

  useEffect(() => {
    handleGetBingWallPaper()
  }, [])

  const handleTapItem = () => {
    setSelectedIndex(selectedIndex)
    // setModalVisible(true)
    router.push({ pathname: '/wallPaper', params: { initialIndex: selectedIndex, number: 3 }})
  }

  return (
    <>
      <Tabs.Screen
        options={{
          headerTransparent: true,
          headerTitleStyle: { color: 'white' }
        }}
      />

      <>

        {
          loading ?
            <ActivityIndicator color={'white'} style={{ flex: 1, justifyContent: 'center' }} />
            :
            // 判断是否加载成功
            wallPapers.length > 0 &&
            <ImageBackground source={{ uri: showImageUrl }} style={{ flex: 1 }}>
              <BlurView
                experimentalBlurMethod='dimezisBlurView'
                style={[StyleSheet.absoluteFillObject, {
                  height: '100%',
                  width: '100%',
                }]}
              />

              <Pressable
                onPress={handleTapItem}
                style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                <Image resizeMode='contain' source={{ uri: showImageUrl }}
                  style={{ alignSelf: 'center', width: screenWidth * 0.9, height: screenWidth * 0.6, margin: s }} />
                <Text style={[text.titleText, { color: 'white' }]}>{selectWallPaper.title}</Text>
                <Text style={[text.plainText, { color: 'white', padding: 16 }]}>{selectWallPaper.copyright}</Text>
              </Pressable>
              <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', gap: m }}>
                {
                  wallPapers.map((wp: any, i) =>
                    <Pressable key={i} onPress={() => setSelectedIndex(i)}>
                      <Image source={{ uri: `https://bing.com${wp.url}` }}
                        style={{ height: 64, width: 64, borderRadius: 8, borderColor: 'white', borderWidth: selectedIndex === i ? 4 : 1 }} />
                    </Pressable>
                  )
                }
              </View>
            </ImageBackground>
        }

      </>

      {/* {
        wallPapers.length > 0 &&
        <WallpaperModal wallpaper={wallPapers[selectedIndex]} visible={modalVisible} onClose={() => setModalVisible(false)} />
      } */}
    </>
  );
}
