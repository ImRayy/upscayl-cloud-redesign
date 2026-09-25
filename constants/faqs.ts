export type FAQ = {
    question: string
    answer: string
}

export const FAQ = {
  cloud: [
    {
      question: "What is Upscayl Cloud?",
      answer:
        "Upscayl Cloud is a cloud-based upscaling service that allows you to upscale images and videos using state-of-the-art AI models.",
    },
    {
      question: "How is it different from Upscayl Desktop?",
      answer:
        "Upscayl Cloud is a cloud-based service, which means you can upscayl without having to download any software, and use it on any device. It also offers a variety of models that are not available on Upscayl Desktop. Upscayl Cloud also allows commercial usage of models and has extra features like Face Enhancement, API access, better color accuracy for professional usage and more.",
    },
    {
      question: "How do I use Upscayl Cloud Beta?",
      answer:
        "You can sign up for Upscayl Cloud Beta and start upscaling images right away. Just login to Upscayl Cloud Beta, go to the pricing page, choose a plan, and you're good to go!",
      link: "https://upscayl.org/pricing",
    },
    {
      question: "How much does Upscayl Cloud Beta cost?",
      answer:
        "Upscayl Cloud Beta provides both a subscription and pay-as-you-go service, so you can choose whatever works best for you. You can check the pricing page for more detail.",
      link: "https://upscayl.org/pricing",
    },
    {
      question: "What models are available on Upscayl Cloud Beta?",
      answer:
        "Upscayl Cloud offers a variety of models, all of which allow commercial usage. These include models for general pictures, anime, digital art, text, portraits, and more.",
    },
    {
      question: "Do you offer an API for Upscayl Cloud Beta?",
      answer:
        "Yes, we offer an API for Upscayl Cloud. You can use the API to integrate upscaling into your own applications. For more details, please check the API documentation.",
      link: "https://docs.upscayl.org/",
    },
    {
      question: "Do you use my data for training models?",
      answer:
        "Absolutely not! We take privacy very seriously and do not use your data for training models. Your data is only used for upscaling and the original image is deleted in 24 hours.",
      link: "https://upscayl.org/privacy",
    },
    {
      question: "How do I access my upscaled images?",
      answer:
        "Upscayl Cloud provides you with 6 months of unlimited storage for your upscaled images. You can download them at any time during this period by logging into your account and going to the 'History' page.",
    },
    // {
    //   question:
    //     "I signed up for Upscayl Cloud Beta, but I still don't have access",
    //   answer:
    //     "We're working hard to get more people access to Upscayl Cloud. Our current capacity is limited, so please be patient while we work on increasing it. Rest assured, we'll notify you via email when you're approved for access. We apologize for the inconvenience and appreciate your patience.",
    // },
  ],
  desktop: [
    {
      question: "We'd like to use Upscayl Desktop for our business",
      answer: "Please contact us at support@upscayl.org.",
      link: "mailto:support@upscayl.org",
    },
    {
      question: "Is Upscayl Desktop free?",
      answer:
        "Yes, absolutely! Upscayl Desktop is free to use. You can just download and start using it without any restrictions.",
    },
    {
      question: "Do I need a graphics card to use Upscayl Desktop?",
      answer:
        "Yes, you need a vulkan compatible graphics card to use Upscayl Desktop. CPU only mode is not supported at the moment and many iGPUs are not supported.",
    },
    {
      question: "Can I use Upscayl Desktop for commercial use?",
      answer:
        "Out of the box, only General Photo (Real-ESRGAN), General Photo (Fast Real-ESRGAN) and Digital Art, allow commercial use. All other models are for personal use only. If you require commercial with other models, you can sign up for Upscayl Cloud or contact us for commercial Upscayl Desktop licensing.",
      link: "mailto:support@upscayl.org",
    },
    {
      question:
        "What's the difference between Upscayl Desktop and Upscayl Cloud?",
      answer:
        "Upscayl Desktop is a local image upscaling tool that runs on your computer, while Upscayl Cloud is a cloud-based service that allows you to upscale images and do more using state-of-the-art AI models.",
      link: "https://upscayl.org/cloud",
    },
    {
      question: "Do you train your models on user data?",
      answer:
        "No, we do not train our models on user data. We take privacy very seriously and do not use your data for training models. Your data forever stays on your computer when you use Upscayl Desktop.",
    },
    {
      question:
        "You say Upscayl Desktop is free but the Mac App Store version is not. Why?",
      answer:
        "Upscayl Desktop is licensed under AGPLv3. The version available on the Mac App Store is a version licensed under App Store rules, which includes additional features for paid users, including priority email support, automatic updates, and access to more models (in development). It is a way for us to keep the project sustainable and allow more people to discover and use Upscayl Desktop. To download the free version, you can click the 'Alternative Downloads' button.",
      link: "https://upscayl.org/desktop",
    },
  ],
  pricing: [
    {
      question: "How many credits do I need to upscale an image?",
      answer: "One credit allows you to upscale one image.",
    },
    {
      question: "Can I change my subscription plan?",
      answer:
        "Yes, you can change your subscription plan by cancelling your current subscription and switching to a new plan.",
    },
    {
      question: "Do credits expire?",
      answer:
        "One-Time Purchase credits never expire. Subscription credits roll over each month, but if you cancel your subscription, you won't receive new credits and any remaining subscription credits will expire at the end of your billing cycle.",
    },
    {
      question: "Can I cancel my subscription at any time?",
      answer:
        "Absolutely, you can cancel your subscription at any time. Your subscription will be canceled immediately and you'll keep all your credits until the end of the billing cycle, after which they'll expire. There are no refunds for unused credits.",
    },
    {
      question: "Can I get a refund for unused credits?",
      answer:
        "No, there are no refunds for unused credits after you cancel your subscription.",
    },
  ],
} 


