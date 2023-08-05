import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

type UseOrientation = {
  isPortrait: boolean;
};

export const useOrientation = (): UseOrientation => {
  const [isPortrait, setIsPortrait] = useState(true);

  useEffect(() => {
    Dimensions.addEventListener('change', ({window: {width, height}}) => {
      if (width < height) {
        setIsPortrait(true);
      } else {
        setIsPortrait(false);
      }
    });
  }, []);

  return {
    isPortrait,
  };
};
