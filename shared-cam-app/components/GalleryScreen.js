import React, { useEffect } from 'react';
import { View, FlatList, Image, Button, StyleSheet } from 'react-native';
import useStorage from '../hooks/useStorage';
import usePeerService from '../hooks/usePeerService';

export default function GalleryScreen({ navigation }) {
  const { photos, loadPhotos, requestHD } = useStorage();
  const { broadcastPhoto } = usePeerService();

  useEffect(() => {
    loadPhotos();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.localUriCompressed }} style={styles.thumb} />
      <Button title="Request HD" onPress={() => requestHD(item)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={photos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      <Button title="Open Camera" onPress={() => navigation.navigate('Camera')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  item: { flexDirection: 'row', alignItems: 'center', margin: 10 },
  thumb: { width: 80, height: 80, marginRight: 10 },
});
