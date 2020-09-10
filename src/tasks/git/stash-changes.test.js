import execa from 'execa'
import { stashChanges } from './stash-changes'

jest.mock('execa')

describe('stash-changes', () => {
  describe('stashChanges', () => {
    let ctx

    execa.mockImplementation(() => Promise.resolve())

    beforeEach(() => {
      jest.clearAllMocks()
      ctx = {
        cwd: '/home/andsamp/dev/work-repos/work-project-1'
      }
    })

    it('should have the correct title', () => {
      expect(stashChanges.title).toBe('stashing changes')
    })

    it('should not be enabled when ctx.stash is undefined', () => {
      expect(stashChanges.enabled(ctx)).toBe(false)
    })

    it('should be enabled when ctx.stash is true', () => {
      ctx.stash = true
      expect(stashChanges.enabled(ctx)).toBe(true)
    })

    it('should execute the expected task', async () => {
      await stashChanges.task(ctx)

      expect(execa).toHaveBeenCalledTimes(1)
      expect(execa).toHaveBeenCalledWith('git', ['stash'], { cwd: ctx.cwd })
    })
  })
})
