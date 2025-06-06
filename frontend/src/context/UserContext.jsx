import { createContext } from 'react';

// This file creates a context for user data that can be shared across components in the application.
// It allows components to access user information and update it without prop drilling.
export const UserContext = createContext();