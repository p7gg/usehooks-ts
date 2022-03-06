import { RefObject, useEffect, useState } from 'react'

interface Args extends IntersectionObserverInit {
  freezeOnceVisible?: boolean
}

/**
 * This React Hook detects visibility of a component on the viewport using the `IntersectionObserver` API natively present in the browser.
 * It can be very useful to lazy-loading of images, implementing "infinite scrolling" or starting animations for example.
 * Your must pass the ref element (from `useRef()`).
 * It takes optionally `root`, `rootMargin` and `threshold` arguments from the native `IntersectionObserver` API and freezeOnceVisible 
 * to only catch the first appearance too.
 * It returns the full IntersectionObserver's `entry` object.
 * 
 * @see https://usehooks-ts.com/react-hook/use-intersection-observer
 * 
 * @example
 * const Section = (props: { title: string }) => {
 *   const ref = useRef<HTMLDivElement | null>(null)
 *   const entry = useIntersectionObserver(ref, {})
 *   const isVisible = !!entry?.isIntersecting
 * 
 *   console.log(`Render Section ${props.title}`, { isVisible })
 * 
 *   return (
 *     <div
 *       ref={ref}
 *       style={{
 *         minHeight: '100vh',
 *         display: 'flex',
 *         border: '1px dashed #000',
 *         fontSize: '2rem',
 *       }}
 *     >
 *       <div style={{ margin: 'auto' }}>{props.title}</div>
 *     </div>
 *   )
 * }
 * 
 * export default function Component() {
 *   return (
 *     <>
 *       {Array.from({ length: 5 }).map((_, index) => (
 *         <Section key={index + 1} title={`${index + 1}`} />
 *       ))}
 *     </>
 *   )
 * }
 */
function useIntersectionObserver(
  elementRef: RefObject<Element>,
  {
    threshold = 0,
    root = null,
    rootMargin = '0%',
    freezeOnceVisible = false,
  }: Args,
): IntersectionObserverEntry | undefined {
  const [entry, setEntry] = useState<IntersectionObserverEntry>()

  const frozen = entry?.isIntersecting && freezeOnceVisible

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry)
  }

  useEffect(() => {
    const node = elementRef?.current // DOM Ref
    const hasIOSupport = !!window.IntersectionObserver

    if (!hasIOSupport || frozen || !node) return

    const observerParams = { threshold, root, rootMargin }
    const observer = new IntersectionObserver(updateEntry, observerParams)

    observer.observe(node)

    return () => observer.disconnect()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRef, JSON.stringify(threshold), root, rootMargin, frozen])

  return entry
}

export default useIntersectionObserver
