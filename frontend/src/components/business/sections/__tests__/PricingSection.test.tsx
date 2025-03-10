import { useMediaQuery } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { createTheme } from '@/theme';

import PricingSection from '../PricingSection';

// Mock useMediaQuery
vi.mock('@mui/material', async () => {
  const actual = await vi.importActual<typeof import('@mui/material')>('@mui/material');
  return {
    ...actual,
    useMediaQuery: vi.fn(),
  };
});

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div data-testid="motion-div" {...props}>
        {children}
      </div>
    ),
  },
}));

describe('PricingSection', () => {
  const user = userEvent.setup();

  const renderPricingSection = () => {
    return render(
      <ThemeProvider theme={createTheme(false)}>
        <PricingSection />
      </ThemeProvider>
    );
  };

  beforeEach(() => {
    // 默认设置为桌面视图
    vi.mocked(useMediaQuery).mockReturnValue(false);
  });

  it('应该正确渲染标题和副标题', () => {
    renderPricingSection();
    expect(screen.getByText('价格方案')).toBeInTheDocument();
    expect(screen.getByText('选择最适合您的方案，开启 AI 之旅')).toBeInTheDocument();
  });

  it('应该正确渲染所有价格方案', async () => {
    renderPricingSection();

    // 检查每个方案的标题和价格
    const plans = [
      { title: '免费版', price: '0' },
      { title: '专业版', price: '99' },
      { title: '企业版', price: '联系我们' },
    ];

    for (const plan of plans) {
      await waitFor(() => {
        expect(screen.getByText(plan.title)).toBeInTheDocument();
        expect(screen.getByText(plan.price)).toBeInTheDocument();
      });
    }
  });

  it('应该正确显示最受欢迎标签', async () => {
    renderPricingSection();
    const popularBadge = await screen.findByText('最受欢迎');
    expect(popularBadge).toBeInTheDocument();
    const headerRoot = popularBadge.closest('.MuiCardHeader-root');
    expect(headerRoot).toHaveClass('css-r4xzz0-MuiCardHeader-root');
  });

  it('应该正确显示每个方案的功能列表', async () => {
    renderPricingSection();

    // 免费版功能
    const freePlanFeatures = ['每日固定调用次数', '基础模型支持', '标准响应速度', '社区支持'];

    // 专业版功能
    const proPlanFeatures = ['无限制调用次数', '所有模型支持', '优先响应速度', '专属客服支持'];

    // 企业版功能
    const enterprisePlanFeatures = [
      '定制化解决方案',
      'API 独享配置',
      '企业级 SLA 保障',
      '7×24小时技术支持',
    ];

    for (const feature of [...freePlanFeatures, ...proPlanFeatures, ...enterprisePlanFeatures]) {
      await waitFor(() => {
        const featureElement = screen.getByText(feature);
        expect(featureElement).toBeInTheDocument();
        // 检查每个功能项是否有对应的图标
        const iconParent = featureElement.parentElement;
        expect(iconParent?.querySelector('[data-testid="CheckIcon"]')).toBeInTheDocument();
      });
    }
  });

  describe('响应式布局测试', () => {
    it('应该在移动端正确响应', async () => {
      // 模拟移动端视图
      vi.mocked(useMediaQuery).mockReturnValue(true);
      renderPricingSection();

      // 检查容器边距
      const container = await screen.findByRole('main', { name: /价格方案/i });
      expect(container).toHaveStyle({
        padding: expect.any(String),
      });
    });

    it('应该在桌面端正确显示', async () => {
      vi.mocked(useMediaQuery).mockReturnValue(false);
      renderPricingSection();

      // 检查价格文字大小
      await waitFor(() => {
        const priceElements = screen.getAllByRole('heading', { level: 2 });
        priceElements.forEach(element => {
          expect(element).toHaveClass('MuiTypography-h3');
        });
      });
    });
  });

  describe('交互测试', () => {
    it('应该正确处理按钮悬停效果', async () => {
      renderPricingSection();

      const buttons = await screen.findAllByRole('button');
      for (const button of buttons) {
        await act(async () => {
          await user.hover(button);
        });
        expect(button).toHaveClass('MuiButton-root');
        await act(async () => {
          await user.unhover(button);
        });
      }
    });

    it('应该正确处理卡片悬停效果', async () => {
      renderPricingSection();

      const cards = await screen.findAllByRole('article');
      for (const card of cards) {
        await act(async () => {
          await user.hover(card);
        });
        expect(card).toHaveClass('MuiCard-root');
        await act(async () => {
          await user.unhover(card);
        });
      }
    });
  });

  describe('可访问性测试', () => {
    it('应该为所有价格方案提供正确的 ARIA 标签', async () => {
      renderPricingSection();

      const cards = await screen.findAllByRole('article');
      expect(cards[0]).toHaveAttribute('aria-label', '免费版价格方案');
      expect(cards[1]).toHaveAttribute('aria-label', '专业版价格方案');
      expect(cards[2]).toHaveAttribute('aria-label', '企业版价格方案');
    });

    it('应该确保所有按钮都可以通过键盘访问', async () => {
      renderPricingSection();

      const buttons = await screen.findAllByRole('button');
      for (const button of buttons) {
        expect(button).toHaveAttribute('tabindex', '0');
        await act(async () => {
          button.focus();
        });
        expect(button).toHaveFocus();
      }
    });

    it('应该确保所有功能列表项都有正确的语义标记', async () => {
      renderPricingSection();

      await waitFor(() => {
        const features = screen.getAllByTestId('CheckIcon');
        features.forEach(feature => {
          expect(feature).toBeVisible();
          expect(feature).toHaveAttribute('aria-hidden', 'true');
        });
      });
    });
  });

  describe('动画测试', () => {
    it('应该为每个价格卡片添加正确的动画属性', async () => {
      renderPricingSection();

      const motionDivs = await screen.findAllByTestId('motion-div');
      motionDivs.forEach(div => {
        expect(div).toHaveAttribute('initial');
        expect(div).toHaveAttribute('animate');
        expect(div).toHaveAttribute('transition');
      });
    });
  });
});
