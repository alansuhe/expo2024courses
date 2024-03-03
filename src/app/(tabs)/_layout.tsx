import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

import Colors from '@/constants/Colors';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { BlurView } from 'expo-blur';
import { sizes, useStyle } from '@/style';

const {s, m, l} = sizes

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={l} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {

  const { colors: { tint, subTint, emphsis } } = useStyle()

  // const { s, m, l } = sizes
  // const { tint, subTint } = colors

  return (
    <Tabs
      // initialRouteName='me'
      screenOptions={{
        tabBarActiveTintColor: emphsis,
        tabBarInactiveTintColor: subTint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        tabBarStyle: {
          position: 'absolute',
          borderTopLeftRadius: m,
          borderTopRightRadius: m,
        },
        tabBarBackground: () => (
          <BlurView intensity={60}
            // tint={'light'}
            experimentalBlurMethod='dimezisBlurView' //Android only
            style={[StyleSheet.absoluteFill, {
              borderTopLeftRadius: m,
              borderTopRightRadius: m,
              overflow: 'hidden',
              backgroundColor: 'transparent'
            }]} />
        )
      }}>
      <Tabs.Screen
        name="gallery"
        options={{
          title: 'Gallery',
          tabBarIcon: ({ color }) => <TabBarIcon name="th" color={color} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Today',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="me"
        options={{
          title: 'Me',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
