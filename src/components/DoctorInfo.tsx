import { Star, Video, MapPin, Users } from 'lucide-react'
import DoctorAvatar from './DoctorAvatar'
import Badge from './ui/Badge'
import type { Appointment } from '../types/appointment'

interface DoctorInfoProps {
  appointment: Appointment
}

export default function DoctorInfo({ appointment }: DoctorInfoProps) {
  const isVideoCall = appointment.mode === 'Video Call'

  return (
    <div className="flex min-w-0 w-full items-start gap-3">
      {/* Doctor Image */}
      <div className="shrink-0">
        <DoctorAvatar name={appointment.doctorName} image={appointment.doctorImage} mode={appointment.mode} />
      </div>

      {/* Doctor Details */}
      <div className="min-w-0 flex-1">
        {/* Name + Rating */}
        <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
          <h3 className="font-manrope text-[17px] font-bold leading-tight text-gray-900">
            {appointment.doctorName}
          </h3>

          <span className="flex shrink-0 items-center gap-1 font-sora text-[11px] text-gray-500">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            {appointment.rating.toFixed(1)} ({appointment.reviews} reviews)
          </span>
        </div>

        {/* Mode + Appointment Type */}
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <Badge variant="brand" icon={isVideoCall ? <Video className="h-3 w-3" /> : <Users className="h-3 w-3" />}>
            {appointment.mode}
          </Badge>

          <Badge variant="neutral">{appointment.appointmentType}</Badge>
        </div>

        {/* Specialization */}
        <p className="mt-2 font-sora text-[12px] font-medium leading-[1.35] text-brand-700">
          {appointment.specialization} • {appointment.experience}
        </p>

        {/* Address */}
        <div className="mt-2 flex items-start gap-1 text-gray-400">
          <MapPin className="mt-0.5 h-3 w-3 shrink-0" />

          <span className="font-sora text-[10px] leading-[1.35]">
            {appointment.address}
          </span>
        </div>
      </div>
    </div>
  )
}
