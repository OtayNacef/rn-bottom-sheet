import React, {useRef, useMemo, forwardRef, useImperativeHandle} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SafeAreaView} from '@components';
import {useTheme} from '@configs';
import styles from './styles';

const Index = forwardRef((props, ref) => {
  const {colors} = useTheme();
  const bottomSheetRef = useRef(null);
  useImperativeHandle(ref, () => bottomSheetRef.current);
  const {bottom} = useSafeAreaInsets();

  const {header, initHeight, children, onDismiss, enablePanDownToClose} = props;

  const snapPoints = useMemo(() => [initHeight, '100%'], [initHeight]);

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      backgroundStyle={{backgroundColor: colors.card}}
      snapPoints={snapPoints}
      keyboardBehavior={'interactive'}
      keyboardBlurBehavior={'none'}
      stackBehavior="push"
      onDismiss={onDismiss}
      handleComponent={() => (
        <SafeAreaView edges={['right', 'top', 'left']}>
          <View style={styles.indicatorContainer}>
            <View style={[styles.indicator, {backgroundColor: colors.card}]} />
          </View>
          {header}
        </SafeAreaView>
      )}
      backdropComponent={backdropProps => (
        <BottomSheetBackdrop
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          {...backdropProps}
        />
      )}
      enablePanDownToClose={enablePanDownToClose}>
      <BottomSheetScrollView contentContainerStyle={{paddingBottom: bottom}}>
        {children}
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
});

export default Index;

Index.propTypes = {
  initHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  enablePanDownToClose: PropTypes.bool,
  onDismiss: PropTypes.func,
  header: PropTypes.node,
  children: PropTypes.node,
};

Index.defaultProps = {
  initHeight: '50%',
  enablePanDownToClose: true,
  onDismiss: () => {},
  header: null,
  children: null,
};