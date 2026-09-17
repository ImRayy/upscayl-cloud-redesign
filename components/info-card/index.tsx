import Image from "next/image"

type InfoCardProps = {
  title: string
  description: string
  img: string
  alt?: string
  width?: number
  height?: number
}

export default function InfoCard({
  title,
  description,
  img,
  alt = "",
  width,
  height,
}: InfoCardProps) {
  return (
    <div className="rounded-3xl p-1.5 bg-card">
      <div className="aspect-[16/11] overflow-hidden rounded-2xl">
        {width && height ? (
          <Image
            width={width}
            height={height}
            src={img}
            alt={alt}
            className="size-full object-cover"
          />
        ) : (
          <img src={img} alt={alt} className="size-full object-cover" />
        )}
      </div>
      <div className="p-1.5 space-y-1">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  )
}
