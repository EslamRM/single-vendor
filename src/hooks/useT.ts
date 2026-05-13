import { useI18nStore } from '@/stores/useI18nStore'
import { ar, en, type TranslationKey } from '@/data/translations'

/**
 * Returns a typed translation function `t(key)` for the current language.
 * Also exposes `lang` and `isRTL` for direction-aware components.
 */
export function useT() {
  const lang = useI18nStore((s) => s.lang)
  const isRTL = lang === 'ar'
  const dict = lang === 'ar' ? ar : en

  function t(key: TranslationKey): string {
    const val = dict[key]
    if (Array.isArray(val)) return val.join(', ')
    return val as string
  }

  function tArr(key: TranslationKey): string[] {
    const val = dict[key]
    if (Array.isArray(val)) return val as string[]
    return [val as string]
  }

  return { t, tArr, lang, isRTL }
}
