import execa from 'execa'
import { pull } from './pull'

jest.mock('execa')

describe('pull', () => {
  describe('pull', () => {
    let ctx

    execa.mockImplementation(() => Promise.resolve())

    beforeEach(() => {
      jest.clearAllMocks()
      ctx = {
        cwd: '/home/andsamp/dev/work-repos/work-project-1'
      }
    })

    it('should have the correct title', () => {
      expect(pull.title).toBe('pulling remote changes')
    })

    it('should execute the expected task', async () => {
      await pull.task(ctx)

      expect(execa).toHaveBeenCalledTimes(1)
      expect(execa).toHaveBeenCalledWith('git', ['pull'], { cwd: ctx.cwd })
    })
  })
})
