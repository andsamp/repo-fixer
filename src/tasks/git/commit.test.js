import execa from 'execa'
import { commit } from './commit'

jest.mock('execa')

describe('commit', () => {
  describe('commit', () => {
    let ctx

    execa.mockImplementation(() => Promise.resolve())

    beforeEach(() => {
      jest.clearAllMocks()
      ctx = {
        cwd: '/home/andsamp/dev/work-repos/work-project-2',
        git: {
          commitMessage: '[TIKT-4567] useful commit message'
        }
      }
    })

    it('should have the correct title', () => {
      expect(commit.title).toBe('committing changes')
    })

    it('should execute the expected task', async () => {
      await commit.task(ctx)

      expect(execa).toHaveBeenCalledTimes(1)
      expect(execa).toHaveBeenCalledWith('git', ['commit', '-am', ctx.git.commitMessage], { cwd: ctx.cwd })
    })
  })
})
