module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	moduleFileExtensions: ["js", "ts"],
	roots: ["<rootDir>/src"],
	"moduleDirectories": [
		"node_modules",
		"<rootDir>/src",
		"<rootDir>/test/node_modules"
	]
};