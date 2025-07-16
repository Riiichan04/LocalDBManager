import { useEffect, useState } from 'react'

export function useClientValue<T>(getValue: () => T, fallback: T): T {
    const [value, setValue] = useState(fallback)

    useEffect(() => {
        setValue(getValue())
    }, [getValue])

    return value
}