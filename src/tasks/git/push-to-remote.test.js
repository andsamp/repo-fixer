import execa from 'execa'
import { pushToRemote } from './push-to-remote'

jest.mock('execa')

describe('push-to-remote', () => {
  describe('pushToRemote', () => {
    let ctx

    execa.mockImplementation(() => Promise.resolve())

    beforeEach(() => {
      jest.clearAllMocks()
      ctx = {
        cwd: '/home/andsamp/dev/work-repos/work-project-2',
        git: {
          remote: 'origin',
          destinationBranch: 'technical/TIKT-4567',
          pushFlags: []
        }
      }
    })

    it('should have the correct title', () => {
      expect(pushToRemote.title).toBe('push changes to remote')
    })

    it('should execute the expected task', async () => {
      await pushToRemote.task(ctx)

      expect(execa).toHaveBeenCalledTimes(1)
      expect(execa).toHaveBeenCalledWith('git', ['push', '-u', ctx.git.remote, ctx.git.destinationBranch], { cwd: ctx.cwd })
    })

    it('should execute the expected task with pushFlags', async () => {
      ctx.git.pushFlags = ['--no-verify', '--force']
      await pushToRemote.task(ctx)

      expect(execa).toHaveBeenCalledTimes(1)
      expect(execa).toHaveBeenCalledWith('git', ['push', '-u', ctx.git.remote, ctx.git.destinationBranch, ...ctx.git.pushFlags], { cwd: ctx.cwd })
    })
  })
})
