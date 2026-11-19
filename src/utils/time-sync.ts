/**
 * Smart minute synchronization timer for E-ink screens.
 * Slices execution until the exact next :00 second mark, then ticks strictly every 60,000ms.
 * Avoids any per-second DOM updates or interval drift.
 */
export function createMinuteSync(callback: () => void): () => void {
  let timerId: ReturnType<typeof setTimeout> | null = null;
  let intervalId: ReturnType<typeof setInterval> | null = null;

  function schedule() {
    const now = new Date();
    const msToNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds() + 20;

    timerId = setTimeout(() => {
      callback();
      intervalId = setInterval(callback, 60000);
    }, msToNextMinute);
  }

  schedule();

  return () => {
    if (timerId !== null) clearTimeout(timerId);
    if (intervalId !== null) clearInterval(intervalId);
  };
}
