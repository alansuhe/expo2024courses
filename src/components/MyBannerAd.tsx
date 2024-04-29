import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import C from '@/C';
import { Platform } from 'react-native';

const AD_BANNER_ID = __DEV__ ? TestIds.BANNER : Platform.select({
  'android': C.ADMOB_IDs.android_banner,
  'ios': C.ADMOB_IDs.ios_banner
});

export default function TheBannerAd() {
  return (
    <BannerAd
      unitId={AD_BANNER_ID!}
      size={BannerAdSize.FULL_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true
      }}
    />
  )
}

