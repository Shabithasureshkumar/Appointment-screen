import heart from '../assets/heart.png'
import ortho from '../assets/ortho.png'
import gesto from '../assets/gesto.png'
import pulmo from '../assets/pulmo.png'
import type { OrganIcon } from '../types/appointment'

const ORGAN_ASSETS: Record<OrganIcon, { src: string; alt: string }> = {
  heart: { src: heart, alt: 'Heart illustration' },
  orthopedic: { src: ortho, alt: 'Orthopedic health illustration' },
  digestive: { src: gesto, alt: 'Digestive health illustration' },
  lung: { src: pulmo, alt: 'Lung health illustration' },
}

interface OrganIllustrationProps {
  icon: OrganIcon
}

export default function OrganIllustration({ icon }: OrganIllustrationProps) {
  const asset = ORGAN_ASSETS[icon]

  return (
    // Sized close to Countdown's compact row height on mobile so the two don't force a tall
    // shared row with dead space beneath the (shorter) countdown, scaling continuously up to
    // the original desktop size (110x120 / 100x115) instead of jumping at `lg`.
    <div className="flex h-[clamp(72px,9vw,110px)] w-[clamp(80px,10vw,120px)] items-center justify-center">
      <img
        src={asset.src}
        alt={asset.alt}
        className="h-[clamp(64px,8vw,100px)] w-[clamp(74px,9vw,115px)] object-contain drop-shadow-[0_8px_15px_rgba(90,70,220,0.12)]"
      />
    </div>
  )
}
