module.exports = app => {
	app.db.sequelize.sync().done(() => {
		app.listen(app.get("port"), app.get("ip"), () => {
			console.log(`NTask Api - ${app.get("ip")}:${app.get("port")}`);
		});
	})
}
