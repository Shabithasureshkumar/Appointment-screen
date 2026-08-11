interface OrganIllustrationProps {
  icon: string
}

export default function OrganIllustration({
  icon,
}: OrganIllustrationProps) {
  return (
    <div className="flex h-[110px] w-[120px] items-center justify-center">
      <img
        src={icon}
        alt="Medical illustration"
        className="
          h-[100px]
          w-[115px]
          object-contain
          drop-shadow-[0_8px_15px_rgba(90,70,220,0.12)]
        "
      />
    </div>
  )
}