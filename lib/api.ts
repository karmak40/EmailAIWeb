/**
 * API Client for EmailAI Backend
 * Handles all communication with the backend server
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

interface ApiResponse<T> {
  success?: boolean;
  error?: string;
  data?: T;
  [key: string]: any;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  /**
   * Make API request
   */
  private async request<T>(
    method: string,
    endpoint: string,
    data?: any
  ): Promise<T> {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (data) {
        options.body = JSON.stringify(data);
      }

      console.log(`[API] ${method} ${endpoint}`, data || '');

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`[API ERROR] ${method} ${endpoint}:`, error);
      throw error;
    }
  }

  // ==================== AUTH ENDPOINTS ====================

  /**
   * Login with email and provider
   */
  async login(email: string, provider: 'gmail' | 'outlook' | 'yahoo') {
    return this.request<any>('POST', '/api/auth/login', {
      email,
      provider,
      password: 'demo', // Mock password
    });
  }

  /**
   * Get all connected accounts
   */
  async getAccounts() {
    const response = await this.request<any>('GET', '/api/auth/accounts');
    return response.accounts || [];
  }

  /**
   * Remove account
   */
  async removeAccount(accountId: string) {
    return this.request<any>('DELETE', `/api/auth/accounts/${accountId}`);
  }

  // ==================== EMAIL ENDPOINTS ====================

  /**
   * Get emails for account
   */
  async getEmails(accountId: string) {
    const response = await this.request<any>('GET', `/api/emails/${accountId}`);
    return response.emails || [];
  }

  /**
   * Send email
   */
  async sendEmail(
    fromAccountId: string,
    to: string,
    subject: string,
    body: string,
    isHtml: boolean = false
  ) {
    return this.request<any>('POST', '/api/emails/send', {
      fromAccountId,
      to,
      subject,
      body,
      isHtml,
    });
  }

  // ==================== HEALTH CHECK ====================

  /**
   * Check API health
   */
  async health() {
    return this.request<any>('GET', '/health');
  }

  /**
   * Get API status
   */
  async getStatus() {
    return this.request<any>('GET', '/api/status');
  }
}

export const apiClient = new ApiClient();
