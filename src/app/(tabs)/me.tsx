import { View, Text, Switch, Platform, Button, ActivityIndicator } from 'react-native';

import { useStyle } from '@/style';
import { useSettings } from '@/store';
import MyBannerAd from '@/components/MyBannerAd';
import useMyAdReward, { RewardedAdStatusType } from '@/components/MyAdRewardHook';
// import { Text, View } from '@/components/Themed';

export default function TabTwoScreen() {

  const { colors, text, layout } = useStyle()

  const { updateSettings, isDark, language } = useSettings()

  const { loadAd, adStatus } = useMyAdReward()

  const adLoading = adStatus === 'LOADING'

  const toggleIsDark = () => {
    // setIsDark(prv => !prv)
    updateSettings({ isDark: !isDark })
  }

  const toggleLanguage = () => {
    updateSettings({ language: language === 'zh-Hans' ? 'en' : 'zh-Hans' })
  }

  return (
    <View style={layout.container}>

      <MyBannerAd />

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={text.titleText}>我的墙纸</Text>
        <Text style={text.plainText}>设置主题风格：黑色/白色；查看收藏的墙纸</Text>
        <Text style={text.subText}>收藏的墙纸：只显示数量和略图，点击跳转gallery</Text>

        <Text style={text.plainText}>{`设置主题风格${isDark ? '暗色' : '浅色'}`}</Text>
        <Switch value={isDark} onValueChange={toggleIsDark} />

        <Text style={text.plainText}>{`设置语言${language}`}</Text>
        <Switch value={language === 'zh-Hans'} onValueChange={toggleLanguage} />

        {
          adLoading ?
            <ActivityIndicator />
            :
            <Button onPress={() => loadAd()} title={'先看广告'} />
        }

        {
          adStatus === 'ERROR' &&
          <Text style={{ color: 'red' }}> 广告失败，请再点击！</Text>
        }

        {
          adStatus === 'REWARDED' &&
          <Text style={{ color: 'green' }}> 恭喜你！成功了 </Text>
        }
      </View>


    </View>
  );
}
