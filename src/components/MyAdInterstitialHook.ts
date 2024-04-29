import {
    TestIds,
    useInterstitialAd,
} from 'react-native-google-mobile-ads';
import C from '@/C';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

const AD_ID = Platform.select({
    ios: C.ADMOB_IDs.ios_reward,
    android: C.ADMOB_IDs.android_reward,
});

export type InterstitialStatusType = 'NOT_READY' | 'LOADING' | 'CLOSED' | 'CLICKED' | 'ERROR';

export default function useMyAdInterstitial() {

    const {
        load,
        show,
        isLoaded,
        error,
        isOpened,
        isClosed,
        isClicked,
    } = useInterstitialAd(__DEV__ ? TestIds.INTERSTITIAL : AD_ID!);

    // const [adLoading, setAdLoading] = useState(false)
    const [status, _setStatus] = useState<InterstitialStatusType>('NOT_READY');

    useEffect(() => {
        console.log('errr', error)
        if (error)
            _setStatus('ERROR')
    }, [error])

    useEffect(() => {
        if (isLoaded) show()
        // _setStatus('READY')
    }, [isLoaded])

    useEffect(() => {
        if (isClosed)
            _setStatus('CLOSED')
    }, [isClosed])

    useEffect(() => {
        if (isClicked)
            _setStatus('CLICKED')
    }, [isClicked])

    const loadAd = () => {
        load()
        _setStatus('LOADING')
    }

    const restoreStatus = () => [
        _setStatus('NOT_READY')
    ]

    return { loadAd, restoreStatus, adStatus: status }

}


