const config = {
  env: {
    apiServer: {
      url: process.env.NEXT_PUBLIC_API_ENDPOINT!,
    },
    imageKit: {
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    },
    databaseUrl: process.env.DATABASE_URL,
  },
};

export default config;
