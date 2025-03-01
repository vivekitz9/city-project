import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated, Modal } from "react-native";

const Tooltip = ({ text, children }: { text: string; children: React.ReactNode }) => {
  const [visible, setVisible] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const showTooltip = () => {
    setVisible(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const hideTooltip = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setVisible(false));
  };

  return (
    <View>
      <TouchableOpacity onPress={showTooltip} onBlur={hideTooltip}>
        {children}
      </TouchableOpacity>

      {visible && (
        <Modal transparent animationType="fade" visible={visible}>
          <TouchableOpacity style={styles.overlay} onPress={hideTooltip}>
            <Animated.View style={[styles.tooltip, { opacity: fadeAnim }]}>
              <Text style={styles.tooltipText}>{text}</Text>
            </Animated.View>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    width: 100, height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  tooltip: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 5,
    maxWidth: 200,
    alignItems: "center",
    position: "absolute",
    top: "50%",
  },
  tooltipText: {
    color: "#fff",
  },
});

export default Tooltip;
