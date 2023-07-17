const { Router } = require("express");
const router = Router();
const Replicate = require('replicate');
const replicate = new Replicate({
  auth: process.env.REPLICA_AUTH
});


router.post("/", async (req, res) => {
    const image = req.files.image;
    console.log(image)
    var base64String = new Buffer.from(image.data, 'base64');
    base64String=base64String.toString('base64');
    const imageData = `data:${image.mimetype};base64,${base64String}`;
    const output = await replicate.run(
      `sczhou/codeformer:${process.env.REPLICA_RUN}`,
      {
        input: {
          image: imageData
        }
      }
    );
    console.log(output)
    // res.send({
    //   base64Data: output,
    // });
    res.redirect(output);


    // return res.redirect(`/home?pic=${output}`);
   
  });
  
module.exports = router;