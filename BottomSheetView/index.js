import React, {useRef, useMemo, forwardRef, useImperativeHandle} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SafeAreaView} from '@components';
import {useTheme} from '@configs';
import styles from './styles';

const Index = forwardRef((props, ref) => {
  const {colors} = useTheme();
  const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);
  const bottomSheetRef = useRef(null);
  useImperativeHandle(ref, () => bottomSheetRef.current);
  const {bottom} = useSafeAreaInsets();

  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

  const {header, children, onDismiss, enablePanDownToClose} = props;

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      backgroundStyle={{backgroundColor: colors.card}}
      snapPoints={animatedSnapPoints}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
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
      <BottomSheetView
        onLayout={handleContentLayout}
        style={[{paddingBottom: bottom}]}>
        {children}
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default Index;

Index.propTypes = {
  enablePanDownToClose: PropTypes.bool,
  onDismiss: PropTypes.func,
  header: PropTypes.node,
  children: PropTypes.node,
};

Index.defaultProps = {
  enablePanDownToClose: true,
  onDismiss: () => {},
  header: null,
  children: null,
};