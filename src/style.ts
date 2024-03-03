import { StyleSheet } from "react-native";
import { useSettings } from "./store";

// 尺寸边距调整，padding, margin, gap
export const sizes = {
    // 参考服装尺寸
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32
}

export function useStyle() {

    const { isDark = false } = useSettings()

    const allColors = (isDark: boolean) => {
        return (
            isDark ? {
                primary: 'ghostwhite',
                sub: 'gainsboro',
                mid: '#444444',
                tint: 'cornsilk',
                subTint: 'gainsboro',
                bg: '#333333',
                emphsis: '#ffa07a'
            } : {
                primary: 'dimgrey',
                sub: 'darkgrey',
                mid: 'white',
                tint: 'grey',
                subTint: 'gainsboro',
                bg: 'whitesmoke',
                emphsis: '#ffa07a'
            }
        )
    };

    const colors = allColors(isDark)

    // export const themedColors = Colors[isDark ? 'dark' : 'light']

    const { primary, sub, bg } = colors

    const layout = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: bg
        },
    })

    const text = StyleSheet.create({
        plainText: {
            fontSize: 14,
            color: primary
        },
        subText: {
            fontSize: 12,
            color: sub
        },
        titleText: {
            fontSize: 18,
            color: sub,
            fontWeight: 'bold'
        }
    })

    return({colors, layout, text})
}