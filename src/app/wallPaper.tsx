import { useLocalSearchParams, useRouter } from "expo-router";
import { useRef, useState } from "react";

import AwesomeGallery, {
  GalleryRef,
  RenderItemInfo,
} from 'react-native-awesome-gallery';

import { Image } from 'expo-image';
import { StyleSheet, View, Text, Pressable } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { sizes, useStyle } from "@/style";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useWallpapers } from "@/store";

import * as Sharing from 'expo-sharing';

const renderItem = ({
  item,
  setImageDimensions
}: RenderItemInfo<{ url: string }>) => {
  // console.log('item', item)
  return (
    <Image
      source={{ uri: `https://bing.com${item.url}` }}
      style={StyleSheet.absoluteFillObject}
      contentFit="cover"
      placeholder={require('@assets/images/icon.png')}
      placeholderContentFit='cover'
      onLoad={(e) => {
        const { width, height } = e.source;
        setImageDimensions({ width, height })
      }}
    />
  )
}

export default function WallPaper() {

  const router = useRouter()

  const { text, colors } = useStyle()

  const { top, bottom } = useSafeAreaInsets();

  const { initialIndex: _initialIndex, number: _number } = useLocalSearchParams()
  const initialIndex = typeof _initialIndex === 'string' ? parseInt(_initialIndex, 10) : 0
  const number = typeof _number === 'string' ? parseInt(_number, 10) : -1

  const { wallpapers } = useWallpapers()

  // console.log(initialIndex)

  const galleryRef = useRef<GalleryRef>(null)

  const [infoVisible, setInfoVisible] = useState(true)

  const [showIndex, setShowIndex] = useState(initialIndex)

  const onTap = () => {
    setInfoVisible(prev => !prev)
  }

  const onIndexChange = (index: number) => {
    setShowIndex(index)
  }

  const onSharing = () => {
    Sharing.shareAsync(`https://bing.com${wallpapers[initialIndex].url}`, {
      dialogTitle: 'Share this wallpaper?'
    })
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

      {
        infoVisible &&
        <View style={{
          position: 'absolute',
          top: 0,
          paddingTop: top,
          zIndex: 99,
          width: '100%',
          backgroundColor: 'rgba(0,0,0,0.6)',
          paddingBottom: sizes.s,
          justifyContent: 'center', alignItems: 'center'
        }}>
          <Text style={text.titleText}>{wallpapers[showIndex].title}</Text>
          <Text style={text.plainText}>{wallpapers[showIndex].copyright}</Text>
        </View>
      }
      <AwesomeGallery
        ref={galleryRef}
        data={number < 0 ? wallpapers : wallpapers.slice(0, number)}
        renderItem={renderItem}
        initialIndex={initialIndex}
        numToRender={3}
        keyExtractor={(_, index) => index}
        doubleTapInterval={200}
        onSwipeToClose={() => router.back()}
        onIndexChange={onIndexChange}
        onTap={onTap}
        loop
        onScaleEnd={(scale) => {
          if (scale < 0.7)
            router.back()
        }}
      />

      {
        infoVisible &&
        <View style={{
          backgroundColor: 'rgba(0,0,0,0.6)',
          width: '100%',
          bottom: 0,
          position: 'absolute',
          paddingBottom: bottom,
          paddingTop: sizes.s, justifyContent: 'center', alignItems: 'center'
        }}>
          <Pressable style={{ padding: sizes.s, borderRadius: sizes.s, backgroundColor: colors.mid }}
            onPress={onSharing}>
            <Text style={text.plainText}>分享</Text>
          </Pressable>

        </View>
      }
    </GestureHandlerRootView>
  );
}