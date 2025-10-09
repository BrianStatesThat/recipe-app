import React from 'react'
import {GlassCard} from '@developer-hub/liquid-glass'

function LiquidButton() {
  return (
    <GlassCard
      displacementScale={100}
      blurAmount={0.01}
     cornerRadius={100}
      padding="10px 10px"
      className='select-none rounded-full'
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
    <span className="text-white text-4xl font-extrabold w-24 h-24 rounded-full select-none">↑</span>
    </GlassCard>
  )
}

export default LiquidButton