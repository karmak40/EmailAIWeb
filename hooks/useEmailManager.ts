import { useState, useCallback } from 'react';
import { apiClient } from '../lib/api';

export interface Account {
  id: string;
  email: string;
  provider: 'gmail' | 'outlook' | 'yahoo';
  accessToken: string;
  refreshToken?: string;
  expiresAt?: Date;
}

export interface Email {
  id: string;
  from: string;
  to: string;
  subject: string;
  body: string;
  preview: string;
  timestamp: Date;
  unread: boolean;
  isHtml: boolean;
}

export const useEmailAccounts = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadAccounts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiClient.getAccounts();
      setAccounts(data);
      console.log(`✅ Loaded ${data.length} accounts`);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      console.error(`❌ Error loading accounts: ${message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const addAccount = useCallback(
    async (email: string, provider: 'gmail' | 'outlook' | 'yahoo') => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiClient.login(email, provider);

        if (result.account) {
          setAccounts((prev) => [...prev, result.account]);
          console.log(`✅ Account added: ${email}`);
          return result.account;
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        setError(message);
        console.error(`❌ Error adding account: ${message}`);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const removeAccount = useCallback(async (accountId: string) => {
    try {
      setLoading(true);
      setError(null);
      await apiClient.removeAccount(accountId);
      setAccounts((prev) => prev.filter((acc) => acc.id !== accountId));
      console.log(`✅ Account removed: ${accountId}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      console.error(`❌ Error removing account: ${message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    accounts,
    loading,
    error,
    loadAccounts,
    addAccount,
    removeAccount,
  };
};

export const useEmails = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadEmails = useCallback(async (accountId: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiClient.getEmails(accountId);
      setEmails(data);
      console.log(`✅ Loaded ${data.length} emails`);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      console.error(`❌ Error loading emails: ${message}`);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const sendEmail = useCallback(
    async (
      fromAccountId: string,
      to: string,
      subject: string,
      body: string,
      isHtml: boolean = false
    ) => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiClient.sendEmail(fromAccountId, to, subject, body, isHtml);
        console.log(`✅ Email sent: ${result.messageId}`);
        return result;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        setError(message);
        console.error(`❌ Error sending email: ${message}`);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    emails,
    loading,
    error,
    loadEmails,
    sendEmail,
  };
};
