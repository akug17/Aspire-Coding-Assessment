import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../theme/colors';

interface ScreenBackgroundProps {
  children: React.ReactNode;
  addSafeAreaPadding?: boolean;
}

export const ScreenBackground: React.FC<ScreenBackgroundProps> = ({
  children,
  addSafeAreaPadding = true,
}) => {
  const { top } = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.backgroundContainer,
        addSafeAreaPadding && { paddingTop: top },
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    backgroundColor: Colors.primaryBlueLight,
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  },
});
