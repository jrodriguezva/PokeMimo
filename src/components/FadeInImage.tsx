import React, {useState} from 'react';
import {Animated, ImageStyle, StyleProp, View} from 'react-native';
import {useAnimation} from '../hooks/useAnimation';

interface Props {
  uri: string;
  showLoading: boolean;
  style?: StyleProp<ImageStyle>;
}

export const FadeInImage = ({uri, style = {}, showLoading = true}: Props) => {
  const {opacity, fadeIn, animatedStyle, rotateAnimation} = useAnimation();

  React.useEffect(() => {
    rotateAnimation();
  }, []);

  const [isLoading, setIsLoading] = useState(true);

  const finishLoading = () => {
    setIsLoading(false);
    fadeIn();
  };

  const onError = () => {
    setIsLoading(false);
  };

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        ...(style as any),
      }}>
      {isLoading && showLoading && (
        <Animated.Image
          style={{
            ...animatedStyle,
            height: 60,
            width: 60,
          }}
          source={require('../assets/pokeball.png')}
        />
      )}

      <Animated.Image
        source={{uri}}
        onError={onError}
        onLoad={finishLoading}
        style={{
          ...(style as any),
          opacity,
        }}
      />
    </View>
  );
};
