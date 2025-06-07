import { useState } from 'react';
import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { v4 as uuidv4 } from 'uuid';

const db = SQLite.openDatabase('sharedcam.db');

export default function useStorage() {
  const [photos, setPhotos] = useState([]);

  const init = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS photos (id TEXT PRIMARY KEY NOT NULL, tripId TEXT, uploaderName TEXT, localUriCompressed TEXT, localUriOriginal TEXT, timestamp INTEGER);'
      );
    });
  };

  const loadPhotos = () => {
    init();
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM photos', [], (_, { rows }) => setPhotos(rows._array));
    });
  };

  const compressImage = async (uri) => {
    const info = await FileSystem.getInfoAsync(uri);
    const dest = FileSystem.documentDirectory + uuidv4() + '.jpg';
    await FileSystem.copyAsync({ from: uri, to: dest });
    // Real compression omitted for brevity
    return dest;
  };

  const savePhoto = async (uri) => {
    const id = uuidv4();
    const compressed = await compressImage(uri);
    const timestamp = Date.now();
    const entry = { id, tripId: 'default', uploaderName: 'Me', localUriCompressed: compressed, localUriOriginal: uri, timestamp };
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO photos (id, tripId, uploaderName, localUriCompressed, localUriOriginal, timestamp) values (?, ?, ?, ?, ?, ?)',
        [id, 'default', 'Me', compressed, uri, timestamp]
      );
    });
    setPhotos((p) => [...p, entry]);
  };

  const requestHD = (photo) => {
    // Implementation with peer service
  };

  return { photos, loadPhotos, savePhoto, requestHD };
}
