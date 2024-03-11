import { vi } from 'vitest';

vi.mock('next/router', () => ({
  useRouter: vi.fn().mockImplementation(() => ({ query: {} })),
}));
