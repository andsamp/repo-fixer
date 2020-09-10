import execa from 'execa'
import { createLocalBranch } from './create-local-branch'

jest.mock('execa')

describe('create-local-branch', () => {
  describe('createLocalBranch', () => {
    let ctx

    execa.mockImplementation(() => Promise.resolve())

    beforeEach(() => {
      jest.clearAllMocks()
      ctx = {
        cwd: '/home/andsamp/dev/work-repos/work-project-1',
        git: {
          newBranch: 'task/make-it-happen'
        }
      }
    })

    it('should have the correct title', () => {
      expect(createLocalBranch.title).toBe('creating local branch')
    })

    it('should execute the expected task', async () => {
      await createLocalBranch.task(ctx)

      expect(execa).toHaveBeenCalledTimes(1)
      expect(execa).toHaveBeenCalledWith('git', ['checkout', '-b', ctx.git.newBranch], { cwd: ctx.cwd })
    })
  })
})
