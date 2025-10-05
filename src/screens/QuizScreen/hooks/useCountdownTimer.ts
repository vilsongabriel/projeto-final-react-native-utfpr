import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { formatTime } from '../QuizScreen.utils'

type UseCountdownTimerReturn = {
	start: (seconds: number) => void
	stop: () => void
	remaining: number
	duration: number
	timerLabel: string
	timerProgress: number
}

export const useCountdownTimer = (
	onFinish: () => void,
): UseCountdownTimerReturn => {
	const [duration, setDuration] = useState(0)
	const [remaining, setRemaining] = useState(0)
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

	const stop = useCallback(() => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current)
			intervalRef.current = null
		}
	}, [])

	const start = useCallback(
		(seconds: number) => {
			stop()
			setDuration(seconds)
			setRemaining(seconds)

			if (seconds <= 0) {
				return
			}

			const intervalId = setInterval(() => {
				setRemaining(prev => {
					if (prev <= 1) {
						clearInterval(intervalId)
						onFinish()
						return 0
					}
					return prev - 1
				})
			}, 1000)

			intervalRef.current = intervalId
		},
		[onFinish, stop],
	)

	useEffect(() => {
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current)
			}
		}
	}, [])

	const timerLabel = useMemo(() => formatTime(remaining), [remaining])
	const timerProgress = useMemo(() => {
		if (duration <= 0) {
			return 1
		}
		return Math.max(remaining / duration, 0)
	}, [duration, remaining])

	return {
		start,
		stop,
		remaining,
		duration,
		timerLabel,
		timerProgress,
	}
}
