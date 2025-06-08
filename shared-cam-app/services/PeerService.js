import { RTCPeerConnection } from 'react-native-webrtc';
import { EventEmitter } from 'events';

// Simple registry so multiple instances can communicate in-memory during testing
const registry = new Set();

export default class PeerService extends EventEmitter {
  constructor(name = 'Me') {
    super();
    this.name = name;
    this.tripId = null;
  }

  start() {
    registry.add(this);
  }

  stop() {
    registry.delete(this);
  }

  createOrJoinTrip(code) {
    this.tripId = code || 'default';
  }

  broadcastPhoto(photo) {
    for (const peer of registry) {
      if (peer !== this && peer.tripId === this.tripId) {
        peer.emit('photo', photo);
      }
    }
  }

  requestHD(photo) {
    for (const peer of registry) {
      if (peer !== this && peer.tripId === this.tripId && peer.name === photo.uploaderName) {
        peer.emit('request-hd', photo, this.name);
      }
    }
  }
}
