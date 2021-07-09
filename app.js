const http = require('http');
const fs = require('fs');
const path = require('path');

const Server = http.createServer((req, resp) => {
        let templatesFile = path.join(
            __dirname, "templates",
            req.url === "/" ? "index.html" : req.url
        );
        let extName = path.extname(templatesFile);
        let contentType = "text/html";
        const contentTypeList = [
            "text/html", "text/css", "text/javascript",
            "application/json", "video/mp4", "application/pdf",
            "image/jpg", "image/png", "image/jpeg"
        ];
        for (let i = 0; i >= contentTypeList.length; i++) {
            if (contentTypeList[i] != contentType) {
                contentType = contentTypeList[i];
                break;
            }
        }

        fs.readFile(templatesFile, {encoding: 'utf-8'}, (err, data) => {
            if (err) {
                if (err.code == "ENOENT") {
                    fs.readFile(path.join(__dirname, "templates", "404.html"),  {encoding: "utf-8"}, (err, data) => {
                        if (err) console.log("404 page cann't load!"); else {
                            resp.writeHead(404, {"Content-Type": "text/html"});
                            resp.write(data, "utf-8");
                            resp.end();
                        }
                    });
                }
                // } else {
                //     resp.writeHead(500);
                //     resp.write(`${err.code} Server Error`)
                //     resp.end();
                // }
            } else {
                resp.write(data);
                resp.end();
            }
        });
});

Server.listen(9999, () => {
    console.log("Server is running!");
})