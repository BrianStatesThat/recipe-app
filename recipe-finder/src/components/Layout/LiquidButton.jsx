import React from 'react'
import {GlassCard} from '@developer-hub/liquid-glass'

function LiquidButton() {
  return (
    <GlassCard
      displacementScale={100}
      blurAmount={0.01}
     cornerRadius={100}
      padding="18px 18px"
      className='select-none'
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
    <span className="text-white font-medium w-24 h-24 rounded-full select-none">TOP</span>
    </GlassCard>
  )
}

export default LiquidButton