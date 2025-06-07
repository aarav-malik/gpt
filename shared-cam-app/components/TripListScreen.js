import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import * as BarCodeScanner from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';
import usePeerService from '../hooks/usePeerService';

export default function TripListScreen() {
  const [code, setCode] = useState('');
  const navigation = useNavigation();
  const { createOrJoinTrip } = usePeerService();

  const handleJoin = async () => {
    await createOrJoinTrip(code.trim());
    navigation.navigate('Gallery');
  };

  const handleScan = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    if (status === 'granted') {
      // Real scanner omitted for brevity
      const scannedCode = 'demo-trip';
      setCode(scannedCode);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join or Create Trip</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter trip code"
        value={code}
        onChangeText={setCode}
      />
      <Button title="Scan QR" onPress={handleScan} />
      <Button title="Enter Trip" onPress={handleJoin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 20, marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginVertical: 10, width: '80%' },
});
