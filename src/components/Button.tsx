import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { Colors } from '../theme/colors';

interface Props {
  disabled: boolean;
  onPress: () => void;
  text: string;
  loading: boolean;
}

export const Button: React.FC<Props> = ({
  disabled,
  onPress,
  text,
  loading,
}) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[disabled ? styles.disabledButton : styles.button]}
    >
      {loading ? (
        <ActivityIndicator size={'small'} color={'white'} />
      ) : (
        <Text style={styles.buttonText}>{text}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.accentGreenLight,
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    borderRadius: 100,
    height: 50,
  },
  disabledButton: {
    width: '100%',
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    borderRadius: 100,
    height: 50,
  },
  buttonText: {
    fontFamily: '700',
    color: 'white',
  },
});
