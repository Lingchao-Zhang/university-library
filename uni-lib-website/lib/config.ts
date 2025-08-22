const config = {
    apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT!,
    env: {
        imageKit: {
            // use exclamation mark to ensure the following are considered as string
            urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
            publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
            privateKey: process.env.NEXT_IMAGEKIT_PRIVATE_KEY!
        }
    },
    databaseUrl: process.env.DATABASE_URL!
}

export default config