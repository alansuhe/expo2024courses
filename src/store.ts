import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

type SettingsType = {
    isDark?: boolean,
    language?: 'zh-Hans' | 'en',
}

interface SettingsState extends SettingsType {
    updateSettings: (pairs: SettingsType) => void
}
export const useSettings = create<SettingsState>()(
    persist(set => ({
        isDark: false,
        language: 'zh-Hans',
        updateSettings: pairs => set((state) => ({ ...state, ...pairs }))
    }),
        {
            name: 'MYPAPER_SETTINGS',
            storage: createJSONStorage(() => AsyncStorage)
        }
    ))


type WallpaperType = {
    url: string,
    title: string,
    copyright: string
}

interface IWallpapersState {
    wallpapers: WallpaperType[],
    updateWallpapers: (newWallpapers: WallpaperType[]) => void
}
export const useWallpapers = create<IWallpapersState>()(
    persist(set => ({
        wallpapers: [],
        updateWallpapers: (newWallpapers) => set((state) => ({...state, wallpapers: newWallpapers}))
    }),
        {
            name: 'MYPAPER_WALLPAPERS',
            storage: createJSONStorage(() => AsyncStorage)
        }
    ))