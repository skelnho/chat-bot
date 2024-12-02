import { describe, it, expect } from 'vitest'
import { uppercaseName } from './uppercase-name'

describe('uppercaseName', () => {
  it('UPDATE', () => {
    const input = 'foo'
    const output = 'foo'
    expect(uppercaseName(input)).toBe(output)
  })
})
