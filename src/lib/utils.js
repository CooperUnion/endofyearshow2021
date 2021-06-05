const slug = (name) => {
  return name.trim().toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
}

export { slug }