import { cors } from "hono/cors";

export const corsMiddleware = cors({
	origin: (origin, c) => {
		if (c.env.NODE_ENV === "development") {
			return "*";
		}

		const allowedOrigins = [
			"http://localhost:8788",
			"http://localhost:8787",
			"https://your-app.vercel.app",
			"https://your-app.netlify.app",
		];

		return allowedOrigins.includes(origin) ? origin : null;
	},
	allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	allowHeaders: [
		"Content-Type",
		"Authorization",
		"X-Requested-With",
		"Accept",
		"Origin",
	],
	exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
	credentials: true,
	maxAge: 86400,
});
