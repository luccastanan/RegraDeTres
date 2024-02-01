import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import {
	HandlerStateChangeEvent,
	PanGestureHandler,
	State,
} from 'react-native-gesture-handler';
import {
	Easing,
	runOnJS,
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from 'react-native-reanimated';
import * as S from './styles';
import getColorDS from '~/modules/plugins/energiaV1/utils/getColorDS';
import ModalHeader, { ModalHeaderProps } from './ModalHeader';

const { height } = Dimensions.get('window');

export type NewModalProps = {
	visible: boolean;
	showHeader?: boolean;
	onManuallyClose?: () => void;
	showContentWhenModalIsHidden?: boolean;
} & ModalHeaderProps;

export enum NEW_MODAL_ACCESSIBILITY_LABELS {
	CONTAINER = 'new-modal-container',
	CHILDREN = 'new-modal-children',
	BACKDROP = 'new-modal-backdrop',
}

const NewModal: React.FC<NewModalProps> = ({
	children,
	title,
	visible,
	onClose,
	onManuallyClose,
	isFullScreen = false,
	showHeader = true,
	headerIcon = 'close',
	showHeaderIcon = true,
	showContentWhenModalIsHidden = false,
}) => {
	const [isBuilt, setIsBuilt] = useState(false);
	const [localModalVisible, setLocalModalVisible] = useState(visible);
	const translationY = useSharedValue(visible ? 0 : height);
	const backdropOpacity = useSharedValue(visible ? 1 : 0);
	const isAnimating = useSharedValue(false);

	useEffect(() => {
		if (!isBuilt) {
			setIsBuilt(true);
			return;
		}

		if (!isAnimating.value) {
			if (visible) {
				showNewModal();
			} else {
				hideNewModal();
			}
		}
	}, [visible]);

	const onGestureEvent = useAnimatedGestureHandler({
		onStart: (_, ctx) => {
			ctx.startY = translationY.value;
		},
		onActive: (event, ctx) => {
			if (ctx.startY + event.translationY < 0) {
				translationY.value = 0;
			} else {
				translationY.value = ctx.startY + event.translationY;
			}
		},
		onEnd: event => {
			const snapPoints = [0, height];

			const dest = snapPoints.reduce((prev, snapPoint) => {
				return Math.abs(event.velocityY) > 50 ||
					Math.abs(translationY.value - snapPoint) <
						Math.abs(translationY.value - prev)
					? snapPoint
					: prev;
			}, translationY.value);

			translationY.value = withSpring(dest, {
				velocity: event.velocityY,
				overshootClamping: true,
				restSpeedThreshold: 0.1,
				restDisplacementThreshold: 0.1,
			});

			if (dest === height && onClose) {
				runOnJS(onClose)();
			}
		},
	});

	const onHandlerStateChange = (event: HandlerStateChangeEvent) => {
		if (event.nativeEvent.state === State.END) {
			const snapPoints = [0, height];

			const dest = snapPoints.reduce((prev, snapPoint) => {
				return Math.abs(translationY.value - snapPoint) <
					Math.abs(translationY.value - prev)
					? snapPoint
					: prev;
			}, translationY.value);

			translationY.value = withSpring(dest, {
				overshootClamping: true,
				restSpeedThreshold: 0.1,
				restDisplacementThreshold: 0.1,
			});

			if (dest === height && onClose) {
				runOnJS(onClose)();
			}
		}
	};

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateY: translationY.value }],
		};
	});

	const backdropStyle = useAnimatedStyle(() => {
		return {
			opacity: backdropOpacity.value,
		};
	});

	const showLocalModalVisible = () => {
		setLocalModalVisible(true);
	};

	const hideLocalModalVisible = () => {
		setLocalModalVisible(false);
	};

	const hideNewModal = (isManuallyClose = false) => {
		if (isManuallyClose) {
			onManuallyClose?.();
		}
		onClose?.();
		isAnimating.value = true;
		translationY.value = withSpring(height, {
			overshootClamping: true,
			restSpeedThreshold: 0.1,
			restDisplacementThreshold: 0.1,
		});
		backdropOpacity.value = withTiming(
			0,
			{
				duration: 300,
				easing: Easing.linear,
			},
			() => {
				isAnimating.value = false;
				runOnJS(hideLocalModalVisible)();
			},
		);
	};

	const showNewModal = () => {
		showLocalModalVisible();
		isAnimating.value = true;
		translationY.value = withSpring(0, {
			overshootClamping: true,
			restSpeedThreshold: 0.1,
			restDisplacementThreshold: 0.1,
		});

		backdropOpacity.value = withTiming(
			1,
			{
				duration: 300,
				easing: Easing.linear,
			},
			() => {
				isAnimating.value = false;
			},
		);
	};

	const renderHeader = () => {
		if (!showHeader) return;

		return (
			<ModalHeader
				title={title}
				headerIcon={headerIcon}
				showHeaderIcon={showHeaderIcon}
				onClose={() => hideNewModal(true)}
				isFullScreen={isFullScreen}
			/>
		);
	};

	const renderChildren = () => {
		if (!localModalVisible && !showContentWhenModalIsHidden) return;

		return (
			<S.Children accessibilityLabel={NEW_MODAL_ACCESSIBILITY_LABELS.CHILDREN}>
				{children}
			</S.Children>
		);
	};

	return (
		<>
			{visible && (
				<S.MirrorContainer style={backdropStyle}>
					<S.Mirror
						onPress={() => hideNewModal(true)}
						activeOpacity={1}
						accessibilityLabel={NEW_MODAL_ACCESSIBILITY_LABELS.BACKDROP}
					/>
				</S.MirrorContainer>
			)}
			<PanGestureHandler
				onGestureEvent={onGestureEvent}
				onHandlerStateChange={onHandlerStateChange}
				enabled={false}>
				<S.Container
					style={animatedStyle}
					isFullScreen={isFullScreen}
					accessibilityLabel={NEW_MODAL_ACCESSIBILITY_LABELS.CONTAINER}>
					<S.Content
						style={styles.container}
						edges={isFullScreen ? ['top', 'bottom'] : ['bottom']}>
						{renderHeader()}
						{renderChildren()}
					</S.Content>
				</S.Container>
			</PanGestureHandler>
		</>
	);
};
const styles = StyleSheet.create({
	container: {
		shadowColor: getColorDS('neutral950'),
		shadowOffset: { width: 0, height: -4 },
		shadowOpacity: 0.1,
		elevation: 1,
	},
});

export default NewModal;
