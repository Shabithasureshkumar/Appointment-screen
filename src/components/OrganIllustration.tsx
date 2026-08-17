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
    <div className="flex h-[110px] w-[120px] items-center justify-center">
      <img
        src={asset.src}
        alt={asset.alt}
        className="h-[100px] w-[115px] object-contain drop-shadow-[0_8px_15px_rgba(90,70,220,0.12)]"
      />
    </div>
  )
}
