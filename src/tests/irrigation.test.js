import { describe, it, expect } from 'vitest'
import { sumRain, getIrrigationAdvice } from '../utils/irrigation'

describe('sumRain', () => {
  it('adds up the rain for each day', () => {
    expect(sumRain([1, 2, 3])).toBe(6)
  })

  it('treats missing days as zero', () => {
    expect(sumRain([2, null, 3])).toBe(5)
  })

  it('rounds to one decimal place', () => {
    expect(sumRain([0.1, 0.2])).toBe(0.3)
  })
})

describe('getIrrigationAdvice', () => {
  it('says no irrigation when good rain is coming', () => {
    expect(getIrrigationAdvice(0, 12).level).toBe('none')
  })

  it('says irrigate when the week was dry and little rain is coming', () => {
    expect(getIrrigationAdvice(3, 1).level).toBe('irrigate')
  })

  it('says keep watching when the week was wet but little rain is coming', () => {
    expect(getIrrigationAdvice(20, 1).level).toBe('watch')
  })
})