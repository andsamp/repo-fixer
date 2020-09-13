import execa from 'execa'
import { checkoutDestinationBranch, checkoutMainBranch } from './checkout-branch'

jest.mock('execa')

describe('checkout-main-branch', () => {
  let ctx

  execa.mockImplementation(() => Promise.resolve())

  beforeEach(() => {
    jest.clearAllMocks()
    ctx = {
      cwd: '/home/andsamp/dev/work-repos/work-project-1',
      git: {
        mainBranch: 'main',
        destinationBranch: 'technical/TKT-8796'
      }
    }
  })

  describe('checkoutMainBranch', () => {
    it('should have the correct title', () => {
      expect(checkoutMainBranch.title).toBe('checking out main branch')
    })

    it('should execute the expected task', async () => {
      await checkoutMainBranch.task(ctx)

      expect(execa).toHaveBeenCalledTimes(1)
      expect(execa).toHaveBeenCalledWith('git', ['checkout', ctx.git.mainBranch], { cwd: ctx.cwd })
    })
  })

  describe('checkoutDestinationBranch', () => {
    it('should have the correct title', () => {
      expect(checkoutDestinationBranch.title).toBe('checking out destination branch')
    })

    it('should execute the expected task', async () => {
      await checkoutDestinationBranch.task(ctx)

      expect(execa).toHaveBeenCalledTimes(1)
      expect(execa).toHaveBeenCalledWith('git', ['checkout', ctx.git.destinationBranch], { cwd: ctx.cwd })
    })
  })
})
