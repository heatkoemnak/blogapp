import Categories from '../Categories';
import PostHeader from '../Post/PostHeader';

export default function PostLayout({ children }) {
  return (
    <>
      <Categories />
      <PostHeader />
      <main>{children}</main>
    </>
  );
}
