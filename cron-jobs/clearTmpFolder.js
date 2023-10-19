const fs = require("fs");
const path = require("path");

const tmpDir = path.join(__dirname, "../", "tmp");

const maxAge = 24 * 60 * 60 * 1000; // Максимальний час життя файлу (тут - 24 години)

fs.readdir(tmpDir, (err, files) => {
  if (err) {
    console.error("Error reading temp folder:", err);
    return;
  }

  const now = Date.now();

  files.forEach((file) => {
    if (file !== ".gitkeep") {
      const filePath = path.join(tmpDir, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error("Error getting file stats:", err);
        } else {
          const fileAge = now - stats.mtime.getTime();
          if (fileAge > maxAge) {
            fs.unlink(filePath, (err) => {
              if (err) {
                console.error("Error deleting file:", err);
              } else {
                console.log("File deleted:", filePath);
              }
            });
          }
        }
      });
    }
  });
});
