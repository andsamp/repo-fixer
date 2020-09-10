import execa from 'execa'
import { checkGitStatus } from './check-git-status'

jest.mock('execa')

describe('check-git-status', () => {
  describe('checkGitStatus', () => {
    let ctx, execaReturnValue

    execa.mockImplementation(() => Promise.resolve(execaReturnValue))

    beforeEach(() => {
      jest.clearAllMocks()
      execaReturnValue = ''
      ctx = {
        cwd: '/home/andsamp/dev/work-repos/work-project-1',
        currentProjectName: 'work-project-1'
      }
    })

    it('should have the correct title', () => {
      expect(checkGitStatus.title).toBe('checking git status')
    })

    it('should execute the expected task and not set ctx.stash when result is empty', async () => {
      await checkGitStatus.task(ctx)

      expect(execa).toHaveBeenCalledTimes(1)
      expect(execa).toHaveBeenCalledWith('git', ['status', '--porcelain'], { cwd: ctx.cwd })
      expect(ctx.stash).toBe(undefined)
    })

    it('should execute the expected task and set ctx.stash=true when result is not empty', async () => {
      execaReturnValue = 'changed files'
      await checkGitStatus.task(ctx)

      expect(execa).toHaveBeenCalledTimes(1)
      expect(execa).toHaveBeenCalledWith('git', ['status', '--porcelain'], { cwd: ctx.cwd })
      expect(ctx.stash).toBe(true)
    })
  })
})
