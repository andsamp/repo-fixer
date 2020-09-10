import execa from 'execa'
import { checkoutMainBranch } from './checkout-main-branch'

jest.mock('execa')

describe('checkout-main-branch', () => {
  describe('checkoutMainBranch', () => {
    let ctx

    execa.mockImplementation(() => Promise.resolve())

    beforeEach(() => {
      jest.clearAllMocks()
      ctx = {
        cwd: '/home/andsamp/dev/work-repos/work-project-1',
        git: {
          mainBranch: 'main'
        }
      }
    })

    it('should have the correct title', () => {
      expect(checkoutMainBranch.title).toBe('checking out main branch')
    })

    it('should execute the expected task', async () => {
      await checkoutMainBranch.task(ctx)

      expect(execa).toHaveBeenCalledTimes(1)
      expect(execa).toHaveBeenCalledWith('git', ['checkout', ctx.git.mainBranch], { cwd: ctx.cwd })
    })
  })
})
