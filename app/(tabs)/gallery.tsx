import { Button, Image, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

import { FlashList } from "@shopify/flash-list";
import { useState } from 'react';
import { getBingWallPapers } from '@/utils/api';

export default function TabTwoScreen() {

  const [wallpapers, setWallpapers] = useState([])

  async function handleGetWallpapers(n: number) {
    const ws = await getBingWallPapers({ n: 10 })
    // console.log(ws)
    setWallpapers(ws);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gallery</Text>
      {/* <EditScreenInfo path="app/(tabs)/gallery.tsx" /> */}
      <Text>
        动态获取墙纸数据集，并用FlatList显示
      </Text>
      <Text>
        通过过滤器，选择只显示收藏的墙纸；！！！可能会存在本地化存下载墙纸的问题，需要优化
      </Text>

      <Button onPress={() => handleGetWallpapers(10)} title='test get wallpapers' />

      <View style={{ flex: 1, height: '100%', width: '100%', padding: 16 }}>
        <FlashList
          estimatedItemSize={5}
          data={wallpapers}
          renderItem={({ item }) => {
            console.log(item)
            return (
              <View style={{ flexDirection: 'row', flex: 1, margin: 8 }}>
                <Image source={{ uri: `https://bing.com${item.url}`}} style={{ height: 100, width: 100}} />
                <Text>
                  {item.title}
                </Text>
                <Text>
                  {item.copyright}
                </Text>
              </View>
            )
          }} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
