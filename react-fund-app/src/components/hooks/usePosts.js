//Создаем свой собственный ХУК
import { useMemo } from "react"

export const useSortedPosts = (posts, sort) => {
 //Состояние useMemo кешируем данные для производительности
        const sortedPosts = useMemo(() => {
            console.log('Отработала функция sortedPosts')
            if(sort){
              return [...posts].sort((a,b) => a[sort].localeCompare(b[sort]))
            }
             return posts;
          }, [sort, posts])
          
          return sortedPosts
}

export const usePosts = (posts, sort, query) => {
    //Реализуем поиск
    const sortedPosts = useSortedPosts(posts, sort)
    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(query))
  }, [query, sortedPosts])

  return sortedAndSearchedPosts
}