let config;
if (process.env.NODE_ENV === "development") {
    config = {
        $api_url: "http://localhost:3030/api/",
        timeoutDuration: 30000,
        $staticProfile:"http://localhost:3030/images/profile/"
    };
} else {
    config = {
        $api_url: "https://realprodurl:port/api",
        timeoutDuration: 1000,
        $staticProfile:"http://localhost:3030/images/profile"
    };
}

export { config }