import { ActivityIndicator, Button, Image, StyleSheet, TextInput } from 'react-native';

import { Text, View } from '@/components/Themed';
import { Link } from 'expo-router';

import { getBingWallPapers } from '@/utils/api';
import { useEffect, useState } from 'react';
import Slider from '@react-native-community/slider';


export default function TabOneScreen() {

  const [wallPaperImage, setWallPaperImage] = useState<string | undefined>()
  const [idx, setIdx] = useState(0)
  const [loading, setLoading] = useState(false)

  const handleGetBingWallPaper = async () => {
    setLoading(true)
    const arr = await getBingWallPapers({ idx })
    setTimeout(() => {
      setLoading(false) 
    }, 1000);
    const url = `https://bing.com${arr[0].url}`
    console.log(url)
    setWallPaperImage(url)
  }

  function changeIdx(value: number) {
    console.log('value', value)
    setIdx(value)
  }

  useEffect(()=>{
    handleGetBingWallPaper()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today</Text>
      <Text>今日墙纸</Text>
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      {/* <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
      <Link href={'/wallPaper'}>TEST IMAGE</Link>
      <Button onPress={handleGetBingWallPaper} title='test BING api' />
      <View style={{ height: 300 }}>
        {
          loading ?
            <ActivityIndicator />
            :
            <Image source={{ uri: wallPaperImage }} style={{ width: 200, height: 200 }} />
        }
      </View>

      <Text>{`idx: ${idx}`}</Text>

      <Slider
        style={{ width: '80%' }}
        step={1}
        disabled={loading}
        onValueChange={value => changeIdx(value)} minimumValue={0} maximumValue={7} value={idx} />
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
