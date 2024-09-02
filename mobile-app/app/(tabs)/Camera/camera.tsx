import { useRef, useState } from "react";
import { View, Text, Button, TouchableOpacity, Image } from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import styles from "@/Style/Camera";

export default function camera() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [image, setImage] = useState();
  const camera = useRef(null);

  
  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  async function takePicture() {
    const picture = await camera.current.takePictureAsync();
    console.log("picture", picture);
    setImage(picture);
  }

  return (
    <View style={styles.container}>
      {!image ? (
        <CameraView ref={camera} style={styles.camera} facing={facing}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={toggleCameraFacing}
            >
              <Text style={styles.text}>Switch</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={takePicture}>
              <Text style={styles.text}>Click</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      ) : (
        <Image source={{ uri: image?.uri }}
        style={{flex : 1}} />
      )}
    </View>
  );
}
