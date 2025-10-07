import React from 'react';
import { AppNavigation } from './AppNavigation';

export function HandlerNavigation() {
  // EJEMPLO: Si tuvieras autenticación, podrías hacer algo como:
  // const { user } = useAuth();
  // return user ? <AppNavigation /> : <AuthNavigation />;
  
  // Por ahora, siempre mostramos la app principal
  return <AppNavigation />;
}