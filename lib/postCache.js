class PostsCache {
  
  constructor(expiry = 600000) {
    this.age = 0
    this.expiry = expiry
    this.postCache = []
    
    console.log("PostsCache instantiated with expiry:", this.expiry)
  }
  
  reset(){
    this.age = 0
    this.postCache = []
    console.log("PostsCache reset")
  }
  
  get isFresh(){
    const currentTime = new Date().getTime()
    return currentTime - this.age < this.expiry
  }
  
  get isExpired(){
    return !this.isFresh()
  }
  
  get posts(){
    return this.postCache
  }
  
  set posts(posts) {
    this.postCache = posts
    this.timestamp()
  }
  
  timestamp(){
    const currentTime = new Date().getTime()
    this.age = currentTime
  }
  
  contains(id){
    return this.postCache.filter(post=>post.id === id) > 0
  }
  
  post(id) {
    return this.postCache.filter(post=>post.id === id).shift()
  }
  
}

module.exports = PostsCache