import { expect, test } from '@playwright/experimental-ct-vue'
import type { TextVariant } from '@/components/ui-kit/AppText.vue'
import AppText from '@/components/ui-kit/AppText.vue'

const textVariants: TextVariant[] = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'p1',
  'p2',
  'p3',
  'p4',
  'p5',
  'p6',
]

test.describe('AppText Component', () => {
  for (let i = 0; i < textVariants.length - 1; i++) {
    test(`renders with all variant ${i + 1}`, async ({ mount }) => {
      const variant = textVariants[i]

      const component = await mount(AppText, {
        props: {
          variant,
        },
        slots: {
          default: `Text for variant ${variant}`,
        },
      })

      await expect(component).toHaveText(`Text for variant ${variant}`)
      // await expect(component).toHaveScreenshot()
    })
  }

  test('renders with default props', async ({ mount, page }) => {
    const component = await mount(AppText, {
      props: {
        variant: 'h1',
      },

      slots: {
        default: 'Hello World!',
      },
    })

    await expect(component).not.toHaveClass(/bold/)
    await expect(component).not.toHaveClass(/secondary/)
    await expect(component).not.toHaveClass(/tetriary/)
    await expect(component).toHaveText('Hello World!')

    const spanElement = component.getByTestId('cmp:AppText_id:plainHtml')

    await expect(spanElement).not.toBeVisible()
  })

  test('renders bold text when "bold" prop is true', async ({ mount }) => {
    const component = await mount(AppText, {
      props: {
        variant: 'h1',
        bold: true,
      },
      slots: {
        default: 'Bold Text',
      },
    })

    await expect(component).toHaveClass(/bold/)
  })

  test('renders secondary text when "secondary" prop is true', async ({ mount }) => {
    const component = await mount(AppText, {
      props: {
        variant: 'h1',
        secondary: true,
      },
      slots: {
        default: 'Secondary Text',
      },
    })

    await expect(component).toHaveClass(/secondary/)
  })

  test('renders tetriary text when "tetriary" prop is true', async ({ mount }) => {
    const component = await mount(AppText, {
      props: {
        variant: 'h1',
        tetriary: true,
      },
      slots: {
        default: 'Tetriary Text',
      },
    })

    await expect(component).toHaveClass(/tetriary/)
  })

  test('renders HTML content with plainHtml prop', async ({ mount }) => {
    const component = await mount(AppText, {
      props: {
        variant: 'h1',
        plainHtml: '<strong class="accent">HTML Content</strong>',
      },
    })

    await expect(component).toContainText('HTML Content')

    const strongTag = component.locator('strong')

    await expect(strongTag).toBeVisible()
    await expect(strongTag).toHaveClass(/accent/)
  })
})
