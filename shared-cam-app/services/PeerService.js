import { RTCPeerConnection } from 'react-native-webrtc';
import { EventEmitter } from 'events';

export default class PeerService extends EventEmitter {
  constructor() {
    super();
    this.peers = {};
  }

  start() {
    // Start discovery (mDNS/ble). Placeholder for brevity.
  }

  stop() {
    // Stop discovery
  }

  createOrJoinTrip(code) {
    this.tripId = code || 'default';
    // Setup peer connection later
  }

  broadcastPhoto(photo) {
    // Send compressed photo to peers via WebRTC data channels
  }

  requestHD(photo) {
    // Send HD request message
  }
}
