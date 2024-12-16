import Categories from '../components/Categories';
import Footer from '../components/Footer';
import PostList from '../components/PostList';

const Blog = () => {
  return (
    <>
      <Categories />
      <PostList />
      <div className="hidden lg:flex">
        <Footer />
      </div>
    </>
  );
};

export default Blog;
