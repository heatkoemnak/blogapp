'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { socket, getSocket } from '../../socket';

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    if (socket?.connected) {
      setIsConnected(true);
      socket.on('message', (msg) => {
        console.log(msg);
        socket.emit('message', msg);
        setMessages((prev) => [...prev, msg]);
      });
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => {
  const socket = useContext(SocketContext);
  if (socket === null) {
    throw new Error(
      'useSocket must be used within a SocketProvider. Make sure all sockets are wrapped in a SocketProvider.'
    );
  }
  return socket;
};
