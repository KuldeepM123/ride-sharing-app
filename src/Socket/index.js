import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppState } from 'react-native';
import io from 'socket.io-client';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [appState, setAppState] = useState(AppState.currentState);

    useEffect(() => {
        // Initialize Socket.IO connection
        const newSocket = io('https://ubbertaxi.rightpe.com', {
            pingTimeout: 60000,
            pingInterval: 25000,
        });
        setSocket(newSocket);

        // Handle AppState changes
        const subscription = AppState.addEventListener('change', handleAppStateChange);

        // Socket event listeners
        newSocket.on('connect', () => {
            console.log('Socket connected:', newSocket.id);
        });

        newSocket.on('disconnect', () => {
            console.log('Socket disconnected');
        });

        newSocket.on('connect_error', (error) => {
            console.error('Socket connection error:', error);
        });

        // Cleanup on unmount
        return () => {
            subscription.remove();
            newSocket.disconnect();
        };
    }, []);

    const handleAppStateChange = (nextAppState) => {
        if (appState.match(/inactive|background/) && nextAppState === 'active') {
            console.log('App has come to the foreground. Reconnecting socket...');
            socket?.connect();
        } else if (nextAppState.match(/inactive|background/)) {
            console.log('App is in background. Disconnecting socket...');
            socket?.disconnect();
        }
        setAppState(nextAppState);
    };

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);