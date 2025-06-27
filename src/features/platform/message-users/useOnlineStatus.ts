import { useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { useEffect } from "react";

export function useOnlineStatus() {
  const updateOnlineStatus = useMutation(api.messages.mutations.updateOnlineStatus);

  useEffect(() => {
    updateOnlineStatus({ isOnline: true });

    const handleActivity = () => {
      updateOnlineStatus({ isOnline: true });
    };

    // Set offline when user becomes inactive
    const handleInactivity = () => {
      updateOnlineStatus({ isOnline: false });
    };

    // Set offline when page is hidden
    const handleVisibilityChange = () => {
      if (document.hidden) {
        updateOnlineStatus({ isOnline: false });
      } else {
        updateOnlineStatus({ isOnline: true });
      }
    };

    // Set offline when user leaves the page
    const handleBeforeUnload = () => {
      updateOnlineStatus({ isOnline: false });
    };

    // Add event listeners
    document.addEventListener("mousemove", handleActivity);
    document.addEventListener("keydown", handleActivity);
    document.addEventListener("click", handleActivity);
    document.addEventListener("scroll", handleActivity);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Set up inactivity timer (5 minutes)
    let inactivityTimer: NodeJS.Timeout;
    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(handleInactivity, 5 * 60 * 1000); // 5 minutes
    };

    // Reset timer on activity
    const resetTimerOnActivity = () => {
      handleActivity();
      resetInactivityTimer();
    };

    document.addEventListener("mousemove", resetTimerOnActivity);
    document.addEventListener("keydown", resetTimerOnActivity);
    document.addEventListener("click", resetTimerOnActivity);
    document.addEventListener("scroll", resetTimerOnActivity);

    // Start the inactivity timer
    resetInactivityTimer();

    // Cleanup function
    return () => {
      document.removeEventListener("mousemove", handleActivity);
      document.removeEventListener("keydown", handleActivity);
      document.removeEventListener("click", handleActivity);
      document.removeEventListener("scroll", handleActivity);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      
      document.removeEventListener("mousemove", resetTimerOnActivity);
      document.removeEventListener("keydown", resetTimerOnActivity);
      document.removeEventListener("click", resetTimerOnActivity);
      document.removeEventListener("scroll", resetTimerOnActivity);
      
      clearTimeout(inactivityTimer);
      updateOnlineStatus({ isOnline: false });
    };
  }, [updateOnlineStatus]);
} 