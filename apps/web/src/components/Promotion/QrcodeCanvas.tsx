import { useEffect, useRef } from 'react'
import QRCode from 'qrcode'

export interface QrcodeCanvasProps {
  value: string
  size?: number
  className?: string
}

export function QrcodeCanvas({ value, size = 90, className = '' }: QrcodeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!value || !canvasRef.current) return

    QRCode.toCanvas(canvasRef.current, value, {
      width: size,
      margin: 0,
      color: {
        dark: '#ffffff',
        light: 'rgba(0,0,0,0)',
      },
    }).catch((error) => {
      console.error('[QrcodeCanvas] render failed', error)
    })
  }, [size, value])

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    />
  )
}
