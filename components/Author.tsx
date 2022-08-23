import React from 'react'

interface AuthorProps {
  author: any;
}

const Author = ({ author }:AuthorProps) => {
  return (
    <div>
        <img
          alt={author.name}
          height="100px"
          width="100px"
          className="align-middle rounded-full"
          src={author.avatar.url}
        />
    </div>
  )
}

export default Author