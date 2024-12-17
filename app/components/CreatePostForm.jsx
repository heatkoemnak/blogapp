'use client';
import React, { useState } from 'react';
import { PhotoIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useBlogContext } from '../context/BlogProvider';
import LoadingSpinner from './LoadingSpinner';
import Error from './Error';
import { submitPost, uploadImage } from '../utils/api';
const CreatePostForm = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { categoryList } = useBlogContext();
  const [links, setLinks] = useState([]);
  const [linkInput, setLinkInput] = useState('');
  const [email, setEmail] = useState(session?.user?.email);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [body, setBody] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState('');

  const date = new Date();

  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  const formattedDate = date.toLocaleDateString('en-US', options);

  const handleFileChange = (e) => {
    const img = e.target.files[0];
    if (!img) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.addEventListener('load', () => {
      setImageSrc(reader.result);
      setImage(img);
    });
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    let uploadedImageData;
    try {
      const formData = new FormData();
      formData.append('file', image);
      formData.append(
        'upload_preset',
        process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME
      );
      uploadedImageData = await uploadImage(formData);
      console.log(uploadedImageData);
      await submitPost({
        method: 'POST',
        postId: '',
        title,
        body,
        public_id: uploadedImageData ? uploadedImageData.public_id : imageSrc,
        image: uploadedImageData ? uploadedImageData.secure_url : imageSrc,
        authorEmail: email,
        categoryId,
        links: links || [],
        publishedAt: formattedDate,
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      router.push('/blogs');
    }
  };

  const addLink = (e) => {
    e.preventDefault();
    if (linkInput.trim() !== '') {
      setLinks((link) => [...link, linkInput]);
      setLinkInput('');
    }
  };
  const removeLink = (index) => {
    setLinks((prev) => prev.filter((l, i) => i !== index));
  };
  if (error) {
    return <Error error={error} />;
  }
  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-5 grid grid-cols-1 gap-x-2 gap-y-3 sm:grid-cols-6">
              <div className="sm:col-span-full">
                <div class="w-full md:w-full px-3 mb-6">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="category_name"
                  >
                    Create post
                  </label>
                  <input
                    class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    name="name"
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="col-span-full">
                <div class="w-full px-3 mb-6">
                  <textarea
                    textarea
                    rows="4"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    placeholder="Content"
                    name="description"
                    required
                  >
                    {' '}
                  </textarea>
                </div>
              </div>
              <div className="col-span-full">
                {links &&
                  links.map((link, i) => {
                    return (
                      <div key={i} className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                          />
                        </svg>
                        <Link
                          href={link}
                          className="px-2 py-1 rounded text-purple-700"
                        >
                          {link}
                        </Link>
                        <button
                          type="button"
                          onClick={() => removeLink(i)}
                          className="text-red-500"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="size-4 text-red-600 cursor-pointer"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    );
                  })}
              </div>
              <div className="col-span-full mx-3">
                <div className=" flex items-center gap-2">
                  <input
                    class="appearance-none block w-full  bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    name="name"
                    value={linkInput}
                    onChange={(e) => setLinkInput(e.target.value)}
                    placeholder="Past the links and click to add"
                  />
                  <button
                    onClick={addLink}
                    className="bg-slate-100 flex gap-1 items-center text text-slate-700 rounded px-2 py-2 text-sm cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="size-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Add links
                  </button>
                </div>
              </div>
              <div className="sm:col-span-full">
                <div className="relative mt-2 h-10 w-72 min-w-[200px]">
                  <select
                    onChange={(e) => setCategoryId(e.target.value)}
                    value={categoryId}
                    className="peer h-full w-full rounded-[7px] border border-purple-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-2 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  >
                    {categoryList.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Select a Category
                  </label>
                </div>
              </div>
              <div className="col-span-full">
                <div className="mt-1 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  {imageSrc ? (
                    <div>
                      <Image
                        src={imageSrc}
                        alt="Uploaded"
                        width={500}
                        height={350}
                        className="min-w-full object-cover"
                      />
                      <button
                        onClick={() => setImageSrc('')}
                        className="btn py-2 px-4 mt-4 rounded-md bg-red-600 text-white mb-4"
                      >
                        Remove Image
                      </button>
                    </div>
                  ) : (
                    <div class="w-full px-3 mb-8">
                      <label
                        class="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center justify-center rounded-xl border-2 border-dashed border-orange-400 bg-white p-6 text-center"
                        htmlFor="file-upload"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-10 w-10 text-orange-800"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>

                        <h2 class="mt-4 text-xl font-medium text-gray-700 tracking-wide">
                          Upload file image
                        </h2>

                        <p class="mt-2 text-gray-500 tracking-wide">
                          Upload or drag & drop your file SVG, PNG, JPG or GIF
                          up to 10MB
                        </p>

                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleFileChange}
                          accept="image/png, image/jpeg, image/webp"
                        />
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-end gap-x-6">
              <Link href={'/blogs'}>
                <button
                  type="button"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Cancel
                </button>
              </Link>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePostForm;
