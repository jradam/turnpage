import { describe, expect, test } from 'bun:test'
import { elementToCSS } from './helpers'
import { Element } from '../types/types'

describe('elementToCSS', () => {
  test('returns empty object for null config', () => {
    expect(elementToCSS(null, 'body')).toEqual({})
  })

  test('converts all properties with prefix', () => {
    const element: Element = {
      family: 'Noto Serif Variable',
      weight: 'bold',
      style: 'italic',
      color: '#333',
      bg_color: '#fff',
    }
    expect(elementToCSS(element, 'h1')).toEqual({
      h1_family: 'Noto Serif Variable',
      h1_weight: 'bold',
      h1_style: 'italic',
      h1_color: '#333',
      h1_bg_color: '#fff',
    })
  })

  test('omits null properties', () => {
    const element: Element = {
      family: 'Caveat Variable',
      weight: null,
      style: null,
      color: '#000',
      bg_color: null,
    }
    expect(elementToCSS(element, 'button')).toEqual({
      button_family: 'Caveat Variable',
      button_color: '#000',
    })
  })
})
