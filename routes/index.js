module.exports = function(app) {
	require("./apiRoutes")(app);
	require("./view-routes")(app)
};