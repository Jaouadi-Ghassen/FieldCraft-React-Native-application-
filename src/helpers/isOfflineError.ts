import {CombinedError} from 'urql';

export function isOfflineError(e?: CombinedError) {
  return !!(
    e &&
    e.networkError &&
    !e.response &&
    /request failed|failed to fetch|network\s?error|timeout/i.test(
      e.networkError?.message,
    )
  );
}
