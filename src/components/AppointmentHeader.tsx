import photo from '../assets/photo.png'

export default function AppointmentHeader() {
  return (
    <div
      className="
        relative
        flex
        min-h-[172px]
        w-full
        overflow-hidden
        rounded-[26px]
        bg-brand-gradient
        px-5
        py-6
        md:min-h-[172px]
        md:px-8
        lg:min-h-[174px]
        lg:px-9
      "
    >
      {/* Background circles */}
      <div
        className="
          pointer-events-none
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
          pointer-events-none
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
          pointer-events-none
          absolute
          bottom-[-55px]
          right-[-20px]
          h-36
          w-36
          rounded-full
          bg-white/10
        "
      />

      {/*
        Discrete sizing at md/lg, not clamp(): `clamp(min, Nvw, max)` only reaches its preferred
        value once `N * viewport-width` clears `min` — with the coefficients this hero previously
        used, that crossover landed near 900-1450px, so every size here sat pinned at its
        smallest value across the entire mobile *and* tablet range instead of scaling toward
        Figma's ~390px reference. Explicit breakpoints avoid that trap: `md` steps toward tablet,
        `lg` is the exact original approved desktop size.

        The base (<768px) tier below DOES use clamp() for the heading and illustration, because
        at a fixed 28px/128px those two alone need ~236px + 128px + 16px of row width, which the
        320-467px phones this hero actually ships on don't have next to a fixed-width illustration
        — "My Appointments" wrapped to two lines. The illustration's clamp() is a linear
        interpolation from 320px to 480px (`calc(Nvw - Mpx)`, not plain `Nvw`) so it lands on its
        original, unchanged 128x104 exactly at 480px — the width already confirmed to have enough
        room — instead of overshooting past it. The heading/subtitle clamps reach their ceiling
        even earlier (~406-467px) using the simpler `Nvw` form, which is precise enough since
        their floor is already close to 320px.
      */}
      <div className="relative z-10 flex w-full min-w-0 items-center gap-3 md:gap-5 lg:gap-6">
        {/* Text */}
        <div className="min-w-0 flex-1 basis-0">
          <h1 className="font-manrope text-[clamp(20px,6vw,28px)] font-extrabold leading-[1.08] tracking-[-0.5px] text-white md:text-[32px] lg:whitespace-nowrap lg:text-[34px]">
            My Appointments
          </h1>

          <p className="mt-2 max-w-[300px] font-sora text-[clamp(12px,3.2vw,13px)] leading-[1.5] text-white/90 md:max-w-[340px] md:text-[14px] lg:max-w-[340px]">
            Manage your clinical schedule and AI-assisted health consultations.
          </p>
        </div>

        {/* Medical team illustration */}
        <div className="flex h-[clamp(55px,calc(30.625vw_-_43px),104px)] w-[clamp(68px,calc(37.5vw_-_52px),128px)] shrink-0 items-end justify-end md:h-[128px] md:w-[172px] lg:h-[145px] lg:w-[220px]">
          <img src={photo} alt="Medical team" className="block h-full w-full object-contain object-right-bottom" />
        </div>
      </div>
    </div>
  )
}