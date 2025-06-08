import { useEffect, useRef } from 'react';
import PeerService from '../services/PeerService';

export default function usePeerService(name = 'Me') {
  const serviceRef = useRef(new PeerService(name));

  useEffect(() => {
    const svc = serviceRef.current;
    svc.start();
    return () => svc.stop();
  }, []);

  return {
    createOrJoinTrip: (...args) => serviceRef.current.createOrJoinTrip(...args),
    broadcastPhoto: (...args) => serviceRef.current.broadcastPhoto(...args),
    requestHD: (...args) => serviceRef.current.requestHD(...args),
    service: serviceRef.current,
  };
}
