import { useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";

export function useOnlineStatus() {
  const updateOnlineStatus = useMutation(api.messages.mutations.updateOnlineStatus);

  useEffect(() => {
    const debounceTimeoutRef = { current: null as NodeJS.Timeout | null };
    const lastUpdateRef = { current: 0 };

    // Debounced function to update online status
    const debouncedUpdateStatus = (isOnline: boolean) => {
      const now = Date.now();
      
      // Don't update if we've updated in the last 2 seconds
      if (now - lastUpdateRef.current < 2000) {
        return;
      }

      // Clear existing timeout
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      // Set new timeout
      debounceTimeoutRef.current = setTimeout(() => {
        updateOnlineStatus({ isOnline }).catch((error) => {
          console.warn("Failed to update online status:", error);
        });
        lastUpdateRef.current = Date.now();
      }, 1000); // 1 second debounce
    };

    // Initial online status
    debouncedUpdateStatus(true);

    const handleActivity = () => {
      debouncedUpdateStatus(true);
    };

    // Set offline when user becomes inactive
    const handleInactivity = () => {
      debouncedUpdateStatus(false);
    };

    // Set offline when page is hidden
    const handleVisibilityChange = () => {
      if (document.hidden) {
        debouncedUpdateStatus(false);
      } else {
        debouncedUpdateStatus(true);
      }
    };

    // Set offline when user leaves the page
    const handleBeforeUnload = () => {
      // Use synchronous approach for beforeunload
      try {
        updateOnlineStatus({ isOnline: false });
      } catch (error) {
        console.warn("Failed to update online status on unload:", error);
      }
    };

    // Add event listeners with throttling
    let activityTimeout: NodeJS.Timeout | null = null;
    const throttledActivity = () => {
      if (activityTimeout) return;
      activityTimeout = setTimeout(() => {
        handleActivity();
        activityTimeout = null;
      }, 5000); // Only update every 5 seconds of activity
    };

    document.addEventListener("mousemove", throttledActivity);
    document.addEventListener("keydown", throttledActivity);
    document.addEventListener("click", throttledActivity);
    document.addEventListener("scroll", throttledActivity);
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
      document.removeEventListener("mousemove", throttledActivity);
      document.removeEventListener("keydown", throttledActivity);
      document.removeEventListener("click", throttledActivity);
      document.removeEventListener("scroll", throttledActivity);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      
      document.removeEventListener("mousemove", resetTimerOnActivity);
      document.removeEventListener("keydown", resetTimerOnActivity);
      document.removeEventListener("click", resetTimerOnActivity);
      document.removeEventListener("scroll", resetTimerOnActivity);
      
      clearTimeout(inactivityTimer);
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      if (activityTimeout) {
        clearTimeout(activityTimeout);
      }
      
      // Final offline update
      try {
        updateOnlineStatus({ isOnline: false });
      } catch (error) {
        console.warn("Failed to update online status on cleanup:", error);
      }
    };
  }, [updateOnlineStatus]);
} 