import { useStyle, sizes } from "@/style";
import { Feather } from "@expo/vector-icons";
import { ImageBackground, Modal, Pressable, View, Text } from "react-native";

export default function WallpaperModal({ wallpaper, visible, onClose }: { wallpaper: Object, visible: boolean, onClose: () => void }) {

    const { text } = useStyle()

    return (
        <Modal visible={visible}>
            <ImageBackground
                resizeMode='cover'
                style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    padding: sizes.l, paddingBottom: sizes.xl * 4
                }}
                source={{ uri: `https://bing.com${wallpaper.url}` }}>

                <View style={{ backgroundColor: '#33333333', margin: sizes.m, padding: sizes.m, alignItems: 'center' }}>
                    <Text style={{ ...text.titleText, color: 'white' }}>{wallpaper.title}</Text>
                    <Text style={{ ...text.plainText, color: 'white' }}>{wallpaper.copyright}</Text>
                    <Pressable onPress={onClose}>
                        <Feather name={'x-circle'} size={sizes.xl} color={'white'} />
                    </Pressable>
                </View>
            </ImageBackground>
        </Modal>
    )
}