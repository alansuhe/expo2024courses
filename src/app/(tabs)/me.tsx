import { View, Text, Switch } from 'react-native';

import { useState } from 'react';
import { useStyle } from '@/style';
import { useSettings } from '@/store';
// import { Text, View } from '@/components/Themed';

export default function TabTwoScreen() {

  const { text, layout } = useStyle()

  const { updateSettings, isDark, language} = useSettings()

  // const [isDark, setIsDark] = useState(false)

  const toggleIsDark = () => {
    // setIsDark(prv => !prv)
    updateSettings({isDark: !isDark})
  }

  const toggleLanguage = () => {
    updateSettings({language: language === 'zh-Hans' ? 'en' : 'zh-Hans'})
  }

  return (
    <View style={layout.container}>
      <Text style={text.titleText}>我的墙纸</Text>
      <Text style={text.plainText}>设置主题风格：黑色/白色；查看收藏的墙纸</Text>
      <Text style={text.subText}>收藏的墙纸：只显示数量和略图，点击跳转gallery</Text>

      <Text style={text.plainText}>{`设置主题风格${isDark ? '暗色' : '浅色'}`}</Text>
      <Switch value={isDark} onValueChange={toggleIsDark} />

      <Text style={text.plainText}>{`设置语言${language}`}</Text>
      <Switch value={language==='zh-Hans'} onValueChange={toggleLanguage} />
    </View>
  );
}
