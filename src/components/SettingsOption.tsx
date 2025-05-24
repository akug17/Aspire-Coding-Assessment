import React from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';

interface Props {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  switchEnabled?: boolean;
  onToggle?: (value: boolean) => void;
  iconSrc: ImageSourcePropType;
  disablePress?: boolean;
  onPress?: () => void;
}

export const SettingsOption = ({
  title,
  subtitle,
  switchEnabled,
  onToggle,
  iconSrc,
  disablePress,
  onPress,
}: Props) => (
  <TouchableOpacity
    disabled={disablePress}
    onPress={onPress}
    style={styles.container}
  >
    <Image source={iconSrc} />
    <View style={styles.innerView}>
      <View>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>

      {onToggle && <Switch value={switchEnabled} onValueChange={onToggle} />}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  innerView: {
    marginStart: 14,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  container: {
    padding: 20,
    borderColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: { fontSize: 16, color: '#333' },
  subtitle: { fontSize: 12, color: '#888', marginTop: 4 },
});
