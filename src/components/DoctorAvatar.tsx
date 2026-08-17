import { useState } from 'react'
import { UserRound } from 'lucide-react'
import type { AppointmentMode } from '../types/appointment'

interface DoctorAvatarProps {
  name: string
  image: string
  mode: AppointmentMode
}

export default function DoctorAvatar({ name, image, mode }: DoctorAvatarProps) {
  const [imageFailed, setImageFailed] = useState(false)
  const isVideoCall = mode === 'Video Call'

  return (
    <div className="relative h-[110px] w-[100px] shrink-0 overflow-hidden rounded-2xl bg-gray-100 sm:h-[128px] sm:w-[112px]">
      {imageFailed ? (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-100 to-brand-50">
          <UserRound className="h-10 w-10 text-brand-400" strokeWidth={1.5} />
        </div>
      ) : (
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover"
          onError={() => setImageFailed(true)}
        />
      )}

      {isVideoCall ? (
        <>
          <span className="absolute left-1.5 top-1.5 flex items-center gap-1 rounded-full bg-black/45 px-1.5 py-[3px] backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="font-manrope text-[7px] font-bold tracking-wide text-white">ONLINE</span>
          </span>
          <span className="absolute inset-x-0 bottom-0 bg-black/40 py-[3px] text-center font-manrope text-[6px] font-semibold tracking-wide text-white backdrop-blur-sm">
            OPTIMAL CONNECTION
          </span>
        </>
      ) : (
        <span className="absolute left-1.5 top-1.5 flex items-center gap-1 rounded-full bg-black/45 px-1.5 py-[3px] backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
          <span className="font-manrope text-[7px] font-bold tracking-wide text-white">IN-PERSON</span>
        </span>
      )}
    </div>
  )
}
