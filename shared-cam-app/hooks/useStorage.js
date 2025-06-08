import { useState } from 'react';
import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import * as ImageManipulator from 'expo-image-manipulator';
import { v4 as uuidv4 } from 'uuid';

const db = SQLite.openDatabase('sharedcam.db');

export default function useStorage(broadcastPhoto) {
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
      tx.executeSql('SELECT * FROM photos ORDER BY timestamp DESC', [], (_, { rows }) => setPhotos(rows._array));
    });
  };

  const compressImage = async (uri) => {
    const dest = FileSystem.documentDirectory + uuidv4() + '.jpg';
    const result = await ImageManipulator.manipulateAsync(
      uri,
      [],
      { compress: 0.6, format: ImageManipulator.SaveFormat.JPEG }
    );
    await FileSystem.moveAsync({ from: result.uri, to: dest });
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
    if (broadcastPhoto) {
      broadcastPhoto(entry);
    }
  };

  const addRemotePhoto = async (entry) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT OR IGNORE INTO photos (id, tripId, uploaderName, localUriCompressed, localUriOriginal, timestamp) values (?, ?, ?, ?, ?, ?)',
        [entry.id, entry.tripId, entry.uploaderName, entry.localUriCompressed, entry.localUriOriginal || '', entry.timestamp]
      );
    });
    setPhotos(p => [entry, ...p]);
  };

  return { photos, loadPhotos, savePhoto, addRemotePhoto };
}
