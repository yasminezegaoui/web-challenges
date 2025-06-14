import posts from "../data/posts.js";

export const getPosts = (req, res) => {
  res.status(200).json(posts.posts);
};

export const getPostById = (req, res) => {
  const id = parseInt(req.params.id)
  console.log(id)

  const post = posts.posts.find((post) => {
    if(post.id === id){
      return post
    }
  })

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  res.status(200).json(post)
}

export const getPostsByAuthor = (req, res) => {
  const author = String(req.params.author).toLowerCase()
  console.log(author)

  const post = posts.posts.filter(post => String(post.author).toLowerCase() === author)

  if (post.length === 0) {
    return res.status(404).json({ message: "No posts found for this author" });
  }

  res.status(200).json(post) 


}

export const createPost = (req, res) => {
  const post = req.body
  console.log(post)

  const maxId = posts.posts.length > 0 
  ? Math.max(...posts.posts.map(post => post.id)) 
  : 0;

  post.id = maxId + 1
  posts.posts.push(post)

  res.status(201).json({
    id: post.id,
    title: post.title,
    content: post.content,
    author: post.author,
    createdAt: post.createdAt
  });
}

export const updatePost = (req, res) => {
  const id = parseInt(req.params.id)
  console.log(id)

  const updatedPost = req.body

  const index = posts.posts.findIndex(post => post.id === id);
  
  if (index === -1) {
      return res.status(404).json({ error: "Post not found" });
  }

  posts.posts[index] = { ...posts.posts[index], ...updatedPost };

  res.status(200).json({ message: "Post updated", post: posts.posts[index] });

}

export const deletePost = (req, res) => {
  const id = parseInt(req.params.id)
  console.log(id)

  const originalLength = posts.posts.length;
  const result = posts.posts.filter(post => post.id !== id);

  if (originalLength === result.length) {
    return res.status(404).json({ message: "Post not found" });
  }

  posts.posts = result
  res.status(200).json(result)

}