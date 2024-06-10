import React, { Ref, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet } from "react-native";
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

const Toast = React.forwardRef(({ duration = 400, onHide }, ref) => {
  const [textLength, setTextLength] = useState(0);
  const [toastHeight, setToastHeight] = useState(0);
  const [config, setConfig] = useState({
    text: undefined,
    type: undefined,
    duration: 0,
    redirectTo: "",
  });

  const navigation = useNavigation();
  const visibleState = useRef(false);
  const timer = useRef();

  const transY = useSharedValue(0);
  const transX = useSharedValue(0);

  useImperativeHandle(ref, () => ({
    show,
    hide,
  }));

  useEffect(() => {
    if (textLength && toastHeight && config.text) {
      transX.value = textLength + 12;
      showToast();
      timer.current = setTimeout(() => {
        hideToast();
        if (config.redirectTo) {
          navigation.navigate(config.redirectTo);
        }
      }, 2000);
    }

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [config, toastHeight, textLength]);

  useEffect(() => {
    if (toastHeight) {
      transY.value = -toastHeight;
    }
  }, [toastHeight]);

  const rView = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: transY.value }],
      opacity: interpolate(transY.value, [-toastHeight, 80], [0, 1], Extrapolation.CLAMP),
    };
  }, [toastHeight]);

  const rOuterView = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: -Math.max(transX.value, 1) / 2 }],
    };
  }, []);

  const rInnerView = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: transX.value }],
    };
  }, []);

  const rText = useAnimatedStyle(() => {
    return {
      opacity: interpolate(transX.value, [0, textLength], [1, 0]),
    };
  }, [textLength]);

  return (
    <Animated.View onLayout={handleViewLayout} style={[styles.container, rView]}>
      <Animated.View style={[styles.outerContainer, rOuterView]}>
        <Animated.View style={[styles.innerContainer, rInnerView, { backgroundColor: generateBackgroundColor() }]}>
          <Image source={generateImage()} style={styles.image} />
          <Animated.Text onLayout={handleTextLayout} style={[styles.text, rText]}>
            {config?.text}
          </Animated.Text>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );

  function show(text, type, duration, redirectTo) {
    setConfig({ text, type, duration, redirectTo });
  }

  function hide(callback) {
    callback();
  }

  function generateImage() {
    if (config?.type === "success") {
      return require("../../../assets/images/success.png");
    } else if (config?.type === "error") {
      return require("../../../assets/images/error.png");
    } else {
      return require("../../../assets/images/info.png");
    }
  }

  function generateBackgroundColor() {
    if (config?.type === "success") {
      return "#0F9C58";
    } else if (config?.type === "error") {
      return "#DB4437";
    } else {
      return "#F4B301";
    }
  }

  function showToast() {
    if (!visibleState.current) {
      visibleState.current = true;
      transY.value = withTiming(80, { duration: config.duration });
      transX.value = withDelay(config.duration, withTiming(0, { duration: config.duration }));
    }
  }

  function hideToast(callback) {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    transX.value = withTiming(textLength + 12, { duration });
    transY.value = withDelay(
      config.duration,
      withTiming(-toastHeight, { duration: config.duration, easing: Easing.bezierFn(0.36, 0, 0.66, -0.56) }, () => {
        runOnJS(handleOnFinish)(callback);
      })
    );
  }

  function handleOnFinish(callback) {
    setConfig({
      text: undefined,
      type: undefined,
      duration: 0,
    });
    if (onHide) {
      onHide();
    }
    if (callback) {
      setTimeout(() => {
        callback();
      }, 100);
    }
    visibleState.current = false;
  }

  function handleTextLayout(event) {
    if (textLength !== event.nativeEvent.layout.width) {
      setTextLength(Math.floor(event.nativeEvent.layout.width));
    }
  }

  function handleViewLayout(event) {
    if (toastHeight !== event.nativeEvent.layout.height) {
      setToastHeight(event.nativeEvent.layout.height);
    }
  }
});

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: -20,
    left: "5%",
    width: "90%",
    zIndex: 100,
  },
  outerContainer: {
    overflow: "hidden",
    borderRadius: 40,
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 40,
  },
  image: {
    width: 20,
    height: 20,
  },
  text: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 12,
    textAlign: "center",
  },
});

export default Toast;
