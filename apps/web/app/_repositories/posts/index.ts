import { prod_postsRepository } from "./_prod";
import { mock_postsRepository } from "./_mock";

export { TAG_MICROCMS_POSTS } from "./_prod";

export const postsRepository =
  process.env.NODE_ENV === "development" &&
  process.env.FORCE_ENABLE_MICROCMS !== "true"
    ? mock_postsRepository
    : prod_postsRepository;
