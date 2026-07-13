import { useState, useEffect } from 'react';
import { navigationService, NavRoute } from '@/services/navigation';

export function useCurrentRoute() {
  const [route, setRoute] = useState<NavRoute>(navigationService.getRoute());

  useEffect(() => {
    const unsubscribe = navigationService.subscribe((newRoute) => {
      setRoute(newRoute);
    });
    return unsubscribe;
  }, []);

  return route;
}

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(navigationService.getIsLoggedIn());
  const [userName, setUserName] = useState<string>(navigationService.getUserName());

  useEffect(() => {
    const unsubscribe = navigationService.subscribeAuth(() => {
      setIsLoggedIn(navigationService.getIsLoggedIn());
      setUserName(navigationService.getUserName());
    });
    return unsubscribe;
  }, []);

  return { isLoggedIn, userName };
}
