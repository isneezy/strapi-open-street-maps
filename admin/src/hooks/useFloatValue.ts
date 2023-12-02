import { useMemo } from "react"

type Value = string | number | undefined | null
export function useFloatValue(...values: Value[]) {
    return useMemo(() => {
        const val = values.reduce((value, current) => {
            if (typeof value === 'number' && value !== 0) return value
            if (typeof current === 'number') return current
            if (typeof current === 'string') {
                const parsed = Number.parseFloat(current)
                if (parsed !== 0 && !isNaN(parsed)) return parsed
            }
            return value as number
        }, 0)
        return val as number
    }, [...values])
}