import React, { useRef, useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import useStorage from '../hooks/useStorage';
import usePeerService from '../hooks/usePeerService';

export default function CameraScreen({ navigation }) {
  const cameraRef = useRef(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const { broadcastPhoto } = usePeerService();
  const { savePhoto } = useStorage(broadcastPhoto);

  const takePicture = async () => {
    if (!permission || !permission.granted) {
      await requestPermission();
    }
    const photo = await cameraRef.current.takePictureAsync();
    await savePhoto(photo.uri);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Camera ref={cameraRef} style={styles.camera} />
      <Button title="Capture" onPress={takePicture} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
});
