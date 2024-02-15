import React, {useState} from 'react';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
  useInterstitialAd,
} from 'react-native-google-mobile-ads';
import analytics from '@react-native-firebase/analytics';
import Config from 'react-native-config';

const adUnitId = __DEV__ ? TestIds.BANNER : Config.AD_BANNER_UNIT_ID;

const BannerAds: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
      onAdFailedToLoad={error => {
        analytics().logEvent('banner_ads_failed', {
          error: error.message,
        });
        setIsVisible(false);
      }}
    />
  );
};

export default BannerAds;
