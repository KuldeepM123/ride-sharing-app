import React from 'react';
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator,
  ModalProps,
  ViewStyle,
  ColorValue,
} from 'react-native';
import {horizScale} from './Layout';

interface LoaderProps {
  loading: boolean;
  size?: number | 'small' | 'large';
  color?: ColorValue;
  containerStyle?: ViewStyle;
  indicatorStyle?: ViewStyle;
  modalProps?: Partial<ModalProps>;
}

const Loader: React.FC<LoaderProps> = props => {
  const {
    loading,
    size = 60,
    color = '#000000',
    containerStyle,
    indicatorStyle,
    modalProps,
  } = props;

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {
        console.log('close modal');
      }}
      {...modalProps}>
      <View style={[styles.modalBackground, containerStyle]}>
        <View style={styles.viewstyle}>
          <ActivityIndicator
            size={size}
            color={color}
            style={[styles.indicator, indicatorStyle]}
          />
        </View>
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  viewstyle: {
    height: horizScale(400),
    width: horizScale(400),
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 100,
    backgroundColor: 'transparent',
  },
  indicator: {
    height: 80,
    width: 80,
    transform: [{scale: 1.5}],
  },
});
