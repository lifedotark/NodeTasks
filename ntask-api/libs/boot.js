import https from "https";
import fs from "fs";

module.exports = app => {
	if(process.env.NODE_ENV !== "test"){

		const credentials = {
			key:fs.readFileSync("ssl/ntask.key","utf8"),
			cert:fs.readFileSync("ssl/ntask.cert","utf8")
		}

		app.db.sequelize.sync().done(() => {
			https.createServer(credentials, app)
				.listen(app.get("port"), app.get("ip"), () => {
					console.log(`NTask Api - ${app.get("ip")}:${app.get("port")}`);
				});
		});
	}
}
