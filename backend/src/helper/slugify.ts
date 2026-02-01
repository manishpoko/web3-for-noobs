
//since slugify isnt really compatible with esm, this is a hack to use it in our project

import slugify from "slugify";

export default slugify.default || slugify