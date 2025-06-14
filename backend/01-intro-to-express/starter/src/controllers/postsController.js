import posts from "../data/posts.js";

export const getPosts = (req, res) => {
  res.status(200).json(posts);
};

export const getPostById = (req, res) => {
  const id = parseInt(req.params.id)

  const post = posts.find((post) => {
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

  const post = posts.filter(post => String(post.author).toLowerCase() === author)

  if (post.length === 0) {
    return res.status(404).json({ message: "No posts found for this author" });
  }

  res.status(200).json(post) 


}

export const createPost = (req, res) => {
  const post = req.body

  const maxId = posts.length > 1 
  ? Math.max(...posts.map(post => post.id)) 
  : 1;

  post.id = maxId + 1
  posts.push(post)

  res.status(201).json({
    id: post.id,
    title: post.title,
    content: post.content,
    author: post.author,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt
  });
}

export const updatePost = (req, res) => {
  const id = parseInt(req.params.id)

  const updatedPost = req.body

  const index = posts.findIndex(post => post.id === id);
  
  if (index === -1) {
      return res.status(404).json({ error: "Post not found" });
  }

  posts[index] = { ...posts[index], ...updatedPost };

  res.status(200).json({ message: "Post updated", post: posts[index] });

}

export const deletePost = (req, res) => {
  const id = parseInt(req.params.id);

  const index = posts.findIndex(post => post.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Post not found" });
  }

  posts.splice(index, 1);  

  res.status(200).json({ message: "Post deleted", posts });

}