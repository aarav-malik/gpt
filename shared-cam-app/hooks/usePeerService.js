import { useEffect } from 'react';
import PeerService from '../services/PeerService';

const peerService = new PeerService();

export default function usePeerService() {
  useEffect(() => {
    peerService.start();
    return () => peerService.stop();
  }, []);

  return {
    createOrJoinTrip: peerService.createOrJoinTrip.bind(peerService),
    broadcastPhoto: peerService.broadcastPhoto.bind(peerService),
    requestHD: peerService.requestHD.bind(peerService),
  };
}
