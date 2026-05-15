import { useQuery } from '@tanstack/react-query';

import type { TDerivativesAccountResponse } from '../../types';
import { useRestAPI } from '../useRestAPI';

/**
 * React Query hook for fetching derivatives accounts from REST API
 * Uses centralized REST API configuration from APIProvider
 *
 * @param loginid - Current user's login ID (for cache invalidation on account switch)
 * @param enabled - Whether to automatically fetch (default: true)
 * @returns React Query result with data, isLoading, error, refetch, etc.
 *
 * @example
 * ```tsx
 * const { data, isLoading, error } = useDerivativesAccount(loginid, is_logged_in);
 * const accounts = data?.data || [];
 * ```
 */
export const useDerivativesAccount = (loginid: string | undefined, enabled: boolean = false) => {
    const { fetchREST } = useRestAPI();

    return useQuery<TDerivativesAccountResponse, Error>(
        ['derivatives', 'account', loginid], // Query key includes loginid for cache invalidation on account switch
        () => {
            const auth_info = JSON.parse(sessionStorage.getItem('auth_info') || 'null');
            const token = auth_info?.access_token || '';
            const stored_accounts = JSON.parse(localStorage.getItem('client_accounts') || '[]');
            const is_legacy = token.startsWith('a1-') || stored_accounts.some((a: any) => a.token === token);
            
            if (is_legacy) {
                const current = JSON.parse(localStorage.getItem('current_account') || 'null');
                const enriched = stored_accounts.map((acc: any) => ({
                    ...acc,
                    balance: acc.account_id === loginid ? (current?.balance ?? 0) : 0,
                }));
                return Promise.resolve({ data: enriched } as TDerivativesAccountResponse);
            }
            return fetchREST<TDerivativesAccountResponse>(`/trading/v1/options/accounts`);
        }, // Query function
        {
            enabled, // Only fetch if enabled
            staleTime: 5 * 60 * 1000, // 5 minutes - accounts list doesn't change frequently
            cacheTime: 10 * 60 * 1000, // 10 minutes - cache time
            // Smart retry logic: don't retry auth errors, retry server errors
            // Error object from useRestAPI includes: status, isAuthError, code, body
            retry: (failureCount, error) => {
                const enhancedError = error as Error & { status?: number; isAuthError?: boolean };

                // Never retry auth errors (401/403) - user needs to login/refresh token
                if (enhancedError.isAuthError) return false;

                // Don't retry other client errors (4xx) except rate limits (429)
                if (enhancedError.status && enhancedError.status >= 400 && enhancedError.status < 500) {
                    return enhancedError.status === 429 && failureCount < 3;
                }

                // Retry server errors (5xx) up to 3 times
                return failureCount < 3;
            },
            retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff: 1s, 2s, 4s, 8s...
        }
    );
};
