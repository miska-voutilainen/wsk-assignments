import sharp from 'sharp';
import path from 'path';

const createThumbnail = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }

  try {
    const inputPath = req.file.path;
    const parsed = path.parse(inputPath);
    const thumbName = `${parsed.name}_thumb.png`;
    const outputPath = path.join(parsed.dir, thumbName);

    await sharp(inputPath).resize(160, 160).png().toFile(outputPath);

    req.file.thumbnail = thumbName;
    next();
  } catch (err) {
    next(err);
  }
};

export { createThumbnail };
