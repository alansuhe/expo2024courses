import { ActivityIndicator, Button, Image, ImageBackground, StyleSheet, View, Text, Pressable, useWindowDimensions, Dimensions } from 'react-native';

import { Link, Tabs } from 'expo-router';

import { getBingWallPapers } from '@/api';
import { useEffect, useState } from 'react';
// import Slider from '@react-native-community/slider';
import { BlurView } from 'expo-blur';
import { sizes, useStyle } from '@/style';

const { s, m , l} = sizes

const { width: screenWidth, height: screenHeight} = Dimensions.get('window')

export default function TabOneScreen() {

  const {text} = useStyle()

  // const [wallPaperImage, setWallPaperImage] = useState<string | undefined>()
  const [wallPapers, setWallPapers] = useState([])

  console.log('wallpapers', wallPapers)

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [loading, setLoading] = useState(false)

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
            <ActivityIndicator />
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

              <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                <Image resizeMode='contain' source={{ uri: showImageUrl }} 
                style={{ alignSelf: 'center', width: screenWidth * 0.9, height: screenWidth * 0.6, margin: s }} />
                <Text style={[ text.titleText, { color: 'white' }]}>{selectWallPaper.title}</Text>
                <Text style={[ text.plainText, { color: 'white', padding: 16}]}>{selectWallPaper.copyright}</Text>
              </View>
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


        {/* <Button onPress={handleGetBingWallPaper} title='test BING api' />
                <Text>{`idx: ${idx}`}</Text> */}

        {/* <Slider
                  style={{ width: '80%' }}
                  step={1}
                  disabled={loading}
                  onValueChange={value => changeIdx(value)} minimumValue={0} maximumValue={7} value={idx} />
              </View> */}

      </>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
