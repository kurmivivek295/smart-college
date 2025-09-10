import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"), // redirects based on auth
	route("login", "routes/login.tsx"),
	route("logout", "routes/logout.tsx"),
	route("dashboard", "routes/dashboard.tsx", [
		index("routes/dashboard._index.tsx"),
		route("lectures/:subjectId", "routes/dashboard.lectures.$subjectId.tsx"),
		route("exercises/:subjectId", "routes/dashboard.exercises.$subjectId.tsx"),
	]),
] satisfies RouteConfig;
