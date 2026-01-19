import { type Element } from '../types/types'

// Converts an 'Element' object into CSS variable names that can be added to Astro using `define:vars`
// The tests in helpers.test.ts show how this works
export function elementToCSS(
  config: Element | null,
  prefix: string,
): Record<string, string> {
  const result: Record<string, string> = {}

  if (config?.family) result[`${prefix}_family`] = config.family
  if (config?.weight) result[`${prefix}_weight`] = config.weight
  if (config?.style) result[`${prefix}_style`] = config.style
  if (config?.color) result[`${prefix}_color`] = config.color
  if (config?.bg_color) result[`${prefix}_bg_color`] = config.bg_color

  return result
}
