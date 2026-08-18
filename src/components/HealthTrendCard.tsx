export default function HealthTrendCard() {
  return (
    <div
      className="
        flex
        h-full
        min-h-[174px]
        w-full
        flex-col
        justify-between
        rounded-[20px]
        border
        border-brand-mist
        bg-white
        p-5
        shadow-[0_8px_25px_rgba(70,50,120,0.06)]
      "
    >
      <div>
        <h3 className="font-sora text-sm font-medium text-[#454558]">
          Health Trend
        </h3>

        <div className="mt-3 flex items-end gap-2">
          <span
            className="
              font-manrope
              text-[28px]
              font-extrabold
              leading-none
              text-[#6335F5]
            "
          >
            +8%
          </span>

          <span
            className="
              mb-[1px]
              font-sora
              text-[12px]
              text-[#9997A8]
            "
          >
            Better than Last Month
          </span>
        </div>
      </div>

      <div className="flex items-end justify-end gap-1">
        <span className="h-[12px] w-[7px] rounded-t-[3px] bg-[#DCCEFF]" />
        <span className="h-[17px] w-[7px] rounded-t-[3px] bg-[#D1BFFF]" />
        <span className="h-[24px] w-[7px] rounded-t-[3px] bg-[#C3ACFF]" />
        <span className="h-[32px] w-[7px] rounded-t-[3px] bg-[#AD8CFF]" />
        <span className="h-[40px] w-[7px] rounded-t-[3px] bg-[#956BFF]" />
        <span className="h-[48px] w-[7px] rounded-t-[3px] bg-[#7441F5]" />
      </div>
    </div>
  )
}