import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

export const Button = ({
  large,
  text,
  onPress,
}: TouchableOpacityProps & { text: string; large?: boolean }) => {
  return (
    <TouchableOpacity style={{ paddingVertical: 10 }} onPress={onPress}>
      <Text style={{ color: "#0183fe", fontSize: large ? 16 : undefined }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};
