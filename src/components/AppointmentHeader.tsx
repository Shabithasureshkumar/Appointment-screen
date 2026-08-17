import photo from '../assets/photo.png'

export default function AppointmentHeader() {
  return (
    <div
      className="
        relative
        flex
        min-h-[150px]
        w-full
        items-center
        overflow-hidden
        rounded-[26px]
        bg-brand-gradient
        px-6
        py-6
        sm:min-h-[160px]
        sm:px-8
        lg:min-h-[174px]
        lg:px-9
      "
    >
      {/* Background circles */}
      <div
        className="
          absolute
          -right-12
          -top-20
          h-56
          w-56
          rounded-full
          bg-white/10
        "
      />

      <div
        className="
          absolute
          -bottom-24
          right-20
          h-44
          w-44
          rounded-full
          bg-white/10
        "
      />

      <div
        className="
          absolute
          right-[-20px]
          bottom-[-55px]
          h-36
          w-36
          rounded-full
          bg-white/10
        "
      />

      {/* Text */}
      <div className="relative z-10 max-w-[390px]">
        <h1
          className="
            font-manrope
            text-[30px]
            font-extrabold
            leading-[1.05]
            tracking-[-0.5px]
            text-white
            sm:whitespace-nowrap
            sm:text-[34px]
          "
        >
          My Appointments
        </h1>

        <p
          className="
            mt-3
            max-w-[340px]
            font-sora
            text-[13px]
            leading-[1.65]
            text-white/90
            sm:text-[14px]
          "
        >
          Manage your clinical schedule and AI-assisted health consultations.
        </p>
      </div>

      {/* Your saved photo.png */}
      <div
        className="
          absolute
          bottom-0
          right-3
          z-10
          hidden
          h-[145px]
          w-[220px]
          items-end
          justify-end
          lg:flex
        "
      >
        <img
          src={photo}
          alt="Medical team"
          className="
            h-full
            w-full
            object-contain
            object-right-bottom
          "
        />
      </div>
    </div>
  )
}