import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // Connect to Socket.io with optimized settings
      const newSocket = io('http://localhost:5002', {
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: 5,
        timeout: 20000
      });

      // Join user's personal room once connected
      newSocket.on('connect', () => {
        newSocket.emit('join', user.id);
      });

      // Listen for match requests
      newSocket.on('new-match-request', (data) => {
        toast.info(`${data.senderName} sent you a match request!`);
        setNotifications(prev => [...prev, data]);
      });

      // Listen for match accepted
      newSocket.on('match-accepted', (data) => {
        toast.success(`${data.userName} accepted your match request!`);
        setNotifications(prev => [...prev, data]);
      });

      setSocket(newSocket);

      return () => {
        newSocket.off('connect');
        newSocket.off('new-match-request');
        newSocket.off('match-accepted');
        newSocket.close();
      };
    }
  }, [user]);

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider value={{ socket, notifications, clearNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
