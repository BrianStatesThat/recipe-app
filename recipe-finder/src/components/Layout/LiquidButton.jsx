import React from 'react'
import {GlassCard} from '@developer-hub/liquid-glass'

function LiquidButton() {
  return (
    <GlassCard
      displacementScale={100}
      blurAmount={0.01}
     cornerRadius={100}
      padding="10px 10px"
      className='select-none rounded-full w-20 h-20'
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
    <span className="text-white text-4xl font-extrabold  rounded-full select-none">↑</span>
    </GlassCard>
  )
}

export default LiquidButton