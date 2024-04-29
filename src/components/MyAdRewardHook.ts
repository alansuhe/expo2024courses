import {
    TestIds,
    useRewardedAd,
} from 'react-native-google-mobile-ads';
import C from '@/C';
import Colors from '@/constants/Colors';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

const AD_ID = Platform.select({
    ios: C.ADMOB_IDs.ios_reward,
    android: C.ADMOB_IDs.android_reward,
});

export type RewardedAdStatusType = 'NOT_READY' | 'LOADING' | 'REWARDED' | 'ERROR';

export default function useMyAdReward() {

    const {
        load,
        show,
        isLoaded,
        error,
        reward,
        isEarnedReward,
        // isOpened,
        // isClosed,
        // isClicked,
    } = useRewardedAd(__DEV__ ? TestIds.REWARDED : AD_ID!);

    // const [adLoading, setAdLoading] = useState(false)
    const [status, _setStatus] = useState<RewardedAdStatusType>('NOT_READY');

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
        if (isEarnedReward)
            _setStatus('REWARDED')
    }, [isEarnedReward])

    const loadAd = () => {
        load()
        _setStatus('LOADING')
    }

    return { loadAd, adStatus: status }

}


