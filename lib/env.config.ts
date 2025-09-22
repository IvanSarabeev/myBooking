const config = {
  env: {
    apiServer: {
      url: process.env.NEXT_PUBLIC_API_ENDPOINT!,
      prodEndpoint: process.env.NEXT_PUBLIC_PROD_API_ENDPOINT!,
    },
    imageKit: {
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    },
    databaseUrl: process.env.DATABASE_URL!,
    upstash: {
      redisUrl: process.env.UPSTASH_REDIS_URL!,
      redisToken: process.env.UPSTASH_REDIS_TOKEN!,
    },
    qStash: {
      url: process.env.QSTASH_URL!,
      token: process.env.QSTASH_TOKEN!,
      currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY!,
      nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY!,
    },
    resendToken: process.env.RESEND_TOKEN!,
  },
};

export default config;
