import { render } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import NavUser from './nav-user';
import { SidebarProvider } from '../ui/sidebar';

const useIsMobile = vi.fn();
vi.mock('@/hooks/use-mobile', () => ({
  useIsMobile: () => useIsMobile()
}));

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <SidebarProvider>
      {component}
    </SidebarProvider>
  );
};

describe('NavUser', () => {
  beforeEach(() => {
    useIsMobile.mockReset();
  });

  it('should match snapshot in desktop view', () => {
    useIsMobile.mockReturnValue(false);
    const { container } = renderWithProviders(<NavUser />);
    expect(container).toMatchSnapshot();
  });

  it('should match snapshot in mobile view', () => {
    useIsMobile.mockReturnValue(true);
    const { container } = renderWithProviders(<NavUser />);
    expect(container).toMatchSnapshot();
  });
});
