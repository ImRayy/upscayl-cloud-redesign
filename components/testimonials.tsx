import { QuoteIcon } from "lucide-react"
import HeaderText from "./header-text"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import Marquee from "./ui/marquee"

type Review = {
  name: string
  username: string
  body: string
  img: string
}

const reviews: Review[] = [
  {
    name: "isobelh.art",
    username: "@isobelh_art",
    body: " I've been looking everywhere and have settled on Upscayl. It's free, which is a definite bonus, but it also seems better than all the paid ones I tried the trial of!",
    img: "https://unavatar.io/twitter/isobelh_art",
  },
  {
    name: "J. Laren",
    username: "@jacoblaren",
    body: "Upscayl is free and effective if you simply want to upscale with minimal shifts.",
    img: "https://unavatar.io/twitter/jacoblaren",
  },
  {
    name: "José Julio Cuairán",
    username: "@ai_artinfocus",
    body: "I tell you one that you have not mentioned and it is excellent. Besides, it can be run locally, which is good for your security and privacy. Do you want to know its name? Upscayl at https://upscayl.org Discover its potential now.",
    img: "https://unavatar.io/twitter/ai_artinfocus",
  },
  {
    name: "Greg Bergé",
    username: "@gregberge",
    body: "Upscayl is a free and Open Source alternative to @Magnific_AI. I tested it, and it's stunning 🤯",
    img: "https://unavatar.io/twitter/gregberge",
  },
  {
    name: "nolimitlearn",
    username: "@nolimitlearn",
    body: "Don't want to pay $40/month for Magnific? I have tried my best to give Javi some good advice to offer a $100/yr. 40 gens/mo. basic plan but seems to have fallen on deaf ears. This is fine, people can do what they want, so I will use Upscayl for free.",
    img: "https://unavatar.io/twitter/nolimitlearn",
  },
  {
    name: "_fw",
    username: "@_fw",
    body: "I use UpScayl pretty much every day and doing so feels like magic every time. Your user interface tweaks here and there are always appreciated and UpScayl is a joy to use. Feel proud, Upscayl is witchcraft and I love it",
    img: "https://unavatar.io/twitter/_fw",
  },
  {
    name: "Anirudh Thakur",
    username: "@Itsyopahadiboy",
    body: "There is a great Upscaler that is Open Source and Entirely free. It is called, 'Upscayl' and you can run it locally and now on the cloud too!",
    img: "https://unavatar.io/twitter/Itsyopahadiboy",
  },
  {
    name: "Einar Petersen",
    username: "@TheEinarkist",
    body: "A super nice tool for up-scaling I've used to 'save' some images down scaled in the early 00's for a website, where the original photos and paintings had burned in a fire and the only thing remaining were the digitally compressed images, is Upscayl.",
    img: "https://unavatar.io/twitter/TheEinarkist",
  },
  {
    name: "hard-coded.xyz",
    username: "@hard_coded_xyz",
    body: "upscayl are proper distruptors, while some people charge 29usd/month for the same thing those guys offer the same for free, as it should be as most of this tech is free, just because somebody does not know how to code they should not be punished",
    img: "https://unavatar.io/twitter/hard_coded_xyz",
  },
]

const ReviewCard = (review: Review) => {
  return (
    <div className="border rounded-2xl p-4 bg-card shrink-0 sm:max-w-md flex flex-col justify-between cursor-pointer max-w-56">
      <div>
        <QuoteIcon className="text-red-400 mb-5 hidden sm:block" />
        <h3 className="text-lg font-bold mb-1 hidden sm:block">
          {review.name}
        </h3>
        <p className="text-sm">{review.body}</p>
      </div>
      <div className="inline-flex gap-3 items-center pt-6">
        <Avatar>
          <AvatarImage src={review.img} />
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm">{review.name}</span>
          <span className="text-muted-foreground text-xs">
            {review.username}
          </span>
        </div>
      </div>
    </div>
  )
}

const firstRow = reviews.slice(0, reviews.length / 2)
const secondRow = reviews.slice(reviews.length / 2)

export default function Testimonials() {
  return (
    <section className="relative max-w-5xl mx-auto p-4 space-y-8">
      <HeaderText
        title="Hey, people seem to love us too!"
        description={""}
        className="gap-2 flex-col flex items-center text-center sm:max-w-full"
      >
        <Button variant="outline" size="sm" className="rounded-full" asChild>
          <div>
            <QuoteIcon />
            Testimonials
          </div>
        </Button>
      </HeaderText>
      <div className="relative">
        <Marquee pauseOnHover className="[--duration:20s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee pauseOnHover reverse className="[--duration:20s]">
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>

        <div className="pointer-events-none absolute inset-y-0 left-0 sm:w-2/5 w-1/12 bg-linear-to-r from-background via-background/70 to-transparent"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 sm:w-2/5 w-1/12 bg-linear-to-l from-background via-background/70 to-transparent"></div>
      </div>
    </section>
  )
}
