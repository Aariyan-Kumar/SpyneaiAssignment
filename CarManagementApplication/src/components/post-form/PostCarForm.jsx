import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { RTE, Select, Input } from '../index'
import appwriteService from '../../appwrite/databaseConfig';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

function PostCarForm({ post }) {

  const [URL, setURL] = React.useState('');


  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValue: {
      title: post?.title || '',
      slug: post?.slug || '',
      description: post?.description || '',
      status: post?.status || 'active'
    }
  });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  // console.log(userData.$id);

  if (post) {
    appwriteService.getFilePreview(post.featuredImages).then((url) => {
      if (url) {
        // console.log(url.href);
        setURL(url.href)
      }
    })
  }

  // console.log(userData);

  const submit = async (data) => {

    console.log(data);

    if (post) {
      const fileImage = data.featuredImages ? await appwriteService.uploadFile(data.featuredImages[0]) : null;
      if (fileImage && post.featuredImages) {
        await appwriteService.deleteFile(post.featuredImages);
      }

      const dbPost = await appwriteService.updatePost({
        ...data,
        featuredImages: fileImage ? fileImage.$id : post.featuredImages,
      })
      console.log(dbPost);
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    }
    else {
      const fileImage = await appwriteService.uploadFile(data.featuredImages[0]);

      if (fileImage) {
        const fileId = fileImage.$id;
        data.featuredImages = fileId;

        const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  }

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")  // Remove all non-word characters except dashes and spaces
        .replace(/\s+/g, "-")      // Replace spaces with dashes
        .replace(/-+/g, "-");      // Replace multiple dashes with a single dash

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <>
      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap h-auto">
        <div className="w-2/3 px-2">
          <Input
            label="Title :"
            placeholder="Title..."
            className="w-full px-4 py-2 rounded-sm outline-none focus:outline-blue-800 focus:ring-2 focus:ring-blue-800"
            value={post ? post.title : undefined}
            {...register("title", { required: true })}
          />
          <Input
            label="Slug :"
            placeholder="Slug..."
            className="w-full px-4 py-2 rounded-sm outline-none focus:outline-blue-800 focus:ring-2 focus:ring-blue-800"
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
            }}
            value={post ? post.$id : ''}
          />
          <RTE label="Description :" name="description" control={control}
            defaultValue={post ? post.description : getValues("description")} />
        </div>
        <div className="w-1/3 px-2">
          <Input
            label="Featured Image :"
            type="file"
            className="w-full px-4 py-2 rounded-sm outline-none focus:outline-blue-800 focus:ring-2 focus:ring-blue-800"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("featuredImages", { required: !post })}
          />
          {post && (
            <div className="w-full mb-4">
              <img
                src={URL}
                alt={post.title}
                className="rounded-lg"
              />
            </div>
          )}
          <Select
            options={["Active", "Inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", { required: true })}
            placeholder="Select Status"
          />
          <button
            type="submit"
            // bgColor={post ? "bg-green-500" : undefined}
            className="w-3/5 rounded bg-green-600 px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white hover:text-green-600 shadow-green-400 transition duration-150 ease-in-out hover:bg-green-200 hover:font-nedium hover:shadow-green-400 focus:outline-none focus:ring-0 motion-reduce:transition-none"
          >
            {post ? "update" : "submit"}
          </button>
        </div>
      </form>
    </>
  )
}

export default PostCarForm